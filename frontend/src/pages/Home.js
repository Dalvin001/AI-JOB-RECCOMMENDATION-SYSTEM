import { useState } from "react";
import JobCard from "../components/JobCard";
import SkillInput from "../components/SkillInput";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (skills) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/jobs/recommend?skills=${encodeURIComponent(skills)}`
      );
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mt-16 text-center px-6">
        <h1 className="text-4xl font-extrabold mb-3">
          AI-Powered Job Recommendations
        </h1>
        <p className="text-lg opacity-80">
          Enter your skills and get matched instantly.
        </p>
      </div>

      <SkillInput onSearch={fetchJobs} />

      {loading && (
        <p className="text-center mt-10 opacity-70">
          AI is analyzing your skills...
        </p>
      )}

      <section className="max-w-6xl mx-auto mt-12 px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>
    </>
  );
}

export default Home;
