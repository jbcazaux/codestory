var request = require('request');

var myserver = "http://localhost:8123";


describe("phase 1 - calculator", function() {
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
	it("should answser correctly to ((1,1+2)+3,14+4+(5+6+7)+(8+9+10)*4267387833344334647677634)/2*553344300034334349999000", function(done) {
		request(myserver + "/?q=((1,1+2)+3,14+4+(5+6+7)+(8+9+10)*4267387833344334647677634)/2*553344300034334349999000", function(error, response, body){
			expect(body).toBe('31878018903828899277492024491376690701584023926880');
			done();
		});
	});
	it("should answser correctly to ((1,1+2)+3,14+4+(5+6+7)+(8+9+10)*4267387833344334647677634)/2*553344300034334349999000", function(done) {
		request(myserver + "/?q=(-1)+(1)", function(error, response, body){
			expect(body).toBe('0');
			done();
		});
	});
	it("should answser correctly to 1,0000000000000000000000000000000000000000000000001*1,0000000000000000000000000000000000000000000000001", function(done) {
		request(myserver + "/?q=1,0000000000000000000000000000000000000000000000001*1,0000000000000000000000000000000000000000000000001", function(error, response, body){
			expect(body).toBe('1,00000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000001');
			done();
		});
	});



});
