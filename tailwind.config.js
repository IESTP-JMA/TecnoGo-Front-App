/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        SenRegular: ["SenRegular"],
        SenMedium: ["SenMedium"],
        SenSemiBold: ["SenSemiBold"],
        SenBold: ["SenBold"],
        SenExtraBold: ["SenExtraBold"],
      },
    },
  },
  plugins: [],
};
