/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2A368C",
        secondary: "#f9c9e1",
        vert: {
          100: "#7ad98e",
        },
        rouge: {
          100: "#FE1C6D",
        },
        champ: "#D1D6FB",
        gris: {
          50: "#D0CCC2",
        },
      },
      fontFamily: {
        pbayon: ["Bayon-Regular", "sans-serif"],
        pmontserratbold: ["Montserrat-Bold", "sans-serif"],
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}
