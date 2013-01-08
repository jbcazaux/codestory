//imports
var express = require('express');

//running port
var port = 8123;

//server
var app = express();
app.configure(function() {
	app.use(app.router);
	app.use(express.static(__dirname));
}).listen(port);

console.log("listening on " + port);

app.get('/', function(req, res){
	var q = req.param('q');
	console.log("q=" + q);
	if (q=="Quelle est ton adresse email"){
		res.send("jbcazaux@gmail.com");
		return;
	}
	res.send(q);//response
});

