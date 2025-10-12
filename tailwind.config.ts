import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-light': '#777',
        'gray-dark': '#222',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      keyframes: {
        slideFromTop: {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        slideFromRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '100%': { left: '150%' },
        },
        boxShadow: {
          '0%': { boxShadow: '0 0 0 rgba(0, 0, 0, 0)' },
          '100%': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' },
        },
      },
      animation: {
        'slideFromTop': 'slideFromTop 0.2s ease-out',
        'slideFromRight': 'slideFromRight 0.2s ease-out',
        'fadeIn': 'fadeIn 0.2s ease-out',
        'fadeIn-slow': 'fadeIn 0.3s ease-in-out',
        'spin': 'spin 0.8s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'boxShadow': 'boxShadow 0.5s forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
