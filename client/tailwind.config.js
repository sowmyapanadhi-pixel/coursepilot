/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#818cf8", // Soft indigo
        secondary: "#f472b6", // Soft pink
        dark: "#f8fafc", // Very light pastel BG
        darker: "#f1f5f9", // Slightly darker pastel for sections
      }
    },
  },
  plugins: [],
}
