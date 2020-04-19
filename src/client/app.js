import './styles/main.scss';
import * as updateUIFns from './js/updateUI';
import { getFormElements } from './js/helpers'; 

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
updateUIFns.updateCountries();
updateUIFns.updateDate();


})


