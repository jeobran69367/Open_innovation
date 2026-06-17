"""
CSRF protection middleware
"""

from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.config import settings
from app.services.redis_service import redis_service
from app.core.security import validate_csrf_token


class CSRFProtectionMiddleware(BaseHTTPMiddleware):
    """CSRF protection middleware"""

    # Methods that require CSRF protection
    PROTECTED_METHODS = {"POST", "PUT", "DELETE", "PATCH"}

    # Paths that don't need CSRF protection (e.g., login endpoints)
    EXEMPT_PATHS = {
        "/api/v1/auth/github/login",
        "/api/v1/auth/github/callback",
        "/health",
        "/docs",
        "/openapi.json",
    }

    async def dispatch(self, request: Request, call_next) -> JSONResponse:
        """Handle CSRF validation"""
        
        # Skip CSRF check if disabled
        if not settings.CSRF_ENABLED:
            return await call_next(request)

        # Skip for safe methods
        if request.method not in self.PROTECTED_METHODS:
            return await call_next(request)

        # Skip for exempt paths
        if request.url.path in self.EXEMPT_PATHS:
            return await call_next(request)

        # Skip if Redis is not available
        if not redis_service.is_connected():
            return await call_next(request)

        # Get CSRF token from headers or form data
        csrf_token = None

        # Try to get from header first
        csrf_token = request.headers.get("X-CSRF-Token")

        # Try to get from cookie
        if not csrf_token:
            csrf_token = request.cookies.get("csrf_token")

        # Try to get from form data (POST, PUT, etc.)
        if not csrf_token and request.method in {"POST", "PUT", "PATCH"}:
            try:
                form_data = await request.form()
                csrf_token = form_data.get("csrf_token")
            except Exception:
                pass

        # Validate CSRF token
        if not csrf_token or not validate_csrf_token(csrf_token):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="CSRF token missing or invalid",
            )

        return await call_next(request)
