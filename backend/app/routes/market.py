from fastapi import APIRouter
from collections import Counter
from app.data.jobs_data import jobs

router = APIRouter()


@router.get("/insights")
def market_insights():

    skills = []

    for job in jobs:
        skills.extend(job.get("skills", []))  # ✅ safe access

    counts = Counter(skills)
    top_skills = counts.most_common(10)

    return {
        "top_skills": top_skills
    }