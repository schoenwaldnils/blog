const path = require('path');
const webpackPostcssTools = require('webpack-postcss-tools');

const map = webpackPostcssTools.makeVarMap(path.resolve(__dirname, 'source/css/theme.css'));

module.exports = () => ({
  plugins: {
    'postcss-import': {},
    'postcss-css-variables': {
      variables: map.vars,
    },
    'postcss-custom-media': {
      extensions: map.media,
    },
    'postcss-color-function': {},
    'postcss-calc': {},
    autoprefixer: {},
    'postcss-reporter': {
      clearMessages: true,
    },
  },
});
