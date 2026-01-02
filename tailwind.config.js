/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ffa200",
          light: "#ffb733",
          dark: "#cc8200",
        },
        dark: {
          DEFAULT: "#000000",
          lighter: "#0a0a0a",
          card: "#111111",
        },
        light: {
          DEFAULT: "#ffffff",
          muted: "#a0a0a0",
        },
      },
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
        heading: ["ClashGrotesk", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 162, 0, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 162, 0, 0.6)" },
        },
        shimmer: {
          to: { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow": "0 0 20px rgba(255, 162, 0, 0.3), 0 0 40px rgba(255, 162, 0, 0.2)",
        "glow-lg": "0 0 30px rgba(255, 162, 0, 0.4), 0 0 60px rgba(255, 162, 0, 0.3)",
        "glow-white": "0 0 20px rgba(255, 255, 255, 0.2), 0 0 40px rgba(255, 255, 255, 0.1)",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
}