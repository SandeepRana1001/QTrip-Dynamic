
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const id = search.split('city=')[1].trim()
  return id
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const responseData = await response.json();
    return responseData
  } catch (err) {
    return null
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {

  adventures.forEach(adventure => {
    addAdventure(adventure)
  });
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

}
const add_and_append = (type, classes, parent, setAttrib = { type: '', val: '', data: '' }) => {
  const newElement = document.createElement(type)
  if (classes.length > 0) {
    newElement.classList.add(...classes)
  }
  if (setAttrib.type.trim().length > 0) {
    newElement.setAttribute(setAttrib.type, setAttrib.val)
  }
  if (type === 'h5' || type === 'p'||type=='span') {
    newElement.innerText = setAttrib.data
  }
  parent.appendChild(newElement)
}

function addAdventure(adventure) {
  let parent = document.querySelector('#data')
  let index = "id" + Math.random().toString(16).slice(2)

  //columns
  add_and_append('div', ['col-xl-3', 'col-lg-3', 'col-md-4', 'col-sm-6', 'col-6'], parent, { type: 'id', val: index+'_'+adventure.id })

    //activity card
  parent = document.getElementById(index+'_'+adventure.id)
  add_and_append('div', ['activity-card','mb-3', 'activity-card_' + adventure.id], parent)
  // everything inside activity card  
  parent = document.querySelector('.activity-card_' + adventure.id)
  //link inside activity card  
  add_and_append('a', ['stretched-link','stretched_link_'+adventure.id], parent, { type: 'href', val: './detail/?adventure=' + adventure.id })
  
  const val = document.querySelector('.stretched_link_'+adventure.id)
  val.setAttribute('id',adventure.id)

  // category-banner inside activity card  
  add_and_append('div', ['category-banner', 'category-banner_' + adventure.id], parent)
  //image inside activity card  
  add_and_append('img', [], parent, { type: 'src', val: adventure.image })
  // card footer inside activity card  
  add_and_append('div', ['card-footer', 'card-footer_' + adventure.id], parent)

  /* Category Banner Content */
  parent = document.querySelector('.category-banner_' + adventure.id)
  add_and_append('span', [], parent, { type: '', val: '', data: adventure.category })

  /* Card footer Content */
  parent = document.querySelector('.card-footer_' + adventure.id)

  /* First row in footer */

  add_and_append('div', ['footer-data','clearfix', 'footer-data_'+ adventure.id+'_'+ index], parent)
  parent = document.querySelector('.footer-data_' + adventure.id+'_'+ index)
  let currency = adventure.currency.toUpperCase() ==='INR'?'₹ ':'$ ' 
  add_and_append('p', [], parent, { type: '', val: '', data: adventure.name })
  add_and_append('p', [], parent, { type: '', val: '', data: currency+adventure.costPerHead  })

  /* second row in footer */
   index = "id" + Math.random().toString(16).slice(2)
   parent = document.querySelector('.card-footer_' + adventure.id)

  add_and_append('div', ['footer-data','clearfix', 'footer-data_'+ adventure.id+'_'+ index], parent)
  parent = document.querySelector('.footer-data_' + adventure.id+'_'+ index)
  add_and_append('p', [], parent, { type: '', val: '', data: 'Duration' })
  add_and_append('p', [], parent, { type: '', val: '', data: adventure.duration + ' Hours '  })

}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  const filteredList = list.filter((element)=>{
    const duration = element.duration
    if(duration>low && duration<=high) return true
  })

  return filteredList
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter((element) => {
    const check = categoryList.includes(element.category)
    return check ? true : false
})

// TODO: MODULE_FILTERS
// 1. Filter adventures based on their Category and return filtered list
return filteredList
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
    // TODO: MODULE_FILTERS
    // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
    // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
    if (filters.category.length > 0) {
        list = filterByCategory(list, filters.category)
    }

    if (filters.duration.length > 0) {
      const duration = filters.duration.split('-')
        list = filterByDuration(list,duration[0],duration[1])
    }
    console.log(list)
    // Place holder for functionality to work in the Stubs
    return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  const filters = JSON.parse(localStorage.getItem('filters'))
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let parent = document.getElementById('category-list')
  if (filters.category.length > 0) {
      filters.category.forEach((element) => {
          add_and_append('span', ['category-filter'], parent, { type: '', val: '', data: element })
      })

  }

  // if (filters.duration.length > 0) {
  //     add_and_append('span', ['category-filter'], parent, { type: '', val: '', data: filters.duration })
  // }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
