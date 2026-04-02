from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    skills = Column(String)       # comma-separated
    industry = Column(String)
    location = Column(String)

    experience = Column(String)   # ✅ ADD THIS LINE