/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wrongInput: {
          "100%": { transform: "translateX(0)" },
        },
        searchUserInput: {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(0vh)" },
        },
      },

      animation: {
        wrongInput: "wrongInput 1s ease-in-out linear forwards",
        searchUserInput: "searchUserInput 2s ease-in-out linear forwards",
      },

      translate: {
        screen: "100vw",
      },
    },
  },
  plugins: [],
};
