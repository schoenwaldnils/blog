module.exports = {
  exportPathMap() {
    return {
      '/': { page: '/' },
    };
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
