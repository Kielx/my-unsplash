const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        grayGray: colors.gray,
        dp00: "#121212",
        dp01: "#1e1e1e",
        dp02: "#222222",
        dp03: "#242424",
        dp04: "#272727",
        dp06: "#2c2c2c",
        dp08: "#2e2e2e",
        dp12: "#333333",
        dp16: "#343434",
        dp24: "#383838",
        dprimary: "#ffffff",
        dsecondary: "#B3FFFFFF",
        ddisabled: "#80FFFFFF",
        ddivider: "#1FFFFFFF",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
