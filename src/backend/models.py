from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON
from typing import Optional
from datetime import datetime


class UserBase(SQLModel):
    username: str = Field(max_length=50, unique=True, index=True)


class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    habits: list[dict] = Field(default_factory=list, sa_column=Column(JSON))


class Habit(SQLModel):
    name: str
    description: Optional[str] = None
    frequency: str = "daily"  # Daily, weekly, etc
    category: Optional[str] = None
