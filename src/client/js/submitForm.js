import {
    getFormElements
} from './helpers';
const elements = getFormElements();


function postTrip({
    location,
    departure,
    length
}) {
    return fetch(`localhost:8081/addTrip`, {
        method: 'POST',
        data: JSON.stringify({
            city,
            country,
            departure,
            length
        })
    });
}

function getPlace(city, country) {
    return fetch(`localhost:8081/places?city=${city}&country=${country}`)
        .then(resp => resp.json())
        .catch(err => {
            // TODO: handle error
            console.log(err);
        })
        .then(resp => resp.geonames[0]);
}

function submitForm() {
    const values = {};
    for (const el of elements) {
        if (!el.checkValidity()) {
            return Promise.resolve(false);
        } else {
            values[el.dataset.id] = el.value;
        }
    }
    return getPlace(values.city, values.country)
        .then(location =>
            postTrip({...values, location})
        )
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp.trip);

        })
}

export {
    getPlace,
    submitForm
};