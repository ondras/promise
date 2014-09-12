var data = require("fs").readFileSync("promise.js", {encoding:"utf-8"});
eval(data);
exports.data = data;

exports.resolved = function(value) {
	var promise = new Promise();
	promise.resolve(value);
	return promise;
};

exports.rejected = function(value) {
	var promise = new Promise();
	promise.reject(value);
	return promise;
};

exports.deferred = function() {
	var promise = new Promise();
	return {
		promise: promise,
		resolve: function(value) { promise.resolve(value); },
		reject: function(value) { promise.reject(value); }
	}
};
