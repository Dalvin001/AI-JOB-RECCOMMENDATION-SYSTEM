from collections import Counter
from app.data.jobs_data import jobs


def analyze_skill_gap(user_skills):

    market_skills = []

    for job in jobs:
        for skill in job["skills"]:
            market_skills.append(skill.lower())

    market_count = Counter(market_skills)

    user_skills = [s.lower() for s in user_skills]

    missing_skills = []

    for skill, count in market_count.most_common():

        if skill not in user_skills:
            missing_skills.append(skill)

        if len(missing_skills) == 5:
            break

    return missing_skills