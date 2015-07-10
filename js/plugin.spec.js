///<reference path='../typings/tsd.d.ts'/>
var chai = require('chai');
var plugin = require('./plugin');
var postcss = require('postcss');
var expect = chai.expect;
// ReSharper disable WrongExpressionStatement
describe('postcss-nested-props plugin', function () {
    it('unwraps a nested property', function () {
        check('a{b:{c:d}}', 'a{b-c:d}');
    });
    it('unwraps a deeply nested property', function () {
        check('a{b:{c:{d:{e:{f:g}}}}}', 'a{b-c-d-e-f:g}');
    });
    it('unwraps two nested properties in the same rule', function () {
        check('a{b:{c:{d:e}}f:{g:{h:i}}}', 'a{b-c-d:e;f-g-h:i}');
    });
    it('unwraps a property namespace paired with a value', function () {
        check('a{b:c{d:e}}', 'a{b:c;b-d:e}');
    });
    it('preserves nested rules w/o a colon in the selector', function () {
        check('a{b{c{d:e}}}', 'a{b{c{d:e}}}');
    });
    it('preserves the :not() pseudo-class', function () {
        check('a{b:not(c){d:e}}', 'a{b:not(c){d:e}}');
    });
    it('preserves the ::after pseudo-element', function () {
        check('a{b:after{c:d}}', 'a{b:after{c:d}}');
    });
});
function check(input, output) {
    var processor = postcss([plugin()]);
    expect(processor.process(input).css).to.equal(output);
}
