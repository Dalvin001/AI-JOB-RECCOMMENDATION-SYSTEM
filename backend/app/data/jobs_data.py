import random

titles = [
    "Software Engineer", "Backend Developer", "Frontend Developer",
    "Full Stack Developer", "Data Scientist", "Machine Learning Engineer",
    "AI Engineer", "DevOps Engineer", "Cloud Engineer",
    "Cybersecurity Analyst", "Mobile App Developer",
    "Database Administrator", "UI/UX Designer",
    "QA Engineer", "Systems Engineer", "IT Support Specialist"
]

companies = [
    "TechCorp", "DataWorks", "CloudNet", "AI Labs",
    "InfraTech", "Appify", "SecureIT", "SkyCloud",
    "DataCore", "WebWorks", "DeepTech", "DesignHub",
    "InsightAI", "HelpDesk Ltd", "CryptoTech", "GameStudio"
]

locations = ["Nairobi", "Remote", "Mombasa", "Kisumu"]

types = ["Full-time", "Part-time", "Contract"]

skills_pool = [
    "python", "react", "sql", "javascript", "fastapi",
    "django", "machine learning", "deep learning",
    "tensorflow", "nlp", "docker", "kubernetes",
    "aws", "azure", "linux", "networking",
    "pandas", "numpy", "power bi", "figma",
    "testing", "automation", "git", "mongodb",
    "node", "c#", "unity", "solidity"
]


def generate_jobs(n=1000):
    jobs = []

    for i in range(1, n + 1):

        title = random.choice(titles)
        company = random.choice(companies)
        location = random.choice(locations)
        job_type = random.choice(types)

        skills = random.sample(skills_pool, 3)

        job = {
            "id": i,
            "title": title,
            "company": company,
            "location": location,
            "type": job_type,
            "description": f"{title} role at {company} requiring expertise in {', '.join(skills)}.",
            "skills": skills
        }

        jobs.append(job)

    return jobs


# 🔥 Generate 100 jobs
jobs = generate_jobs(1000)