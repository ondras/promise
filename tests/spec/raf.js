describe("Promise.requestAnimationFrame", function() {
	it("should fulfill after an animation frame", function(done) {
		Promise.requestAnimationFrame().then(function() {
			expect(1).toBe(1);
			done();
		});
	});
});
