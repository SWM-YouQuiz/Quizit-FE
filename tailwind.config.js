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
        'bg-primary': '#F1F5F9',
        'bg-secondary': '#D9D9D9',

        'primary': '#5D5FEF',
        'secondary': '#A5A6F6',
        'success': '#75D6FF',
        'error': '#FF7A7A'
      }
    }
  },
  plugins: [],
}
