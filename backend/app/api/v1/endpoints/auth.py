"""
Authentication endpoints
"""

import logging
from typing import Optional
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import get_current_user as verify_token_dependency
from app.db.session import get_db
from app.schemas.auth import (
    AuthorizationUrlResponse,
    CurrentUserResponse,
    LogoutResponse,
)
from app.services.auth import AuthService

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/github", response_model=AuthorizationUrlResponse)
async def start_github_oauth():
    """
    Start GitHub OAuth flow

    Generates authorization URL and redirects to GitHub

    Returns:
        Authorization URL
    """
    try:
        state = AuthService.generate_oauth_state()
        authorization_url = AuthService.get_github_authorization_url(state)

        return {
            "authorization_url": authorization_url,
        }
    except Exception as e:
        logger.error(f"Error starting GitHub OAuth: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to start OAuth flow",
        )


@router.get("/github/callback")
async def github_callback(
    code: Optional[str] = None,
    state: Optional[str] = None,
    error: Optional[str] = None,
    error_description: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    Handle GitHub OAuth callback

    Args:
        code: Authorization code from GitHub
        state: State parameter from GitHub
        error: Error code if authorization failed
        error_description: Error description
        db: Database session

    Returns:
        Redirect to frontend with token or error
    """
    # Handle OAuth errors from GitHub
    if error:
        error_msg = error_description or error
        logger.warning(f"GitHub OAuth error: {error_msg}")
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}?error={error}&error_description={error_description or ''}",
            status_code=status.HTTP_302_FOUND,
        )

    # Validate required parameters
    if not code or not state:
        logger.error("Missing code or state in callback")
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}?error=invalid_request&error_description=Missing code or state parameter",
            status_code=status.HTTP_302_FOUND,
        )

    try:
        # Handle GitHub callback
        user, jwt_token = await AuthService.handle_github_callback(code, state, db)

        if not user or not jwt_token:
            raise Exception("Failed to authenticate user")

        # Redirect to frontend with token
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}?token={jwt_token}&user_id={user.id}",
            status_code=status.HTTP_302_FOUND,
        )

    except Exception as e:
        logger.error(f"Error in GitHub callback: {e}")
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}?error=authentication_failed&error_description={str(e)}",
            status_code=status.HTTP_302_FOUND,
        )


@router.get("/me", response_model=CurrentUserResponse)
async def get_current_user(
    current_user: dict = Depends(verify_token_dependency),
    db: Session = Depends(get_db),
):
    """
    Get current authenticated user

    Args:
        current_user: Current user from JWT token
        db: Database session

    Returns:
        Current user information
    """
    user_id = current_user.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

    user = AuthService.get_current_user(int(user_id), db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {"user": user}


@router.post("/logout", response_model=LogoutResponse)
async def logout():
    """
    Logout user

    For stateless JWT authentication, logout just returns success.
    The token should be cleared on the client side.

    Returns:
        Logout confirmation
    """
    return {"detail": "Logged out successfully"}
