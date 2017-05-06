import gulp from 'gulp';
import plumber from 'gulp-plumber';
import svgmin from 'gulp-svgmin';
import { dirs, globs } from '../paths';

module.exports = (gulp, callback) => gulp.src(globs.svgMono)
  .pipe(plumber())
  .pipe(svgmin({
    plugins: [
      { removeTitle: true },
      {
        removeAttrs: {
          attrs: 'fill',
        },
      },
    ],
  })).on('error', (error) => { console.log(error); })
  .pipe(gulp.dest(dirs.dest + 'svgs/'));

