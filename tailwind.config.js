/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}"
  ],
  safelist: [
    {
      pattern: /bg-/,
    },
    {
      pattern: /text-/,
    },
    {
      pattern: /border-/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8",
        "background-light": "#ffffff",
        "background-dark": "#0f172a",
      },
    },
  },
  plugins: [],
}
