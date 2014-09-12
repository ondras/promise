onmessage = function(e) {
	if (e.data != "message-a") { return; }
	setTimeout(function() {
		postMessage("message-b");
	}, 100);
}

