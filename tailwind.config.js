/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#F87070',
        aqua: '#70F3F8',
        lavender: '#D881F8',
        white: '#FFFFFF',
        paleBlue: '#D7E0FF',
        midnightBlue: '#1E213F',
        frost: '#EFF1FA',
        deepNavy: '#161932',
        modal: 'rgba(10, 12, 28, 0.5)',
        accent: 'var(--accent-clr)'
      }
    },
    fontFamily: {
      'KumbhSans': ['Kumbh Sans', 'sans-serif'],
      'RobotoSlab': ['Roboto Slab', 'serif'],
      'SpaceMono': ['Space Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', '0.875rem'],
      s: ['0.8125rem', '1rem'],
      sm: ['0.875rem', '1.125rem'],
      base: ['1rem', '1.1875rem'],
      m: ['1.25rem', '1.5rem'],
      large: ['1.5rem', '1.875rem'],
      xl: ['1.75rem', '2.125rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['5rem', '7.5rem'],
      '4xl': ['6.25rem', '7.75rem'],
    }
  },
  plugins: []
}
