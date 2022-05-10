module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        changeOpacity: {
          "0%": { opacity: "0.2" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        changeOpa: "changeOpacity 1s ease-in-out",
      },
      width: {
        45: "45%",
        22.5: "22.5%",
      },
      screens: {
        iphone: { max: "767px" },
        fablet: { min: "768px", max: "991px" },
        tablet: { max: "991px" },
        tablap: { min: "992px", max: "1198px" },
        laptop: { max: "1199px" },
        LCD: { min: "1200px", max: "1400px" },
      },
      colors: {
        "c-1": "#0000223b",
        "c-2-green": "#607027",
        "#eee": "#eee",
      },
      backgroundImage: {
        'signup': "url('./images/backgroundsignup.jpg')",
      },
      spacing: {
        "200px": "200px",
        "85px": "85px",
        "180px": "180px",
        "68px": "68px",
        "40px": "40px",
        "400px": "400px",
        "325px": "325px",
        "10px": "10px",
        "70px": "70px",
        "5px": "5px",
        // '60px': '60px',

        1.33: "1.33",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
