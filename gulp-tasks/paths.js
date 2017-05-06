const paths = {
  dirs: {
    src: 'source/',
    dest: 'build/',
  },
  main: {
    css: 'main.css',
    js: 'main.js',
  },
};

paths.globs = {
  css: [
    dirs.src + 'components/**/*.css',
    dirs.src + 'styles/**/*.css',
    dirs.src + 'main.css'
  ],
  js: [
    dirs.src + 'components/**/*.js',
    dirs.src + 'scripts/**/*.js',
    dirs.src + 'main.js'
  ],
  svgCleaned: [
    dirs.dest + 'svgs/**/*.svg',
  ],
  svgColor: [
    dirs.src + 'assets/images/svgs/color/*.svg',
  ],
  svgMono: [
    dirs.src + 'assets/images/svgs/monochrome/*.svg',
  ],
};

module.exports = paths;
