/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'floatSlow': 'float 10s ease-in-out infinite',
        'floatMedium': 'float 7s ease-in-out infinite',
        'floatFast': 'float 5s ease-in-out infinite',
        'bounce-short': 'bounceShort 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bounceShort: {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'ease-in-out' },
          '50%': { transform: 'translateY(-6px)', animationTimingFunction: 'ease-in-out' },
        },
      },
    },
  },
  plugins: [],
};
