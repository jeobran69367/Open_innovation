"""
Tests for GitHub OAuth implementation
"""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.services.auth import AuthService
from app.services.github.oauth import GitHubOAuthService
from app.services.user import UserService

client = TestClient(app)


class TestAuthServiceStateMethods:
    """Tests for AuthService state generation"""

    def test_generate_oauth_state(self):
        """Test OAuth state generation"""
        state = AuthService.generate_oauth_state()
        assert state is not None
        assert isinstance(state, str)
        assert len(state) > 0

    def test_generate_oauth_state_uniqueness(self):
        """Test that generated states are unique"""
        state1 = AuthService.generate_oauth_state()
        state2 = AuthService.generate_oauth_state()
        assert state1 != state2

    def test_get_github_authorization_url(self):
        """Test GitHub authorization URL generation"""
        state = "test_state"
        url = AuthService.get_github_authorization_url(state)

        assert "https://github.com/login/oauth/authorize" in url
        assert "client_id=" in url
        assert "scope=" in url
        assert "state=" in url
        # URL encoded versions
        assert "read%3Auser" in url or "read:user" in url
        assert "user%3Aemail" in url or "user:email" in url


class TestGitHubOAuthService:
    """Tests for GitHubOAuthService"""

    def test_get_authorization_url(self):
        """Test authorization URL generation"""
        state = "test_state"
        url = GitHubOAuthService.get_authorization_url(state)

        assert "https://github.com/login/oauth/authorize" in url
        assert state in url
        # URL encoded versions
        assert "read%3Auser" in url or "read:user" in url
        assert "user%3Aemail" in url or "user:email" in url

    @pytest.mark.asyncio
    async def test_exchange_code_for_token_error(self):
        """Test code exchange with missing code"""
        with pytest.raises(ValueError, match="Authorization code is required"):
            await GitHubOAuthService.exchange_code_for_token("")

    @pytest.mark.asyncio
    async def test_get_user_profile_error(self):
        """Test user profile fetch with missing token"""
        with pytest.raises(ValueError, match="Access token is required"):
            await GitHubOAuthService.get_user_profile("")


class TestEndpoints:
    """Tests for authentication endpoints"""

    def test_get_github_endpoint(self):
        """Test GET /auth/github endpoint"""
        response = client.get("/api/v1/auth/github", headers={"Host": "localhost"})
        assert response.status_code == 200
        data = response.json()
        assert "authorization_url" in data
        assert "https://github.com/login/oauth/authorize" in data["authorization_url"]

    def test_logout_endpoint(self):
        """Test POST /auth/logout endpoint"""
        response = client.post("/api/v1/auth/logout", headers={"Host": "localhost"})
        assert response.status_code == 200
        data = response.json()
        assert data["detail"] == "Logged out successfully"

    def test_callback_endpoint_missing_code(self):
        """Test callback endpoint with missing code"""
        response = client.get(
            "/api/v1/auth/github/callback?state=test_state",
            headers={"Host": "localhost"},
            follow_redirects=False,
        )
        assert response.status_code == 302  # Redirect
        assert "error=" in response.headers["location"]

    def test_callback_endpoint_missing_state(self):
        """Test callback endpoint with missing state"""
        response = client.get(
            "/api/v1/auth/github/callback?code=test_code",
            headers={"Host": "localhost"},
            follow_redirects=False,
        )
        assert response.status_code == 302  # Redirect
        assert "error=" in response.headers["location"]

    def test_callback_endpoint_with_error(self):
        """Test callback endpoint when user denies OAuth"""
        response = client.get(
            "/api/v1/auth/github/callback?error=access_denied&error_description=User+denied+access",
            headers={"Host": "localhost"},
            follow_redirects=False,
        )
        assert response.status_code == 302  # Redirect
        assert "error=access_denied" in response.headers["location"]

    def test_me_endpoint_without_token(self):
        """Test GET /auth/me without authentication"""
        response = client.get("/api/v1/auth/me", headers={"Host": "localhost"})
        # Will fail because no ****** provided
        assert response.status_code in [401, 403]

    def test_me_endpoint_with_invalid_token(self):
        """Test GET /auth/me with invalid token"""
        headers = {"Host": "localhost", "Authorization": "******"}
        response = client.get("/api/v1/auth/me", headers=headers)
        # HTTPBearer returns 403 for invalid credentials
        assert response.status_code in [401, 403]


class TestUserService:
    """Tests for UserService"""

    def test_user_service_methods_exist(self):
        """Test that UserService has required methods"""
        assert hasattr(UserService, "get_user_by_github_id")
        assert hasattr(UserService, "get_user_by_id")
        assert hasattr(UserService, "get_user_by_username")
        assert hasattr(UserService, "get_user_by_email")
        assert hasattr(UserService, "create_user")
        assert hasattr(UserService, "update_user")
        assert hasattr(UserService, "create_or_update_user")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
