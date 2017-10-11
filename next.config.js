// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { client } = require('./scripts/contentful');

module.exports = {
  async exportPathMap() {
    const pages = {};

    try {
      const pagesData = await client.getEntries({
        content_type: 'page',
        select: 'sys.id,fields.slug',
      });

      pagesData.items.map((item) => {
        pages[`/${item.fields.slug}`] = {
          page: '/page',
          query: {
            id: item.sys.id,
          },
        };
        return true;
      });
    } catch (exception) {
      console.error(exception);
    }

    return pages;
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.css$/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]',
      },
    },
    {
      test: /\.css$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader'],
    });

    console.warn(dev ? 'Enviroment: DEVELOPMENT' : 'Enviroment: PRODUCTION');

    config.module.rules = config.module.rules.map((rule) => {
      if (rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false;
      }
      return rule;
    });

    // config.plugins.push(
    //   new FaviconsWebpackPlugin({
    //     logo: './static/assets/images/favicon.png',
    //     statsFilename: 'iconstats.json',
    //     inject: true,
    //   }),
    //   new HtmlWebpackPlugin(),
    // );

    return config;
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      ignored: /node_modules/,
      poll: 1000,
      aggregateTimeout: 1000,
    };
    return config;
  },
};
