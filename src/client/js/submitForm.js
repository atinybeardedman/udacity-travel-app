import {
    getFormElements
} from './helpers';
const elements = getFormElements();


function postTrip({
    location,
    date,
    length
}) {
    return fetch(`http://localhost:8081/addTrip`, {
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
            length
        })
    });
}

function getPlace(city, country) {
    return fetch(`http://localhost:8081/places?city=${city}&country=${country}`)
        .then(resp => resp.json())
        .catch(err => {
            // TODO: handle error
            console.log(err);
        })
        .then(resp => resp.geonames[0]);
}

function submitForm(e) {
    e.preventDefault();
    const values = {};
    for (const elName of Object.keys(elements)) {
        const el = elements[elName];
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