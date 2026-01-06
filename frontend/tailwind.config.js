/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        brand: {
          black: "#050505",

          dark: "#0F1115",

          primary: "#6366f1", // Indigo Tech

          secondary: "#a855f7", // Purple

          accent: "#22d3ee", // Cyan
        },
      },

      animation: {
        glow: "glow 8s infinite alternate",
      },

      keyframes: {
        glow: {
          "0%": { filter: "hue-rotate(0deg)" },

          "100%": { filter: "hue-rotate(360deg)" },
        },
      },
    },
  },

  plugins: [],
};
