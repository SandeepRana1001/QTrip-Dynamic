import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const id = search.split('=')[1]
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const url = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
  try{
    const response = await fetch(url)
    const responseData = await response.json()
    return responseData
  }catch(err){
    return null
  }
  // Place holder for functionality to work in the Stubs
}


//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').innerHTML = adventure.name
  document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle
  document.getElementById('adventure-content').innerHTML = adventure.content

  const parent = document.getElementById('photo-gallery')
  adventure.images.forEach((image,index)=>{
    const element = document.createElement('img')
    element.setAttribute('src',image)
    element.classList.add('activity-card-image')
    parent.append(element)
    
  })
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

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  var id = "id" + Math.random().toString(16).slice(2)
  
  let parent = document.getElementById('photo-gallery')
  parent.innerHTML=''
  
  add_and_append('div',['carousel','slide'],parent,{ type: 'id', val: 'qTripCarousel' })
  parent = document.getElementById('qTripCarousel')
  
  add_and_append('div',['carousel-inner',id],parent)
  const temp = '.'+id
  parent = document.querySelector(temp)
  images.forEach((image,index)=>{
  parent = document.querySelector(temp)

    id = "id" + Math.random().toString(16).slice(2)
    let classes = ['carousel-item',id]
    if(index === 0){
      classes.push('active')
    } 
    else{
      classes =  ['carousel-item',id]
    } 

    let element = document.createElement('div')
    element.classList.add(...classes)
    parent.appendChild(element)

    parent = document.querySelector('.'+id)
    element = document.createElement('img')
    element.setAttribute('src',image)
    element.classList.add('d-block','w-100')
    parent.appendChild(element)


  })

  parent = document.getElementById('qTripCarousel')
  let element = document.createElement('button')
  element.classList.add('carousel-control-prev')
  element.setAttribute('data-bs-target','#qTripCarousel')
  element.setAttribute('data-bs-slide','prev')
  parent.appendChild(element)
  parent = document.querySelector('.carousel-control-prev')
  element = document.createElement('span')
  element.classList.add('carousel-control-prev-icon')
  parent.appendChild(element)

  parent = document.getElementById('qTripCarousel')
  element = document.createElement('button')
  element.classList.add('carousel-control-next')
  element.setAttribute('data-bs-target','#qTripCarousel')
  element.setAttribute('data-bs-slide','next')
  parent.appendChild(element)
  parent = document.querySelector('.carousel-control-next')
  element = document.createElement('span')
  element.classList.add('carousel-control-next-icon')
  parent.appendChild(element)

  // add_and_append('div', ['col-xl-3', 'col-lg-3', 'col-md-4', 'col-sm-6', 'col-6'], parent, { type: 'id', val: index+'_'+adventure.id })

}



//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure)
  const reservation = document.getElementById('reservation-panel-available')
  const sold_out = document.getElementById('reservation-panel-sold-out')
  const per_head = document.getElementById('reservation-person-cost')
  const isAvailable = adventure.available
  if(isAvailable){
    reservation.style.display="block"
    sold_out.style.display="none"
    per_head.innerHTML = adventure.costPerHead
  }else{
    sold_out.style.display="block"
    reservation.style.display="none"
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const costPerHead = adventure.costPerHead
  const total =  persons * costPerHead
  document.getElementById('reservation-cost').innerHTML = total
}

//Implementation of reservation form submission
async function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // const data = document.getElementById
  const myForm = document.getElementById('myForm')

  myForm.addEventListener('submit',async (event)=> {
      event.preventDefault()
      const formData = new FormData(event.target);
      const formProps = Object.fromEntries(formData);
      formProps.adventure = adventure.id

      const data = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formProps)
      }
      const url = `${config.backendEndpoint}/reservations/new`
      try{
        const response = await fetch(url,data)
        const status = await response.status
        if(status === 200){
          alert('Success!')
          location.reload()
        }else{
          alert('Failed!')
        }

      }catch(err){
        return null
      }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const isAvailable = adventure.available
  const banner = document.getElementById('reserved-banner')
  if(isAvailable){
    banner.style.display = 'block'
  }else{
    banner.style.display = 'none'

  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
