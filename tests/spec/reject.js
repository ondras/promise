describe("Promise.reject", function() {
	it("should return an already-rejected promise", function(done) {
		var expected = "sorry";
		var promise = Promise.reject(expected);
		promise.then(null, function(value) {
			expect(value).toEqual(expected);
			done();
		});
	});
});
