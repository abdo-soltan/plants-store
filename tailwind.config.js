/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f3',
          100: '#dcece2',
          200: '#b9d8c8',
          300: '#8cbda7',
          400: '#5c9c81',
          500: '#3d7f64',
          600: '#2c6650',
          700: '#245142',
          800: '#1e4136',
          900: '#1b4332',
          950: '#0d2419',
        },
        sage: {
          50: '#f3f6f4',
          100: '#e1eae4',
          200: '#c3d5ca',
          300: '#9cb8a7',
          400: '#72967f',
          500: '#52796f',
          600: '#456358',
          700: '#3a5148',
          800: '#31423c',
          900: '#293833',
        },
        cream: '#faf9f6',
        gold: {
          400: '#d9b84a',
          500: '#c9a227',
          600: '#a9821e',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(27,67,50,0.10), 0 2px 8px -2px rgba(27,67,50,0.06)',
        card: '0 8px 30px -8px rgba(27,67,50,0.16)',
        glass: '0 8px 32px 0 rgba(27,67,50,0.12)',
      },
      backgroundImage: {
        'leaf-pattern': "radial-gradient(circle at 20% 20%, rgba(82,121,111,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(201,162,39,0.06) 0%, transparent 40%)",
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
