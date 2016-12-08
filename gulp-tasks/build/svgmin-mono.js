// SVG-COLOR
import plumber from 'gulp-plumber';
import svgmin from 'gulp-svgmin';

module.exports = (gulp, callback) => gulp.src('source/assets/images/svgs/mono/*.svg')
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
  .pipe(gulp.dest('build/svgs/'));

