/** @type {import('tailwindcss').Config} */
module.exports = {
  fontFamily: {
    sans: ['"Roboto"', 'sans-serif']
  },
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  darkMode: 'class', 
  plugins: [],
} 