// @type { import('tailwindcss').Config }
// module.exports = {
//  darkMode: "class",
//  content: [
//    "./index.html",
//    "./src/**/*.{js,ts,jsx,tsx}",
//    "node_modules/@windmill/react-ui/lib/defaultTheme.js",
//    "node_modules/@windmill/react-ui/dist/index.js",
//  ],
//  theme: {
//    extend: {},
//  },
//  plugins: [],
// }; 

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#50eb17",
        secondary: "#308212",
        dark: "#1e1e1e",
        light: "#f5f5f5",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      animation: {
        "spin-slow": "spin 40s linear infinite",
      },
    },
  },
  plugins: [],
};