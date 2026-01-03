/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. COLORS (Restored)
      colors: {
        primary: '#ff9d14ff',
        dark: '#0a0a0a',
        secondary: '#ffffff',
        light: '#e5e5e5',
      },
      // 2. FONTS (Added to fix the current crash)
      fontFamily: {
        heading: ['sans-serif'], // Maps 'font-heading' to standard fonts
        body: ['sans-serif'],    // Maps 'font-body' to standard fonts
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}