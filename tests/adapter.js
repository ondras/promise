/* adapter for promises-aplus-tests */

var data = require("fs").readFileSync("../promise.js", {encoding:"utf-8"});
eval(data);
exports.data = data;

exports.resolved = function(value) { return Promise.resolve(value); }
exports.rejected = function(reason) { return Promise.reject(reason); }

exports.deferred = function() {
	var promise = new Promise();
	return {
		promise: promise,
		resolve: function(value) { promise.resolve(value); },
		reject: function(value) { promise.reject(value); }
	}
};
