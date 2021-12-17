const postcssPresetEnv = require('postcss-preset-env');
module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    postcssPresetEnv({
      browsers: 'last 2 versions',
      features: {
        'nesting-rules': true,
      },
    }),
  ],
};
