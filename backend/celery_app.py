"""
Celery configuration and tasks
"""

from celery import Celery

from app.core.config import settings

# Create Celery app
celery_app = Celery(
    "open_innovation",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
)

# Load configuration
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

# Auto-discover tasks
celery_app.autodiscover_tasks(["app.tasks"])
