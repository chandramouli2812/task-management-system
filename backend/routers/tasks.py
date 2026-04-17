from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter(prefix="/tasks")

@router.post("/")
def create_task(task: schemas.TaskCreate, db: Session = Depends(database.get_db)):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/projects/{project_id}")
def get_tasks(project_id: int, db: Session = Depends(database.get_db)):
    return db.query(models.Task).filter(models.Task.project_id == project_id).all()

@router.put("/{task_id}")
def update_task(task_id: int, task: schemas.TaskCreate, db: Session = Depends(database.get_db)):
    db_task = db.query(models.Task).get(task_id)
    for key, value in task.dict().items():
        setattr(db_task, key, value)
    db.commit()
    return db_task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(database.get_db)):
    db_task = db.query(models.Task).get(task_id)
    db.delete(db_task)
    db.commit()
    return {"msg": "Task deleted"}

@router.post("/{task_id}/assign")
def assign_task(task_id: int, user_id: int, db: Session = Depends(database.get_db)):
    task = db.query(models.Task).get(task_id)
    task.assigned_to = user_id
    db.commit()
    return {"msg": "Task assigned"}

@router.get("/assigned")
def get_assigned_tasks(user_id: int, db: Session = Depends(database.get_db)):
    return db.query(models.Task).filter(models.Task.assigned_to == user_id).all()
