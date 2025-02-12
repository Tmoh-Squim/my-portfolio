"use client";

import { useState, useEffect, ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.replace(theme, newTheme); // Ensure old theme is removed
  };

  return (
    <div className={theme}>
        {children}
    </div>
  );
}
