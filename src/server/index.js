const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require("axios");
dotenv.config();

const geoUsername = process.env.GEO_USERNAME;
const geoNameUrl = 'http://api.geonames.org/postalCodeSearch';

const weatherBitKey = process.env.WEATHERBIT_KEY;

const pixabayKey = process.env.PIXABAY_KEY;

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

app.get('/location', (req, resp) => {
    const placename = req.query.placename;
    axios.get(geoNameUrl, {
        params: {
            username: geoUsername,
            placename,
            type: 'json'
        }
    }).then(axResp => {
        console.log(axResp.data);
        resp.send('Done');
    }).catch(err => {
        console.log(err);
    })
 

    
})