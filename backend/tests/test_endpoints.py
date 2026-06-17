"""
Tests for authentication endpoints
"""

import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient

from app.main import app
from app.core.config import settings


@pytest.fixture
def client():
    """Create test client"""
    return TestClient(app)


class TestAuthEndpoints:
    """Test authentication endpoints"""

    @patch('app.services.redis_service.redis_service.store_csrf_token')
    def test_get_csrf_token(self, mock_store, client):
        """Test CSRF token endpoint"""
        mock_store.return_value = True
        
        response = client.post("/api/v1/auth/csrf-token")
        
        assert response.status_code == 200
        assert "csrf_token" in response.json()
        assert response.json()["csrf_token"] is not None

    @patch('app.services.redis_service.redis_service.store_refresh_token_family')
    def test_github_login(self, mock_store, client):
        """Test GitHub login endpoint"""
        mock_store.return_value = True
        
        response = client.post(
            "/api/v1/auth/github/login",
            json={"code": "test_code"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["token_type"] == "bearer"
        assert data["expires_in"] == settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60

    @patch('app.services.redis_service.redis_service.store_refresh_token_family')
    @patch('app.services.redis_service.redis_service.get_refresh_token_family')
    def test_refresh_token(self, mock_get, mock_store, client):
        """Test refresh token endpoint"""
        mock_store.return_value = True
        
        # First, get a refresh token
        login_response = client.post(
            "/api/v1/auth/github/login",
            json={"code": "test_code"}
        )
        
        refresh_token = login_response.json()["refresh_token"]
        
        # Decode the token to get family_id and token_id
        from jose import jwt
        payload = jwt.decode(
            refresh_token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        mock_get.return_value = payload["token_id"]
        
        # Now refresh the token
        response = client.post(
            "/api/v1/auth/refresh",
            json={"refresh_token": refresh_token}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["expires_in"] == settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60

    def test_logout(self, client):
        """Test logout endpoint"""
        response = client.post(
            "/api/v1/auth/logout",
            json={}
        )
        
        assert response.status_code == 200
        assert response.json()["detail"] == "Logged out successfully"

    def test_get_current_user(self, client):
        """Test get current user endpoint"""
        response = client.get("/api/v1/auth/me")
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert "username" in data
        assert "email" in data
