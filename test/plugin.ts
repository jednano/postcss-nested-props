///<reference path='../typings/tsd.d.ts'/>
import { expect } from 'chai';
import plugin from '../lib/plugin';
import postcss from 'postcss';

// ReSharper disable WrongExpressionStatement
describe('postcss-nested-props plugin', () => {

	it('unwraps a nested property', () => {
		check(
			'a{b:{c:d}}',
			'a{b-c:d}'
		);
	});

	it('unwraps a deeply nested property', () => {
		check(
			'a{b:{c:{d:{e:{f:g}}}}}',
			'a{b-c-d-e-f:g}'
		);
	});

	it('unwraps two nested properties in the same rule', () => {
		check(
			'a{b:{c:{d:e}}f:{g:{h:i}}}',
			'a{b-c-d:e;f-g-h:i}'
		);
	});

	it('unwraps a property namespace paired with a value', () => {
		check(
			'a{b:c{d:e}}',
			'a{b:c;b-d:e}'
		);
	});

	it('preserves nested rules w/o a colon in the selector', () => {
		check(
			'a{b{c{d:e}}}',
			'a{b{c{d:e}}}'
		);
	});

	it('preserves the :not() pseudo-class', () => {
		check(
			'a{b:not(c){d:e}}',
			'a{b:not(c){d:e}}'
		);
	});

	it('preserves the ::after pseudo-element', () => {
		check(
			'a{b:after{c:d}}',
			'a{b:after{c:d}}'
		);
	});

});

function check(input: string, output: string) {
	const processor = postcss([plugin()]);
	expect(processor.process(input).css).to.equal(output);
}
