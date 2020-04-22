import './styles/main.scss';
import * as updateUIFns from './js/updateUI';
import { getFormElements } from './js/helpers'; 
import { submitForm } from './js/submitForm';

window.addEventListener('DOMContentLoaded', () => {
    const elements = getFormElements();
    for(const elName of Object.keys(elements)){
        const el = elements[elName];
        if(el.nodeName.toLowerCase() === 'input'){
            el.addEventListener('blur', updateUIFns.onBlur)
        } else {
            el.addEventListener('change', updateUIFns.updateCityPlaceholder);
        }
    }
    document.getElementById('submit').addEventListener('click', submitForm);
updateUIFns.updateCountries();
updateUIFns.updateDate();


})


