const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const axios = require("axios");
const bodyParser = require("body-parser");
const moment = require("moment");
dotenv.config();

// set up constants

const geoUsername = process.env.GEO_USERNAME;
const geoNameBaseUrl = "http://api.geonames.org/";
const weatherBitKey = process.env.WEATHERBIT_KEY;
const weatherHistoricalUrl = "https://api.weatherbit.io/v2.0/history/daily";
const weatherForecastUrl = "https://api.weatherbit.io/v2.0/forecast/daily";
const pixabayKey = process.env.PIXABAY_KEY;
const pixabayUrl = "https://pixabay.com/api";

// set up cache

const cache = {};

// set up app
const app = express();

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile(path.join("dist", "index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/countries", (req, resp) => {
  if (cache.hasOwnProperty("countries")) {
    resp.send(cache.countries);
  } else {
    axios
      .get(geoNameBaseUrl + "countryInfo", {
        params: {
          username: geoUsername,
          type: "json",
        },
      })
      .then((axResp) => {
        const countryList = axResp.data.geonames.map((c) => ({
          name: c.countryName,
          code: c.countryCode,
          capital: c.capital,
        }));
        cache.countries = countryList;
        resp.send(countryList);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.get("/places", (req, resp) => {
  const { city, country } = req.query;
  axios
    .get(geoNameBaseUrl + "search", {
      params: {
        username: geoUsername,
        q: city,
        country,
        fuzzy: 0,
        type: "json",
      },
    })
    .then((axResp) => {
      resp.send(axResp.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/addTrip", (req, resp) => {
  const { location, date, length, units } = req.body;
  const diff = getDiff(date);
  const weather$ = getWeather(location.lat, location.lng, date, units, diff);
  const photo$ = getPhoto(`${location.name}+${location.countryName}`);
  return Promise.all([weather$, photo$])
    .then(([weather, photo]) => {
      resp.send({
        trip: {
          weather,
          photo,
          date,
          length,
          city: location.name,
          country: location.countryName,
          diff,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

function getPhoto(q) {
  return axios
    .get(pixabayUrl, {
      params: {
        key: pixabayKey,
        q,
        image_type: "photo",
        category: "travel",
        orientation: "horizontal",
      },
    })
    .then((axResp) => {
      if (axResp.data.total === 0) {
        const countryQ = q.substring(q.indexOf("+") + 1);
        return axios.get(pixabayUrl, {
          params: {
            key: pixabayKey,
            q: countryQ,
            image_type: "photo",
            category: "travel",
            orientation: "horizontal",
          },
        });
      }
      return axResp;
    })
    .then(axResp => axResp.data.hits[0].webformatURL)
    .catch((err) => {
      console.log(err);
    });
}

function getWeather(lat, lon, date, units, diff) {
  if (diff > 16) {
    // use historical data
    const start_date = moment(date).subtract(1, "year").format("YYYY-MM-DD");
    const end_date = moment(start_date).add(1, "days").format("YYYY-MM-DD");
    return axios
      .get(weatherHistoricalUrl, {
        params: {
          key: weatherBitKey,
          lat,
          lon,
          start_date,
          end_date,
          units,
        },
      })
      .then((axResp) => {
        const weatherData = axResp.data.data[0];
        const high_temp = weatherData.max_temp;
        const low_temp = weatherData.min_temp;
        return { high_temp, low_temp, units };
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // use forecast
    return axios
      .get(weatherForecastUrl, {
        params: {
          key: weatherBitKey,
          days: diff === 0 ? 1 : diff,
          lat,
          lon,
          units,
        },
      })
      .then((axResp) => {
        const weatherData = axResp.data.data;
        const { high_temp, low_temp } =
          diff === 0 ? weatherData[0] : weatherData[diff - 1];
        return { high_temp, low_temp, units };
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function getDiff(datestring) {
  const now = moment();
  const tripStart = moment(datestring);
  return tripStart.diff(now, "days");
}

function getAverage(list, prop) {
  let sum = 0;
  for (const item of list) {
    sum += item[prop];
  }
  return sum / list.length;
}
