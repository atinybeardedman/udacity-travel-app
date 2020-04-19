import { getFormElements } from './helpers'; 
let cachedCountries;
const dateInput = getFormElements('dateInput')
const button = document.getElementById('submit');

function setCountries() {
    if(!window.localStorage.getItem('countries')){
        return fetch('http://localhost:8081/countries')
        .then(resp => resp.json())
        .then(countries => {
            window.localStorage.setItem('countries', JSON.stringify(countries));
        });
    }
    return Promise.resolve();
}

function pickRandomCountry(countries){
    const choice = Math.floor(Math.random()*countries.length);
    return countries[choice].code;
}

function updateCountries(){
    return setCountries()
        .then(() => {
            const countries = JSON.parse(window.localStorage.getItem('countries'));
            cachedCountries = countries;
            const frag = document.createDocumentFragment();
            for(const country of countries){
                const option = document.createElement('option');
                option.value = country.code;
                option.innerText = country.name;
                frag.appendChild(option);
            }
            const countrySelect = getFormElements('countrySelect');
            countrySelect.appendChild(frag);
            countrySelect.classList.remove('is-loading');
            countrySelect.disabled = false;
            countrySelect.value = pickRandomCountry(countries);
            countrySelect.dispatchEvent(new Event('change'));
        });
}

function updateCityPlaceholder(changeEvent){
    const countryCode = changeEvent.target.value;
    const country = cachedCountries.find(c => c.code === countryCode);
   getFormElements('cityInput').placeholder = country.capital;
}

function updateDate(){
    const today = new Date().toISOString().substr(0, 10);
    dateInput.value = today;
    dateInput.min = today;
}

function onBlur(event){
    const input = event.target;
    updateCSSValidity(input);
    updateButtonState();
}

function updateCSSValidity(input){
    const isValid = input.reportValidity();
    let el;
    if (input.nodeName === 'select'){
        el = input.parentNode;
    } else {
        el = input;
    }
    if(isValid){
        el.classList.add('is-sucess');
        el.classList.remove('is-danger');

    } else {
        el.classList.remove('is-sucess');
        el.classList.add('is-danger');
    }
}

function updateButtonState(){
    button.disabled = document.querySelectorAll('.is-danger').length > 0;
    return button.disabled;
}

export { updateCountries, updateCityPlaceholder, updateDate, onBlur, updateButtonState };