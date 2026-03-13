from fastapi import APIRouter, Query
from app.recommender.semantic_model import recommend_jobs

from app.database import SessionLocal
from app.models.profile import Profile

router = APIRouter()


# OPTION 1 — Use saved profile
@router.get("/recommend/{user_id}")
def recommend_from_profile(user_id: str):
    db = SessionLocal()

    profile = db.query(Profile).filter(
        Profile.user_id == user_id
    ).first()

    db.close()

    if not profile:
        return {"error": "Profile not found"}

    skills = profile.skills.split(",")

    return recommend_jobs(skills)


# OPTION 2 — Manual skills (keep your original)
@router.get("/recommend")
def recommend(skills: str = Query(...)):
    user_skills = skills.split(",")
    return recommend_jobs(user_skills)
