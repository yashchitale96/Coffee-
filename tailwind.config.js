/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary palette based on Rajasthani theme
        rajasthani: {
          brown: {
            darkest: '#4A2C2A',
            dark: '#654321',
            DEFAULT: '#8B4513',
            medium: '#A0522D',
            light: '#CD853F',
          },
          gold: {
            dark: '#B8860B',
            DEFAULT: '#DAA520',
            light: '#FFD700',
          },
          amber: {
            dark: '#FF8C00',
            DEFAULT: '#FFA500',
            light: '#FFBF00',
          },
          accent: {
            red: '#C53030',
            pink: '#D53F8C',
            green: '#2F855A',
          }
        }
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'rajasthani-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFD700' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E\")",
        'rajasthani-gradient': 'linear-gradient(135deg, #8B4513 0%, #CD853F 25%, #DAA520 50%, #B8860B 75%, #8B4513 100%)',
      },
      animation: {
        'float': 'floating 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'rajasthani': '0 4px 14px 0 rgba(139, 69, 19, 0.3)',
        'rajasthani-lg': '0 10px 25px -5px rgba(139, 69, 19, 0.4)',
      },
    },
  },
  plugins: [],
};
