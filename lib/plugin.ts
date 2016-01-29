///<reference path="../typings/node/node.d.ts" />
///<reference path="../node_modules/postcss/postcss.d.ts" />
import postcss from 'postcss';
const pseudoClasses = require('pseudo-classes');
const pseudoElements = require('pseudo-elements');

// ReSharper disable once UnusedLocals
// ReSharper disable once InconsistentNaming
export default postcss.plugin('postcss-nested-props', () => {
	return root => {
		root.walkRules(rule => {
			unwrapRule([], rule);
		});
	};
});

const HAS_COLON = /:/;
const ALL_PSEUDO = pseudoClasses().concat(pseudoElements());
const VENDOR_PSEUDO_ELEMENTS = '-(\\w|-)+';
const HAS_PSEUDO_CLASSES_ELEMENTS = new RegExp(`:(${ALL_PSEUDO.join('|')}|${VENDOR_PSEUDO_ELEMENTS})`);

function unwrapRule(namespace: string[], rule: postcss.Rule) {
	if (!HAS_COLON.test(rule.selector)) {
		return;
	}
	if (HAS_PSEUDO_CLASSES_ELEMENTS.test(rule.selector)) {
		return;
	}
	const parts = rule.selector.split(/:+/);
	const decl = postcss.decl({
		prop: parts[0],
		value: parts[1]
	});
	if (decl.value) {
		rule.parent.insertBefore(rule, decl);
	}
	namespace.push(decl.prop);
	const dashedNamespace = namespace.join('-');
	rule.each(node => {
		switch (node.type) {
			case 'rule':
				unwrapRule(namespace, <postcss.Rule>node);
				break;
			case 'decl':
				const decl2 = <postcss.Declaration>node;
				decl2.prop = `${dashedNamespace}-${decl2.prop}`;
				break;
		}
	});
	rule.walkDecls(decl2 => {
		decl2.moveBefore(rule);
	});
	rule.remove();
	namespace.pop();
}
