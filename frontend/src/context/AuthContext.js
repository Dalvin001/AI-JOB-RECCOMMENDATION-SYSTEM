import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  // ✅ LOAD USER FROM LOCAL STORAGE ON APP START
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // decode simple payload (if JWT)
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch {
        setUser({ email: "User" }); // fallback
      }
    }
  }, []);

  // ✅ LOGIN FUNCTION
  const login = (token) => {
    localStorage.setItem("token", token);

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
    } catch {
      setUser({ email: "User" });
    }
  };

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}