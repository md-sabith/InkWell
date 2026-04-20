/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        paper: {
          50: '#FFFFFF',   // Pure White for cards
          100: '#F4F7F6',  // Cool Off-white for background
          200: '#E2E8F0',  // Subtle Borders
        },
        ink: {
          DEFAULT: '#1A1C1E', // Deep Charcoal-Blue
          light: '#4A6274',   // Steel Blue for secondary
        },
        accent: {
          DEFAULT: '#5B7B7A', // Sage Green
          dark: '#465F5E',
        }
      },
      fontFamily: {
        serif: ['Lora', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'nordic': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'manuscript': '0 2px 15px -3px rgba(0, 0, 0, 0.07)',
      }
    },
  },
  plugins: [],
}
