//imports
var express = require('express'),
querystring = require('querystring'),
scalaskel = require('./scalaskel.js'),
calculator = require('./calculator.js'),
jajascript = require('./jajascript.js');

//running port
var port = 8123;


//server
var app = express();
app.configure(function() {
	app.use(express.logger());
	//app.use(express.bodyParser());
	//app.use(express.json());
	app.use(app.router);
	app.use('/', express.static(__dirname));
}).listen(port);

console.log("listening on " + port);

app.get('/', function(req, res){
	var q = req.param('q');
	console.log("q=" + q);

	var rawq = req._parsedUrl.query.split('=')[1];
	if (rawq) {
		var calc=/^[\d\-\+/\*\)\(,]+$/gi;
		if (calc.test(rawq)){
			console.log(rawq);
			res.send(calculator.compute(rawq));			
			return;
		}
	}

	if (q == "As tu passe une bonne nuit malgre les bugs de l etape precedente(PAS_TOP/BOF/QUELS_BUGS)"){
		res.send("QUELS_BUGS");
		return;
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

app.post('/jajascript/optimize', function(req, res) {
	console.dir(req.headers);
	req.setEncoding('utf8');
	var buf = '';
	req.on('data', function(chunk){ 
		buf += chunk;
	});
        req.on('end', function(){
        if (0 == buf.length) {
          res.send(400, 'invalid json, empty body');
	  return;
        }
        res.send(201, jajascript.getBestPlanning(JSON.parse(buf)));
      });
});

app.post('*', function(req, res) {
 	var q = req.body;
	console.dir(req.body)
	res.send(201);
});

app.get('/scalaskel/change/:X', function(req, res) {
	res.json(scalaskel.getChanges(req.params.X));
});

