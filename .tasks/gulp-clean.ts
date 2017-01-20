import * as gulp from 'gulp';
var rimraf = require('gulp-rimraf');

export default () => {
	return gulp.src([
		'build/**/*.js',
		'build/**/*.d.ts',
		'dist'
	], {
		read: false
	})
		.pipe(rimraf());
};
