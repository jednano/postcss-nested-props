'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var tslint = require('gulp-tslint');

module.exports = function() {
	return gulp.src(['lib/**/*.ts'])
		.pipe(plumber())
		.pipe(tslint())
		.pipe(tslint.report('verbose'));
};
