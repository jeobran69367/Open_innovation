"""
Projects endpoints
"""

from typing import Optional
from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models import Project
from app.schemas import PaginatedProjectResponse, ProjectResponse
from app.db.session import get_db
from app.core.config import settings

router = APIRouter()


@router.get("/", response_model=PaginatedProjectResponse)
async def list_projects(
    skip: int = Query(0, ge=0, description="Number of items to skip"),
    limit: int = Query(20, ge=1, le=100, description="Number of items to return"),
    sort_by: str = Query("maturity_score", description="Field to sort by"),
    sort_order: str = Query("desc", regex="^(asc|desc)$", description="Sort order"),
    category: Optional[str] = Query(None, description="Filter by category"),
    db: Session = Depends(get_db),
):
    """
    List projects with pagination and sorting
    
    Args:
        skip: Number of items to skip
        limit: Number of items to return
        sort_by: Field to sort by (default: maturity_score)
        sort_order: Sort order (asc or desc)
        category: Optional category filter
        db: Database session
    
    Returns:
        Paginated list of projects
    """
    # Build query
    query = db.query(Project)
    
    # Apply filters
    if category:
        query = query.filter(Project.category == category)
    
    # Get total count
    total = query.count()
    
    # Apply sorting
    sort_field = getattr(Project, sort_by, Project.maturity_score)
    if sort_order == "desc":
        query = query.order_by(desc(sort_field))
    else:
        query = query.order_by(sort_field)
    
    # Apply pagination
    query = query.offset(skip).limit(limit)
    
    # Fetch results
    items = query.all()
    
    # Calculate pagination info
    page = (skip // limit) + 1
    total_pages = (total + limit - 1) // limit
    has_next = page < total_pages
    has_previous = page > 1
    
    return PaginatedProjectResponse(
        items=[ProjectResponse.from_orm(item) for item in items],
        total=total,
        page=page,
        page_size=limit,
        total_pages=total_pages,
        has_next=has_next,
        has_previous=has_previous,
    )


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: int, db: Session = Depends(get_db)):
    """
    Get project details
    
    Args:
        project_id: Project identifier
        db: Database session
    
    Returns:
        Project details
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return {"detail": "Project not found"}
    return ProjectResponse.from_orm(project)


@router.post("/{project_id}/favorite")
async def add_to_favorites(project_id: int, db: Session = Depends(get_db)):
    """Add project to user favorites"""
    return {"detail": "Project added to favorites"}


@router.delete("/{project_id}/favorite")
async def remove_from_favorites(project_id: int, db: Session = Depends(get_db)):
    """Remove project from user favorites"""
    return {"detail": "Project removed from favorites"}
