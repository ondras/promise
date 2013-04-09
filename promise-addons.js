/**
 * Wait for all these promises to complete. One failed => this fails too.
 */
Promise.when = function() {
	var promise = new this();
	var counter = 0;

	for (var i=0;i<arguments.length;i++) {
		counter++;
		arguments[i].then(function(result) {
			counter--;
			if (!counter) { promise.fulfill(result); }
		}, function(reason) {
			counter = 1/0;
			promise.reject(reason);
		});
	}

	return promise;
}

/**
 * Promise-based version of setTimeout
 */
Promise.setTimeout = function(ms) {
	var promise = new this();
	setTimeout(function() { promise.fulfill(); }, ms);
	return promise;
}

/**
 * Promise-based version of addEventListener
 */
Promise.event = function(element, event, capture) {
	var promise = new this();
	element.addEventListener(event, function(e) {
		promise.fulfill(e);
	}, capture);
	return promise;
}

/**
 * Promise-based version of XMLHttpRequest::send
 */
Promise.send = function(xhr, data) {
	var promise = new this();
	xhr.addEventListener("readystatechange", function(e) {
		if (xhr.readyState != 4) { return; }
		if (e.status == 200) {
			promise.fulfill(xhr);
		} else {
			promise.reject(xhr);
		}
	});
	return promise;
}
