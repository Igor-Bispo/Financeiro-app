/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/index.html',
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Habilita o modo escuro baseado em classes
  theme: {
    extend: {
      colors: {
        // Usa a variável CSS para permitir alpha (`text-primary/80`, `bg-primary/10`, etc.)
        primary: 'rgb(var(--primary-color-rgb) / <alpha-value>)',
      },
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  safelist: [
    // Garantir classes usadas no botão de tema e overlays
    'fixed', 'z-50', 'right-4', 'bottom-24', 'md:right-6', 'md:bottom-28',
  ],
  plugins: [],
};
