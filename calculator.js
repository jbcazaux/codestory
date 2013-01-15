var bigdecimal = require("bigdecimal");

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
	return evaluateExpression(infixToPostfix(expression.replace(/,/g, '.'))).toString().replace(/\./g, ',').replace(/(,0+)/, '');
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

    while (tokens.length > 0)
    {
        var currentToken = tokens.shift();

        if (isNumber(currentToken)) 
        {
            outputQueue.push(new bigdecimal.BigDecimal(currentToken));
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

module.exports.compute = compute;
