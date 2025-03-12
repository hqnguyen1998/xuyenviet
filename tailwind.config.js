/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Ensure dark mode works
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/styles/globals.css',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
