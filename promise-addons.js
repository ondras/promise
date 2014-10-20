/**
 * Promise-based version of setTimeout
 */
Promise.setTimeout = function(ms) {
	return new this(function(resolve, reject) {
		setTimeout(resolve, ms);
	});
}

/**
 * Promise-based version of addEventListener
 */
Promise.event = function(element, event, capture) {
	return new this(function(resolve, reject) {
		var cb = function(e) {
			element.removeEventListener(event, cb, capture);
			resolve(e);
		}
		element.addEventListener(event, cb, capture);
	});
}

/**
 * Promise-based wait for CSS transition end
 */
Promise.transition = function(element) {
	if ("transition" in element.style) {
		return this.event(element, "transitionend", false);
	} else if ("webkitTransition" in element.style) {
		return this.event(element, "webkitTransitionEnd", false);
	} else {
		return this.resolve();
	}
}

/**
 * Promise-based version of XMLHttpRequest::send
 */
Promise.send = function(xhr, data) {
	return new this(function(resolve, reject) {
		xhr.addEventListener("readystatechange", function(e) {
			if (e.target.readyState != 4) { return; }
			if (e.target.status.toString().charAt(0) == "2") {
				resolve(e.target);
			} else {
				reject(e.target);
			}
		});
		xhr.send(data);
	});
}

/**
 * Promise for a one-shot worker (resolves after first message)
 */
Promise.worker = function(url, message) {
	return new this(function(resolve, reject) {
		var worker = new Worker(url);
		Promise.event(worker, "message").then(function(e) {
			resolve(e.data);
		});
		Promise.event(worker, "error").then(function(e) {
			reject(e.message);
		});
		worker.postMessage(message);
	});
}

/**
 * Promise for a requestAnimationFrame
 */
Promise.requestAnimationFrame = function() {
	return new this(function(resolve, reject) {
		requestAnimationFrame(resolve);
	});
}
