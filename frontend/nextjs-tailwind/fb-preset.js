module.exports = {
  // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['nunito', 'ui-sans-serif'],
      serif: ['nunito', 'ui-serif'],
      mono: ['nunito', 'ui-monospace'],
      heading: ['Henny Penny', 'nunito', 'ui-monospace'],
      light: ['nunito-light', 'ui-sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      basics: {
        50: '#FBFBFB',
        100: '#F1F1F1',
        200: '#DCDCDC',
        300: '#B3AFB5',
        400: '#7F7982',
        500: '#6E6B70',
        600: '#333034',
        700: '#1E1D1F',
        800: '#141214',
        900: '#171717',
      },
      primary: {
        50: '#e8eaf6',
        100: '#c5cbe9',
        200: '#9fa8da',
        300: '#7985cb',
        400: '#5c6bc0',
        500: '#3f51b5',
        600: '#394aae',
        700: '#3140a5',
        800: '#29379d',
        900: '#1b278d',
      },
      secondary: {
        50: '#fff9e5',
        100: '#ffefbf',
        200: '#ffe594',
        300: '#ffda69',
        400: '#ffd248',
        500: '#ffca28',
        600: '#ffc524',
        700: '#ffbd1e',
        800: '#ffb718',
        900: '#ffab0f',
      },
      error: {
        50: '#FFEBEC',
        100: '#FFCDCF',
        200: '#FFACAF',
        300: '#FF8B8F',
        400: '#FF7277',
        500: '#FF595F',
        600: '#FF5157',
        700: '#FF484D',
        800: '#FF3E43',
        900: '#FF2E32',
      },
      success: {
        50: '#F5FDF9',
        100: '#EAFBF2',
        200: '#CBF5E0',
        300: '#ABEFCD',
        400: '#6CE4A7',
        500: '#2DD881',
        600: '#29C274',
        700: '#1B824D',
        800: '#14613A',
        900: '#0E462A',
      },
      yellow: {
        50: '#FFC700',
      },
    },
    extend: {
      boxShadow: {
        outline: '0 0 0 3px #FC5390',
      },
      flex: {
        full: '0 0 auto',
      },
      gridTemplateColumns: {
        admin: 'minmax(64px, auto) 1fr;',
        auto: 'auto',
        fit: 'repeat(auto-fit, minmax(300px, 1fr))',
        hero: '1.5fr 2fr',
        sidebar: '1fr minmax(200px, 25%)',
        search: '52px 1fr',
        settings: 'minmax(200px, 20%) 1fr',
      },
      gridTemplateRows: {
        admin: '100px auto auto',
        'auto-2': 'auto 1fr',
        sidebar: '100px 1fr 100px',
        search: '38px 1fr auto',
      },
      height: {
        35: '35px',
        500: '500px',
        610: '610px',
      },
      minHeight: {
        '1/2': '50%',
        300: '300px',
        1080: '1080px',
      },
      minWidth: {
        300: '300px',
      },
      maxWidth: {
        '8xl': '2000px',
      },
      scale: {
        '-1': '-1',
      },
      screens: {
        '3xl': '2000px',
      },
      width: {
        35: '35px',
        80: '80vw',
      },
    },
    customForms: (theme) => ({
      default: {
        'input, textarea, multiselect': {
          // backgroundColor: theme('colors.gray.200'),
          // color: theme('colors.gray.200'),
        },
      },
    }),
  },
};
