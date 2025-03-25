/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",  // Includes all files inside /app folder
      "./components/**/*.{js,ts,jsx,tsx}", // Optional: If you use a /components folder
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  