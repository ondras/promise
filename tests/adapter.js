var global = {
	adapter: {
		fulfilled: function(value) {
			return new Promise().fulfill(value);
		},

		rejected: function(value) {
			return new Promise().reject(value);
		},

		pending: function() {
			var promise = new Promise();
			return {
				promise: promise,
				fulfill: function(value) { return promise.fulfill(value); },
				reject: function(value) { return promise.reject(value); }
			}
		}
	}
}

var specify = function(desc, cb) {
	if (cb.length == 0) { return it(desc, cb); }

	var newCb = function() {
		var __done = false;
		runs(function() {
			cb(function() {
				__done = true;
			})
		});

		waitsFor(function() { return __done; }, "Timeout", 1000);
	}
	return it(desc, newCb);
}

var exports = {}; /* for testThreeCases */

var assert = function(assertion) {
	expect(assertion).toEqual(true);
}
assert.strictEqual = function(value, expected) {
		return expect(value).toBe(expected);
}
assert.notStrictEqual = function(value, expected) {
		return expect(value).not.toBe(expected);
}

var require = function(id) {
    switch (id) {
        case "assert":
        	return assert;
        break;

        case "sinon":
        	return sinon;
        break;

        default:
        	return exports;
        break;
    }
}