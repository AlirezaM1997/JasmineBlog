module.exports = {
  content: [],
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
        '45': "45%",
        '22.5': "22.5%",
      },
      colors: {
        'bb': '#00000066',
      },
    },
  },
  plugins: [],

  darkMode: "class",
};
