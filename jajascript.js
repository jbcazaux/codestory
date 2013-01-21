
/**
* main function
*/
function getBestPlanning(orders){
	
	var trips = [];
	for (var i in orders){
		trips.push(new Trip(orders[i]['VOL'], orders[i]['DEPART'], orders[i]['DUREE'], orders[i]['PRIX']));
	}

	return(maximiseMoney(trips));

}

/*how to order trips*/
function tripCompare(t1, t2){
	if (t1.departure === t2.departure){
		return t2.price - t1.price;
	}
	return t1.departure - t2.departure;
}

/*a trip has an id, a beginning hour, a duration and a price*/
function Trip(id, departure, duration, price){
	this.id = id;
	this.departure = departure;
	this.duration = duration;
	this.price = price;
	this.end =  departure + duration;
}

/*a planning has a list of its trip's ids, an end and gain(money earned)*/
function Planning(path, gain, end){
	this.path = path || [];
	this.gain = gain || 0;
	this.end = end || 0;
}
/*adding a trip to a planning return a new planning with old trips and the new one
* if planning cannot accept the trip, it returns an empty array
*/
Planning.prototype.addTrip = function(trip){
	if (this.end <= trip.departure){
		return new Planning(this.path.concat(trip.id), this.gain + trip.price, trip.end);
	}
	return [];
}

/*filter plannings by removing worst candidates
* ie plannings whose gain is not as good as the reference planning
* and whose end is too late
*/
function optimizeFilter(refP, minDeparture){
	return function(p){
		if (p.gain < refP.gain && (p.end >= refP.end || refP.end <= minDeparture)){
			return false;		
		}
		return true;
	}
}

/*the idea is to iterate over all possibilities each time a trip is added. 
But after the trip is added, to remove the worst plannings (a few plannings can remain after the filter).
*/
function maximiseMoney(trips){
	var plannings = new Array(),
	tmpPlanning, bestP, refP;
	//order trips	
	trips = trips.sort(tripCompare);
	//create first planning 
	plannings.push(new Planning().addTrip(trips.shift()));
	
	//define a reference planning (first by default)
	refP = plannings[0];
	for (var t in trips){
		//filter planning to get rid of worst candidates
			plannings = plannings.filter(optimizeFilter(refP, trips[t].departure));
		//try to get best planning after analysing a new trip
		bestP = new Planning().addTrip(trips[t]);
		for (var p in plannings){
			tmpPlanning = plannings[p].addTrip(trips[t]);
			if (tmpPlanning.gain > bestP.gain){
				bestP = tmpPlanning;
			}
		}
		//set new reference planning
		if (bestP.gain > refP.gain){
			refP = bestP;
			//add new possibility only if it s better. Otherwise it would have been filtered on next iteration
			plannings.push(bestP);
		}
		
	}
	//turns out that the reference planning is da best one !
	return {"gain": refP.gain, "path": refP.path};
}
  
module.exports.getBestPlanning = getBestPlanning; 
