var request = require('request');

var myserver = "http://localhost:8123";


describe("phase 1 - change", function() {
	it("should answser correctly to 1+1", function(done) {
		request(myserver + "/?q=1+1", function(error, response, body){
			expect(body).toBe('2');
			done();
		});
	});
	it("should answser correctly to 9*9", function(done) {
		request(myserver + "/?q=9*9", function(error, response, body){
			expect(body).toBe('81');
			done();
		});
	});
	it("should answser correctly to (8+4)/2", function(done) {
		request(myserver + "/?q=(8+4)/2", function(error, response, body){
			expect(body).toBe('6');
			done();
		});
	});
	it("should answser correctly to (1+2)/2", function(done) {
		request(myserver + "/?q=(1+2)/2", function(error, response, body){
			expect(body).toBe('1,5');
			done();
		});
	});
	it("should answser correctly to 1,5*4", function(done) {
		request(myserver + "/?q=1,5*4", function(error, response, body){
			expect(body).toBe('6');
			done();
		});
	});
	it("should answser correctly to 1,1+2,2", function(done) {
		request(myserver + "/?q=1,1+2,2", function(error, response, body){
			expect(body).toBe('3,3');
			done();
		});
	});
	it("should answser correctly to 1,1-2,2", function(done) {
		request(myserver + "/?q=1,1-2,2", function(error, response, body){
			expect(body).toBe('-1,1');
			done();
		});
	});
});
