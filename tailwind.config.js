/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          bg: '#07121A',
          card: '#0D1B22',
          cardHover: '#13242E',
          forest: '#315C3A',
          forestLight: '#3D7349',
          olive: '#71844A',
          oliveLight: '#8CA45C',
          gold: '#D4A84F',
          goldLight: '#E5BF6E',
          goldMuted: '#967431',
          offwhite: '#F5F5F0',
          textMuted: '#9FB1BC',
          border: '#1A2E3B',
          borderSubtle: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Cinzel"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow-green': '0 0 25px -5px rgba(49, 92, 58, 0.4)',
        'glow-gold': '0 0 25px -5px rgba(212, 168, 79, 0.35)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, rgba(113, 132, 74, 0.1) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
