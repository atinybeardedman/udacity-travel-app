const moment = require("moment");
function getTrips() {
  let trips = localStorage.getItem("trips");
  if (!trips) {
    return [];
  } else {
    return JSON.parse(trips);
  }
}

function updatePhotos() {
  // photo results only last 24 hours, need to refresh each time the page loads to be sure
  const promises = getTrips().map((trip) => {
    const updatedTrip = { ...trip };
    return fetch(`/getPhoto?city=${trip.city}&country=${trip.country}`)
      .then((resp) => resp.json())
      .then((photo) => {
        updatedTrip.photo = photo.photo;
        return updatedTrip;
      });
  });
  return Promise.all(promises).then((updatedTrips) =>
    localStorage.setItem("trips", JSON.stringify(updatedTrips))
  );
}

function getSplitTrips() {
  // split trips into past and upcoming
  const trips = getTrips();
  const pastTrips = [];
  const upcomingTrips = [];
  for (const trip of trips) {
    const today = moment();
    const tripEnd = moment(trip.date).add(trip.length, "days");
    if (today > tripEnd) {
      pastTrips.push(trip);
    } else {
      upcomingTrips.push(trip);
    }
  }
  return { pastTrips, upcomingTrips };
}

function addTrip(trip) {
  const trips = getTrips();
  trips.push(trip);
  trips.sort(sortTrips);
  localStorage.setItem("trips", JSON.stringify(trips));
}

function sortTrips(tripA, tripB) {
  if (tripA.date > tripB.date) {
    return 1;
  } else if (tripB.date > tripA.date) {
    return -1;
  } else {
    return 0;
  }
}

export { getTrips, addTrip, getSplitTrips, updatePhotos };
