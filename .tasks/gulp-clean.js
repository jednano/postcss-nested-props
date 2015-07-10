'use strict';
var del = require('del');

module.exports = function(done) {
	del(['js', 'd.ts'], done);
};
