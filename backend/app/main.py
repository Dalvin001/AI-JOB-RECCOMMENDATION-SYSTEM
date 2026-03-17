from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import jobs, profile, auth
from app.data.jobs_data import jobs as job_list
from app.recommender.semantic_model import build_index

from app.database import Base, engine
from app.models.user import User
from app.models.profile import Profile
from app.routes import skills, market

Base.metadata.create_all(bind=engine)

# ✅ CREATE APP ONCE
app = FastAPI(title="AI Job Recommendation System")

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ ROUTERS
app.include_router(auth.router, prefix="/auth")
app.include_router(profile.router, prefix="/profile")
app.include_router(jobs.router, prefix="/jobs")
app.include_router(skills.router, prefix="/skills")
app.include_router(market.router, prefix="/market")

# ✅ STARTUP EVENT
@app.on_event("startup")
def startup_event():
    build_index(job_list)

@app.get("/")
def root():
    return {"message": "AI Job Recommendation Backend Running"}
