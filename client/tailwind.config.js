/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  options: {
    safelist: ["rounded-l-[4px]"],
  },
  theme: {
    extend: {
      fontFamily: {
        billy: ["Billy", "sans-serif"], // Add Billy font family
      },
    },
  },
  plugins: [],
};
