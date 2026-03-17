import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import AuthModal from "./AuthModal";

function Navbar() {

  const { mode, setMode, color, setColor } = useContext(ThemeContext);

  const [showAuth, setShowAuth] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <nav className="bg-[var(--card)] border-b border-gray-200 dark:border-slate-700">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <div className="text-xl font-bold text-[var(--accent)]">
            AI Job Match
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 font-medium opacity-80">
            <Link to="/" className="hover:text-[var(--accent)]">Home</Link>
            <Link to="/" className="hover:text-[var(--accent)]">Jobs</Link>
            <Link to="/dashboard" className="hover:text-[var(--accent)]">Dashboard</Link>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-3">

            {/* Theme Color */}
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-sm"
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
            </select>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800"
            >
              {mode === "dark" ? "☀" : "🌙"}
            </button>

            {/* Login OR Profile/Logout */}
            {!token ? (

              <button
                onClick={() => setShowAuth(true)}
                className="px-4 py-2 rounded-lg font-semibold text-white
                           bg-[var(--accent)] hover:opacity-90"
              >
                Login
              </button>

            ) : (

              <div className="flex items-center space-x-3">

                <Link
                  to="/profile"
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:opacity-90"
                >
                  Logout
                </button>

              </div>

            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileOpen && (

          <div className="md:hidden px-6 pb-4 space-y-4 border-t border-gray-200 dark:border-slate-700">

            <div className="flex flex-col space-y-3 font-medium">
              <Link to="/" className="hover:text-[var(--accent)]">Home</Link>
              <Link to="/" className="hover:text-[var(--accent)]">Jobs</Link>
              <Link to="/dashboard" className="hover:text-[var(--accent)]">Dashboard</Link>
            </div>

            <div className="flex items-center space-x-3 pt-2">

              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-sm"
              >
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
              </select>

              <button
                onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800"
              >
                {mode === "dark" ? "☀" : "🌙"}
              </button>

            </div>

            {!token ? (

              <button
                onClick={() => {
                  setShowAuth(true);
                  setMobileOpen(false);
                }}
                className="w-full py-3 rounded-lg font-semibold text-white
                           bg-[var(--accent)] hover:opacity-90"
              >
                Login
              </button>

            ) : (

              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-lg font-semibold text-white bg-red-500"
              >
                Logout
              </button>

            )}

          </div>

        )}

      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

    </>
  );
}

export default Navbar;