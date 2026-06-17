"""
Comments endpoints
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter()


class UserInfo(BaseModel):
    """User info for comments"""
    id: int
    username: str


class CommentCreate(BaseModel):
    """Create comment request"""
    content: str


class CommentResponse(BaseModel):
    """Comment response"""
    id: int
    content: str
    userId: int
    projectId: int
    createdAt: str
    user: UserInfo = None
    likes: int = 0


@router.get("/{project_id}", response_model=List[CommentResponse])
async def get_project_comments(project_id: int):
    """Get comments for a project"""
    # TODO: Implement comments retrieval from database
    return [
        {
            "id": 1,
            "content": "Great project! Very useful for developers.",
            "userId": 1,
            "projectId": project_id,
            "createdAt": datetime.now().isoformat(),
            "user": {"id": 1, "username": "developer1"},
            "likes": 5,
        },
        {
            "id": 2,
            "content": "Excellent documentation and active community.",
            "userId": 2,
            "projectId": project_id,
            "createdAt": datetime.now().isoformat(),
            "user": {"id": 2, "username": "contributor2"},
            "likes": 3,
        },
    ]


@router.post("/{project_id}", response_model=CommentResponse)
async def add_comment(project_id: int, comment: CommentCreate):
    """Add comment to project"""
    # TODO: Implement comment creation in database
    return {
        "id": 3,
        "content": comment.content,
        "userId": 1,
        "projectId": project_id,
        "createdAt": datetime.now().isoformat(),
        "user": {"id": 1, "username": "current_user"},
        "likes": 0,
    }
