import * as gulp from 'gulp';

export default () => {
	return gulp.src(
		[
			'build/lib/**/*.js',
			'build/lib/**/*.d.ts'
		],
		{ base: 'build' }
	)
		.pipe(gulp.dest('dist'));
};
