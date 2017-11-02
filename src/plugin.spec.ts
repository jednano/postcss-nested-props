import test, { TestContext } from 'ava';
import * as postcss from 'postcss';
const pseudoClasses = require('pseudo-classes');
const pseudoElements = require('pseudo-elements');

import * as plugin from './plugin';

test('unwraps a nested property', macro,
	'a{b:{c:d}}',
	'a{b-c:d}'
);

test('unwraps a deeply nested property', macro,
	'a{b:{c:{d:{e:{f:g}}}}}',
	'a{b-c-d-e-f:g}'
);

test('unwraps two nested properties in the same rule', macro,
	'a{b:{c:{d:e}}f:{g:{h:i}}}',
	'a{b-c-d:e;f-g-h:i}'
);

test('unwraps a property namespace paired with a value', macro,
	'a{b:c{d:e}}',
	'a{b:c;b-d:e}'
);

test('preserves nested rules w/o a colon in the selector', macro,
	'a{b{c{d:e}}}',
	'a{b{c{d:e}}}'
);

test('preserves a rule with a :global pseudo-selector', macro,
	`:global .a{b:c;d:e;}`,
	`:global .a{b:c;d:e;}`
);

test('preserves a rule with a :local pseudo-selector', macro,
	`:local .a{b:c;d:e;}`,
	`:local .a{b:c;d:e;}`
);

pseudoClasses().forEach((pseudoClass: string) => {
	test(`preserves the :${pseudoClass}() pseudo-class`, macro,
		`a{b:${pseudoClass}(c){d:e}}`,
		`a{b:${pseudoClass}(c){d:e}}`
	);
});

pseudoElements().forEach((pseudoElement: string) => {
	test(`preserves the ::${pseudoElement} pseudo-element`, macro,
		`a{b::${pseudoElement}{c:d}}`,
		`a{b::${pseudoElement}{c:d}}`
	);
});

[
	'-ms-clear',
	'-webkit-progress-bar',
	'-moz-focus-outer'
].forEach(vendorPseudoElement => {
	test(`preserves the ::${vendorPseudoElement} pseudo-element`, macro,
		`a{b::${vendorPseudoElement}{c:d}}`,
		`a{b::${vendorPseudoElement}{c:d}}`
	);
});

function macro(
	t: TestContext,
	input: string,
	expected?: string | RegExp
) {
	const processor = postcss([plugin()]);
	t.is(processor.process(input).css, expected);
}
