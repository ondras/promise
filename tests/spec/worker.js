describe("Promise.worker", function() {
	it("should wait for a worker", function(done) {
		Promise.worker("worker.js", "message-a").then(function(value) {
			expect(value).toBe("message-b");
			done();
		});
	});
});
