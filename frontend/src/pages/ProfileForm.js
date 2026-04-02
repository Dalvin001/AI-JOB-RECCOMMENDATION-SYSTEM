import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const [skills, setSkills] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/profile/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          skills,
          industry,
          location,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert(data.detail || "Error saving profile");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      <div className="w-full max-w-xl p-8 rounded-3xl 
                      backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Complete Your Profile
        </h2>

        <p className="text-center text-white/70 mb-6">
          Help AI understand you better 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* SKILLS */}
          <div>
            <label className="text-white text-sm">Skills</label>
            <input
              type="text"
              placeholder="e.g. React, Python, SQL"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl bg-white/20 text-white placeholder-white/60
                         border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
          </div>

          {/* INDUSTRY */}
          <div>
            <label className="text-white text-sm">Industry</label>
            <input
              type="text"
              placeholder="e.g. Software, AI, Data Science"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl bg-white/20 text-white placeholder-white/60
                         border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-white text-sm">Location</label>
            <input
              type="text"
              placeholder="e.g. Nairobi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl bg-white/20 text-white placeholder-white/60
                         border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white
                       bg-white/20 hover:bg-white/30 transition-all duration-300
                       border border-white/30 backdrop-blur-md"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ProfileForm;