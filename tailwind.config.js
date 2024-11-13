/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        loader: "loader 3s linear infinite",
      },
      keyframes: {
        loader: {
          "0%": { backgroundPosition: "-800px 0px", opacity:1 },
          "50%": {opacity:.5},
          "100%": { backgroundPosition: "800px 0px", opacity:1 },
        },
      },
    },
  },
  plugins: [],
};
