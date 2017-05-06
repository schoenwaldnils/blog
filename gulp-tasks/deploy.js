import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';

module.exports = () => gulp.src('./_site/**/*')
  .pipe(ghPages());

