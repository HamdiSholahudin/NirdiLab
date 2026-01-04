/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        rounded: ["Fredoka", "sans-serif"],
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-delayed": "float 9s ease-in-out 4s infinite",
        drift: "drift 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
