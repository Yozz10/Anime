"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // 🔹 Load theme dari localStorage saat pertama kali
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // 🔹 Ganti tema dan simpan ke localStorage
  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-pink-500 dark:bg-gray-700 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow hover:scale-105 active:scale-95 transition flex items-center gap-2"
    >
      {darkMode ? "🌙 Mode Gelap" : "🌸 Mode Pink"}
    </button>
  );
}
