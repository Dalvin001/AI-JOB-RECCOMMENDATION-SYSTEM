function JobCard({ job }) {
  return (
    <div
      className="bg-[var(--card)] border border-gray-200 dark:border-slate-700
                 rounded-xl p-6 shadow-sm hover:shadow-lg transition"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold mb-1">
            {job.title}
          </h2>

          {job.match_score !== undefined && (
            <span
              className="inline-block mb-1 px-3 py-1 text-xs font-semibold
                         rounded-full bg-green-100 text-green-700
                         dark:bg-green-900 dark:text-green-300"
            >
              {job.match_score}% Match
            </span>
          )}

          <p className="text-sm opacity-80">
            {job.company} • {job.location}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm opacity-90">
        This role matches your skill profile and experience.
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs font-medium rounded-full
                       bg-gray-100 dark:bg-slate-800"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-5 py-2 rounded-lg font-semibold text-white
                     bg-[var(--accent)] hover:opacity-90"
        >
          Apply
        </button>

        <button
          className="text-sm font-medium opacity-70 hover:opacity-100"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default JobCard;
