/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        wrongInput: "wrongInput 1s ease-in-out linear forwards",
      },
      keyframes: {
        wrongInput: {
          "100%": { transform: "translateX(0)" },
        },
      },

      translate: {
        screen: "100vw",
      },
    },
  },
  plugins: [],
};
