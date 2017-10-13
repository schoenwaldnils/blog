// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const { getEntries, getTags } = require('./scripts/contentful');

module.exports = {
  async exportPathMap() {
    const pathMap = {};

    try {
      const pages = await getEntries('page');
      const posts = await getEntries('post');
      const tags = await getTags();

      // index
      pathMap['/'] = {
        page: '/index',
        query: {
          posts,
        },
      };

      pages.map((item) => {
        pathMap[item.url] = {
          page: '/page',
          query: {
            id: item.id,
          },
        };
        return true;
      });

      posts.map((item) => {
        pathMap[item.url] = {
          page: '/page',
          query: {
            id: item.id,
          },
        };
        return true;
      });

      await Promise.all(tags.map(async (tag) => {
        const tagPosts = await getEntries('post', tag);
        pathMap[`/tag/${tag}`] = {
          page: '/tag',
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
    config.module.rules.push(
      {
        test: /\.css$/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader'],
      },
    );

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

    if (!dev) config.plugins.push(new UglifyJSPlugin());

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
