
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

gulp.task('less', function () {
   gulp.src('./less/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch('./less/*.less', ['less']);
});

gulp.task('default', ['less', 'watch']);
