import { useState } from "react";

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://127.0.0.1:8000/auth/login"
      : "http://127.0.0.1:8000/auth/register";

    const payload = isLogin
      ? {
          email: form.email,
          password: form.password,
        }
      : {
          username: form.name,
          email: form.email,
          password: form.password,
        };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (isLogin && data.access_token) {
      localStorage.setItem("token", data.access_token);
      alert("Login successful!");
      onClose();
    } else if (!isLogin) {
      alert("Registered! Now login.");
      setIsLogin(true);
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-md bg-[var(--card)] rounded-2xl shadow-xl p-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl opacity-60 hover:opacity-100"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Sign In" : "Create Account"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800 outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-[var(--accent)] hover:opacity-90"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 opacity-80">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-[var(--accent)] font-medium cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-[var(--accent)] font-medium cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
