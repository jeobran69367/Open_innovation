"""
Redis service for session management and token blacklist
"""

import redis
from datetime import datetime, timedelta
from typing import Optional
from app.core.config import settings


class RedisService:
    """Service for managing Redis operations including token blacklist"""

    def __init__(self):
        """Initialize Redis connection"""
        try:
            self.redis_client = redis.from_url(settings.REDIS_URL)
            self.redis_client.ping()
        except Exception as e:
            print(f"Warning: Redis connection failed: {e}")
            self.redis_client = None

    def is_connected(self) -> bool:
        """Check if Redis is connected"""
        return self.redis_client is not None

    def blacklist_token(self, token: str, expires_in_seconds: int) -> bool:
        """
        Add token to blacklist
        
        Args:
            token: JWT token to blacklist
            expires_in_seconds: Token expiration time in seconds
        
        Returns:
            True if successful, False otherwise
        """
        if not self.is_connected():
            return False

        try:
            key = f"blacklist:token:{token}"
            self.redis_client.setex(
                key,
                expires_in_seconds,
                "revoked"
            )
            return True
        except Exception as e:
            print(f"Error blacklisting token: {e}")
            return False

    def is_token_blacklisted(self, token: str) -> bool:
        """
        Check if token is blacklisted
        
        Args:
            token: JWT token to check
        
        Returns:
            True if token is blacklisted, False otherwise
        """
        if not self.is_connected():
            return False

        try:
            key = f"blacklist:token:{token}"
            return self.redis_client.exists(key) == 1
        except Exception as e:
            print(f"Error checking token blacklist: {e}")
            return False

    def store_refresh_token_family(self, user_id: int, family_id: str, token_id: str, expires_in_seconds: int) -> bool:
        """
        Store refresh token family for rotation tracking
        
        Args:
            user_id: User ID
            family_id: Refresh token family ID (for rotation detection)
            token_id: Unique token ID
            expires_in_seconds: Token expiration time in seconds
        
        Returns:
            True if successful, False otherwise
        """
        if not self.is_connected():
            return False

        try:
            key = f"refresh_token_family:user:{user_id}:{family_id}"
            self.redis_client.setex(
                key,
                expires_in_seconds,
                token_id
            )
            return True
        except Exception as e:
            print(f"Error storing refresh token family: {e}")
            return False

    def get_refresh_token_family(self, user_id: int, family_id: str) -> Optional[str]:
        """
        Get refresh token family info
        
        Args:
            user_id: User ID
            family_id: Refresh token family ID
        
        Returns:
            Token ID if exists, None otherwise
        """
        if not self.is_connected():
            return None

        try:
            key = f"refresh_token_family:user:{user_id}:{family_id}"
            return self.redis_client.get(key)
        except Exception as e:
            print(f"Error getting refresh token family: {e}")
            return None

    def revoke_refresh_token_family(self, user_id: int, family_id: str) -> bool:
        """
        Revoke all tokens in a refresh token family (for logout)
        
        Args:
            user_id: User ID
            family_id: Refresh token family ID
        
        Returns:
            True if successful, False otherwise
        """
        if not self.is_connected():
            return False

        try:
            key = f"refresh_token_family:user:{user_id}:{family_id}"
            self.redis_client.delete(key)
            return True
        except Exception as e:
            print(f"Error revoking refresh token family: {e}")
            return False

    def store_csrf_token(self, csrf_token: str, expires_in_seconds: int) -> bool:
        """
        Store CSRF token for validation
        
        Args:
            csrf_token: CSRF token
            expires_in_seconds: Token expiration time in seconds
        
        Returns:
            True if successful, False otherwise
        """
        if not self.is_connected():
            return False

        try:
            key = f"csrf_token:{csrf_token}"
            self.redis_client.setex(
                key,
                expires_in_seconds,
                "valid"
            )
            return True
        except Exception as e:
            print(f"Error storing CSRF token: {e}")
            return False

    def validate_csrf_token(self, csrf_token: str) -> bool:
        """
        Validate CSRF token
        
        Args:
            csrf_token: CSRF token to validate
        
        Returns:
            True if valid, False otherwise
        """
        if not self.is_connected():
            return False

        try:
            key = f"csrf_token:{csrf_token}"
            exists = self.redis_client.exists(key) == 1
            if exists:
                # Delete after validation (one-time use)
                self.redis_client.delete(key)
            return exists
        except Exception as e:
            print(f"Error validating CSRF token: {e}")
            return False


# Global Redis service instance
redis_service = RedisService()
