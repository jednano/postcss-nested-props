/// <reference path="../typings/gulp.d.ts" />
import * as gulp from 'gulp';
var plumber = require('gulp-plumber');
var tslint = require('gulp-tslint');

export default () => {
	return gulp.src([
			'lib/**/*.ts',
			'test/**/*.ts'
		])
		.pipe(plumber())
		.pipe(tslint({
			formatter: 'verbose'
		}))
		.pipe(tslint.report());
};
