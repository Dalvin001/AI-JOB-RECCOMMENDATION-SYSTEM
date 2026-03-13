import { useEffect, useState } from "react";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // TEMP skills (we'll make this dynamic in step 9)
  const skills = "python,react";

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/jobs/recommend?skills=${skills}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading AI jobs...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
}

export default JobList;
