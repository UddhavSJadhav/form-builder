/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
