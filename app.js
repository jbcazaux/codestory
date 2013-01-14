//imports
var express = require('express'),
scalaskel = require('./scalaskel.js');
querystring = require('querystring');
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
	console.log("q=" + q);

	var rawq = req._parsedUrl.query.split('=')[1];
	if (rawq) {
		var calc=/^[\d\-\+/\*\)\(]+$/gi;
		if (calc.test(rawq)){
			console.log(rawq + " = " + eval(rawq));
			res.send(200, eval(rawq).toString());
			return;
		}
	}
	
	if (q == "Quelle est ton adresse email"){
		res.send("jbcazaux@gmail.com");
		return;
	}
	if (q == "Est ce que tu reponds toujours oui(OUI/NON)"){
		res.send("NON");
		return;
	}
	res.status(200).send("OUI");
});

app.post('*', function(req, res) {
 	var q = req.body;
	console.dir(req.body)
	res.send(201);
});

app.get('/scalaskel/change/:X', function(req, res) {
	res.json(scalaskel.getChanges(req.params.X));
});


