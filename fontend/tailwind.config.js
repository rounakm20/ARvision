/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif:  ["Instrument Serif", "serif"],
        sans:   ["DM Sans", "sans-serif"],
        mono:   ["JetBrains Mono", "monospace"],
      },
      colors: {
        accent: "#c8f0e0",
        "accent-dim": "#a8dfc8",
        bg: {
          DEFAULT: "#07080b",
          surface: "#0c0e14",
          elevated: "#11141c",
        },
      },
      animation: {
        up: "up 0.55s ease forwards",
      },
      keyframes: {
        up: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
