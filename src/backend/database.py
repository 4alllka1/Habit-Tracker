from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine
from typing import Generator

# SQLite — самый простой вариант для начала
DATABASE_URL = "sqlite:///database.db"

# Для будущего перехода на PostgreSQL можно будет просто поменять URL
# DATABASE_URL = "postgresql+asyncpg://user:password@localhost:5432/habit_tracker"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # важно для SQLite
)

# Для асинхронного режима (если захочешь потом)
# async_engine = create_async_engine(DATABASE_URL)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session