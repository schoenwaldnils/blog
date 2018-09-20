const { viewportsCss } = require('./source/js/viewports');

module.exports = () => ({
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-nested': {},
    'postcss-custom-media': {
      importFrom: [{
        customMedia: viewportsCss,
      }],
    },
    'postcss-calc': {},
    'postcss-pseudoelements': {},
    autoprefixer: {},
    'postcss-reporter': {
      clearMessages: true,
    },
  },
});
