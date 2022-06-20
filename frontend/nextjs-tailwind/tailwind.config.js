module.exports = {
  darkMode: 'class',
  presets: [require('./fb-preset.js')],
  content: ['./src/**/*.{js,mdx,jsx,tsx}', './next.config.js'],
  plugins: [require('@tailwindcss/forms')],
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
};
