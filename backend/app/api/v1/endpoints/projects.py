"""
Projects endpoints
"""

from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()


class ProjectResponse(BaseModel):
    """Project response model"""
    id: int
    name: str
    description: str
    language: Optional[str]
    stars: int
    url: str


@router.get("/", response_model=List[ProjectResponse])
async def list_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    """
    List projects with pagination
    
    Args:
        skip: Number of items to skip
        limit: Number of items to return
    
    Returns:
        List of projects
    """
    # TODO: Implement projects listing from database
    return [
        {
            "id": 1,
            "name": "Example Project",
            "description": "An example project",
            "language": "Python",
            "stars": 100,
            "url": "https://github.com/example/project",
        }
    ]


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: int):
    """
    Get project details
    
    Args:
        project_id: Project identifier
    
    Returns:
        Project details
    """
    # TODO: Implement project detail retrieval
    return {
        "id": project_id,
        "name": "Example Project",
        "description": "An example project",
        "language": "Python",
        "stars": 100,
        "url": "https://github.com/example/project",
    }


@router.post("/{project_id}/favorite")
async def add_to_favorites(project_id: int):
    """Add project to user favorites"""
    return {"detail": "Project added to favorites"}


@router.delete("/{project_id}/favorite")
async def remove_from_favorites(project_id: int):
    """Remove project from user favorites"""
    return {"detail": "Project removed from favorites"}
