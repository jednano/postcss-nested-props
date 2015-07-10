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
    it('unwraps deeply nested properties', function () {
        check('a{b:{c:{d:{e:{f:g}}}}}', 'a{b-c-d-e-f:g}');
    });
    it('unwraps two nested properties in the same rule', function () {
        check('a{b:{c:{d:e}}f:{g:{h:i}}}', 'a{b-c-d:e;f-g-h:i}');
    });
    it.skip('allows a property namespace itself to have a value', function () {
        check('a{b:c{d:e}}', 'a{b:c;b-d:e}');
    });
});
function check(input, output) {
    var processor = postcss([plugin()]);
    expect(processor.process(input).css).to.equal(output);
}
