"""
API Schemas - Pydantic models for request/response validation
"""

from typing import List, TypeVar, Generic, Optional
from datetime import datetime
from pydantic import BaseModel, Field

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    """Generic paginated response wrapper"""
    items: List[T]
    total: int = Field(..., description="Total number of items")
    page: int = Field(..., ge=1, description="Current page number")
    page_size: int = Field(..., ge=1, description="Items per page")
    total_pages: int = Field(..., ge=0, description="Total number of pages")
    has_next: bool = Field(..., description="Whether there is a next page")
    has_previous: bool = Field(..., description="Whether there is a previous page")


class ProjectResponse(BaseModel):
    """Project response model"""
    id: int
    name: str
    description: str
    url: str
    repository: Optional[str] = None
    language: Optional[str] = None
    stars: int
    forks: int
    open_issues: int
    maturity_score: float
    quality_score: float
    activity_score: float
    documentation_score: float
    category: Optional[str] = None
    tags: Optional[str] = None
    last_commit_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PaginatedProjectResponse(BaseModel):
    """Paginated response for projects"""
    items: List[ProjectResponse]
    total: int = Field(..., description="Total number of items")
    page: int = Field(..., ge=1, description="Current page number")
    page_size: int = Field(..., ge=1, description="Items per page")
    total_pages: int = Field(..., ge=0, description="Total number of pages")
    has_next: bool = Field(..., description="Whether there is a next page")
    has_previous: bool = Field(..., description="Whether there is a previous page")
