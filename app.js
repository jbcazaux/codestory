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
		var calc=/^[\d\-\+/\*\)\(,]+$/gi;
		if (calc.test(rawq)){
			console.log(rawq + " = " + eval(rawq));
			//res.send(200, eval(rawq.replace(',', '.')).replace('.', ","));
			res.send(evaluateExpression(infixToPostfix(rawq.replace(',', '.'))).toString().replace('.', ","));			
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

function notEmpty(val){
	return val && val != '';
}

Object.defineProperty(Array.prototype, 'last', {
    enumerable: false,
    configurable: true,
    get: function() {
        return this.length > 0 ? this[this.length - 1] : undefined;
    },
    set: undefined
});

	
function evaluateExpression(queue)
{
    var tokens = queue;
    var evalStack = [];

    while (tokens.length != 0)
    {
        var currentToken = tokens.shift();

        if (isNumber(currentToken))
        {
            evalStack.push(currentToken);
        }
        else if (isOperator(currentToken))
        {
            var operand2 = evalStack.pop();
            var operand1 = evalStack.pop();

            var result = performOperation(operand1, operand2, currentToken);
            evalStack.push(result);
        }
    }
    return evalStack.pop();
}

function performOperation(operand1, operand2, operator)
{
    switch(operator)
    {
        case '+': 
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
        default:
            return;
    }

}


function infixToPostfix(expression)
{
    var tokens = expression.split(/([\d\.]+|[\*\+\-\/\(\)])/).filter(notEmpty);
    var outputQueue = [];
    var operatorStack = [];

    while (tokens.length > 0)
    {
        var currentToken = tokens.shift();

        if (isNumber(currentToken)) 
        {
            outputQueue.push(parseFloat(currentToken));
        }
        else if (isOperator(currentToken)) 
        {
            while (getPrecedence(currentToken) <= getPrecedence(operatorStack.last) ) 
            {
                outputQueue.push(operatorStack.pop())
            }

            operatorStack.push(currentToken);

        }
        else if (currentToken == '(')
        {
                operatorStack.push(currentToken);
        }
        else if (currentToken == ')')
        {
            while (operatorStack.last != '(')
            {
    	        if (operatorStack.length == 0)
    	            return "Error in braces count";

    	        outputQueue.push(operatorStack.pop());
            }	
            operatorStack.pop();		
        }   
    }  

    while (operatorStack.length != 0)
    {
        if (/^[\(\)]$/.test(operatorStack.last))
		return "Error in braces count";
        
	outputQueue.push(operatorStack.pop());
                     
    }

    return outputQueue;
}    


function isOperator(token)
{
    return /^[*\+\-\/]$/.test(token);
}

function isNumber(token)
{
    return /^\d*(\.\d+)?$/.test(token);
}


function getPrecedence(token)
{
    switch (token)
    {
    	case '*':		    
    	case '/':
    	    return 8;
        case '+':
    	case '-':
    	    return 6;
    	default: 
    	    return -1;
    }
}
