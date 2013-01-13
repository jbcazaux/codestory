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

var _BAZ = 21;
var _QIX = 11;
var _BAR = 7;
var _FOO = 1;

function getChanges(change){
	var possibilities = [];
	for (var baz = 0; _BAZ * baz <= change; baz++){
		var changebaz = change - _BAZ*baz;
		for (var qix = 0; _QIX * qix <= changebaz; qix++){
			var changeqix = changebaz - _QIX*qix;
			for (var bar = 0; _BAR * bar <= changeqix; bar++){
				var changebar = changeqix - _BAR*bar;
				var possibility = {};
				if (changebar > 0) possibility['foo'] = changebar;
				if (bar > 0) possibility['bar'] = bar;
	  			if (qix > 0) possibility['qix'] = qix;
				if (baz > 0) possibility['baz'] = baz;
				possibilities.push(possibility);
			}
		}
	}
	return possibilities ;	 
}
