import filter from 'gulp-filter';
import gulp from 'gulp';
import merge from 'merge2';
import ts from 'gulp-typescript';
import { compilerOptions } from '../tsconfig';

const project = ts.createProject('tsconfig.json', {
	typescript: require('typescript')
});

export default () => {
	const libResult = project.src().pipe(
		project(ts.reporter.fullReporter())
	);
	return merge([
		libResult.dts
			.pipe(filter(['**', '!test/**']))
			.pipe(gulp.dest(compilerOptions.outDir)),
		libResult.js.pipe(gulp.dest(compilerOptions.outDir))
	]);
};
