var request = require('request');

var myserver = "http://localhost:8123";

describe("A suite", function() {
	it("should respond with my email", function(done) {
		request(myserver + "/?q=Quelle+est+ton+adresse+email", function(error, response, body){
			expect(body).toEqual("jbcazaux@gmail.com");
			done();
		});
	});
});

	
