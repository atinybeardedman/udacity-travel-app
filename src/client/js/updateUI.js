import { getFormElements } from "./helpers";
import { getTrips } from "./storage";
import { createCard } from "./card";
let cachedCountries;
const dateInput = getFormElements("dateInput");
const button = document.getElementById("submit");

function setCountries() {
  if (!window.localStorage.getItem("countries")) {
    return fetch("http://localhost:8081/countries")
      .then((resp) => resp.json())
      .then((countries) => {
        window.localStorage.setItem("countries", JSON.stringify(countries));
      });
  }
  return Promise.resolve();
}

function pickRandomCountry(countries) {
  const choice = Math.floor(Math.random() * countries.length);
  return countries[choice].code;
}

function updateCountries() {
  return setCountries().then(() => {
    const countries = JSON.parse(window.localStorage.getItem("countries"));
    cachedCountries = countries;
    const frag = document.createDocumentFragment();
    for (const country of countries) {
      const option = document.createElement("option");
      option.value = country.code;
      option.innerText = country.name;
      frag.appendChild(option);
    }
    const countrySelect = getFormElements("countrySelect");
    countrySelect.appendChild(frag);
    countrySelect.classList.remove("is-loading");
    countrySelect.disabled = false;
    countrySelect.value = pickRandomCountry(countries);
    countrySelect.dispatchEvent(new Event("change"));
  });
}

function updateCityPlaceholder(changeEvent) {
  const countryCode = changeEvent.target.value;
  const country = cachedCountries.find((c) => c.code === countryCode);
  getFormElements("cityInput").placeholder = country.capital;
}

function updateDate() {
  const today = new Date().toISOString().substr(0, 10);
  dateInput.value = today;
  dateInput.min = today;
}

function onBlur(event) {
  const input = event.target;
  updateCSSValidity(input);
  updateButtonState();
}

function updateCSSValidity(input) {
  const isValid = input.reportValidity();
  let el;
  if (input.nodeName === "select") {
    el = input.parentNode;
  } else {
    el = input;
  }
  if (isValid) {
    el.classList.add("is-sucess");
    el.classList.remove("is-danger");
  } else {
    el.classList.remove("is-sucess");
    el.classList.add("is-danger");
  }
}

function updateButtonState() {
  button.disabled = document.querySelectorAll(".is-danger").length > 0;
  return button.disabled;
}

function updateTrips() {
  const container = document.getElementById("trips-container");
  container.innerHTML = "";
  const trips = getTrips();
  if (trips.length === 0) {
      const column = document.createElement("div");
      column.classList.add("column");
      column.classList.add("is-half");
      column.innerHTML = '<h2 class="title has-text-centered has-text-grey">No Trips Planned Yet</h2>';
      container.classList.add('is-centered');
      container.appendChild(column);
      
  } else {
    const frag = document.createDocumentFragment();
    container.classList.remove('is-centered');
    for (const trip of trips) {
      const column = document.createElement("div");
      column.classList.add("column");
      column.classList.add("is-one-third-desktop");
      column.classList.add("is-half-tablet");
      column.innerHTML = createCard(trip);
      frag.appendChild(column);
    }
    container.appendChild(frag);
  }
}

export {
  updateCountries,
  updateCityPlaceholder,
  updateDate,
  onBlur,
  updateButtonState,
  updateTrips,
};
