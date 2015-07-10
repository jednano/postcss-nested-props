'use strict';
var gulp = require('gulp');

module.exports = function() {
	gulp.watch(['*.js', '.tasks/*.js'], ['eslint']);
	gulp.watch(['lib/**/*.ts'], ['test']);
};
