"""
Project model - SQLAlchemy ORM model for projects
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean
from app.db.session import Base


class Project(Base):
    """Project ORM model"""
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    description = Column(Text)
    url = Column(String(500), unique=True)
    repository = Column(String(500), nullable=True)
    language = Column(String(100), nullable=True)
    stars = Column(Integer, default=0)
    forks = Column(Integer, default=0)
    open_issues = Column(Integer, default=0)
    
    # Maturity and quality metrics
    maturity_score = Column(Float, default=0.0, index=True)
    quality_score = Column(Float, default=0.0)
    activity_score = Column(Float, default=0.0)
    documentation_score = Column(Float, default=0.0)
    
    # Category and metadata
    category = Column(String(100), nullable=True)
    tags = Column(String(500), nullable=True)
    last_commit_date = Column(DateTime, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Project(id={self.id}, name={self.name}, maturity_score={self.maturity_score})>"
