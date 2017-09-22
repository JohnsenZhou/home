var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', () => {
  return gulp.src('public/javascripts/typed.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('public/javascripts/es5'))
})

gulp.task('default', ['babel'])
