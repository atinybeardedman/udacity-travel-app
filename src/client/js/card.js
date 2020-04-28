const moment = require("moment");

function createCard(trip) {
  return `
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        ${trip.city}, ${trip.country}
                    </p>
                </header>
                <div class="card-image">
                    <figure class="image is-3by2">
                        <img src="${trip.photo}" alt="Photo of location">
                    </figure>
                </div>
                <div class="card-content">
                    <h3 class="is-size-3">${getCountdown(trip)}</h3>
                    <p>${moment(trip.date).format("ll")} -
                     ${moment(trip.date).add(trip.length, "days").format("ll")}
                    </p>
                    <div class="content">
                        Expect temperatures between 
                        ${formatTemp(
                          trip.weather.high_temp,
                          trip.weather.units
                        )} and ${formatTemp(
    trip.weather.low_temp,
    trip.weather.units
  )}
                    </div>
                </div>
            </div>`;
}

function getCountdown(trip) {
  // get text for countdown on the card. Should be different if trip is future, present, past
  const now = moment();
  const tripStart = moment(trip.date);
  const diff = tripStart.diff(now, "days");
  if (diff === 0) {
    return "Leaving Today!";
  } else if (diff > 0) {
    return `In ${diff} days`;
  } else {
    const pastDiff = Math.abs(diff);
    if (pastDiff < trip.length) {
      return "Currently Active!";
    } else {
      return `${pastDiff} days ago`;
    }
  }
}

function formatTemp(temp, units) {
  // correctly format temperature units on the card
  if (units === "I") {
    return `${temp} &deg;F`;
  } else {
    return `${temp} &deg;C`;
  }
}

export { createCard, getCountdown, formatTemp };
