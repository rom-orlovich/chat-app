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
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        // Lobby page.
        homeBackground: "#5FFAD5",
        loginCard: "#C1FFCF",
        loginButton: { 400: "#1AE3B3", 500: "#1CD6A9" },
        loginButtonText: "#F7F7F7",
        errorMessage: "#f87171",

        // Chat page.

        // Login users bar.
        sideBar: "#6ee7b7",
        itemHover: "#34d399",
        usernameBlock: "white",

        // Chat area.
        chatBackground: "#f0fdfa",
        dayTag: "#F2F2F2",
        myMsgBlock: "#AFFFBC",
        msgBlock: "#d1fae5",
        sysMsgBlock: "#f1f5f9",
        username: "#14b8a6",
        time: "#374151",
        inputMsgBackground: "#f1f5f9",

        // Scroll bar.
        scrollBar: "#5FFAD5",
      },
    },
  },
  plugins: [],
};
