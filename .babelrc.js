const env = {
  VERSION: require('./package').version,
  'process.env.CONTENTFUL_SPACE': process.env.CONTENTFUL_SPACE,
  'process.env.CONTENTFUL_TOKEN': process.env.CONTENTFUL_TOKEN,
  'process.env.CONTENTFUL_PREVIEW_TOKEN': process.env.CONTENTFUL_PREVIEW_TOKEN,
  'process.env.CONTENTFUL_MANAGEMENT_TOKEN': process.env.CONTENTFUL_MANAGEMENT_TOKEN,
}

module.exports = {
  presets: ['next/babel'],
  plugins: [
    'inline-react-svg',
    ['transform-define', env],
    ['styled-components', {
      'ssr': true,
      'displayName': true,
      'preprocess': false,
    }],
  ]
};
