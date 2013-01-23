var bigdecimal = require("bigdecimal");

/*defined class and some utility methods*/
Object.defineProperty(Array.prototype, 'last', {
    enumerable: false,
    configurable: true,
    get: function() {
        return this.length > 0 ? this[this.length - 1] : undefined;
    },
    set: undefined
});

/*Btree for computation,
Notice the order of the parameter: RIGHT then LEFT*/
function BinaryTree(right, left, op){
	this.left = left;
	this.right = right;
	this.op = op;
}
BinaryTree.prototype.operators = {'+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide'};
BinaryTree.prototype.getOp = function(op){return this.operators[op];};
BinaryTree.prototype.compute = function(){
		var l = this.left.compute();
		var r = this.right.compute(); 
		return l[this.getOp(this.op)](r);
};

//add compute() function to bigdecimal so it can be viewed as a btree (leaf);
bigdecimal.BigDecimal.prototype.compute = function(){return this;};


/* filter method */
function notEmpty(val){
	return val && val != '';
}






/*main function*/
function computeExpression(expression){
	return infixToBtree(expression.replace(/,/g, '.')).compute().toString().replace(/\./g, ',').replace(/(,0+)$/, '');
}
	
/*Convert infix expression To a Binary tree*/
function infixToBtree(expression)
{
    var tokens = expression.split(/([\d\.]+|[\*\+\-\/\(\)])/).filter(notEmpty);
    var operatorStack = [];
    var lastToken = '';
    var queue = [];

    while (tokens.length > 0)
    {
        var currentToken = tokens.shift();

        if (isNumber(currentToken)) 
        {
	    queue.push(new bigdecimal.BigDecimal(currentToken));
        }
	else if (isUnaryOp(currentToken, lastToken))
	{
	    lastToken = currentToken;
	    //expect next token to be a number
	    currentToken = tokens.shift();
	    //minus is the only unary op supported for now
	    queue.push(new bigdecimal.BigDecimal(currentToken).negate());	
	}
        else if (isOperator(currentToken)) 
        {
            while (getPrecedence(currentToken) <= getPrecedence(operatorStack.last) ) 
            {
		var newNode = new BinaryTree(queue.pop(), queue.pop(), operatorStack.pop()); 		
		queue.push(newNode);
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

		var newNode = new BinaryTree(queue.pop(), queue.pop(), operatorStack.pop()); 		
		queue.push(newNode);
            }	
            operatorStack.pop();		
        }
	lastToken = currentToken;   
    }  

    while (operatorStack.length != 0)
    {
        if (/^[\(\)]$/.test(operatorStack.last))
		return "Error in braces count";
        
	var newNode = new BinaryTree(queue.pop(), queue.pop(), operatorStack.pop()); 		
	queue.push(newNode);
                     
    }
    //return Btree root
    return queue[0];
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
    //f*ckin regex was too complicated to write, split that mothaf*ker
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

module.exports.compute = computeExpression;
