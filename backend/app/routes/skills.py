from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.profile import Profile
from app.dependencies import get_current_user
from app.recommender.skill_gap import analyze_skill_gap

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/recommend")
def recommend_skills(user=Depends(get_current_user), db: Session = Depends(get_db)):

    profile = db.query(Profile).filter(Profile.user_id == user.id).first()

    if not profile:
        return {"recommended_skills": []}

    # ✅ FIXED (no crash if null)
    user_skills = profile.skills.split(",") if profile.skills else []

    recommendations = analyze_skill_gap(user_skills)

    return {
        "recommended_skills": recommendations
    }