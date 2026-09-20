/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e5ede8',
          200: '#cbdbd1',
          300: '#a5c2b0',
          400: '#7ba28b',
          500: '#5c866e',
          600: '#476b56',
          700: '#3a5646',
          800: '#304539',
          900: '#283930',
        },
        primary: {
          DEFAULT: '#1b4332',
          hover: '#143527',
          light: '#2d6a4f',
          subtle: '#e8f5ee',
        },
        tealAccent: {
          DEFAULT: '#0f766e',
          light: '#ccfbf1',
          dark: '#115e59',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
