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
                    <h3 class="is-size-3">${getCountdown(trip.date)}</h3>
                    <p>${
                      moment(trip.date).format("ll") } -
                     ${ moment(trip.date).add(trip.length, 'days').format("ll")}
                    </p>
                    <div class="content">
                        Expect temperatures between 
                        ${ formatTemp(trip.weather.high_temp, trip.weather.units)} and ${formatTemp(trip.weather.low_temp, trip.weather.units)}
                    </div>
                </div>
            </div>`;
}

function getCountdown(datestring) {
  const now = moment();
  const tripStart = moment(datestring);
  const diff = tripStart.diff(now, "days");
  if(diff === 0){
      return 'Leaving Today!';
  } else if (diff > 0){
      return `In ${diff} days`;
  } else {
      return `${Math.abs(diff)} days ago`;
  }
}

function formatTemp(temp, units){
    if(units === 'I'){
        return `${temp}  &deg;F`;
    } else {
        return `${temp}  &deg;C`;
    }
}

export { createCard };