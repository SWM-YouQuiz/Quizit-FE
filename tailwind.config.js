/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        screen: ['100vh', '100dvh'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'bg-primary': '#F8F8F8',
        'bg-secondary': '#D8D8D8',

        'point1': '#7B61E8',
        'point2': '#64D188',
        'point3': '#49AF86',
        'success': '#75D6FF',
        'error': '#FB276B',
        'bg-error': '#FFE3EC',

          primary: {
            50: '#F6F5FD',
            100: '#EEECFB',
            200: '#DDD9F6',
            400: '#BCB3ED',
            600: '#9A8DE5',
            800: '#7967DC',
            900: '#5741D3'
          },
          secondary: {
            900: '#0B0434',
            800: '#3C365D',
            600: '#6D6885',
            400: '#9D9BAE',
            200: '#CECDD6',
            100: '#E7E6EB',
            50: '#F3F3F5'
        }
      }
    },
  },
  plugins: [
      require("tailwindcss-inner-border"),
  ],
}
