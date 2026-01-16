/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        'brand-bg': 'var(--color-bg)',
        'brand-surface': 'var(--color-surface)',
        'brand-primary': 'var(--color-primary)',
        'brand-secondary': 'var(--color-secondary)',
        'brand-text': 'var(--color-text)',
        'brand-subtle': 'var(--color-subtle)',
        'brand-border': 'var(--color-border)',
        'brand-code-bg': 'var(--color-code-bg)',
        'brand-code-text': 'var(--color-code-text)',
        'brand-input-bg': 'var(--color-input-bg)',
      },
      fontSize: { /* Explicitly define text sizes to set a matching line-height for better icon alignment */
        'xs': ['0.75rem', { lineHeight: '0.75rem' }], /* 12px / 12px */
        'sm': ['0.875rem', { lineHeight: '0.875rem' }], /* 14px / 14px */
        'xl': ['1.25rem', { lineHeight: '1.25rem' }], /* 20px / 20px */
      },
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
        'fade-in-down': 'fade-in-down 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'scale-up': 'scale-up 0.2s ease-out forwards',
        'flicker-glow': 'flicker-glow 0.7s ease-in-out',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'scale-up': {
          'from': { opacity: '0.9', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        'flicker-glow': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 0px transparent)',
            transform: 'scale(1)'
          },
          '50%': {
            filter: 'drop-shadow(0 0 8px var(--color-glow))',
            transform: 'scale(1.05)'
          }
        },
      },
      boxShadow: {
        'glow-primary': '0 0 15px var(--color-glow)',
      }
    }
  },
  plugins: [],
}