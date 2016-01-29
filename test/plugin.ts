///<reference path='../typings/tsd.d.ts'/>
import { expect } from 'chai';
import plugin from '../lib/plugin';
import postcss from 'postcss';
const pseudoClasses = require('pseudo-classes');
const pseudoElements = require('pseudo-elements');

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

	describe('pseudo classes', () => {
		pseudoClasses().forEach(pseudoClass => {
			it(`preserves the :${pseudoClass}() pseudo-class`, () => {
				check(
					`a{b:${pseudoClass}(c){d:e}}`,
					`a{b:${pseudoClass}(c){d:e}}`
				);
			});
		});
	});

	describe('pseudo elements', () => {
		pseudoElements().forEach(pseudoElement => {
			it(`preserves the ::${pseudoElement} pseudo-element`, () => {
				check(
					`a{b::${pseudoElement}{c:d}}`,
					`a{b::${pseudoElement}{c:d}}`
				);
			});
		});
	});

});

function check(input: string, output: string) {
	const processor = postcss([plugin()]);
	expect(processor.process(input).css).to.equal(output);
}
