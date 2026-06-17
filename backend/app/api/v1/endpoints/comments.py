"""
Comments endpoints
"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class CommentCreate(BaseModel):
    """Create comment request"""
    content: str


class CommentResponse(BaseModel):
    """Comment response"""
    id: int
    content: str
    user_id: int
    created_at: str


@router.get("/{project_id}")
async def get_project_comments(project_id: int):
    """Get comments for a project"""
    # TODO: Implement comments retrieval
    return {"comments": []}


@router.post("/{project_id}")
async def add_comment(project_id: int, comment: CommentCreate):
    """Add comment to project"""
    # TODO: Implement comment creation
    return {"id": 1, "content": comment.content, "created_at": "2024-01-01T00:00:00"}
