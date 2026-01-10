from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"Hello from api"}

@app.post("/api/auth/login")
def login(userName: str, password: str):
    return {userName, password}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)