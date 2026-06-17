"""
User service
"""

from typing import Optional
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class UserService:
    """Service for user database operations"""

    @staticmethod
    def get_user_by_github_id(db: Session, github_id: int) -> Optional[User]:
        """
        Get user by GitHub ID

        Args:
            db: Database session
            github_id: GitHub user ID

        Returns:
            User object or None
        """
        return db.query(User).filter(User.github_id == github_id).first()

    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
        """
        Get user by ID

        Args:
            db: Database session
            user_id: User ID

        Returns:
            User object or None
        """
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def get_user_by_username(db: Session, username: str) -> Optional[User]:
        """
        Get user by username

        Args:
            db: Database session
            username: GitHub username

        Returns:
            User object or None
        """
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        """
        Get user by email

        Args:
            db: Database session
            email: User email

        Returns:
            User object or None
        """
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def create_user(db: Session, user_data: UserCreate) -> User:
        """
        Create new user

        Args:
            db: Database session
            user_data: User creation data

        Returns:
            Created User object
        """
        db_user = User(
            github_id=user_data.github_id,
            username=user_data.username,
            email=user_data.email,
            avatar_url=user_data.avatar_url,
            bio=user_data.bio,
            location=user_data.location,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def update_user(db: Session, user: User, user_data: UserUpdate) -> User:
        """
        Update user

        Args:
            db: Database session
            user: User object to update
            user_data: User update data

        Returns:
            Updated User object
        """
        update_data = user_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def create_or_update_user(db: Session, github_profile: dict) -> User:
        """
        Create or update user from GitHub profile

        Args:
            db: Database session
            github_profile: GitHub user profile data

        Returns:
            User object (created or updated)
        """
        github_id = github_profile.get("id")
        username = github_profile.get("login")
        email = github_profile.get("email")

        # Get existing user by GitHub ID
        existing_user = UserService.get_user_by_github_id(db, github_id)

        if existing_user:
            # Update existing user
            update_data = UserUpdate(
                email=email,
                avatar_url=github_profile.get("avatar_url"),
                bio=github_profile.get("bio"),
                location=github_profile.get("location"),
            )
            return UserService.update_user(db, existing_user, update_data)
        else:
            # Create new user
            user_data = UserCreate(
                github_id=github_id,
                username=username,
                email=email,
                avatar_url=github_profile.get("avatar_url"),
                bio=github_profile.get("bio"),
                location=github_profile.get("location"),
            )
            return UserService.create_user(db, user_data)
