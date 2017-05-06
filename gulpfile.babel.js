import gulp from 'gulp';
import gulpRequireTasks from 'gulp-require-tasks';
import plumber from 'gulp-plumber';
import svgSprite from 'gulp-svg-sprite';
import { dirs, globs } from './gulp-tasks/paths';

gulpRequireTasks();

gulp.task('build:svg-sprite', ['svgmin-color', 'svgmin-mono'], () => {
  const config = {
    mode: {
      symbol: {
        render: {
          css: {
            template: '.svgSpriterc',
          },
        },
        prefix: '.Svg--%s',
        dimensions: '%s',
        example: true,
      },
    },
  };

  return gulp.src(globs.svgCleaned)
    .pipe(plumber())
    .pipe(svgSprite(config)).on('error', (error) => { console.log(error); })
    .pipe(gulp.dest(`${dirs.dest}svg-sprite/`));
});


gulp.task('build', ['build:css', 'build:js']);
gulp.task('lint', ['lint:css', 'lint:js']);
gulp.task('watch', ['watch:css', 'watch:js']);
