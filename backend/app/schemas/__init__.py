"""
Schemas package initialization
"""

from app.schemas.user import UserCreate, UserUpdate, UserResponse, UserInDB
from app.schemas.auth import (
    AuthorizationUrlResponse,
    TokenResponse,
    CurrentUserResponse,
    LogoutResponse,
    OAuthErrorResponse,
)

__all__ = [
    "UserCreate",
    "UserUpdate",
    "UserResponse",
    "UserInDB",
    "AuthorizationUrlResponse",
    "TokenResponse",
    "CurrentUserResponse",
    "LogoutResponse",
    "OAuthErrorResponse",
]
