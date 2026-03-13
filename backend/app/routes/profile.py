from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.profile import Profile
from app.dependencies import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/save")
def save_profile(
    data: dict,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = Profile(
        user_id=user.id,
        skills=",".join(data["skills"]),
        industry=data["industry"],
        location=data["location"]
    )
    db.add(profile)
    db.commit()

    return {"message": "Profile saved"}
