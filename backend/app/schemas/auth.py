"""
Authentication schemas
"""

from typing import Optional
from pydantic import BaseModel
from app.schemas.user import UserResponse


class AuthorizationUrlResponse(BaseModel):
    """GitHub authorization URL response"""

    authorization_url: str


class TokenResponse(BaseModel):
    """Token response"""

    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class CurrentUserResponse(BaseModel):
    """Current user response"""

    user: UserResponse


class LogoutResponse(BaseModel):
    """Logout response"""

    detail: str = "Logged out successfully"


class OAuthErrorResponse(BaseModel):
    """OAuth error response"""

    detail: str
    error: Optional[str] = None
