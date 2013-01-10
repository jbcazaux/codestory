//imports
var express = require('express');

//running port
var port = 8123;

//server
var app = express();
app.configure(function() {
	app.use(express.bodyParser());
	app.use(app.router);
	app.use('/test', express.static(__dirname + '/test'));
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
	res.send("OUI");
});

app.post('/', function(req, res) {
    var q = req.body;
	console.log("q=" + q);
	res.send("OK");
});
