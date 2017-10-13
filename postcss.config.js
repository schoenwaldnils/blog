const path = require('path');
const webpackPostcssTools = require('webpack-postcss-tools');

const map = webpackPostcssTools.makeVarMap(path.resolve(__dirname, 'source/css/mediaQueries.css'));

module.exports = () => ({
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-nested': {},
    'postcss-custom-media': {
      extensions: map.media,
    },
    'postcss-calc': {},
    'postcss-pseudoelements': {},
    autoprefixer: {},
    'postcss-reporter': {
      clearMessages: true,
    },
  },
});
