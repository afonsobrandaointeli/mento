/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [],
    theme: {
      extend: {
        colors: {
          'deep-purple': '#2D2540',
          'light-gray': '#F2F2F2',
          'soft-red': '#D94A4A',
          'soft-pink': '#D95970',
          'dark-wine': '#591D33'
        }
      }
    }
  }