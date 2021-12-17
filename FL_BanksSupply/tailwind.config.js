module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/templates/*.html', './dist/*.html'],
    enabled: true,
  },
  darkMode: false,
  theme: {
    extend: {
      container: {
        center: true,
        padding: '15px',
      },
      fontSize: {
        '2.8xl': ['1.75rem'],
        '3.5xl': ['2.188rem'],
        '3.2xl': ['2rem'],
        '4.5xl': ['2.5rem'],
        '4.8xl': ['2.813rem', '1'],
        '5.5xl': ['3.125rem', '1'],
        '7.5xl': ['5rem', '1'],
        '8.5xl': ['6.25rem', '1'],
      },
      padding: {
        3.6: '0.938rem',
      },
      fontFamily: {
        larsseit: ['Larsseit', 'sans-serif'],
        buckwheat: ['Buckwheat TC', 'sans-serif'],
      },
      backgroundColor: {},
    },
  },
};
