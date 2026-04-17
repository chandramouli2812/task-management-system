from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
import models, database

# Define router here
router = APIRouter(prefix="/analytics")

@router.get("/tasks")
def task_analytics(db: Session = Depends(database.get_db)):
    total = db.query(models.Task).count()
    completed = db.query(models.Task).filter(models.Task.status == "Completed").count()
    pending = db.query(models.Task).filter(models.Task.status == "Pending").count()
    per_project = (
    db.query(models.Project.project_name, func.count(models.Task.id))
    .join(models.Task)
    .group_by(models.Project.id)
    .all()
    )
    # Convert tuples to dicts
    per_project = [{"project_name": name, "count": count} for name, count in per_project]

    # per_project = (
    #     db.query(models.Project.project_name, func.count(models.Task.id))
    #     .join(models.Task)
    #     .group_by(models.Project.id)
    #     .all()
    # )
    return {
        "total": total,
        "completed": completed,
        "pending": pending,
        "per_project": per_project,
    }
