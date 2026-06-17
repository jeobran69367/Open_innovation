"""
Security utilities - Authentication and Authorization
"""

import secrets
import uuid
from datetime import datetime, timedelta
from typing import Optional, Union
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials

from app.core.config import settings
from app.services.redis_service import redis_service

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Security scheme
security = HTTPBearer()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash password"""
    return pwd_context.hash(password)


def create_access_token(
    data: dict,
    expires_delta: Optional[timedelta] = None,
) -> str:
    """
    Create JWT access token
    
    Args:
        data: Token data
        expires_delta: Token expiration time
    
    Returns:
        Encoded JWT token
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
    
    return encoded_jwt


def create_refresh_token(
    user_id: int,
    expires_delta: Optional[timedelta] = None,
) -> tuple:
    """
    Create JWT refresh token with rotation support
    
    Args:
        user_id: User ID
        expires_delta: Token expiration time
    
    Returns:
        Tuple of (encoded_jwt, family_id, token_id)
    """
    # Generate unique IDs for token rotation tracking
    family_id = str(uuid.uuid4())
    token_id = str(uuid.uuid4())
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS
        )
    
    payload = {
        "sub": user_id,
        "exp": expire,
        "type": "refresh",
        "family_id": family_id,
        "token_id": token_id,
    }
    
    encoded_jwt = jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
    
    # Store token family for rotation detection
    expires_in_seconds = int((expire - datetime.utcnow()).total_seconds())
    redis_service.store_refresh_token_family(user_id, family_id, token_id, expires_in_seconds)
    
    return encoded_jwt, family_id, token_id


def verify_token(token: str, token_type: str = "access") -> dict:
    """
    Verify JWT token
    
    Args:
        token: JWT token
        token_type: Type of token (access or refresh)
    
    Returns:
        Token payload
    
    Raises:
        HTTPException: Invalid token
    """
    try:
        # Check if token is blacklisted
        if redis_service.is_token_blacklisted(token):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been revoked",
            )
        
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        
        # Verify token type
        if payload.get("type") != token_type:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token type. Expected {token_type}",
            )
        
        return payload
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        ) from e


def revoke_token(token: str, expires_in: int) -> bool:
    """
    Revoke a token by adding it to blacklist
    
    Args:
        token: JWT token to revoke
        expires_in: Seconds until token expires
    
    Returns:
        True if successful, False otherwise
    """
    return redis_service.blacklist_token(token, expires_in)


def rotate_refresh_token(
    refresh_token: str,
) -> Union[tuple, None]:
    """
    Rotate refresh token - issue new token and invalidate old family if needed
    
    Args:
        refresh_token: Current refresh token
    
    Returns:
        Tuple of (new_token, family_id, token_id) or None if rotation failed
    """
    try:
        # Verify the refresh token (but don't check type yet)
        payload = jwt.decode(
            refresh_token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        
        if payload.get("type") != "refresh":
            return None
        
        user_id = payload.get("sub")
        family_id = payload.get("family_id")
        current_token_id = payload.get("token_id")
        
        if not all([user_id, family_id, current_token_id]):
            return None
        
        # Check if this family has been revoked (token reuse detection)
        stored_token_id = redis_service.get_refresh_token_family(user_id, family_id)
        if stored_token_id != current_token_id:
            # Token reuse detected - revoke entire family
            redis_service.revoke_refresh_token_family(user_id, family_id)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token reuse detected. Please login again.",
            )
        
        # Create new refresh token
        new_token, new_family_id, new_token_id = create_refresh_token(user_id)
        
        return new_token, new_family_id, new_token_id
    
    except JWTError:
        return None


def generate_csrf_token() -> str:
    """
    Generate a CSRF token
    
    Returns:
        CSRF token
    """
    csrf_token = secrets.token_urlsafe(32)
    
    # Store in Redis for validation
    expires_in_seconds = settings.CSRF_TOKEN_EXPIRE_HOURS * 3600
    redis_service.store_csrf_token(csrf_token, expires_in_seconds)
    
    return csrf_token


def validate_csrf_token(csrf_token: str) -> bool:
    """
    Validate CSRF token
    
    Args:
        csrf_token: CSRF token to validate
    
    Returns:
        True if valid, False otherwise
    """
    return redis_service.validate_csrf_token(csrf_token)


async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security),
):
    """
    Get current authenticated user from token
    
    Args:
        credentials: HTTP ******
    
    Returns:
        User data from token
    
    Raises:
        HTTPException: Invalid credentials
    """
    token = credentials.credentials
    payload = verify_token(token, token_type="access")
    user_id = payload.get("sub")
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
    
    return {"user_id": user_id}
