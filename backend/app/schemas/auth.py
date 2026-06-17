"""
Authentication schemas
"""

from pydantic import BaseModel


class TokenResponse(BaseModel):
    """Token response with access and refresh tokens"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class RefreshTokenRequest(BaseModel):
    """Refresh token request"""
    refresh_token: str


class RefreshTokenResponse(BaseModel):
    """Refresh token response"""
    access_token: str
    refresh_token: str
    expires_in: int


class LogoutRequest(BaseModel):
    """Logout request"""
    refresh_token: str | None = None


class CSRFTokenResponse(BaseModel):
    """CSRF token response"""
    csrf_token: str


class CurrentUserResponse(BaseModel):
    """Current user response"""
    user_id: int
