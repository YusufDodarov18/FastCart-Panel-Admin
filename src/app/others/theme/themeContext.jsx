import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDarkMode(saved);
  }, []);

  const toggleTheme = () => {
    const newMode = darkMode === "light" ? "dark" : "light";
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
