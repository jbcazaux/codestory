var request = require('request');

var myserver = "http://localhost:8123";


describe("phase 1 - change", function() {
	it("should answser correctly to 1+1", function(done) {
		request(myserver + "/?q=1+1", function(error, response, body){
			expect(body).toBe('2');
			done();
		});
	});
});
