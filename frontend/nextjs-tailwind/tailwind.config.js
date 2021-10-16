module.exports = {
  darkMode: 'class',
  presets: [require('./fb-preset.js')],
  purge: ['./src/**/*.{js,mdx,jsx,tsx}', './next.config.js'],
  plugins: [require('@tailwindcss/forms')],
};
