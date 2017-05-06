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
    `${paths.dirs.src}components/**/*.css`,
    `${paths.dirs.src}styles/**/*.css`,
    `${paths.dirs.src}main.css`,
  ],
  js: [
    `${paths.dirs.src}components/**/*.js`,
    `${paths.dirs.src}scripts/**/*.js`,
    `${paths.dirs.src}main.js`,
  ],
  svgCleaned: [
    `${paths.dirs.dest}svgs/**/*.svg`,
  ],
  svgColor: [
    `${paths.dirs.src}assets/images/svgs/color/*.svg`,
  ],
  svgMono: [
    `${paths.dirs.src}assets/images/svgs/monochrome/*.svg`,
  ],
};

module.exports = paths;
