function getBestPlanning(commands){
	
	var trips = [];
	for (var i in commands){
		trips.push(new Trip(commands[i]['VOL'], commands[i]['DEPART'], commands[i]['DUREE'], commands[i]['PRIX']));
	}

	return(maximiseMoney(trips));

}

/*expects trips to be ordered*/
function tripCompare(t1, t2){
	if (t1.departure === t2.departure){
		return t2.price - t1.price;
	}
	return t1.departure - t2.departure;
}

function Trip(vol, depart, duree, prix){
	this.id = vol;
	this.departure = depart;
	this.duration = duree;
	this.price = prix;
	this.end =  depart + duree;
}

function Planning(path, gain, end){
	this.path = path || [];
	this.gain = gain || 0;
	this.end = end || 0;
}
Planning.prototype.addTrip = function(trip){
	if (this.end <= trip.departure){
		return new Planning(this.path.concat(trip.id), this.gain + trip.price, trip.end);
	}
	return [];
}

/*filter plannings by removing worst candidates
* ie plannings whose gain is not as good as the reference planning
* and whose departure is after remainings commands
*/
function optimizeFilter(refP, minDeparture){
	return function(p){
		if ((p.end >= refP.end && p.gain < refP.gain) || (refP.end <= minDeparture && p.gain < refP.gain)){
			return false;		
		}
		return true;
	}
}

function maximiseMoney(trips){
	var plannings = new Array(),
	tmpPlanning, bestP, refP, cnt1=0, cnt2=0;
	//order trips	
	trips = trips.sort(tripCompare);
	//create first planning 
	plannings.push(new Planning().addTrip(trips.shift()));
	
	//define a reference planning (first by default)
	refP = plannings[0];
	for (var t in trips){
		cnt1++;
		//filter planning to get rid of worst candidates
			plannings = plannings.filter(optimizeFilter(refP, trips[t].departure));
		//try to get best planning after analysing a new trip
		bestP = new Planning().addTrip(trips[t]);
		for (var p in plannings){
			cnt2++;
			tmpPlanning = plannings[p].addTrip(trips[t]);
			if (tmpPlanning.gain > bestP.gain){
				bestP = tmpPlanning;
			}
		}
		//set new reference planning
		if (bestP.gain > refP.gain){
			refP = bestP;
			plannings.push(bestP);
			
		}
		
	}

	return {"gain": refP.gain, "path": refP.path};
}
  
module.exports.getBestPlanning = getBestPlanning; 
