// Define some paths.
var paths = {
  less: ['./less/*.less'],
  jsx: ['./app/app.jsx'],
  jsxFiles: ['./app/components/*.jsx']
};

var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

gulp.task('less', function () {
   gulp.src(paths.less)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./'));
});

// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', function() {
  browserify(paths.jsx)
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch('./less/*.less', ['less']);
  gulp.watch(paths.jsxFiles, ['js']);
});

gulp.task('default', ['less', 'js', 'watch']);
