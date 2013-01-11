//imports
var express = require('express');

//running port
var port = 8123;

//server
var app = express();
app.configure(function() {
	app.use(express.bodyParser());
	app.use(app.router);
	app.use('/', express.static(__dirname));
}).listen(port);

console.log("listening on " + port);



app.get('/', function(req, res){
	var q = req.param('q');
	console.log("q=" + q);
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

app.post('/enonce/1', function(req, res) {
	console.log("POST METHOD" + req.body);
 	var q = req.body;
	for (var i in q){
		console.log(i + " -> " + q[i]);
	}
	res.send(201);
});


