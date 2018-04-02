// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const withCSS = require('@zeit/next-css');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const { getEntries, getTags } = require('./scripts/contentful');

module.exports = withCSS({
  async exportPathMap() {
    const pathMap = {};

    try {
      const pages = await getEntries('page');
      const posts = await getEntries('post');
      const tags = await getTags();

      // index
      pathMap['/'] = {
        page: '/',
        query: {
          posts,
        },
      };

      // tag overview
      pathMap['/tag'] = {
        page: '/',
        query: {
          tags,
          posts,
        },
      };

      // contentful pages
      pages.map((item) => {
        pathMap[item.url] = {
          page: '/page',
          query: {
            id: item.id,
            type: 'page',
          },
        };
        return true;
      });

      // contentful posts
      posts.map((item) => {
        pathMap[item.url] = {
          page: '/page',
          query: {
            id: item.id,
            type: 'post',
          },
        };
        return true;
      });

      // post tags
      await Promise.all(tags.map(async (tag) => {
        const tagPosts = await getEntries('post', tag);
        pathMap[`/tag/${tag}`] = {
          page: '/',
          query: {
            tag,
            tags,
            posts: tagPosts,
          },
        };
        return true;
      }));
    } catch (exception) {
      console.error(exception);
    }

    return pathMap;
  },

  webpack: (config, { dev }) => {
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

    config.devtool = 'source-map';

    if (!dev) config.plugins.push(new UglifyJSPlugin());

    if (config.resolve.alias) {
      delete config.resolve.alias.react;
      delete config.resolve.alias['react-dom'];
    }

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
});
