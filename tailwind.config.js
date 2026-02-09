/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1745cf",
        "background-light": "#f6f6f8",
        "background-dark": "#111521",
      },
    },
  },
  plugins: [],
}
