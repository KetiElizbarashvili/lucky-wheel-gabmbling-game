/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      screens: {
        'sm-md': { max: '800px' }, 
        'xs-sm': { max: '600px' }, 
      },
    }, 
  },
  plugins: [],
};
 