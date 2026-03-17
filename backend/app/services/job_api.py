import requests

APP_ID = "729285d6"
APP_KEY = "dc8b23bb33a67426c6bc6dae57afa36f"


def fetch_jobs():
    url = "https://api.adzuna.com/v1/api/jobs/gb/search/1"

    params = {
        "app_id": APP_ID,
        "app_key": APP_KEY,
        "results_per_page": 20,
        "what": "software developer"
    }

    try:
        response = requests.get(url, params=params)

        print("STATUS:", response.status_code)
        print("RAW:", response.text[:300])  # 🔥 debug

        # ❌ If request failed
        if response.status_code != 200:
            return {"error": f"API failed with status {response.status_code}"}

        data = response.json()

        jobs = []

        for job in data.get("results", []):
            jobs.append({
                "title": job.get("title"),
                "company": job.get("company", {}).get("display_name"),
                "location": job.get("location", {}).get("display_name"),
                "description": job.get("description"),
            })

        return jobs

    except Exception as e:
        print("ERROR:", str(e))
        return {"error": "Something went wrong while fetching jobs"}