var sinon = {
	__callOrder: [],

	stub: function() {
		var returnValue = undefined;
		var throwValue = undefined;

		var result = function() {
			sinon.__callOrder.push(result);
			result.called = true;
			result.calledWith = arguments;
			if (throwValue) { throw throwValue; }
			return returnValue;
		}

		result.returns = function(value) {
			returnValue = value;
			return result;
		}

		result.throws = function(value) {
			throwValue = value;
			return result;
		}

		result.called = false;
		result.calledWidth = [];
		return result;
	},

	assert: {
		calledWith: function(spy) {
			for (var i=1;i<arguments.length;i++) {
				expect(spy.calledWith[i-1]).toBe(arguments[i]);
			}

		},
		notCalled: function(spy) { 
			expect("called" in spy).toBe(true);
			expect(spy.called).toBe(false);
		},
		callOrder: function() {
			var index = -1;
			for (var i=0;i<arguments.length;i++) {
				var argIndex = sinon.__callOrder.indexOf(arguments[i]);
				expect(argIndex).toBeGreaterThan(index);
				index = argIndex;
			}
		}
	},

	match: {
		same: function(val) {
			return val;
		}
	}
}

sinon.spy = sinon.stub;