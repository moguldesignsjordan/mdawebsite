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
      colors: {
        primary: '#ff9d14ff',
        dark: '#0a0a0a',
        secondary: '#ffffff',
        light: '#e5e5e5',
        // This definition prevents the 'bg-dark-card' error
        'dark-card': '#111111', 
      },
      fontFamily: {
        heading: ['sans-serif'], 
        body: ['sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}