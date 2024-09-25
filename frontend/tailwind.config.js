/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Add this to scan your source files for Tailwind CSS classes
    './public/index.html',        // Add this to include your HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
