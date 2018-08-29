const env = {
  VERSION: require('./package').version,
  'process.env.CONTENTFUL_SPACE': process.env.CONTENTFUL_SPACE,
  'process.env.CONTENTFUL_TOKEN': process.env.CONTENTFUL_TOKEN,
  'process.env.CONTENTFUL_PREVIEW_TOKEN': process.env.CONTENTFUL_PREVIEW_TOKEN,
  'process.env.CONTENTFUL_MANAGEMENT_TOKEN': process.env.CONTENTFUL_MANAGEMENT_TOKEN,
}

module.exports = {
  presets: [
    ['next/babel', {
      'preset-env': {
        modules: 'commonjs',
      }
    }]
  ],
  plugins: [
    'inline-react-svg',
    ['transform-define', env],
  ]
};
