//imports
var express = require('express');

//running port
var port = 8123;

//server
var app = express();
app.configure(function() {
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(app.router);
	app.use('/', express.static(__dirname));
}).listen(port);

console.log("listening on " + port);

app.get('/', function(req, res){
	var q = req.param('q');
	if (q == "Quelle est ton adresse email"){
		res.send("jbcazaux@gmail.com");
		return;
	}
	if (q == "Est ce que tu reponds toujours oui(OUI/NON)"){
		res.send("NON");
		return;
	}
	res.status(201).send("OUI");
});

app.post('*', function(req, res) {
 	var q = req.body;
	console.dir(req.body)
	res.send(201);
});

app.get('/scalaskel/change/:X', function(req, res) {
	res.json(getChanges(req.params.X));
});

function getChanges(change){
	var possibilities = [];
	for (var baz = 0; 21 * baz <= change; baz++){
		var changebaz = change - 21*baz;
		for (var quix = 0; 11 * quix <= changebaz; quix++){
			var changequix = changebaz - 11*quix;
			
			for (var bar = 0; 7 * bar <= changequix; bar++){
				var changebar = changequix - 7*bar;
				var possibility = {};
				if (changebar > 0) possibility['foo'] = changebar;
				if (bar > 0) possibility['bar'] = bar;
	  			if (quix > 0) possibility['quix'] = quix;
				if (baz > 0) possibility['baz'] = baz;
				possibilities.push(possibility);
			}
		}
	}
	return possibilities ;	 
}
