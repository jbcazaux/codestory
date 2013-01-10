var request = require('request');

var myserver = "http://localhost:8123";

describe("A suite", function() {
	it("should respond with my email", function(done) {
		request(myserver + "/?q=Quelle+est+ton+adresse+email", function(error, response, body){
			expect(body).toEqual("jbcazaux@gmail.com");
			done();
		});
	});
	it("should respond OUI to Es tu abonne a la mailing list(OUI/NON)", function(done) {
		request(myserver + "/?q=Es+tu+abonne+a+la+mailing+list(OUI/NON)", function(error, response, body){
			expect(body).toEqual("OUI");
			done();
		});
	});
	it("should respond OUI to Es tu heureux de participer(OUI/NON)", function(done) {
		request(myserver + "/?q=Es+tu+heureux+de+participer(OUI/NON)", function(error, response, body){
			expect(body).toEqual("OUI");
			done();
		});
	});
});

	
