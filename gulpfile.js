'use strict';
var gulp = require('gulp');

gulp.task('default', ['lint'], loadTask('test'));
gulp.task('lint', ['eslint', 'tslint']);
gulp.task('eslint', loadTask('eslint'));
gulp.task('tslint', loadTask('tslint'));
gulp.task('test', ['scripts'], loadTask('test'));
gulp.task('test:ci', loadTask('test'));
gulp.task('scripts', ['clean', 'tslint'], loadTask('scripts'));
gulp.task('clean', loadTask('clean'));
gulp.task('watch', ['default'], loadTask('watch'));

function loadTask(taskName) {
	return require('./.tasks/gulp-' + taskName);
}
