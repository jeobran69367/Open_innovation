"""
Tests for JWT session management and authentication
"""

import pytest
from unittest.mock import patch, MagicMock
from datetime import datetime, timedelta
from jose import jwt

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    verify_token,
    revoke_token,
    rotate_refresh_token,
    generate_csrf_token,
    validate_csrf_token,
    verify_password,
    get_password_hash,
)


class TestTokenCreation:
    """Test token creation functions"""

    def test_create_access_token(self):
        """Test access token creation"""
        data = {"sub": 123}
        token = create_access_token(data)
        
        assert token is not None
        assert isinstance(token, str)
        
        # Decode and verify
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        assert payload["sub"] == 123
        assert payload["type"] == "access"
        assert "exp" in payload

    def test_create_access_token_with_custom_expiration(self):
        """Test access token creation with custom expiration"""
        data = {"sub": 123}
        expires_delta = timedelta(hours=1)
        token = create_access_token(data, expires_delta)
        
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        assert "exp" in payload

    def test_create_refresh_token(self):
        """Test refresh token creation"""
        user_id = 123
        token, family_id, token_id = create_refresh_token(user_id)
        
        assert token is not None
        assert family_id is not None
        assert token_id is not None
        
        # Decode and verify
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        assert payload["sub"] == user_id
        assert payload["type"] == "refresh"
        assert payload["family_id"] == family_id
        assert payload["token_id"] == token_id
        assert "exp" in payload

    def test_create_refresh_token_with_custom_expiration(self):
        """Test refresh token creation with custom expiration"""
        user_id = 123
        expires_delta = timedelta(days=7)
        token, family_id, token_id = create_refresh_token(user_id, expires_delta)
        
        assert token is not None
        assert family_id is not None
        assert token_id is not None


class TestTokenVerification:
    """Test token verification functions"""

    def test_verify_access_token(self):
        """Test access token verification"""
        data = {"sub": 123}
        token = create_access_token(data)
        
        payload = verify_token(token, token_type="access")
        assert payload["sub"] == 123
        assert payload["type"] == "access"

    def test_verify_refresh_token(self):
        """Test refresh token verification"""
        user_id = 123
        token, family_id, token_id = create_refresh_token(user_id)
        
        payload = verify_token(token, token_type="refresh")
        assert payload["sub"] == user_id
        assert payload["type"] == "refresh"
        assert payload["family_id"] == family_id
        assert payload["token_id"] == token_id

    def test_verify_token_wrong_type(self):
        """Test verification of token with wrong type"""
        data = {"sub": 123}
        token = create_access_token(data)
        
        with pytest.raises(Exception):
            verify_token(token, token_type="refresh")

    @patch('app.services.redis_service.redis_service.is_token_blacklisted')
    def test_verify_token_blacklisted(self, mock_blacklist):
        """Test verification of blacklisted token"""
        mock_blacklist.return_value = True
        data = {"sub": 123}
        token = create_access_token(data)
        
        with pytest.raises(Exception):
            verify_token(token, token_type="access")

    def test_verify_invalid_token(self):
        """Test verification of invalid token"""
        with pytest.raises(Exception):
            verify_token("invalid_token", token_type="access")


class TestTokenRevocation:
    """Test token revocation functions"""

    @patch('app.services.redis_service.redis_service.blacklist_token')
    def test_revoke_token(self, mock_blacklist):
        """Test token revocation"""
        mock_blacklist.return_value = True
        token = "test_token"
        expires_in = 3600
        
        result = revoke_token(token, expires_in)
        assert result is True
        mock_blacklist.assert_called_once_with(token, expires_in)


class TestTokenRotation:
    """Test token rotation functions"""

    @patch('app.services.redis_service.redis_service.get_refresh_token_family')
    @patch('app.services.redis_service.redis_service.store_refresh_token_family')
    def test_rotate_refresh_token(self, mock_store, mock_get):
        """Test refresh token rotation"""
        user_id = 123
        token, family_id, token_id = create_refresh_token(user_id)
        
        # Mock the family lookup to return the current token_id
        mock_get.return_value = token_id
        mock_store.return_value = True
        
        result = rotate_refresh_token(token)
        assert result is not None
        new_token, new_family_id, new_token_id = result
        
        # Verify new token is different from old token
        assert new_token != token
        
        # Decode and verify
        payload = jwt.decode(
            new_token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        assert payload["sub"] == user_id
        assert payload["type"] == "refresh"

    @patch('app.services.redis_service.redis_service.get_refresh_token_family')
    @patch('app.services.redis_service.redis_service.revoke_refresh_token_family')
    def test_rotate_refresh_token_reuse_detected(self, mock_revoke, mock_get):
        """Test refresh token rotation with reuse detection"""
        user_id = 123
        token, family_id, token_id = create_refresh_token(user_id)
        
        # Mock the family lookup to return a different token_id (reuse detected)
        mock_get.return_value = "different_token_id"
        mock_revoke.return_value = True
        
        with pytest.raises(Exception):
            rotate_refresh_token(token)
        
        # Verify family was revoked
        mock_revoke.assert_called_once()

    def test_rotate_invalid_token(self):
        """Test refresh token rotation with invalid token"""
        result = rotate_refresh_token("invalid_token")
        assert result is None


class TestCSRFToken:
    """Test CSRF token functions"""

    @patch('app.services.redis_service.redis_service.store_csrf_token')
    def test_generate_csrf_token(self, mock_store):
        """Test CSRF token generation"""
        mock_store.return_value = True
        
        csrf_token = generate_csrf_token()
        
        assert csrf_token is not None
        assert isinstance(csrf_token, str)
        assert len(csrf_token) > 0
        mock_store.assert_called_once()

    @patch('app.services.redis_service.redis_service.validate_csrf_token')
    def test_validate_csrf_token(self, mock_validate):
        """Test CSRF token validation"""
        mock_validate.return_value = True
        
        result = validate_csrf_token("test_csrf_token")
        assert result is True
        mock_validate.assert_called_once_with("test_csrf_token")

    @patch('app.services.redis_service.redis_service.validate_csrf_token')
    def test_validate_csrf_token_invalid(self, mock_validate):
        """Test CSRF token validation with invalid token"""
        mock_validate.return_value = False
        
        result = validate_csrf_token("invalid_csrf_token")
        assert result is False


class TestPasswordHashing:
    """Test password hashing functions"""

    def test_hash_password(self):
        """Test password hashing"""
        password = "test_password"
        hashed = get_password_hash(password)
        
        assert hashed is not None
        assert hashed != password

    def test_verify_password_correct(self):
        """Test correct password verification"""
        password = "test_password"
        hashed = get_password_hash(password)
        
        result = verify_password(password, hashed)
        assert result is True

    def test_verify_password_incorrect(self):
        """Test incorrect password verification"""
        password = "test_password"
        hashed = get_password_hash(password)
        
        result = verify_password("wrong_password", hashed)
        assert result is False


class TestConfigurationValues:
    """Test configuration values"""

    def test_access_token_expiration(self):
        """Test that access token expires in 15 minutes"""
        assert settings.ACCESS_TOKEN_EXPIRE_MINUTES == 15

    def test_refresh_token_expiration(self):
        """Test that refresh token expires in 30 days"""
        assert settings.REFRESH_TOKEN_EXPIRE_DAYS == 30

    def test_algorithm(self):
        """Test that algorithm is HS256"""
        assert settings.ALGORITHM == "HS256"

    def test_csrf_token_expiration(self):
        """Test that CSRF token expires in 1 hour"""
        assert settings.CSRF_TOKEN_EXPIRE_HOURS == 1
