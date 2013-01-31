/**
* main function
*/
function getBestPlanning(orders){
	
	var trips = [];
	for (var i in orders){
		trips.push(new Trip(orders[i]['VOL'] + ';', orders[i]['DEPART'], orders[i]['DUREE'], orders[i]['PRIX']));
	}
	//order trips before processing
	return(maximiseMoney(trips.sort(tripCompare)));
}

/*how to order trips*/
function tripCompare(t1, t2){
	if (t1.departure === t2.departure){
		return t2.end - t1.end;
	}
	return t1.departure - t2.departure;
}
function planningCompare(p1, p2){
	return p1.end - p2.end;
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
function Planning(trip){
	trip = trip || {};
	this.path = trip.id ? trip.id : '';
	this.gain = trip.price || 0;
	this.end = trip.end || 0;
}
/*adding a trip to a planning return a new planning with old trips and the new one
* if planning cannot accept the trip, it returns an empty array
*/
Planning.prototype.addTrip = function(trip){
	if (this.end <= trip.departure){
		var newPlanning = new Planning({price: this.gain + trip.price, end: trip.end});
		newPlanning.path = this.path + trip.id;
		return newPlanning;
	}
	return null;
}

/*filter plannings by removing worst candidates
* ie plannings whose gain is not as good as the reference planning
* and whose end is too late
*/
function optimizeFilter(refP, minDeparture, lastMin){
	return function(p){
		if (p.gain < refP.gain && (p.end >= refP.end || refP.end <= minDeparture || p.end < lastMin)){
			return false;		
		}
		return true;
	}
}



/*the idea is to iterate over all possibilities each time a trip is added. 
But after the trip is added, to remove the worst plannings (a few plannings can remain after the filter).
*/
function maximiseMoney(trips){
	var begin = new Date().getTime();
		
	var plannings = new Array(),
	tmpPlanning, bestP, refP, nextTrip, bestPGain, emptyPlanning = new Planning(), lastMin = 0;
	//create first planning 
	plannings.push(new Planning(trips.shift()));
	
	//define a reference planning (first one by default)
	refP = plannings[0];
		
	for (var t = 0; t < trips.length; t++){
		nextTrip = trips[t+1] || {};
		//if next trip ends before current 
		//and next trip's price is bigger,
		// it is not necessary to process current trip. Go to next one directly !
		if (nextTrip.price >= trips[t].price && nextTrip.end <= trips[t].end ) {continue} 
		
		//filter planning to get rid of worst candidates
		plannings = plannings.filter(optimizeFilter(refP, trips[t].departure, lastMin)).sort(planningCompare);
		//try to get the best planning candidate to add the new current trip
		bestP = null;
		bestPGain = trips[t].price;
		for (var p = 0; p < plannings.length; p++){
			if (plannings[p].end > trips[t].departure){
				break;
			}
			if (plannings[p].gain + trips[t].price > bestPGain) {
				bestP = plannings[p];
				bestPGain = plannings[p].gain + trips[t].price;
			}
		}


		if (trips[t].end < refP.end || bestPGain > refP.gain){
			if (bestP == null){
				bestP = emptyPlanning.addTrip(trips[t]);
			}else {
				trips[t].departure = bestP.end;
				bestP = bestP.addTrip(trips[t]);
				if (trips[t].departure > lastMin) lastMin = trips[t].departure;	
			}
			plannings.push(bestP);
			if (bestPGain >= refP.gain){
				refP = bestP;
			}
		}
		
	}
	var end = new Date().getTime();	
	console.log("mytime = ", end - begin);
	
		
	//At the end, the reference planning is da best one !
	return {"gain": refP.gain, "path": refP.path.replace(/;$/, '').split(';')};
}
  
module.exports.getBestPlanning = getBestPlanning; 
