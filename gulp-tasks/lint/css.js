import gulp from 'gulp';
import plumber from 'gulp-plumber';
import stylelint from 'gulp-stylelint';
import { globs } from '../paths';

module.exports = () => gulp.src(globs.css)
  .pipe(plumber())
  .pipe(stylelint({
    reporters: [
      {formatter: 'string', console: true}
    ]
  }));
