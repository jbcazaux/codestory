var _BAZ = 21;
var _QIX = 11;
var _BAR = 7;
//var _FOO = 1; not used but code suppose it is so.

/*
Iterate over all possibilities
If a new type of coin is given, the code needs refactoring (too many for loop).
Tried to do it recursivity but it s not optimized in JS (vs iterative computation), moreover the code is less readable.
so plz refactor with care ;) 
*/
function getChanges(change){
	var possibilities = [];
	for (var baz = 0; _BAZ * baz <= change; baz++){
		var changebaz = change - _BAZ*baz;
		for (var qix = 0; _QIX * qix <= changebaz; qix++){
			var changeqix = changebaz - _QIX*qix;
			for (var bar = 0; _BAR * bar <= changeqix; bar++){
				var changebar = changeqix - _BAR*bar;
				var possibility = {};
				if (changebar > 0) possibility['foo'] = changebar;
				if (bar > 0) possibility['bar'] = bar;
	  			if (qix > 0) possibility['qix'] = qix;
				if (baz > 0) possibility['baz'] = baz;
				possibilities.push(possibility);
			}
		}
	}
	return possibilities ;	 
}

module.exports.getChanges = getChanges;
