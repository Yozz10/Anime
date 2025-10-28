/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // 🌙 aktifkan dark mode via class
  theme: {
    extend: {
      colors: {
        pinky: {
          light: "#ffe4ec",
          DEFAULT: "#f472b6",
          dark: "#d81b60",
        },
        background: {
          light: "#fff5f8",
          dark: "#1a1a1a",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 10px rgba(233, 30, 99, 0.4)",
      },
      animation: {
        "bounce-slow": "bounce-slow 2.5s infinite ease-in-out",
        "fade-in": "fadeIn 0.8s ease forwards",
        "fade-slide": "fadeSlide 0.5s ease forwards",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeIn: {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeSlide: {
          from: { opacity: 0, transform: "translateY(15px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
