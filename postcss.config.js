const { viewportsCss } = require('./source/js/viewports');

module.exports = () => ({
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-nested': {},
    'postcss-custom-media': {
      extensions: viewportsCss,
    },
    'postcss-calc': {},
    'postcss-easing-gradients': {},
    'postcss-pseudoelements': {},
    autoprefixer: {},
    'postcss-reporter': {
      clearMessages: true,
    },
  },
});
