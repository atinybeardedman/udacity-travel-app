import {
    getFormElements, getUnits
} from './helpers';
import { addTrip } from './storage';
import { updateTrips } from './updateUI';
const elements = getFormElements();


function postTrip({
    location,
    date,
    length,
    units
}) {
    return fetch(`/addTrip`, {
        method: 'POST',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            location,
            date,
            length,
            units
        })
    });
}

function getPlace(city, country) {
    return fetch(`/places?city=${city}&country=${country}`)
        .then(resp => resp.json())
        .catch(err => {
            // TODO: handle error
            console.log(err);
        })
        .then(resp => resp.geonames[0]);
}

function submitForm(e) {
    e.preventDefault();
    const button =document.getElementById('submit');
    button.disabled = true;
    button.classList.add('is-loading');
    const values = {};
    for (const elName of Object.keys(elements)) {
        const el = elements[elName];
        if (!el.checkValidity()) {
            return Promise.resolve(false);
        } else {
            values[el.dataset.id] = el.value;
        }
    }
    values.units = getUnits();
    return getPlace(values.city, values.country)
        .then(location =>
            postTrip({...values, location})
        )
        .then(resp => resp.json())
        .then(resp => {
            addTrip(resp.trip);
            updateTrips();
            button.disabled = false;
            button.classList.remove('is-loading');
        })
}

export {
    getPlace,
    submitForm
};