import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const themes = ["aurora", "default", "swimming-boxes"];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("aurora");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}