const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask(){
    return src('src/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('dist/css', { sourcemaps: '.' }));
  }

// JavaScript Task
function jsTask(){
    return src('src/js/**/*.js', { sourcemaps: true })
      .pipe(terser())
      .pipe(dest('dist/js', { sourcemaps: '.' }));
  }

  //image Task
  function imageTask() {
    return src('src/img/*')
      //.pipe(newer('dist/images'))
      .pipe(imagemin())
      .pipe(dest('dist/img'));
  }

  function browsersyncServe(cb){
    browsersync.init({
      server: {
        baseDir: '.'
      }    
    });
    cb();
  }

  function browsersyncReload(cb){
    browsersync.reload();
    cb();
  }



  // Watch Task
function watchTask(){
    watch('*.html', browsersyncReload);
    watch(['src/**/*.scss', 'src/**/*.js'], series(scssTask, jsTask, browsersyncReload));
  }

exports.scssTask = scssTask;
exports.imageTask = imageTask;
  
  // Default Gulp Task
exports.default = series(
    scssTask,
    imageTask,
    jsTask,
    browsersyncServe,
    watchTask
  );