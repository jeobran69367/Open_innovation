"""
Projects endpoints
"""

from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()


class ProjectResponse(BaseModel):
    """Project response model"""
    id: int
    name: str
    description: str
    language: Optional[str] = None
    stars: int
    forks: int
    url: str
    license: Optional[str] = None
    maturityLevel: Optional[str] = None
    qualityScore: Optional[int] = None
    category: Optional[str] = None
    aiSummary: Optional[str] = None
    readme: Optional[str] = None
    lastUpdated: Optional[str] = None
    commitsCount: Optional[int] = None
    releasesCount: Optional[int] = None


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
            "forks": 10,
            "url": "https://github.com/example/project",
            "license": "MIT",
            "maturityLevel": "Stable",
            "qualityScore": 85,
            "category": "Web Development",
            "aiSummary": "This is an example project showing the structure of the platform.",
            "readme": "# Example Project\n\nThis is a sample README.",
            "lastUpdated": datetime.now().isoformat(),
            "commitsCount": 1500,
            "releasesCount": 20,
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
        "description": "An example project showing the structure of the platform",
        "language": "Python",
        "stars": 100,
        "forks": 10,
        "url": "https://github.com/example/project",
        "license": "MIT",
        "maturityLevel": "Stable",
        "qualityScore": 85,
        "category": "Web Development",
        "aiSummary": "This is an example project that demonstrates the capabilities of the Open Innovation platform. It includes features for discovering mature open source projects with AI-powered analysis.",
        "readme": "# Example Project\n\nThis is an example open source project.\n\n## Features\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Installation\nFollow the standard installation steps.",
        "lastUpdated": datetime.now().isoformat(),
        "commitsCount": 1500,
        "releasesCount": 20,
    }


@router.post("/{project_id}/favorite")
async def add_to_favorites(project_id: int):
    """Add project to user favorites"""
    return {"detail": "Project added to favorites"}


@router.delete("/{project_id}/favorite")
async def remove_from_favorites(project_id: int):
    """Remove project from user favorites"""
    return {"detail": "Project removed from favorites"}
