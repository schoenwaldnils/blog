const path = require('path');
const webpackPostcssTools = require('webpack-postcss-tools');

const map = webpackPostcssTools.makeVarMap(path.resolve(__dirname, 'source/css/theme.css'));

module.exports = () => ({
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-nested': {},
    'postcss-css-variables': {
      variables: map.vars,
    },
    'postcss-custom-media': {
      extensions: map.media,
    },
    'postcss-color-function': {},
    'postcss-calc': {},
    'postcss-pseudoelements': {},
    autoprefixer: {},
    'postcss-reporter': {
      clearMessages: true,
    },
  },
});
