/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "620px",
      md: "768px",
      lg: "1200px",
    },
    extend: {
      colors: {
        homeBackground: "#5FFAD5",
        loginCard: "#C1FFCF",
        loginButton: { 400: "#1AE3B3", 500: "#1CD6A9" },
        loginButtonText: "#F7F7F7",
        errorMessage: "#f87171",
      },
    },
  },
  plugins: [],
};
