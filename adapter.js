var data = require("fs").readFileSync("promise.js", {encoding:"utf-8"});
eval(data);
exports.data = data;

exports.resolved = function(value) {
	return new Promise().resolve(value);
};

exports.rejected = function(value) {
	return new Promise().reject(value);
};

exports.deferred = function() {
	var promise = new Promise();
	return {
		promise: promise,
		resolve: function(value) { return promise.resolve(value); },
		reject: function(value) { return promise.reject(value); }
	}
};
