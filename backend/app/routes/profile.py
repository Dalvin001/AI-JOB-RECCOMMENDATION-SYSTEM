from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.profile import Profile
from app.dependencies import get_current_user

router = APIRouter(tags=["Profile"])

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
    profile = db.query(Profile).filter(Profile.user_id == user.id).first()

    if profile:
        profile.skills = ",".join(data["skills"])
        profile.industry = data["industry"]
        profile.location = data["location"]
        profile.experience = data.get("experience", profile.experience)
    else:
        profile = Profile(
            user_id=user.id,
            skills=",".join(data["skills"]),
            industry=data["industry"],
            location=data["location"],
            experience=data.get("experience", "Not specified")
        )
        db.add(profile)

    db.commit()

    return {"message": "Profile saved"}


@router.get("/")
def get_profile(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.user_id == user.id).first()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    return {
        "name": getattr(user, "name", user.email),
        "email": user.email,
        "skills": profile.skills,
        "industry": profile.industry,
        "location": profile.location,
        "experience": profile.experience
    }