AI Job Recommendation System

An AI-powered job recommendation platform designed to help graduates discover relevant employment opportunities based on their skills, qualifications, experience, and career preferences.

The system uses semantic similarity and natural language processing (NLP) to intelligently match user profiles with job descriptions and provide personalized job recommendations and skill development guidance.

Project Overview

Many graduates struggle to find suitable job opportunities because traditional job search platforms rely on manual keyword searches rather than intelligent matching.

This project solves that problem by building an AI-driven recommendation engine that:

Understands user skills

Analyzes job descriptions

Matches graduates with relevant jobs

Suggests skills to improve employability

Provides insights into labor market demand

The system combines machine learning, semantic search, and web technologies to deliver a modern job recommendation experience.

Key Features
1. User Registration and Profile Management

Users can:

Register an account

Log in securely using authentication

Create and update their professional profile

Add skills, qualifications, experience, and preferences

Profiles are stored securely in a database.

2. AI-Powered Job Recommendation Engine

The system analyzes:

User skills

Job descriptions

Required job skills

It then uses semantic similarity to recommend the most relevant jobs.

The recommendation engine uses the transformer model:

all-MiniLM-L6-v2

This model converts text into vector embeddings to compute similarity between users and job postings.

3. Personalized Skill Development Recommendations

The system analyzes skill gaps between users and available jobs and recommends skills that will improve employability.

Example:

User Skills:

Python, SQL

Recommended Skills:

Machine Learning
Cloud Computing
Data Visualization

This helps graduates prepare for real labor market demands.

4. Labor Market Insights

The platform analyzes job data to identify:

Most demanded skills

Fast-growing industries

Employment trends

These insights help users understand the job market and plan their career paths.

5. Job Bookmarking

Users can:

Save interesting job opportunities

Access bookmarked jobs later

Track potential applications

6. Admin Job Management

Administrators can:

Add job postings

Update job listings

Manage job market data

This ensures the system remains up-to-date with available opportunities.

System Architecture
Frontend (React)
        │
        │ API Requests
        ▼
FastAPI Backend
        │
        ├── Authentication Module
        ├── User Profile Management
        ├── Job Recommendation Engine
        ├── Skill Recommendation Module
        └── Market Insights Analyzer
        │
        ▼
Database (SQLite / PostgreSQL)
Technologies Used
Backend

FastAPI

SQLAlchemy

Uvicorn

Pydantic

AI and Machine Learning

Sentence Transformers

PyTorch

scikit-learn

Frontend

React

Axios

Database

SQLite

Installation and Setup
1. Clone the Repository
git clone https://github.com/yourusername/AI-job-recommendation-system.git
cd AI-job-recommendation-system
2. Setup Backend

Navigate to the backend folder:

cd backend

Create virtual environment:

python -m venv venv

Activate environment:

Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run backend server:

uvicorn app.main:app --reload

Backend will run at:

http://127.0.0.1:8000
3. Setup Frontend

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Run the React application:

npm start

Frontend will run at:

http://localhost:3000
API Endpoints
Authentication
POST /auth/register
POST /auth/login
User Profile
GET /profile
PUT /profile/update
Job Recommendations
GET /jobs/recommend
Skill Recommendations
GET /skills/recommend
Market Insights
GET /market/insights
Example Job Recommendation Request
GET /jobs/recommend?skills=python,data analysis

Response:

[
  {
    "title": "Data Scientist",
    "similarity_score": 0.89
  }
]
Project Objectives

This project aims to:

Register users and manage graduate profiles.

Develop a personalized AI-driven system that recommends jobs based on skills and qualifications.

Provide tailored skill development recommendations aligned with labor market demand.

Integrate job market insights to support employment trend forecasting.

Future Improvements

Potential enhancements include:

Resume/CV upload and automatic skill extraction

Real-time job scraping from job websites

AI-based career path prediction

Mobile application integration

Advanced analytics dashboards

Author

Delvin Okong'o

Bachelor of information Technology , meru university
School of Computing and Informatics
