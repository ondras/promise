describe("Promise.all", function() {
	it("should deliver values in the correct order", function(done) {
		var expected = [1, 2, 3];
		var delays = [10, 50, 5];
		var promises = expected.map(function(value, index) {
			return new Promise(function(resolve, reject) {
				setTimeout(function() { resolve(value); }, delays[index]);
			});
		});
		
		Promise.all(promises).then(function(results) {
			expect(results).toEqual(expected);
			done();
		});
	});

	it("should reject if one promise rejects", function(done) {
		var expected = "sorry";
		var promises = [
			Promise.resolve(42),
			Promise.reject(expected),
			Promise.resolve()
		];

		Promise.all(promises).then(null, function(reason) {
			expect(reason).toEqual(expected);
			done();
		});
	});

	it("should reject with the first reason", function(done) {
		var expected = "sorry";
		var reasons = ["reason 1", expected, "reason 2"];
		var delays = [50, 5, 10];
		var promises = reasons.map(function(reason, index) {
			return new Promise(function(resolve, reject) {
				setTimeout(function() { reject(reason); }, delays[index]);
			});
		});
		
		Promise.all(promises).then(null, function(reason) {
			expect(reason).toEqual(expected);
			done();
		});
	});
});
