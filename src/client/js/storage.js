function getTrips(){
    const trips = localStorage.getItem('trips');
    if(!trips){
        return [];
    }
    return JSON.parse(trips);
}

function addTrip(trip){
    const trips = getTrips();
    trips.push(trip);
    trips.sort(sortTrips);
    localStorage.setItem('trips', JSON.stringify(trips));
}

function sortTrips(tripA, tripB){
    if(tripA.date > tripB.date){
        return 1;
    } else if (tripB.date > tripA.date){
        return -1;
    } else {
        return 0;
    }
}

export {getTrips, addTrip};