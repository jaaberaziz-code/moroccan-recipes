/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Morocco-inspired palette
        terracotta: {
          DEFAULT: '#C65D3B',
          light: '#D97B5D',
          dark: '#A34A2E',
        },
        majorelle: {
          DEFAULT: '#1E5AA8',
          light: '#4A7FC4',
          dark: '#0F3D7A',
        },
        saffron: {
          DEFAULT: '#F4C430',
          light: '#F9D76A',
          dark: '#D4A820',
        },
        sand: {
          DEFAULT: '#E8DCC4',
          light: '#F5F0E6',
          dark: '#C9B896',
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
          light: '#4A4A4A',
          dark: '#1A1A1A',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}