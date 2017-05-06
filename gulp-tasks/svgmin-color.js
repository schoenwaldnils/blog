import gulp from 'gulp';
import plumber from 'gulp-plumber';
import svgmin from 'gulp-svgmin';
import { dirs, globs } from '../paths';

module.exports = (gulp, callback) => gulp.src(globs.svgColor)
  .pipe(plumber())
  .pipe(svgmin({
    plugins: [
      { removeTitle: true },
    ],
  })).on('error', (error) => { console.log(error); })
  .pipe(gulp.dest(dirs.dest + 'svgs/'));
