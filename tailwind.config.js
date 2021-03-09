module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        light: {
          nav: "#F0F0F0",
          bg: "#FFFFFF",
          elev: "#f3f3f3",
          tpr: "#000000",
          tsec: "#8A8A8E",
          tter: "#C4C4C6",
          //colors
          primary: "#007aff",
        },
        dark: {
          nav: "#1C1C1E",
          bg: "#000000",
          elev: "#1C1C1E",
          tpr: "#FFFFFF",
          tsec: "#8D8D93",
          tter: "#47474A",
          // colors
          primary: "#0a84ff",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
