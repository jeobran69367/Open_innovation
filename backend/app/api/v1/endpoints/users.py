"""
Users endpoints
"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class UserResponse(BaseModel):
    """User response model"""
    id: int
    username: str
    email: str
    avatar_url: str


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    """Get user profile"""
    # TODO: Implement user profile retrieval
    return {
        "id": user_id,
        "username": "example_user",
        "email": "user@example.com",
        "avatar_url": "https://example.com/avatar.jpg",
    }


@router.get("/{user_id}/favorites")
async def get_user_favorites(user_id: int):
    """Get user favorite projects"""
    # TODO: Implement favorites retrieval
    return {"favorites": []}
