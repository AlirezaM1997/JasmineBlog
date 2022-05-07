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
        'tablet': {'max': '992px'},
        // => @media (max-width: 992px) { ... }
        'laptop': {'max': '1199px'},
        'tablap': {'min': '992px', 'max': '1199px'},
      },
      color: {
        'c-1': '#0000223b',

      },
      
      spacing: {
        '200px': '200px',
        '85px': '85px',
        '180px': '180px',
        '68px': '68px',
        '40px': '40px',
        '400px': '400px',
        '325px': '325px',
        '10px': '10px',


        '1.33': '1.33',
        
      }
    },
  },
  plugins: [],
  darkMode: "class",
};
