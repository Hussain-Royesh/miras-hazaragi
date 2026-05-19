import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#4B5E3A',
          dark: '#3A4A2C',
          light: '#6B7E5A',
        },
        gold: {
          DEFAULT: '#C4922A',
          light: '#D4A84A',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          dark: '#F0EBE0',
        },
        offwhite: '#FDFCFA',
        muted: '#5A5A5A',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'sans-serif'],
      },
      animation: {
        ticker: 'ticker 28s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
