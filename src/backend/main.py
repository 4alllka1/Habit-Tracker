from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, select
from sqlalchemy.orm.attributes import flag_modified
from database import engine, get_session
from models import User, Habit
from datetime import datetime, timedelta
from dotenv import load_dotenv

import os
import jwt
import bcrypt
import json


load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")


ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")


# Создание таблиц
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


create_db_and_tables()


def get_password_hash(password: str):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(raw_password, hashed_password):
    return bcrypt.checkpw(raw_password.encode(), hashed_password.encode())


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update(
        {
            "exp": expire,
        }
    )
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        if payload.get("exp") < datetime.now().timestamp():
            raise HTTPException(status_code=401, detail="Token expired")

    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = session.exec(select(User).where(User.username == username)).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routes


@app.get("/")
def root():
    return {"Hello from api"}


@app.get("/api/users/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    return {
        "username": current_user.username,
        "id": current_user.id,
        "habits": current_user.habits,
    }


@app.post("/api/auth/login")
def login(
    username: str = Body(...),
    password: str = Body(...),
    session: Session = Depends(get_session),
):
    user = session.exec(select(User).where(User.username == username)).first()

    if not user:
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")

    if verify_password(password, user.hashed_password):
        return {
            "message": "Успешный вход!",
            "username": user.username,
            "token": create_access_token({"sub": user.username}),
        }
    else:
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")


@app.post("/api/auth/register", response_model=User)
def register(
    username: str = Body(...),
    password: str = Body(...),
    session: Session = Depends(get_session),
):

    existing = session.exec(select(User).where(User.username == username)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode(), salt)

    user = User(username=username, hashed_password=hashed.decode())
    # print(user)
    session.add(user)
    session.commit()
    session.refresh(user)

    return {"username": user.username}


@app.get("/api/users", response_model=list[User])
def get_all_users(session: Session = Depends(get_session)):
    statement = select(User)
    users = session.exec(statement).all()
    return users


@app.post("/api/users/habits")
def create_habit(
    habit: dict = Body(...),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    current_user.habits.append(habit)

    try:
        flag_modified(current_user, "habits")
        session.commit()
        session.refresh(current_user)

        print(current_user)
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "id": current_user.id,
        "username": current_user.username,
        "habits": current_user.habits,
    }


@app.delete("/api/users/habits")
def delete_habit(
    habit: dict = Body(...),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    current_user.habits.remove(habit)
    flag_modified(current_user, "habits")
    session.commit()
    session.refresh(current_user)

    return {
        "id": current_user.id,
        "username": current_user.username,
        "habits": current_user.habits,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
