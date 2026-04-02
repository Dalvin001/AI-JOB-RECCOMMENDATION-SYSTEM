from fastapi import APIRouter
import requests

router = APIRouter()

APP_ID = "729285d6"
APP_KEY = "dc8b23bb33a67426c6bc6dae57afa36f"


def fetch_jobs(skills="software developer"):
    url = "https://api.adzuna.com/v1/api/jobs/gb/search/1"

    params = {
        "app_id": APP_ID,
        "app_key": APP_KEY,
        "results_per_page": 20,
        "what": skills
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        print("API ERROR:", response.status_code, response.text)
        return []

    data = response.json()

    jobs = []

    # ✅ FIXED INDENTATION
    for job in data.get("results", []):
        description = job.get("description", "")

        jobs.append({
            "id": job.get("id"),
            "title": job.get("title"),
            "company": job.get("company", {}).get("display_name"),
            "location": job.get("location", {}).get("display_name"),
            "description": description,
            "skills": extract_skills(description)
        })

    return jobs



def extract_skills(text):
    keywords = [
        "python", "java", "javascript", "react", "node",
        "sql", "machine learning", "ai", "aws", "docker",
        "excel", "pandas"
    ]

    text = text.lower()

    return [skill for skill in keywords if skill in text]


# ✅ ROUTE
@router.get("/recommend")
def recommend_jobs(skills: str):
    return fetch_jobs(skills)