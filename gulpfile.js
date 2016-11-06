// *** dependencies *** //

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');


// *** tasks *** ///

gulp.task('connect', function () {
  connect.server({
    root: './src/',
    port: 5000,
    livereload: true
  });
});

gulp.task('default', function () {
  return gulp.src('src/templates/*.html')
    .pipe(nunjucksRender({
      path: ['src/templates/'] // String or Array
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(connect.reload());
});

gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('src/pages/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['src/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('src'))
});


gulp.task('sass', function () {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./src/styles/css/'))
    .pipe(connect.reload());

});

gulp.task('sass:watch', function () {
  gulp.watch('./src/styles/*.scss', ['sass']);
});

gulp.task('css', function () {
  gulp.src('./src/styles/css/*.css')
    .pipe(connect.reload());
});

gulp.task('jshint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint({
      esnext: true
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['jshint', 'javascript', 'style']);
  gulp.watch('./src/styles/*.scss', ['sass']);
  gulp.watch('./src/pages/*.nunjucks', ['nunjucks']);
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/css/*.css'], ['css']);
});

// *** default task *** //
gulp.task('default', function() {
  runSequence(
    ['nunjucks'],
    ['sass'],
    ['jshint'],
    ['watch'],
    ['connect']
  );
});
