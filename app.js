//imports
var express = require('express');

//running port
var port = 8123;

//server
var app = express();
app.configure(function() {
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
	if (q == "Es tu abonne a la mailing list(OUI/NON)"){
		res.send("OUI");
		return;
	}
	res.send(q);
});
