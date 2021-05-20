module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {
      safelist: [
        /bg-dark/,
        /bg-light/,
        /bg-rose/,
        /bg-mirage/,
        /text-dark/,
        /text-light/,
        /text-rose/,
        /text-mirage/,
        /border-dark/,
        /border-light/,
        /border-rose/,
        /border-mirage/,
      ],
    },
  },
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
          heat: "#d9d9d9",
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
          heat: "#313135",
          // colors
          primary: "#C8FF3A", //C8FF3A
        },
        mirage: {
          nav: "#1C1C1E",
          bg: "#23232f",
          elev: "#22222e",
          tpr: "#FFFFFF",
          tsec: "#8D8D93",
          tter: "#47474A",
          heat: "#313135",
          // colors
          primary: "#FF476C", //fe568d
        },
        rose: {
          nav: "#F0F0F0",
          bg: "#FFFFFF",
          elev: "#fff8fa",
          tpr: "#000000",
          tsec: "#8A8A8E",
          tter: "#C4C4C6",
          heat: "#d9d9d9",
          //colors
          primary: "#ff4268", //C8FF3A
        },
        magma: {
          1: "#007AFF",
          2: "#3EDDEF", //00FFD9
          3: "#C8FF3A",
          4: "#FBD16A",
          5: "#FF476C",
          6: "#CF318A", //AE8CA3
        },
        // magma: {
        //   1: "#007AFF",
        //   2: "#3EDDEF", //00FFD9
        //   3: "#C8FF3A",
        //   4: "#FBD16A",
        //   5: "#FF476C",
        //   6: "#CF318A", //AE8CA3
        // },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
