/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: "rgb(0, 32, 58)",
        color2: "rgb(255, 232, 206)",
        color3: "rgb(88, 126, 154)",
      },
    },
  },
  plugins: [],
};
