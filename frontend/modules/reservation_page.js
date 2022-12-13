import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const url = `${config.backendEndpoint}/reservations/`
  try {
    const response = await fetch(url)
    const responseData = await response.json()
    return responseData
  } catch (err) {
    return null
  }

  // Place holder for functionality to work in the Stubs
}

const getDateTimeFormat = (date, time = '', month = '') => {
  const date_s = new Date(date)
  let new_time = ''
  const obj = {
    d: date_s.getDate(),
    m: date_s.getMonth() + 1,
    y: date_s.getFullYear()
  }
  if (month.length > 0) {
    obj.m = date_s.toLocaleString('en-us', { month: 'long' })
  }
  let new_date = `${obj.d}/${obj.m}/${obj.y}`

  if (time.length > 0) {
    const check = parseInt(date_s.getHours()) > 12 ? 'pm' : 'am'
    let hrs = ''
    if(check === 'pm') hrs = parseInt(date_s.getHours()) - 12
    else hrs = date_s.getHours()
    new_time = `, ${hrs}:${date_s.getMinutes()}:${date_s.getSeconds()} ${check}`
    new_date = `${obj.d} ${obj.m} ${obj.y}`
    return new_date + new_time
  }
  return new_date;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
const addToTable = (parent, reservation) => {
  let row = document.createElement('tr')
  row.setAttribute('id', reservation.id)
  parent.appendChild(row)

  parent = document.getElementById(reservation.id)
  const keys = Object.keys(reservation)
  const length = keys.length

  // let anchor = document.createElement('a')
  // anchor.setAttribute('href',`detail/?adventure=${reservation.adventure}`)
  // anchor.setAttribute('id','#'+reservation.id)
  // anchor.classList.add('stretched-link')
  // parent.appendChild(anchor)



  for (let i = 0; i < length; i++) {
    console.log(i)
    let id ='' , column='';

    if(i!==0){
      
          parent = document.getElementById(reservation.id)
           id = reservation.id + '_' + Math.random().toString(36).substr(2, 9);
           column = document.createElement('td')
          column.setAttribute('id', id)
          parent.appendChild(column)
          parent = document.getElementById(id)
    }


    if (i === 0) {
      parent = document.getElementById(reservation.id)
      // parent.innerHTML = reservation.name

      parent.innerHTML = `<a href='detail/?adventure=${reservation.adventure}'>  ${reservation.id}</a>`

    } else if (i === 1) {
      parent.innerHTML = reservation.name
    } else if (i === 2) {
      parent.innerHTML = reservation.adventureName
    } else if (i === 3) {
      parent.innerHTML = reservation.person
    } else if (i === 4) {

      parent.innerHTML = getDateTimeFormat(reservation.date)
    } else if (i === 5) {
      parent.innerHTML = reservation.price
    } else if (i === 6) {
      parent.innerHTML = getDateTimeFormat(reservation.time, 'Yes', 'Yes')
    } else if (i == 7) {
      parent.innerHTML = `<a href='/pages/adventures/detail/?adventure=${reservation.adventure}' class='reservation-visit-button text-white'>Visit Adventure</a>`
    }

  }

}
function addReservationToTable(reservations) {
  if (reservations.length > 0) {
    document.getElementById('no-reservation-banner').style.display = "none"
    document.getElementById('reservation-table-parent').style.display = "block"
  } else {
    document.getElementById('no-reservation-banner').style.display = "block"
    document.getElementById('reservation-table-parent').style.display = "none"
  }
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
  
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  const parent = document.getElementById('reservation-table')
  reservations.map((element) => {
    addToTable(parent, element)
  })

}

export { fetchReservations, addReservationToTable };
