///<reference path="../typings/node/node.d.ts" />
var postcss = require('postcss');
var pseudoClasses = require('pseudo-classes');
var pseudoElements = require('pseudo-elements');

// ReSharper disable once UnusedLocals
// ReSharper disable once InconsistentNaming
var PostCssNestedProps = postcss.plugin(
	'postcss-nested-props',
	() => {
		return node => {
			node.eachRule(rule => {
				unwrapRule([], rule);
			});
		};
	}
);

var HAS_COLON = /:/;
var ALL_PSEUDO = pseudoClasses().concat(pseudoElements());
var HAS_PSEUDO_CLASSES_ELEMENTS = new RegExp(`:(${ALL_PSEUDO.join('|')})`);

function unwrapRule(namespace: string[], rule: any) {
	if (!HAS_COLON.test(rule.selector)) {
		return;
	}
	if (HAS_PSEUDO_CLASSES_ELEMENTS.test(rule.selector)) {
		return;
	}
	var parts = rule.selector.split(/:+/);
	var decl: any = postcss.decl({
		prop: parts[0],
		value: parts[1]
	});
	if (decl.value) {
		rule.parent.insertBefore(rule, decl);
	}
	namespace.push(decl.prop);
	var dashedNamespace = namespace.join('-');
	rule.each(node => {
		switch (node.type) {
			case 'rule':
				unwrapRule(namespace, node);
				break;
			case 'decl':
				node.prop = `${dashedNamespace}-${node.prop}`;
				break;
		}
	});
	rule.eachDecl(decl => {
		decl.moveBefore(rule);
	});
	rule.removeSelf();
	namespace.pop();
}

export = PostCssNestedProps;
