/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Bebas Neue"', 'cursive'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#0D0D0D',
          charcoal: '#1A1A1A',
          accent: '#2E2E2E',
          white: '#FFFFFF',
          gray: '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
};
