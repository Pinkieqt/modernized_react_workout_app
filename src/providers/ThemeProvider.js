import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") !== null ? localStorage.getItem("theme") : "dark");
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: () => {
          localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
          setTheme(theme === "dark" ? "light" : "dark");
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
