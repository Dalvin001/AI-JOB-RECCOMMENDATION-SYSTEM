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


# SAVE USER PROFILE
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


# GET LOGGED-IN USER PROFILE
@router.get("/")
def get_profile(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    profile = db.query(Profile).filter(Profile.user_id == user.id).first()

    if not profile:
        return {"message": "Profile not found"}

    return {
        "email": user.email,
        "skills": profile.skills,
        "industry": profile.industry,
        "location": profile.location
    }