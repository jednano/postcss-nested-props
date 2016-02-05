import gulp from 'gulp';
import rimraf from 'gulp-rimraf';

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
