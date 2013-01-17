var request = require('request');

var myserver = "http://localhost:8123";
server = "http://codestory.cloudfoundry.com";

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
	it("should respond OUI to Es tu pret a recevoir un enonce au format markdown par http post(OUI/NON)", function(done) {
		request(myserver + "/?q=Es+tu+pret+a+recevoir+un+enonce+au+format+markdown+par+http+post(OUI/NON)", function(error, response, body){
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
	it("should respond QUELS_BUG to As tu passe une bonne nuit malgre les bugs de l etape precedente(PAS_TOP/BOF/QUELS_BUGS)", function(done) {
		request(myserver + "/?q=As+tu+passe+une+bonne+nuit+malgre+les+bugs+de+l+etape+precedente(PAS_TOP/BOF/QUELS_BUGS)", function(error, response, body){
			expect(body).toEqual("QUELS_BUGS");
			done();
		});
	});
	it("should respond NON to ", function(done) {
		request(myserver + "/?q=As+tu+copie+le+code+de+ndeloof(OUI/NON/JE_SUIS_NICOLAS)", function(error, response, body){
			expect(body).toEqual("NON");
			done();
		});
	});
	


});

describe("phase 1 - POST", function() {
	it("should answer 201 to any post", function(done) {
		request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: myserver + '/enonce/1',
			 	body: "un peu de tout dans le body et [{'truc1':'machin1'}, {'truc2':'machin2'}]"
			     }, function(error, response, body){
				expect(response.statusCode).toEqual(201);
			    	expect(body).toEqual("Created");
				done();
			     });
	});
});

	
