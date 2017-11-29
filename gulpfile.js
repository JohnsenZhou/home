const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const header = require('gulp-header');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const stripDebug = require('gulp-strip-debug');
const requirejsOptimize = require('gulp-requirejs-optimize');
const cleanCSS = require('gulp-clean-css');

// Metadata for build files
const now = new Date();
const TIMESTAMP = {
  YEAR: now.getFullYear(),
  MONTH: now.getMonth() + 1,
  DAY: now.getDate()
};

const banner = `
/**
 * <%= pkg.name %> <%= pkg.version %>
 *
 * Copyright (c) ${TIMESTAMP.YEAR}, Johnsen zhou.
 * All rights reserved.
 *
 * LICENSE
 * build: ${TIMESTAMP.YEAR}-${TIMESTAMP.MONTH}-${TIMESTAMP.DAY}
 */
`;


gulp.task('nodemon', () => {
  return nodemon({
    script: 'server',
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('dev', ['nodemon', 'cssconcat'], () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    browser: 'chrome',
    port: 8080,
    open: false
    
  });
  gulp.watch(['./views/*', './views/*/*', './public/*/*'], ['cssconcat', 'file-watch'])
    // .on('change', browserSync.reload());
})

gulp.task('file-watch', (done) => {
  browserSync.reload();
  done();
})

gulp.task('cssconcat', () => {
  return gulp.src('public/css/*.css')
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/dev'));
});

gulp.task('copy', () => {
  return gulp.src([
    'public/img/*',
    'public/lib/*',
  ], { base: 'public' })
    .pipe(gulp.dest('www'));
});

gulp.task('cssmin', () => {
  return gulp.src('public/css/*.css')
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(header(banner, {
      'pkg': require('./package.json')
    }))
    .pipe(gulp.dest('www/css'));
});

gulp.task('jsmin', function () {
  return gulp.src('public/js/main.js')
      .pipe(sourcemaps.init())
      .pipe(requirejsOptimize({
        baseUrl: 'public/js',
        mainConfigFile: 'public/js/main.js',
        name: 'main'
      }))
      .pipe(stripDebug())
      .pipe(header(banner, {
        'pkg': require('./package.json')
      }))
      .pipe(gulp.dest('www/js'));
})

gulp.task('build', ['cssmin', 'jsmin', 'copy'])

gulp.task('default', ['dev'])
