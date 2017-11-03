const { viewportsCss } = require('./source/js/viewports');

module.exports = () => ({
  plugins: {
    'postcss-import': {},
    'postcss-selector-matches': {},
    'postcss-url': {},
    'postcss-nested': {},
    'postcss-custom-media': {
      extensions: viewportsCss,
    },
    'postcss-calc': {},
    'postcss-pseudoelements': {},
    autoprefixer: {},
    'postcss-reporter': {
      clearMessages: true,
    },
  },
});
