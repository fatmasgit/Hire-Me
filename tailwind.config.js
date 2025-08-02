const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        Hero: "url('./components/Home/work.jpg')",
        overlay:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.5) 100%);",
          employers: "url('./components/forEmployers/employers.jpg')",
          colors: "url('./components/forEmployers/colors.avif')",

        },
      fontFamily: {
        /*en */
        PoppinsLight: ["PoppinsLight"],
        PoppinsRegular: ["PoppinsRegular"],
        PoppinsBold: ["PoppinsBold"],
        PoppinsMedium: ["PoppinsMedium"],
        PoppinsSemiBold: ["PoppinsSemiBold"],
        /*ar */
        TajawalLight: ["TajawalLight"],
        TajawalRegular: ["TajawalRegular"],
        TajawalBold: ["TajawalBold"],
        TajawalMedium: ["TajawalMedium"],
      },
      colors: {
        "black-35": "rgba(0, 0, 0, 0.40)",
        "black-0": "rgba(0, 0, 0, 0.20)",
      },

      screens: {
        xs: "300px", // no sreen for mobile so i had to create one
     
      },


    },
  },
  plugins: [
  
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".bg-multiple": {
          backgroundImage:
            "url('./components/Home/shadow.svg'), url('./components/Home/dots.svg')",
          backgroundSize: "35%, 45%",
          backgroundPosition: "right top, left bottom",
          backgroundRepeat: "no-repeat",
        },
      });
    }),
  ],
};
