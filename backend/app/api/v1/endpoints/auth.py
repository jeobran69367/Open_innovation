"""
Authentication endpoints
"""

from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel

from app.core.security import (
    create_access_token,
    create_refresh_token,
    verify_token,
    rotate_refresh_token,
    revoke_token,
    generate_csrf_token,
)
from app.schemas.auth import (
    TokenResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    LogoutRequest,
    CSRFTokenResponse,
)
from app.core.config import settings

router = APIRouter()


class LoginRequest(BaseModel):
    """GitHub OAuth login request"""
    code: str


@router.post("/csrf-token", response_model=CSRFTokenResponse)
async def get_csrf_token():
    """
    Get CSRF token for protected operations
    
    Returns:
        CSRF token response
    """
    csrf_token = generate_csrf_token()
    return {"csrf_token": csrf_token}


@router.post("/github/login", response_model=TokenResponse)
async def github_login(request: LoginRequest, response: Response):
    """
    Initiate GitHub OAuth login
    
    Args:
        request: Login request with GitHub authorization code
        response: Response to set cookies
    
    Returns:
        Token response with access and refresh tokens
    """
    # TODO: Implement GitHub OAuth code exchange
    # For now, returning mock response
    user_id = 1
    
    # Create tokens
    access_token = create_access_token({"sub": user_id})
    refresh_token, _, _ = create_refresh_token(user_id)
    
    # Set refresh token as httpOnly cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=settings.ENVIRONMENT == "production",
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 3600,
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    }


@router.post("/refresh", response_model=RefreshTokenResponse)
async def refresh_access_token(request: RefreshTokenRequest, response: Response):
    """
    Refresh access token using refresh token
    
    Args:
        request: Refresh token request
        response: Response to set new cookies
    
    Returns:
        New access and refresh tokens
    
    Raises:
        HTTPException: Invalid refresh token
    """
    refresh_token = request.refresh_token
    
    # Verify and rotate refresh token
    result = rotate_refresh_token(refresh_token)
    if not result:
        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token",
        )
    
    new_refresh_token, _, _ = result
    
    # Decode to get user_id
    payload = verify_token(refresh_token, token_type="refresh")
    user_id = payload.get("sub")
    
    # Create new access token
    new_access_token = create_access_token({"sub": user_id})
    
    # Set new refresh token as httpOnly cookie
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=settings.ENVIRONMENT == "production",
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 3600,
    )
    
    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    }


@router.post("/logout")
async def logout(request: LogoutRequest, response: Response):
    """
    Logout user - revoke refresh token
    
    Args:
        request: Logout request with optional refresh token
        response: Response to clear cookies
    
    Returns:
        Success message
    """
    refresh_token = request.refresh_token
    
    # Clear refresh token cookie
    response.delete_cookie("refresh_token")
    
    # Revoke refresh token if provided
    if refresh_token:
        try:
            payload = verify_token(refresh_token, token_type="refresh")
            # Add to blacklist for remaining token lifetime
            exp_timestamp = payload.get("exp", 0)
            current_timestamp = datetime.utcnow().timestamp()
            expires_in = int(exp_timestamp - current_timestamp)
            if expires_in > 0:
                revoke_token(refresh_token, expires_in)
        except Exception:
            pass
    
    return {"detail": "Logged out successfully"}


@router.get("/me")
async def get_current_user():
    """Get current authenticated user"""
    # TODO: Implement current user retrieval from token
    return {"id": 1, "username": "user", "email": "user@example.com"}
