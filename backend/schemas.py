# schemas.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password: str = Field(min_length=6, max_length=72)

class UserLogin(BaseModel):
    email: str
    password: str

class ProjectCreate(BaseModel):
    project_name: str
    description: Optional[str] = None

class TaskCreate(BaseModel):
    project_id: int
    title: str
    description: Optional[str] = None
    status: Optional[str] = "Pending"
    due_date: Optional[datetime] = None
