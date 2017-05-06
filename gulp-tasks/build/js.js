import babel from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import exit from 'gulp-exit';
import source from 'vinyl-source-stream';
import watchify from 'watchify';
import uglify from 'gulp-uglify';
import { dirs, main } from '../paths';

module.exports = (flag) => {
  const bundler = watchify(browserify(dirs.src + main.js, { debug: true }).transform(babel));

  rebundle() => bundler
    .bundle()
    .pipe(plumber())
    .pipe(source(main.js))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(dirs.dest));

  if (flag) {
    bundler.on('update', (ids) => {
      console.log(`Changed: ${ids}`);
      rebundle();
    });
    bundler.on('log', (msg) => {
      const date = new Date(Date.now());
      // const time = date.toTimeString();
      const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      console.log(`${time} -> ${msg}`);
    });

    rebundle();
  } else {
    rebundle().pipe(exit()); // REVIEW
  }
}
