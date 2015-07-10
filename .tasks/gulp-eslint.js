'use strict';
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');

module.exports = function() {
	return gulp.src(['*.js', '.tasks/*.js'])
		.pipe(plumber())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
};
