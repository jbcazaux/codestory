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
	console.log("\n\nCHANGE = " + req.params.X);
	res.json(getChangeInJson(getChanges(req.params.X)));
});

function Change(foo, bar, quix, baz){
	this.foo = foo;
	this.bar = bar;
	this.quix = quix;
	this.baz = baz;
}
function getChangeInJson(changes){
	
	var all = new Array();
	for (var a in changes){
		var c = {};
		if (changes[a].quix > 0) c.quix = changes[a].quix;
		if (changes[a].bar > 0) c.bar = changes[a].bar;
		if (changes[a].foo > 0) c.foo = changes[a].foo;

		all.push(c);
		console.log("---------->");		
		console.dir(c);
	}
	
	return all;
}

function getChanges(change){
	var arr = [];
	for (var q = 0; 11 * q <= change; q++){
		var changeq = change - 11*q;
		for (var b = 0; 7 * b <= changeq; b++){
			var changeb = changeq - 7*b;			
			arr.push(new Change(changeb, b, q));
		}
	}
	return arr ;	 
}


