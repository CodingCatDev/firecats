module.exports = {
  darkMode: 'class',
  presets: [require('./ccd-preset.js')],
  purge: ['./src/**/*.{js,mdx,jsx,tsx}', './next.config.js'],
};
