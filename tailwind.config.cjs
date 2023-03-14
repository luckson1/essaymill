/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

    //...
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["winter", "dark", "light"],
    },

};

module.exports = config;
