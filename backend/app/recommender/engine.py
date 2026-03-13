import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load jobs
df = pd.read_csv("app/data/jobs.csv")

# Prepare skill text
df["skills_text"] = df["skills"].str.lower()

vectorizer = TfidfVectorizer()
job_vectors = vectorizer.fit_transform(df["skills_text"])

def recommend_jobs(user_skills: str, top_n=3):
    user_vec = vectorizer.transform([user_skills.lower()])
    similarity = cosine_similarity(user_vec, job_vectors)[0]

    df["score"] = similarity
    recommendations = df.sort_values(by="score", ascending=False).head(top_n)

    return recommendations[["id", "title", "company", "location", "skills"]].to_dict(orient="records")
