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
import sourcemaps from 'gulp-sourcemaps';
import watchify from 'watchify';

// SVG
import plumber from 'gulp-plumber';
import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';

// LINT
import stylelint from 'gulp-stylelint';
import eslint from 'gulp-eslint';

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
    dirs.src + 'styles/**/*.css',
    dirs.src + 'main.css'
  ],
  js: [
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
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dirs.dest));
      // .pipe(exit()); // REVIEW
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

gulp.task('lint:js', () => gulp.src([dirs.dest + main.js, 'gulpfile.js'])
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
