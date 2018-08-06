const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const header = require('gulp-header');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const runSequence = require('run-sequence');
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
    script: './src',
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
  return gulp.src('public/less/*.less')
    .pipe(less())
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
  return gulp.src('public/less/*.less')
    .pipe(less())
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(header(banner, {
      'pkg': require('./package.json')
    }))
    .pipe(gulp.dest('app'))
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
    .pipe(uglify({
      mangle: true,
      compress: true
    }))
    .pipe(header(banner, {
      'pkg': require('./package.json')
    }))
    .pipe(gulp.dest('app'))
})

gulp.task('revAssets', function(){
  return gulp.src(['app/*.css', 'app/*.js'], {
      base: 'app'
    })
    .pipe(rev())
    .pipe(gulp.dest('www/app'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('www'))
})


gulp.task('build', function(done) {
  runSequence(['cssmin', 'jsmin'], ['revAssets', 'copy'], done)
})

gulp.task('default', ['dev'])
