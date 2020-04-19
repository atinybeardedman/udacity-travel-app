const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require("axios");
dotenv.config();

// set up constants

const geoUsername = process.env.GEO_USERNAME;
const geoNameBaseUrl = 'http://api.geonames.org/';
const weatherBitKey = process.env.WEATHERBIT_KEY;
const pixabayKey = process.env.PIXABAY_KEY;

// set up cache

const cache = {};


// set up app
const app = express();

app.use(express.static('dist'));
app.use(cors());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/countries', (req, resp) => {
    if(cache.hasOwnProperty('countries')){
        resp.send(cache.countries);
    } else {
        axios.get(geoNameBaseUrl + 'countryInfo',{
            params: {
                username: geoUsername,
                type: 'json'
            }
        }).then(axResp => {
            const countryList = axResp.data.geonames.map(c => ({name: c.countryName, code: c.countryCode, capital: c.capital}));
            cache.countries = countryList;
            resp.send(countryList);
        }).catch(err => {
            console.log(err);
        })

    }
})

app.get('/places', (req, resp) => {
    const {city, country} = req.query;
    axios.get(geoNameBaseUrl + 'search', {
        params: {
            username: geoUsername,
            q:city,
            country,
            fuzzy: 0,
            type: 'json'
        }
    }).then(axResp => {
        resp.send(axResp.data);
    }).catch(err => {
        console.log(err);
    })
});

app.post('/addTrip', (req, resp) => {
    const {}
    const weather$ = getWeather()

})