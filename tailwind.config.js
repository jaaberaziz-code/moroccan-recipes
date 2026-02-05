/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
          DEFAULT: '#E07A5F',
          light: '#F4A896',
          dark: '#C65A45',
        },
        majorelle: {
          DEFAULT: '#3D5A80',
          light: '#5E7A9E',
          dark: '#2A3F5C',
        },
        saffron: {
          DEFAULT: '#F2CC8F',
          light: '#F5DDB3',
          dark: '#D9A85C',
        },
        sand: {
          DEFAULT: '#F2E8D5',
          light: '#F7F1E6',
          dark: '#C9B896',
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
          light: '#3D3D3D',
          dark: '#1A1A1A',
        },
      },
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'Tajawal', 'system-ui', 'sans-serif'],
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