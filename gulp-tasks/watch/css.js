import gulp from 'gulp';
import { globs } from '../paths';

module.exports = () => gulp.watch(globs.css, ['build:css']));
