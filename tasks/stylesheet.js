'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass');
let cssnano = require('gulp-cssnano');
let config = require('./config').client;

module.exports = function (singleRun) {
  return function () {
    let gulpStream = gulp.src('./client/boot.scss').pipe(sass());

    if (singleRun) {
      gulpStream = gulpStream.pipe(cssnano());
    }

    return gulpStream.pipe(gulp.dest(config.destination));
  }
};