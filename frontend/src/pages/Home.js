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

      // ✅ Ensure jobs is always an array
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error("API Error:", data);
        setJobs([]);
      }

    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto mt-16 text-center px-6">
        <h1 className="text-4xl font-extrabold mb-3">
          AI-Powered Job Recommendations
        </h1>
        <p className="text-lg opacity-80">
          Enter your skills and get matched instantly.
        </p>
      </div>

      {/* SKILL INPUT */}
      <SkillInput onSearch={fetchJobs} />

      {/* LOADING STATE */}
      {loading && (
        <p className="text-center mt-10 opacity-70">
          Analyzing your skills and matching you with real job opportunities...
        </p>
      )}

      {/* JOB RESULTS */}
      <section className="max-w-6xl mx-auto mt-12 px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobCard key={job.id || index} job={job} />
          ))
        ) : (
          !loading && (
            <p className="col-span-full text-center opacity-70">
              No jobs found or something went wrong.
            </p>
          )
        )}
      </section>
    </>
  );
}

export default Home;