from collections import Counter

def recommend_skills(user_skills, jobs):

    skill_counter = Counter()

    for job in jobs:
        for skill in job["skills"]:
            if skill not in user_skills:
                skill_counter[skill] += 1

    top_skills = skill_counter.most_common(5)

    return [skill for skill, count in top_skills]