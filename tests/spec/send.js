describe("Promise.send", function() {
	it("should fulfill with http/200 XHR", function(done) {
		var xhr = new XMLHttpRequest();
		xhr.open("get", location.href, true);
		Promise.send(xhr).then(function(value) {
			expect(value).toBe(xhr);
			done();
		});
	});

	it("should reject with http/404 XHR", function(done) {
		var xhr = new XMLHttpRequest();
		xhr.open("get", Math.random(), true);
		Promise.send(xhr).then(null, function(value) {
			expect(value).toBe(xhr);
			done();
		});
	});
});
