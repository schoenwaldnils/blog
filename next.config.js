const withCSS = require('@zeit/next-css');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const Dotenv = require('dotenv-webpack');

const exportPathMap = require('./scripts/exportPathMap');

module.exports = withCSS({
  serverRuntimeConfig: { // Will only be available on the server side
  },
  publicRuntimeConfig: { // Will be available on both server and client
  },
  exportPathMap: async () => exportPathMap({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_PREVIEW ?
      process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_TOKEN,
    host: process.env.CONTENTFUL_PREVIEW && 'preview.contentful.com',
  }),

  webpack: (config, { dev }) => {
    console.warn(`Enviroment: ${dev ? 'DEVELOPMENT' : 'PRODUCTION'}`);

    // Silence mini-css-extract-plugin generating lots of warnings for CSS ordering.
    // We use CSS modules that should not care for the order of CSS imports, so we
    // should be safe to ignore these.
    //
    // See: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
    config.plugins.push(new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
    }));

    if (dev) {
      config.plugins.push(new Dotenv());
    }

    return config;
  },
});
