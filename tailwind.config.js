/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          50: "#fff0f6",
          100: "#ffe0ed",
          200: "#ffc2db",
          300: "#ff99c4",
          400: "#ff66a3",
          500: "#ff3385",
          600: "#e60073",
          700: "#b30059",
          800: "#800040",
          900: "#4d0026"
        }
      }
    }
  },
  plugins: []
};
