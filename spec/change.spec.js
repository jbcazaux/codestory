var request = require('request');

var myserver = "http://localhost:8123";


describe("phase 1 - change", function() {
	it("should answser correctly to change 1", function(done) {
		request(myserver + "/scalaskel/change/1", function(error, response, body){
			var answer = JSON.parse(body);
			expect(answer.length).toBe(1);
			//[{'foo':1}]
			var expected = [{'foo':1}];
			for (var comb in answer){
				for (var piece in answer[comb]){
					expect(answer[comb][piece]).toBe(expected[comb][piece]);
				}
			}
			done();
		});
	});
	it("should answser correctly to change 2", function(done) {
		request(myserver + "/scalaskel/change/2", function(error, response, body){
			var answer = JSON.parse(body);
			expect(answer.length).toBe(1);			
			var expected = [{'foo':2}];
			for (var comb in answer){//{'foo':7}
				for (var piece in answer[comb]){
					expect(answer[comb][piece]).toBe(expected[comb][piece]);
				}
			}
			done();
		});
	});
	it("should answser correctly to change 7", function(done) {
		request(myserver + "/scalaskel/change/7", function(error, response, body){
			var answer = JSON.parse(body);
			expect(answer.length).toBe(2);			
			var expected = [{'foo':7}, {'bar':1}];
			for (var comb in answer){
				for (var piece in answer[comb]){
					expect(answer[comb][piece]).toBe(expected[comb][piece]);
				}
			}
			done();
		});
	});
	it("should answser correctly to change 8", function(done) {
		request(myserver + "/scalaskel/change/8", function(error, response, body){
			var answer = JSON.parse(body);
			expect(answer.length).toBe(2);			
			var expected = [{'foo':8}, {'bar':1, 'foo':1}];
			for (var comb in answer){
				for (var piece in answer[comb]){
					expect(answer[comb][piece]).toBe(expected[comb][piece]);
				}
			}
			done();
		});
	});
	it("should answser correctly to change 15", function(done) {
		request(myserver + "/scalaskel/change/15", function(error, response, body){
			var answer = JSON.parse(body);
			expect(answer.length).toBe(3);			
			var expected = [{'foo':15}, {'bar':1,'foo':8}, {'bar':2, 'foo':1}];
			for (var comb in answer){
				for (var piece in answer[comb]){
					expect(answer[comb][piece]).toBe(expected[comb][piece]);
				}
			}
			done();
		});
	});
});

