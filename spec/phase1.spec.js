var request = require('request');

var myserver = "http://localhost:8123";

describe("phase 1 - GET", function() {
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
	it("should respond OUI to Es tu pret a recevoir une enonce au format markdown par http post(OUI/NON)", function(done) {
		request(myserver + "/?q=Es+tu+pret+a+recevoir+une+enonce+au+format+markdown+par+http+post(OUI/NON)", function(error, response, body){
			expect(body).toEqual("OUI");
			done();
		});
	});
	it("should respond NON to Est ce que tu reponds toujours oui(OUI/NON)", function(done) {
		request(myserver + "/?q=Est+ce+que+tu+reponds+toujours+oui(OUI/NON)", function(error, response, body){
			expect(body).toEqual("NON");
			done();
		});
	});


});

describe("phase 1 - POST", function() {
	it("should parse POST requests", function(done) {
		request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: myserver + '/',
			 	body: "msg=hello"
			     }, function(error, response, body){
				expect(response.statusCode).toEqual(201);
			    	expect(body).toEqual("OK");
				done();
			     });
	});
});

	
