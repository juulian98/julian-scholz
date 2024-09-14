const defaultTheme = require('tailwindcss/defaultTheme')
const {TAILWIND_COLORS} = require("./tailwind.colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'selector',
  theme: {
    colors: TAILWIND_COLORS,
    fontFamily: {
      sans: ['Geist Sans', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      transitionTimingFunction: {
        'header-nav-function': 'linear(' +
          '0 0%, 0.0012 14.95%, 0.0089 22.36%,' +
          '0.0297 28.43%, 0.0668 33.43%,' +
          '0.0979 36.08%, 0.1363 38.55%,' +
          '0.2373 43.07%, 0.3675 47.01%,' +
          '0.5984 52.15%, 0.7121 55.23%,' +
          '0.8192 59.21%, 0.898 63.62%,' +
          '0.9297 66.23%, 0.9546 69.06%,' +
          '0.9733 72.17%, 0.9864 75.67%,' +
          '0.9982 83.73%, 1 100%' +
          ');'
      },
      keyframes: {
        themeModeToggleRevealDark: {
          'from': {
            'clip-path': 'circle(60% at 200% -200%)',
            'filter': 'brightness(0.2)'
          },
          '40%': {
            'clip-path': 'circle(60% at 50% 50%)',
            'filter': 'brightness(0.2)'
          },
          'to': {
            'clip-path': 'circle(100% at 50% 50%)',
            'filter': 'brightness(1)'
          }
        },
        themeModeToggleRevealLight: {
          '0%': {
            'clip-path': 'circle(100% at 50% 50%)',
            'filter': 'brightness(1)'
          },
          '20%': {
            'clip-path': 'circle(60% at 50% 50%)',
            'filter': 'brightness(0.2)'
          },
          '100%': {
            'clip-path': 'circle(60% at -200% 200%)',
            'filter': 'brightness(0.2)'
          }
        },
        favoritesOverlayLoop: {
          '0%': {
            'transform': 'translateX(0)'
          },
          '100%': {
            'transform': 'translateX(-50%)'
          }
        }
      }
    }
  },
  plugins: [],
}

