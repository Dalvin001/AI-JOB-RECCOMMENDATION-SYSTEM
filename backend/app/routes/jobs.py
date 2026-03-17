from fastapi import APIRouter
from app.services.job_api import fetch_jobs

# ✅ DEFINE ROUTER FIRST
router = APIRouter()


# ✅ THEN USE IT
@router.get("/live")
def get_live_jobs():
    return fetch_jobs()