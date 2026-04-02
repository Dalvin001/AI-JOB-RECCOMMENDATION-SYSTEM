from fastapi import APIRouter, Depends
from app.services.job_api import fetch_jobs
from app.dependencies import get_current_user

router = APIRouter()

# ✅ LIVE JOBS (public)
@router.get("/live")
def get_live_jobs():
    return fetch_jobs()


# ✅ RECOMMEND JOBS (protected)
@router.get("/recommend")
def recommend_jobs(
    skills: str = "software developer",
    user=Depends(get_current_user)
):
    return fetch_jobs(skills)