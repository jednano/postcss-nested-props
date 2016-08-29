import * as gulp from 'gulp';

function loadTask(taskName: string) {
	return require(`./.tasks/gulp-${taskName}`).default;
}

gulp.task('default', ['tslint']);
gulp.task('clean', loadTask('clean'));
gulp.task('tslint', loadTask('tslint'));
gulp.task('copy', loadTask('copy'));
