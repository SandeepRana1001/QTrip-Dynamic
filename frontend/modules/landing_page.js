import config from "../conf/index.js";

async function init() {
//Fetches list of all cities along with their images and description
// let cities;
try{
   var cities = await fetchCities();
}catch(e){
  return null;
}
//Updates the DOM with the cities
cities.forEach((key, index) => {
  addCityToDOM(key.id, key.city, key.description, key.image);
});
}

//Implementation of fetch call
async function fetchCities() {
// TODO: MODULE_CITIES
// 1. Fetch cities using the Backend API and return the data

try {
  let response = await fetch(`${config.backendEndpoint}/cities`)
  let responseData = await response.json()
  return responseData;
} catch (err) {
  return null
  // throw new Error(null)
}
// return promise
}

const add_and_append = (type, classes, parent, setAttrib = { type: '', val: '', data: '' }) => {
const newElement = document.createElement(type)
if (classes.length > 0) {
  newElement.classList.add(...classes)
}
if (setAttrib.type.trim().length > 0) {
  newElement.setAttribute(setAttrib.type, setAttrib.val)
}
if (type === 'h5' || type === 'p') {
  newElement.innerText = setAttrib.data
}
parent.appendChild(newElement)
}
//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
// TODO: MODULE_CITIES
// 1. Populate the City details and insert those details into the DOM
const index = "id" + Math.random().toString(16).slice(2)
let parent = document.querySelector('#data')
add_and_append('div', ['col-xl-3', 'col-lg-3', 'col-md-4', 'col-sm-6', 'col-6'], parent, { type: 'id', val: id })
parent = document.querySelector('#' + id)
add_and_append('div', ['img_container', 'img_container_' + index], parent)
parent = document.querySelector('.img_container_' + index)
add_and_append('a', ['stretched-link'], parent, { type: 'href', val: 'pages/adventures/?city=' + id })
add_and_append('img', [], parent, { type: 'src', val: image })
add_and_append('div', ['image_overlay_text', 'image_overlay_text_' + index], parent)
parent = document.querySelector('.image_overlay_text_' + index)
add_and_append('h5', [], parent, { type: '', val: '', data: city })
add_and_append('p', [], parent, { type: '', val: '', data: description })

}

export { init, fetchCities, addCityToDOM };
