from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import SessionLocal
from app.models.user import User

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_password(password: str):
    return pwd_context.hash(password)

@router.post("/register")
def register(data: dict, db: Session = Depends(get_db)):
    user = User(
        email=data["email"],
        hashed_password=hash_password(data["password"]),
        full_name=data.get("full_name")
    )
    db.add(user)
    db.commit()
    return {"message": "User registered"}
