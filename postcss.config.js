const viewportsCss = require('./source/js/viewportsCss.js')

module.exports = () => ({
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-nested': {},
    'postcss-custom-media': {
      importFrom: [
        {
          customMedia: viewportsCss,
        },
      ],
    },
    'postcss-calc': {},
    'postcss-easing-gradients': {},
    'postcss-pseudoelements': {},
    autoprefixer: {},
    'postcss-reporter': {
      clearMessages: true,
    },
  },
})
