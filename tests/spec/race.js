describe("Promise.race", function() {
	it("should fulfill with the fastest fulfillment", function(done) {
		var values = [false, true, false];
		var delays = [10, 5, 50];
		
		var promises = values.map(function(value, index) {
			return new Promise(function(resolve, reject) {
				setTimeout(function() { value ? resolve(value) : reject(value) }, delays[index]);
			});
		});
		
		Promise.race(promises).then(function(value) {
			expect(value).toBe(true);
			done();
		});
	});

	it("should reject with the fastest rejection", function(done) {
		var values = [true, false, true];
		var delays = [10, 5, 50];
		
		var promises = values.map(function(value, index) {
			return new Promise(function(resolve, reject) {
				setTimeout(function() { value ? resolve(value) : reject(value) }, delays[index]);
			});
		});
		
		Promise.race(promises).then(null, function(value) {
			expect(value).toBe(false);
			done();
		});
	});
});
