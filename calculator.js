var bigdecimal = require("bigdecimal");

bigdecimal.BigDecimal.prototype.compute = function(){return this;};

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


function compute(expression){
	//return evaluateExpression(infixToPostfix(expression.replace(/,/g, '.'))).toString().replace(/\./g, ',').replace(/(,0+)/, '');
	return infixToPostfix(expression.replace(/,/g, '.')).compute().toString().replace(/\./g, ',').replace(/(,0+)/, '');
}
	
function evaluateExpression(queue)
{
    var tokens = queue;
    var evalStack = [];

    while (tokens.length != 0)
    {
        var currentToken = tokens.shift();

        if (isNumber(currentToken.toString()))
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
            return operand1.add(operand2);
        case '-':
            return operand1.subtract(operand2);
        case '*':
            return operand1.multiply(operand2);
        case '/':
            return operand1.divide(operand2);
        default:
            return;
    }

}


function infixToPostfix(expression)
{
    var tokens = expression.split(/([\d\.]+|[\*\+\-\/\(\)])/).filter(notEmpty);
    var outputQueue = [];
    var operatorStack = [];
    var lastToken = '';
    var outputTree = new BinaryTree();
    var myqueue = [];

    while (tokens.length > 0)
    {
        var currentToken = tokens.shift();

        if (isNumber(currentToken)) 
        {
            outputQueue.push(new bigdecimal.BigDecimal(currentToken));
	    myqueue.push(new bigdecimal.BigDecimal(currentToken));
        }
	else if (isUnaryOp(currentToken, lastToken))
	{
	    //expect next token to be a number
	    lastToken = currentToken;
	    currentToken = tokens.shift();
	    outputQueue.push(new bigdecimal.BigDecimal(currentToken).negate());
	    myqueue.push(new bigdecimal.BigDecimal(currentToken).negate());	
	}
        else if (isOperator(currentToken)) 
        {
            while (getPrecedence(currentToken) <= getPrecedence(operatorStack.last) ) 
            {
                outputQueue.push(operatorStack.pop());
		var newNode = new BinaryTree(myqueue.pop(), myqueue.pop(), outputQueue.last); 		
		myqueue.push(newNode);
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
		var newNode = new BinaryTree(myqueue.pop(), myqueue.pop(), outputQueue.last); 		
		myqueue.push(newNode);
            }	
            operatorStack.pop();		
        }
	lastToken = currentToken;   
    }  

    while (operatorStack.length != 0)
    {
        if (/^[\(\)]$/.test(operatorStack.last))
		return "Error in braces count";
        
	outputQueue.push(operatorStack.pop());
	var newNode = new BinaryTree(myqueue.pop(), myqueue.pop(), outputQueue.last); 		
	myqueue.push(newNode);
                     
    }
    console.dir(myqueue[0]);
    return myqueue[0];
   //return outputQueue;
}    


function isOperator(token)
{
    return /^[*\+\-\/]$/.test(token);
}

function isUnaryOp(currentToken, lastToken){
    return currentToken == '-' && (getPrecedence(lastToken) > 0 || lastToken == '' || lastToken == '(');
}

function isNumber(token)
{
    return /^\d*(\.\d+)?$/.test(token) || /^\-(\d+|(\.\d+))$/.test(token);
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

function BinaryTree(right, left, op){
	this.left = left;
	this.right = right;
	this.op = op;
 	this.compute = function(){
		var l = this.left.compute();
		var r = this.right.compute(); 
		return l[this.getOp(this.op)](r);
	};
}
BinaryTree.prototype.operators = {'+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide'};
BinaryTree.prototype.getOp = function(op){return this.operators[op];};


module.exports.compute = compute;
