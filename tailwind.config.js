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
        'bg-secondary': '#D9D9D9',

        'point1': '#7A72EE',
        'point2': '#64D188',
          'point3': '#49AF86',
        'success': '#75D6FF',
        'error': '#FF7A7A',

          primary: {
            50: '#F7F5FD',
              200: '#DDD9F6',
              400: '#BCB3ED',
              600: '#9A8DE5',
              800: '#7967DC',
              900: '#5741D3'
          },
        'black': '#0B0434',

      }
    }
  },
  plugins: [],
}
