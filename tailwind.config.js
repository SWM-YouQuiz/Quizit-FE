/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'bg-primary': '#F1F5F9',
      'bg-secondary': '#D9D9D9',

      'primary': '#5D5FEF',
      'secondary': '#A5A6F6'
    }
  },
  plugins: [],
}
