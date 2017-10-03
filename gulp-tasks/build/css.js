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
import cssmin from 'gulp-cssmin';
import { dirs, main } from '../paths';

module.exports = gulp => gulp.src(dirs.src + main.css)
  .pipe(postcss([
    postcssImport({ glob: true }),
    postcssUrl(),
    postcssNested(),
    postcssCustomProperties(),
    postcssCalc(),
    postcssColorFunction(),
    postcssCustomMedia(),
    postcssPseudoelements(),
    autoprefixer(),
  ]))
  .pipe(cssmin())
  .pipe(gulp.dest(dirs.dest));
