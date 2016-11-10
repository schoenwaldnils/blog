import gulp from 'gulp';

// CSS
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-easy-import';
import postcssUrl from 'postcss-url';
import postcssNested from 'postcss-nested';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssCalc from 'postcss-calc';
import postcssColorFunction from 'postcss-color-function';
import postcssCustomMedia from 'postcss-custom-media';
import postcssPseudoelements from 'postcss-pseudoelements';
import autoprefixer from 'autoprefixer';

// JS
import babel from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import exit from 'gulp-exit';
import source from 'vinyl-source-stream';
import watchify from 'watchify';

// SVG
import plumber from 'gulp-plumber';
import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';

// LINT
import stylelint from 'gulp-stylelint';
import eslint from 'gulp-eslint';

// GH-PAGES
import ghPages from 'gulp-gh-pages';

// FAVICONS
import realFavicon from 'gulp-real-favicon';
import fs from 'fs';


const dirs = {
  src: 'source/',
  dest: 'build/'
};

const main = {
  css: 'main.css',
  js: 'main.js'
}

const globs = {
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

// Build
gulp.task('build:css', () => {
  return gulp.src(dirs.src + main.css)
    .pipe(postcss([
      postcssImport({ glob: true }),
      postcssUrl(),
      postcssNested(),
      postcssCustomProperties(),
      postcssCalc(),
      postcssColorFunction(),
      postcssCustomMedia(),
      postcssPseudoelements(),
      autoprefixer()
    ]))
    .pipe(gulp.dest(dirs.dest));
});

function compileJS(flag) {
  const bundler = watchify(browserify(dirs.src + main.js, { debug: true }).transform(babel));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', (err) => {
        console.error(err);
        this.emit('end');
      })
      .pipe(plumber())
      .pipe(source(main.js))
      .pipe(buffer())
      .pipe(gulp.dest(dirs.dest));
  }

  if (flag) {
    bundler.on('update', (ids) => {
      console.log(`-> bundling... ${ids}`);
      rebundle();
    });

    rebundle();
  } else {
    rebundle().pipe(exit()); // REVIEW
  }
}

gulp.task('build:js', () => compileJS());

gulp.task('svgmin-color', () => {
  return gulp.src(globs.svgColor)
    .pipe(plumber())
    .pipe(svgmin({
      plugins: [
        {removeTitle: true}
      ]
    })).on('error', error => { console.log(error); })
    .pipe(gulp.dest(dirs.dest + 'svgs/'));
});

gulp.task('svgmin-mono', () => {
  return gulp.src(globs.svgMono)
    .pipe(plumber())
    .pipe(svgmin({
      plugins: [
        {removeTitle: true},
        {removeAttrs: {
          attrs: 'fill'
        }}
      ]
    })).on('error', error => { console.log(error); })
    .pipe(gulp.dest(dirs.dest + 'svgs/'));
});

gulp.task('build:svg-sprite', ['svgmin-color', 'svgmin-mono'], () => {
  const config = {
    mode: {
      symbol: {
        render: {
          css: {
            template: '.svgSpriterc'
          }
        },
        prefix: ".Svg--%s",
        dimensions: "%s",
        example: true
      }
    }
  };

  return gulp.src(globs.svgCleaned)
    .pipe(plumber())
    .pipe(svgSprite(config)).on('error', error => { console.log(error); })
    .pipe(gulp.dest(dirs.dest + 'svg-sprite/'));
});

gulp.task('build', ['build:css', 'build:js']);

// Lint
gulp.task('lint:css', () => {
  return gulp.src(globs.css)
  .pipe(plumber())
  .pipe(stylelint({
    reporters: [
      {formatter: 'string', console: true}
    ]
  }));
});

gulp.task('lint:js', () => gulp.src(globs.js)
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
);

gulp.task('lint', ['lint:css', 'lint:js']);

// Watch
gulp.task('watch:css', () => gulp.watch(globs.css, ['build:css']));

gulp.task('watch:js', () => compileJS(true));

gulp.task('watch', ['watch:css', 'watch:js']);

gulp.task('deploy', () => {
  return gulp.src('./_site/**/*')
    .pipe(ghPages());
});


// File where the favicon markups are stored
const FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('favicon', done => {
  realFavicon.generateFavicon({
    masterPicture: `${dirs.src}assets/images/favicon.png`,
    dest: `${dirs.dest}favicons`,
    iconsPath: `/${dirs.dest}favicons`,
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#cccccc',
        margin: '14%',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#cccccc',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#cccccc',
        manifest: {
          name: 'schoenwald.media',
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      }
    },
    settings: {
      compression: 1,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    versioning: {
      paramName: 'v',
      paramValue: 'm2d7xOWWzl'
    },
    markupFile: FAVICON_DATA_FILE
  }, () => {
    done();
  });

  gulp.src([ '_includes/favicons.html' ])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('_includes'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', done => {
  const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, err => {
    if (err) {
      throw err;
    }
  });
});
