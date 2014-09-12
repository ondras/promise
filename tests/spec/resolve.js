describe("Promise.resolve", function() {
	it("should return an already-resolved promise", function(done) {
		var expected = 42;
		var promise = Promise.resolve(expected);
		promise.then(function(value) {
			expect(value).toEqual(expected);
			done();
		});
	});
});
