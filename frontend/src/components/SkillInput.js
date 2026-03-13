import { useState } from "react";

function SkillInput({ onSearch }) {
  const [skills, setSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!skills.trim()) return;

    onSearch(skills);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-8 flex gap-3 px-6"
    >
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="Enter skills e.g. python, react, sql"
        className="flex-1 px-4 py-3 rounded-xl border
                   bg-[var(--card)] dark:border-slate-700
                   focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />

      <button
        type="submit"
        className="px-6 py-3 rounded-xl font-semibold text-white
                   bg-[var(--accent)] hover:opacity-90"
      >
        Find Jobs
      </button>
    </form>
  );
}

export default SkillInput;
