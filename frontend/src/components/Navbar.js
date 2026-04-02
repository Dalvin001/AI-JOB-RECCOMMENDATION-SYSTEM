import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";

function Navbar() {

  const { mode, setMode, color, setColor } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const [showAuth, setShowAuth] = useState(false);

  // ✅ Avatar letter
  const avatarLetter =
    user?.email?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      <nav className="bg-[var(--card)] border-b border-gray-200 dark:border-slate-700">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <div className="text-xl font-bold text-[var(--accent)]">
            AI Job Match
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:flex space-x-8 font-medium opacity-80">
            <Link to="/">Home</Link>
            <Link to="/">Jobs</Link>
            <Link to="/dashboard">Dashboard</Link>

            {/* ✅ ADD PROFILE LINK */}
            {user && <Link to="/profile">Profile</Link>}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center space-x-3">

            {/* THEME COLOR */}
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="px-3 py-2 rounded-lg"
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
            </select>

            {/* DARK MODE */}
            <button
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              className="px-3 py-2 rounded-lg"
            >
              {mode === "dark" ? "☀" : "🌙"}
            </button>

            {/* AUTH SECTION */}
            {!user ? (
              <button
                onClick={() => setShowAuth(true)}
                className="px-4 py-2 rounded-lg font-semibold text-white bg-[var(--accent)]"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center space-x-3">

                {/* 👤 AVATAR */}
                <Link to="/profile">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold cursor-pointer">
                    {avatarLetter}
                  </div>
                </Link>

                {/* 👤 EMAIL */}
                <span className="font-medium">
                  {user.email || "User"}
                </span>

                {/* 🚪 LOGOUT */}
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg font-semibold text-white bg-red-500"
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        </div>

      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}

export default Navbar;