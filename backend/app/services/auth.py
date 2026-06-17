"""
Authentication service
"""

import secrets
import logging
from typing import Optional, Tuple
from sqlalchemy.orm import Session

from app.core.security import create_access_token
from app.schemas.user import UserResponse
from app.services.github.oauth import GitHubOAuthService
from app.services.user import UserService

logger = logging.getLogger(__name__)


class AuthService:
    """Service for authentication operations"""

    @staticmethod
    def generate_oauth_state() -> str:
        """
        Generate random state parameter for OAuth

        Returns:
            Random state string
        """
        return secrets.token_urlsafe(32)

    @staticmethod
    def get_github_authorization_url(state: str) -> str:
        """
        Get GitHub OAuth authorization URL

        Args:
            state: State parameter for CSRF protection

        Returns:
            Authorization URL
        """
        return GitHubOAuthService.get_authorization_url(state)

    @staticmethod
    async def handle_github_callback(
        code: str,
        state: str,
        db: Session,
    ) -> Tuple[Optional[UserResponse], str]:
        """
        Handle GitHub OAuth callback

        Args:
            code: Authorization code from GitHub
            state: State parameter to validate
            db: Database session

        Returns:
            Tuple of (user_response, access_token) or (None, None) on error

        Raises:
            Exception: On OAuth or database errors
        """
        if not code or not state:
            raise ValueError("Missing code or state parameter")

        try:
            # Exchange code for access token
            token_response = await GitHubOAuthService.exchange_code_for_token(code)
            access_token = token_response.get("access_token")

            if not access_token:
                raise Exception("No access token received from GitHub")

            # Get user profile from GitHub
            github_profile = await GitHubOAuthService.get_user_profile(access_token)

            if not github_profile:
                raise Exception("Failed to retrieve GitHub user profile")

            # Create or update user in database
            user = UserService.create_or_update_user(db, github_profile)

            # Create JWT token
            jwt_token = create_access_token(data={"sub": str(user.id)})

            # Convert to response schema
            user_response = UserResponse.from_orm(user)

            return user_response, jwt_token

        except Exception as e:
            logger.error(f"GitHub OAuth callback error: {e}")
            raise

    @staticmethod
    def get_current_user(user_id: int, db: Session) -> Optional[UserResponse]:
        """
        Get current user from ID

        Args:
            user_id: User ID from JWT token
            db: Database session

        Returns:
            User response or None
        """
        user = UserService.get_user_by_id(db, user_id)
        if user:
            return UserResponse.from_orm(user)
        return None
