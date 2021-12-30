const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const path = require('path');
const browserSync = require('browser-sync');

// run browser sync
const runServer = () => browserSync({ server: { baseDir: './public' } });

// copy index.html
const html = () => gulp.src('./src/*.html').pipe(gulp.dest('./public'));

// run transpile less to css and copygu
const lessTranspile = () => gulp.src('./src/less/**/*.less')
  .pipe(less({
    paths: [path.join(__dirname, 'public', 'css')]
  }))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./public/css'))

const watch = () => {
  gulp.watch('./src/less/**/*.less', { ignoreInitial: false }, lessTranspile).on('change', browserSync.reload);
  gulp.watch('./src/*.html', { ignoreInitial: false }, html).on('change', browserSync.reload);
};

gulp.task('build', gulp.parallel(lessTranspile, html));
gulp.task('dev', gulp.parallel(watch, runServer));
