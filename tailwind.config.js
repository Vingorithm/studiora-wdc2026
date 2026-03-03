/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5D8BF4',
        secondary: '#C4B5FD',
        accent: '#FDBA74',
        background: '#F8FAFC',
        darkText: '#1E293B',
        success: '#22C55E',
        danger: '#F87171',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(93, 139, 244, 0.10)',
        card: '0 2px 16px rgba(30, 41, 59, 0.07)',
        glow: '0 0 32px rgba(93, 139, 244, 0.18)',
      },
      backgroundImage: {
        'aurora': 'linear-gradient(135deg, #5D8BF4 0%, #C4B5FD 100%)',
        'aurora-dark': 'linear-gradient(135deg, #1e1b4b 0%, #1e3a5f 50%, #0f172a 100%)',
        'aurora-soft': 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 50%, #FFF7ED 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}