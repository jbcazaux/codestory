var request = require('request');

var myserver = "http://localhost:8123";
//myserver = "http://codestory.cloudfoundry.com";



describe("phase 1 - jajascript", function() {
	it("should answer correctly to jajascript optimisation", function(done) {
	request.post({
			timeout: 10000,
			headers: {'content-type' : 'application/x-www-url-form-encoded'},
			url: myserver + '/jajascript/optimize',
		 	body: '[{"VOL": "A0", "DEPART":0, "DUREE":2, "PRIX": 2}, {"VOL": "A1", "DEPART":1, "DUREE":2, "PRIX": 2}, {"VOL": "A2", "DEPART":2, "DUREE":2, "PRIX": 2}, {"VOL": "A3", "DEPART":3, "DUREE":2, "PRIX": 2}, {"VOL": "A4", "DEPART":4, "DUREE":2, "PRIX": 2}, {"VOL": "A5", "DEPART":5, "DUREE":2, "PRIX": 2}, {"VOL": "A6", "DEPART":6, "DUREE":2, "PRIX": 3}, {"VOL": "A7", "DEPART":7, "DUREE":2, "PRIX": 2}]'
		     }, function(error, response, body){
			expect(response.statusCode).toEqual(201);
			var result = JSON.parse(body);
			expect(result.gain).toEqual(9);
		    	expect(result.path[0]).toBe("A0");
			expect(result.path[1]).toBe("A2");
			expect(result.path[2]).toBe("A4");			
		    	expect(result.path[3]).toBe("A6");
			done();
		     });
	});
	it("should answer correctly to jajascript optimisation", function(done) {
	request.post({
			timeout: 10000,
			headers: {'content-type' : 'application/x-www-url-form-encoded'},
			url: myserver + '/jajascript/optimize',
		 	body: '[{"VOL": "A0", "DEPART":0, "DUREE":2, "PRIX": 1}, {"VOL": "A1", "DEPART":1, "DUREE":2, "PRIX": 2}, {"VOL": "A2", "DEPART":2, "DUREE":2, "PRIX": 2}, {"VOL": "A3", "DEPART":3, "DUREE":2, "PRIX": 2}, {"VOL": "A4", "DEPART":4, "DUREE":2, "PRIX": 2}, {"VOL": "A5", "DEPART":5, "DUREE":2, "PRIX": 2}, {"VOL": "A6", "DEPART":6, "DUREE":2, "PRIX": 2}, {"VOL": "A7", "DEPART":7, "DUREE":2, "PRIX": 3}]'
		     }, function(error, response, body){
			expect(response.statusCode).toEqual(201);
			var result = JSON.parse(body);
			expect(result.gain).toEqual(9);
		    	expect(result.path[0]).toBe("A1");
		    	expect(result.path[1]).toBe("A3");
		    	expect(result.path[2]).toBe("A5");
		    	expect(result.path[3]).toBe("A7");
			done();
		     });
	});
	it("should answer correctly to jajascript optimisation", function(done) {
	request.post({
			timeout: 10000,
			headers: {'content-type' : 'application/x-www-url-form-encoded'},
			url: myserver + '/jajascript/optimize',
		 	body: '[{"VOL": "A0", "DEPART":0, "DUREE":7, "PRIX": 10}, {"VOL": "A1", "DEPART":1, "DUREE":2, "PRIX": 2}, {"VOL": "A2", "DEPART":2, "DUREE":2, "PRIX": 2}, {"VOL": "A3", "DEPART":3, "DUREE":2, "PRIX": 2}, {"VOL": "A4", "DEPART":4, "DUREE":2, "PRIX": 2}, {"VOL": "A5", "DEPART":5, "DUREE":2, "PRIX": 2}, {"VOL": "A6", "DEPART":6, "DUREE":2, "PRIX": 6}, {"VOL": "A7", "DEPART":7, "DUREE":2, "PRIX": 7}]'
		     }, function(error, response, body){
			expect(response.statusCode).toEqual(201);
			var result = JSON.parse(body);
			expect(result.gain).toEqual(17);
		    	expect(result.path[0]).toBe("A0");
		    	expect(result.path[1]).toBe("A7");
			done();
		     });
	});
	it("should answer correctly to jajascript optimisation", function(done) {
	request.post({
			timeout: 10000,
			headers: {'content-type' : 'application/x-www-url-form-encoded'},
			url: myserver + '/jajascript/optimize',
		 	body: '[{"VOL": "AF514", "DEPART":0, "DUREE":5, "PRIX": 10}]'
		     }, function(error, response, body){
			expect(response.statusCode).toEqual(201);
			var result = JSON.parse(body);
			expect(result.gain).toEqual(10);
		    	expect(result.path[0]).toBe("AF514");
			done();
		     });
	});
	it("should answer correctly to jajascript optimisation", function(done) {
	request.post({
			headers: {'content-type' : 'application/x-www-url-form-encoded'},
			url: myserver + '/jajascript/optimize',
		 	body: '[{"VOL": "AF1", "DEPART":0, "DUREE":1, "PRIX": 10},{"VOL": "AF2", "DEPART":1, "DUREE":1, "PRIX": 10}]'
		     }, function(error, response, body){
			expect(response.statusCode).toEqual(201);
			var result = JSON.parse(body);
			expect(result.gain).toEqual(20);
		    	expect(result.path[0]).toBe("AF1");
		    	expect(result.path[1]).toBe("AF2");
			done();
		     });
	});

	it("should answer correctly to jajascript optimisation", function(done) {
		request.post({
				headers: {'content-type' : 'application/x-www-url-form-encoded'},
				url: myserver + '/jajascript/optimize',
			 	body: '[{ "VOL": "A0", "DEPART": 0, "DUREE": 1, "PRIX": 1 },{ "VOL": "A5", "DEPART": 1, "DUREE": 4, "PRIX": 4 },{ "VOL":"A6", "DEPART": 1, "DUREE": 5, "PRIX": 6 },{ "VOL": "A10", "DEPART": 1, "DUREE": 9, "PRIX": 9 }, { "VOL": "A23", "DEPART": 2, "DUREE": 1, "PRIX": 2 }, { "VOL": "A100", "DEPART": 3, "DUREE": 100, "PRIX": 100 }, { "VOL": "A101", "DEPART": 101, "DUREE": 100, "PRIX": 1 }]'
			     }, function(error, response, body){
				expect(response.statusCode).toEqual(201);
				var result = JSON.parse(body);
				expect(result.gain).toEqual(103);
			    	expect(result.path[0]).toBe("A0");
				expect(result.path[1]).toBe("A23");
				expect(result.path[2]).toBe("A100");
				done();
			     });
	});
	it("should answer correctly to jajascript optimisation", function(done) {
		request.post({
				headers: {'content-type' : 'application/x-www-url-form-encoded'},
				url: myserver + '/jajascript/optimize',
			 	body: '[{ "VOL": "MONAD42", "DEPART": 0, "DUREE": 5, "PRIX": 10 },{ "VOL": "META18", "DEPART": 3, "DUREE": 7, "PRIX": 14 },{ "VOL":"LEGACY01", "DEPART": 5, "DUREE": 9, "PRIX": 8 },{ "VOL": "YAGNI17", "DEPART": 5, "DUREE": 9, "PRIX": 7 }]'
			     }, function(error, response, body){
				expect(response.statusCode).toEqual(201);
				var result = JSON.parse(body);
				expect(result.gain).toEqual(18);
			    	expect(result.path[0]).toBe("MONAD42");
				expect(result.path[1]).toBe("LEGACY01");
				done();
			     });
	});
	it("should answer correctly to jajascript optimisation", function(done) {
		request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: myserver + '/jajascript/optimize',
			 	body: '[{"VOL":"clever-jelly-18","DEPART":0,"DUREE":4,"PRIX":7},{"VOL":"outstanding-cowhand-56","DEPART":1,"DUREE":2,"PRIX":9},{"VOL":"thoughtless-trowel-76","DEPART":2,"DUREE":6,"PRIX":7},{"VOL":"miniature-woodpecker-31","DEPART":4,"DUREE":5,"PRIX":6},{"VOL":"tame-shoreline-88","DEPART":5,"DUREE":2,"PRIX":27},{"VOL":"confused-peacock-8","DEPART":5,"DUREE":4,"PRIX":7},{"VOL":"blue-economist-28","DEPART":6,"DUREE":2,"PRIX":1},{"VOL":"late-reptile-90","DEPART":7,"DUREE":6,"PRIX":5},{"VOL":"clumsy-sleeper-85","DEPART":9,"DUREE":5,"PRIX":21},{"VOL":"gigantic-tidewater-85","DEPART":10,"DUREE":2,"PRIX":30},{"VOL":"blue-eyed-sprout-61","DEPART":10,"DUREE":4,"PRIX":14},{"VOL":"cooing-sunshine-5","DEPART":11,"DUREE":2,"PRIX":5},{"VOL":"thankful-fortuneteller-95","DEPART":12,"DUREE":6,"PRIX":4},{"VOL":"swift-anorexic-5","DEPART":14,"DUREE":5,"PRIX":22},{"VOL":"tender-balance-61","DEPART":15,"DUREE":2,"PRIX":13}]'
			     }, function(error, response, body){
				expect(response.statusCode).toEqual(201);
				var result = JSON.parse(body);
			    	expect(result.gain).toEqual(88);
				expect(result.path[0]).toBe("outstanding-cowhand-56");
				expect(result.path[1]).toBe("tame-shoreline-88");
				expect(result.path[2]).toBe("gigantic-tidewater-85");
				expect(result.path[3]).toBe("swift-anorexic-5");
				done();
			     });
	});
 
	it("should answer correctly to jajascript optimisation", function(done) {
		request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: myserver + '/jajascript/optimize',
			 	body: '[ { "VOL": "tame-developer-64", "DEPART": 0, "DUREE": 4, "PRIX": 14 }, { "VOL": "shallow-ringleader-65", "DEPART": 1, "DUREE": 2, "PRIX": 5 }, { "VOL": "depressed-rake-50", "DEPART": 2, "DUREE": 6, "PRIX": 5 }, { "VOL": "lovely-watch-99", "DEPART": 4, "DUREE": 5, "PRIX": 22 }, { "VOL": "immense-hashish-48", "DEPART": 5, "DUREE": 2, "PRIX": 14 }, { "VOL": "tame-stardom-63", "DEPART": 5, "DUREE": 4, "PRIX": 10 }, { "VOL": "inexpensive-reactionary-21", "DEPART": 6, "DUREE": 2, "PRIX": 5 }, { "VOL": "elated-theorist-72", "DEPART": 7, "DUREE": 6, "PRIX": 3 }, { "VOL": "anxious-tack-96", "DEPART": 9, "DUREE": 5, "PRIX": 21 }, { "VOL": "clean-shackle-67", "DEPART": 10, "DUREE": 2, "PRIX": 24 }]'
			     }, function(error, response, body){
				expect(response.statusCode).toEqual(201);
				var result = JSON.parse(body);
			    	//expect(result.gain).toEqual();
				done();
			     });
	});




});
