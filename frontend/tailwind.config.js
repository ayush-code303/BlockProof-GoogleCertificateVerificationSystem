/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hacker: {
          base: "#050000",
          crimson: "#dc2626",
          vivid: "#ff0000",
          dark: "#450a0a",
          glow: "#ef4444",
        },
      },
    },
  },
  plugins: [],
};
