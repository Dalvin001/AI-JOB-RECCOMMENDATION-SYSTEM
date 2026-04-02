import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {

    async function fetchProfile() {

      if (!token) {
        window.location.href = "/";
        return;
      }

      try {

        const res = await axios.get(
          "http://127.0.0.1:8000/profile",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!res.data || res.data.detail) {
          window.location.href = "/complete-profile";
          return;
        }

        setProfile(res.data);

      } catch (err) {

        console.error("PROFILE ERROR:", err.response?.data || err.message);

        setError(
          err.response?.data?.detail || "Failed to load profile"
        );

      } finally {
        setLoading(false);
      }
    }

    fetchProfile();

  }, [token]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg text-gray-600">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error}
      </div>
    );
  }

  const avatarLetter =
    profile?.email?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4">

      <div className="max-w-4xl mx-auto">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          {/* AVATAR */}
          <div className="relative w-28 h-28 mx-auto mb-4">
            {profile?.avatar ? (
              <img
                src={`http://127.0.0.1:8000/${profile.avatar}`}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500
                              flex items-center justify-center text-white text-3xl font-bold shadow">
                {avatarLetter}
              </div>
            )}
          </div>

          {/* NAME / EMAIL */}
          <h2 className="text-2xl font-bold text-gray-800">
            {profile.name || "User"}
          </h2>

          <p className="text-gray-500">{profile.email}</p>

          {/* INFO GRID */}
          <div className="grid md:grid-cols-3 gap-6 mt-8 text-left">

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Skills</p>
              <p className="font-semibold text-gray-800">
                {profile.skills || "Not set"}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Industry</p>
              <p className="font-semibold text-gray-800">
                {profile.industry || "Not set"}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-800">
                {profile.location || "Not set"}
              </p>
            </div>

          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={() => (window.location.href = "/complete-profile")}
            className="mt-8 px-8 py-3 rounded-xl text-white font-semibold
                       bg-gradient-to-r from-indigo-500 to-purple-500
                       hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Edit Profile
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;