import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import SkillInput from "./SkillInput";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = (skills) => {
    setLoading(true);

    fetch(
      `http://127.0.0.1:8000/jobs/recommend?skills=${encodeURIComponent(
        skills
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  // Initial load
  useEffect(() => {
    fetchJobs("python,react");
  }, []);

  return (
    <>
      <SkillInput onSearch={fetchJobs} />

      {loading && (
        <p className="text-center mt-6 opacity-70">Matching jobs...</p>
      )}

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </>
  );
}

export default JobList;
