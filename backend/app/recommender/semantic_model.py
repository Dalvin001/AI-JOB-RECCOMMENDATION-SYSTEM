from sentence_transformers import SentenceTransformer
import numpy as np

# Load open-source embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

job_embeddings = []


def build_index(jobs):
    """
    Pre-compute embeddings for each job field
    """
    global job_embeddings
    job_embeddings = []

    for job in jobs:
        job_embeddings.append({
            "job": job,
            "skills_vec": model.encode(" ".join(job["skills"])),
            "title_vec": model.encode(job["title"]),
            "desc_vec": model.encode(job["description"]),
        })


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def recommend_jobs(user_skills, top_k=10):
    """
    Rank jobs by weighted semantic similarity
    """
    query = " ".join(user_skills)
    query_vec = model.encode(query)

    scored_jobs = []

    for item in job_embeddings:
        skills_score = cosine_similarity(query_vec, item["skills_vec"])
        title_score = cosine_similarity(query_vec, item["title_vec"])
        desc_score = cosine_similarity(query_vec, item["desc_vec"])

        final_score = (
            0.6 * skills_score +
            0.25 * title_score +
            0.15 * desc_score
        )

        job = item["job"].copy()
        job["match_score"] = float(round(final_score * 100, 1))


        scored_jobs.append(job)

    scored_jobs.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return scored_jobs[:top_k]
