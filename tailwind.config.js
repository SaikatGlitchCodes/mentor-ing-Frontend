/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        pulses: 'pulses 5s ease-in-out infinite',
      },
      keyframes: {
        pulses: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        }
      }
    }
  },
  daisyui: {
    themes: [],
    },
  plugins: [require('daisyui')]
}
