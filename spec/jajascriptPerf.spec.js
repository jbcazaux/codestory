var request = require('request');

var myserver = "http://localhost:8123";
//myserver = "http://codestory.cloudfoundry.com";

jasmine.DEFAULT_TIMEOUT_INTERVAL=120000;
describe("phase 1 - jajascript", function() {
	it("should respond 201 under heavy load to jajascript optimisation", function(done) {

	var payload = [];
	for (var i = 0; i < 60000; i++){
		var f = {};
		f.VOL='flight'+ i;
		f.DEPART = Math.round(Math.random() * 10000);
		f.DUREE = Math.round(Math.random() * 30);
		f.PRIX = Math.round(Math.random() * 40);
		payload.push(f);
	}
	request.post({
			headers: {'content-type' : 'application/x-www-url-form-encoded'},
			url: myserver + '/jajascript/optimize',
		 	body: JSON.stringify(payload)
		     }, function(error, response, body){
			expect(response.statusCode).toEqual(201);
			done();
		     });
	});

});