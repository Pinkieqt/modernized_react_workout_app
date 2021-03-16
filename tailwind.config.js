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
          primary: "#C8FF3A",
        },
        magma: {
          1: "#007AFF",
          2: "#3EDDEF", //00FFD9
          3: "#C8FF3A",
          4: "#FBD16A",
          5: "#FF476C",
          6: "#CF318A", //AE8CA3
        },
        // magmabackup: {
        //   1: "#007AFF",
        //   2: "#7CE4E8", //00FFD9
        //   3: "#E8FD5D",
        //   4: "#8FA5F5",
        //   5: "#F35361",
        //   6: "#FCB0B3", //AE8CA3
        // },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
