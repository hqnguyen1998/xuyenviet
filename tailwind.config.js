/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Ensure dark mode works
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{css}', // Ensure Tailwind scans CSS files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
