module.exports = {
  content: [],
  theme: {
    extend: {
      keyframes: {
        'changeOpacity': {
          "0%": { opacity: "0.2" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        'changeOpa': "changeOpacity 1s ease-in-out",
      },
    },
  },
  plugins: [],
  
    darkMode: 'class',

};
