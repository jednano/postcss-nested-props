import gulp from 'gulp';
import clean from 'gulp-clean';

export default () => {
	return gulp.src([
		'build/**/*.js',
		'build/**/*.d.ts',
		'dist'
	], {
		read: false
	})
		.pipe(clean());
};
