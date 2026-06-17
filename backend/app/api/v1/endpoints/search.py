"""
Search endpoints (RAG-powered)
"""

from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import List, Optional, Literal

router = APIRouter()


class SearchResult(BaseModel):
    """Search result item"""
    project_id: int
    name: str
    relevance_score: float
    reason: str


class AutocompleteSuggestion(BaseModel):
    """Autocomplete suggestion item"""
    type: Literal["project", "category"]
    label: str
    value: str
    description: Optional[str] = None


@router.get("/", response_model=List[SearchResult])
async def semantic_search(
    q: str = Query(..., min_length=1, max_length=500),
    limit: int = Query(10, ge=1, le=50),
):
    """
    Semantic search using RAG (Retrieval-Augmented Generation)
    
    Args:
        q: Search query
        limit: Number of results to return
    
    Returns:
        List of relevant projects with reasoning
    """
    # TODO: Implement RAG-powered search
    return [
        {
            "project_id": 1,
            "name": "Example Project",
            "relevance_score": 0.95,
            "reason": "Matches your search criteria for Python testing libraries",
        }
    ]


@router.get("/autocomplete", response_model=List[AutocompleteSuggestion])
async def search_autocomplete(q: str = Query(..., min_length=1)):
    """Get search suggestions for projects and categories"""
    # TODO: Implement autocomplete with database queries
    # For now, return mock suggestions
    
    # Mock projects
    projects = [
        {
            "type": "project",
            "label": "pytest",
            "value": "pytest",
            "description": "Testing framework for Python",
        },
        {
            "type": "project",
            "label": "Django",
            "value": "django",
            "description": "Web framework for Python",
        },
    ]
    
    # Mock categories
    categories = [
        {
            "type": "category",
            "label": "Testing",
            "value": "testing",
            "description": "Test frameworks and tools",
        },
        {
            "type": "category",
            "label": "Web Development",
            "value": "web-development",
            "description": "Web frameworks and libraries",
        },
    ]
    
    # Filter by query (simple substring match)
    filtered_projects = [
        p for p in projects
        if q.lower() in p["label"].lower() or q.lower() in p.get("description", "").lower()
    ]
    filtered_categories = [
        c for c in categories
        if q.lower() in c["label"].lower() or q.lower() in c.get("description", "").lower()
    ]
    
    # Return projects first, then categories, limit to 10 total
    return filtered_projects + filtered_categories

