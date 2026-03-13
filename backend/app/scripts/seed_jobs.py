from app.database import SessionLocal
from app.models.job import Job
from app.data.jobs_data import jobs

db = SessionLocal()

for job in jobs:
    db_job = Job(
        title=job["title"],
        company=job["company"],
        location=job["location"],
        description=job["description"],
        skills=",".join(job["skills"]),
    )
    db.add(db_job)

db.commit()
db.close()

print("✅ Jobs seeded successfully")
