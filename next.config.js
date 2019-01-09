const withCSS = require('@zeit/next-css');
const withPurgeCss = require('next-purgecss');
const Dotenv = require('dotenv-webpack');

const exportPathMap = require('./scripts/exportPathMap');

module.exports = withCSS(withPurgeCss({
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

    if (dev) {
      config.plugins.push(new Dotenv());
    }

    return config;
  },
}));
