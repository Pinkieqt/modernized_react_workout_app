import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") !== null ? localStorage.getItem("theme") : "dark");
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (newTheme) => {
          localStorage.setItem("theme", newTheme);
          setTheme(newTheme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
