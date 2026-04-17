from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter(prefix="/projects")

@router.post("/")
def create_project(project: schemas.ProjectCreate, db: Session = Depends(database.get_db)):
    db_project = models.Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/")
def get_projects(db: Session = Depends(database.get_db)):
    return db.query(models.Project).all()

@router.put("/{project_id}")
def update_project(project_id: int, project: schemas.ProjectCreate, db: Session = Depends(database.get_db)):
    db_project = db.query(models.Project).get(project_id)
    for key, value in project.dict().items():
        setattr(db_project, key, value)
    db.commit()
    return db_project

@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(database.get_db)):
    db_project = db.query(models.Project).get(project_id)
    db.delete(db_project)
    db.commit()
    return {"msg": "Project deleted"}
