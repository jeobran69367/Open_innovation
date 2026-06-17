"""
Configuration settings for the application
"""

from typing import List
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """
    Application settings - loads from environment variables
    """

    # ========================================================================
    # Basic Settings
    # ========================================================================
    API_VERSION: str = "v1"
    API_TITLE: str = "Open Innovation API"
    API_DESCRIPTION: str = "Intelligent open source discovery platform"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    # ========================================================================
    # Database
    # ========================================================================
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/open_innovation"
    DB_ECHO: bool = False
    DB_POOL_SIZE: int = 20
    DB_MAX_OVERFLOW: int = 10

    # ========================================================================
    # Redis
    # ========================================================================
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_TTL: int = 3600

    # ========================================================================
    # Security
    # ========================================================================
    SECRET_KEY: str = ""
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    ALGORITHM: str = "HS256"

    # ========================================================================
    # GitHub OAuth
    # ========================================================================
    GITHUB_CLIENT_ID: str = ""
    GITHUB_CLIENT_SECRET: str = ""
    GITHUB_OAUTH_REDIRECT_URI: str = "http://localhost:8000/api/v1/auth/github/callback"

    # ========================================================================
    # GitHub API
    # ========================================================================
    GITHUB_API_TOKEN: str = ""
    GITHUB_API_BASE_URL: str = "https://api.github.com"

    # ========================================================================
    # OpenAI
    # ========================================================================
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o"
    OPENAI_MAX_TOKENS: int = 2000

    # ========================================================================
    # Qdrant (Vector Database)
    # ========================================================================
    QDRANT_URL: str = "http://localhost:6333"
    QDRANT_API_KEY: str = ""

    # ========================================================================
    # LangChain
    # ========================================================================
    LANGCHAIN_TRACING_V2: bool = False
    LANGCHAIN_ENDPOINT: str = ""

    # ========================================================================
    # Celery
    # ========================================================================
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"

    # ========================================================================
    # Email
    # ========================================================================
    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SENDER_EMAIL: str = ""

    # ========================================================================
    # Logging
    # ========================================================================
    LOG_LEVEL: str = "INFO"

    # ========================================================================
    # CORS & Security
    # ========================================================================
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    ALLOWED_HOSTS: List[str] = ["localhost", "127.0.0.1"]
    FRONTEND_URL: str = "http://localhost:3000"

    # ========================================================================
    # Business Settings
    # ========================================================================
    MIN_GITHUB_STARS: int = 10
    MIN_QUALITY_SCORE: float = 0.5
    ITEMS_PER_PAGE: int = 20
    MAX_SEARCH_RESULTS: int = 100

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """
    Get settings instance (cached)
    
    Returns:
        Settings: Application settings
    """
    return Settings()


settings = get_settings()
