const elements = {};
const ids = ['countrySelect', 'cityInput', 'departureInput', 'lengthInput'];
function getFormElements(name=null){
    if(name){
        if(!elements.hasOwnProperty(name)){
            elements[name] = document.getElementById(name);
        }
        return elements[name];
    } else {
        for(const id of ids){
            if(!elements.hasOwnProperty(id)){
                elements[id] = document.getElementById(id);
            }
        }
        return {...elements};
    }
}

module.exports = { getFormElements };