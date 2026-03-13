import { useState } from "react";

function Profile() {
  const [skills, setSkills] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");

  const saveProfile = async () => {
    await fetch("http://127.0.0.1:8000/profile/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "user1",
        skills: skills.split(","),
        industry,
        location,
      }),
    });

    alert("Profile saved!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <input
        placeholder="Skills (python, react)"
        onChange={(e) => setSkills(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        placeholder="Industry"
        onChange={(e) => setIndustry(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={saveProfile}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Profile
      </button>
    </div>
  );
}

export default Profile;
