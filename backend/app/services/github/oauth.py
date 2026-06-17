"""
GitHub OAuth service
"""

import httpx
import logging
from typing import Optional
from urllib.parse import urlencode

from app.core.config import settings

logger = logging.getLogger(__name__)

# GitHub OAuth endpoints
GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize"
GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_USER_URL = "https://api.github.com/user"
GITHUB_USER_EMAILS_URL = "https://api.github.com/user/emails"


class GitHubOAuthService:
    """Service for handling GitHub OAuth"""

    @staticmethod
    def get_authorization_url(state: str) -> str:
        """
        Generate GitHub OAuth authorization URL

        Args:
            state: State parameter for CSRF protection

        Returns:
            Authorization URL
        """
        params = {
            "client_id": settings.GITHUB_CLIENT_ID,
            "redirect_uri": settings.GITHUB_OAUTH_REDIRECT_URI,
            "scope": "read:user user:email",
            "state": state,
        }
        return f"{GITHUB_AUTHORIZE_URL}?{urlencode(params)}"

    @staticmethod
    async def exchange_code_for_token(code: str) -> Optional[dict]:
        """
        Exchange authorization code for access token

        Args:
            code: Authorization code from GitHub

        Returns:
            Token response with access_token and token_type

        Raises:
            Exception: If token exchange fails
        """
        if not code:
            raise ValueError("Authorization code is required")

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    GITHUB_TOKEN_URL,
                    json={
                        "client_id": settings.GITHUB_CLIENT_ID,
                        "client_secret": settings.GITHUB_CLIENT_SECRET,
                        "code": code,
                        "redirect_uri": settings.GITHUB_OAUTH_REDIRECT_URI,
                    },
                    headers={"Accept": "application/json"},
                    timeout=10.0,
                )

                if response.status_code != 200:
                    logger.error(f"GitHub token exchange failed: {response.text}")
                    raise Exception(
                        f"Failed to exchange code for token: {response.text}"
                    )

                data = response.json()

                if "error" in data:
                    raise Exception(
                        f"GitHub OAuth error: {data.get('error_description', data['error'])}"
                    )

                return data
            except httpx.RequestError as e:
                logger.error(f"GitHub OAuth request error: {e}")
                raise Exception(f"Failed to communicate with GitHub: {str(e)}")

    @staticmethod
    async def get_user_profile(access_token: str) -> dict:
        """
        Fetch user profile from GitHub API

        Args:
            access_token: GitHub access token

        Returns:
            User profile data

        Raises:
            Exception: If profile fetch fails
        """
        if not access_token:
            raise ValueError("Access token is required")

        async with httpx.AsyncClient() as client:
            try:
                # Get user profile
                headers = {
                    "Authorization": f"token {access_token}",
                    "Accept": "application/vnd.github.v3+json",
                }

                response = await client.get(
                    GITHUB_USER_URL,
                    headers=headers,
                    timeout=10.0,
                )

                if response.status_code != 200:
                    logger.error(f"GitHub user profile fetch failed: {response.text}")
                    raise Exception(f"Failed to fetch user profile: {response.text}")

                user_data = response.json()

                # Get primary email if not provided in profile
                if not user_data.get("email"):
                    emails_response = await client.get(
                        GITHUB_USER_EMAILS_URL,
                        headers=headers,
                        timeout=10.0,
                    )

                    if emails_response.status_code == 200:
                        emails = emails_response.json()
                        # Find primary email
                        for email in emails:
                            if email.get("primary"):
                                user_data["email"] = email["email"]
                                break
                        # If no primary, use first verified email
                        if not user_data.get("email"):
                            for email in emails:
                                if email.get("verified"):
                                    user_data["email"] = email["email"]
                                    break

                return user_data
            except httpx.RequestError as e:
                logger.error(f"GitHub API request error: {e}")
                raise Exception(f"Failed to communicate with GitHub API: {str(e)}")
