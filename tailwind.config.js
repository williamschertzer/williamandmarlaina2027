/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        moss: '#456347',
        fern: '#6f8f5d',
        river: '#477f8f',
        mist: '#edf4ef',
        clay: '#a36f4f',
        bark: '#46372c',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 45px rgba(41, 57, 45, 0.16)',
      },
    },
  },
  plugins: [],
};
