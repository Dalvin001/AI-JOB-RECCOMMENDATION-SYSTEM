import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light"); // light | dark
  const [color, setColor] = useState("blue"); // blue | green | purple

  useEffect(() => {
    const root = document.documentElement;

    // Reset classes
    root.className = "";

    // Dark mode
    if (mode === "dark") {
      root.classList.add("dark");
    }

    // Color themes
    if (color === "green") root.classList.add("theme-green");
    if (color === "purple") root.classList.add("theme-purple");
  }, [mode, color]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
