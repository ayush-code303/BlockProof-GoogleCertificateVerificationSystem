// tailwind.config.js ke andar
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0f1724',
        'brand-primary': ({ opacityValue }) => {
          if (opacityValue !== undefined) return `rgba(59,130,246,${opacityValue})`
          return '#3b82f6'
        },
        'brand-secondary': ({ opacityValue }) => {
          if (opacityValue !== undefined) return `rgba(139,92,246,${opacityValue})`
          return '#8b5cf6'
        },
        'brand-accent': ({ opacityValue }) => {
          if (opacityValue !== undefined) return `rgba(6,182,212,${opacityValue})`
          return '#06b6d4'
        }
      },
      animation: {
        'scan-move': 'scan 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'glow': 'glow 2.5s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(400px)' }, // Height of your card
        },
        glow: {
          '0%': { opacity: '0.85', filter: 'blur(0px)' },
          '50%': { opacity: '1', filter: 'blur(6px)' },
          '100%': { opacity: '0.85', filter: 'blur(0px)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    }
  },
  plugins: []
}