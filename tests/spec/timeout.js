describe("Promise.timeout", function() {
	it("should fulfill after a given timeout", function(done) {
		Promise.setTimeout(100).then(function() {
			expect(1).toBe(1);
			done();
		});
	});
});
