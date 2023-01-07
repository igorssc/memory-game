const rotateX = require("./plugins/tailwind/rotateX");
const rotateY = require("./plugins/tailwind/rotateY");
const backfaceVisibility = require("./plugins/tailwind/backfaceVisibility");
const transformStyle = require("./plugins/tailwind/transformStyle");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "low-budget": [
          "low-budget",
          "Inter",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
	screens: {
     	xs: "475px",
    },
    },
  },
  plugins: [rotateX, rotateY, backfaceVisibility, transformStyle],
};
