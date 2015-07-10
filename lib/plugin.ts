///<reference path="../typings/node/node.d.ts" />
var postcss = require('postcss');

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

function unwrapRule(namespace: string[], rule: any) {
	if (rule.selector.slice(-1) !== ':') {
		return;
	}
	namespace.push(rule.selector.slice(0, -1));
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
	rule.each(node => {
		node.moveBefore(rule);
	});
	rule.removeSelf();
	namespace.pop();
}

export = PostCssNestedProps;
