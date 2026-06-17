"""
User schemas
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class UserCreate(BaseModel):
    """User creation schema"""

    github_id: int
    username: str
    email: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None


class UserUpdate(BaseModel):
    """User update schema"""

    email: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None


class UserResponse(BaseModel):
    """User response schema"""

    id: int
    github_id: int
    username: str
    email: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class UserInDB(UserResponse):
    """User in database schema"""

    pass
