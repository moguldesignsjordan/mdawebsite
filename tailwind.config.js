/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffa200', // Orange accent color from your site
        dark: {
          DEFAULT: '#000000',
          lighter: '#111111',
          card: '#1a1a1a',
        },
        light: '#ffffff',
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        heading: ['ClashGrotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}