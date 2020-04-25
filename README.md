# Trip Planner App
This app is from Udacity's Front End Web Developer Nanodegree program. The intention behind this app is to allow a user to plan a trip by selecting where they are going and when; once they have saved the trip they can see a photo of their destination, a countdown, as well as the expected weather.

[Live Demo](https://travel-trip-planner.herokuapp.com)

## Features included:
- [x] Randomly select a country on page load and autosuggest its capital
- [x] Choice of metric or imperial temperature units for weather
- [x] Define the length of the trip
- [x] If no pictures are found for the city, return a photo of the country instead
- [x] Local storage is used to cache the countries for the select as well as a user's trips
- [x] Multiple trips are allowed, and are sorted by past and upcoming

## Instructions for local testing
1. Clone this repo and run `npm install`
2. Create a .env file with credentials to each of the APIs used as well as the port you wish to run the server on. It should include the following:
- GEO_USERNAME
- WEATHERBIT_KEY
- PIXABAY_KEY
- PORT
3. Start the development server with `npm run build-dev` or create a production bundle with `npm run build-prod`. If you are running production, you then need to start the express server with `npm run start`