const elements = {};
const ids = ['countrySelect', 'cityInput', 'dateInput', 'lengthInput'];
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

function getUnits(){
    const metric = document.getElementById('metric_radio').checked;
    console.log(metric);
    return metric ? 'M' : 'I';
}

export { getFormElements, getUnits };