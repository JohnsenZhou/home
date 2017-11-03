const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

// gulp.task('babel', () => {
//   return gulp.src('public/javascripts/*.js')
//     .pipe(babel({
//       presets: ['env']
//     }))
//     .pipe(gulp.dest('public/javascripts/es5'))
// });

gulp.task('nodemon', () => {
  return nodemon({
    script: 'server',
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('dev', ['nodemon'], () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    browser: 'chrome',
    port: 8080,
    open: false
    
  });
  gulp.watch(['./views/*', './public/*'], ['file-watch'])
    // .on('change', browserSync.reload());
})

gulp.task('file-watch', (done) => {
  browserSync.reload();
  done();
})

gulp.task('default', ['dev'])
