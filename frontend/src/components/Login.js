function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md bg-[var(--card)]
                   border border-gray-200 dark:border-slate-700
                   rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Sign In
        </h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg
                       bg-gray-100 dark:bg-slate-800
                       outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg
                       bg-gray-100 dark:bg-slate-800
                       outline-none"
          />

          <button
            className="w-full py-3 rounded-lg text-white font-semibold
                       bg-[var(--accent)] hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6 opacity-80">
          Don’t have an account?{" "}
          <span className="text-[var(--accent)] font-medium cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
