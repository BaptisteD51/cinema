import { getCoords } from "./geolocation.js"
import { getAdressFromCoords, getCoordsFromAdress } from "./adressApi.js"
import { getNearbyCinema } from "./cinemaApi.js"

let geoButton = document.querySelector("#geo-button")
let adressInput = document.querySelector("#adress")
let rangeInput = document.querySelector("#distance")
let distanceIndicator = document.querySelector("#distance-indicator")
let form = document.querySelector("#form")
let cinemaList = document.querySelector("#cinema-list")

// Get user location on click
async function geoButtonClickHandler(){
    let coords = await getCoords()
    let adress = await getAdressFromCoords(coords.latitude, coords.longitude)
    adressInput.value = adress
}

geoButton.addEventListener("click", geoButtonClickHandler)

// Show distance
function distanceChangeHandler(e){
    distanceIndicator.innerHTML = e.target.value + " km"
}

rangeInput.addEventListener("change",(e)=>distanceChangeHandler(e))
distanceIndicator.innerHTML = rangeInput.value + " km" // display right value on reload

// Form
async function formSubmitHandler(e){
    e.preventDefault()
    let data = new FormData(e.target)
    let adress = data.get("adress")
    let distance = data.get("distance")
    let coords = await getCoordsFromAdress(adress)
    let cinemas = await getNearbyCinema(coords.latitude, coords.longitude, distance)

    // add a property that indicate the distance between the user location and the cinema
    cinemas = cinemas.map(function(cinema){
        let latitudeH = coords.latitude
        let longitudeH = coords.longitude
        let latitudeC = cinema.geolocalisation.lat
        let longitudeC = cinema.geolocalisation.lon
        cinema.distanceWithHome = distanceBetween(latitudeH, longitudeH, latitudeC, longitudeC)
        return cinema
    })

    cinemas.sort((a,b)=>{
        return a.distanceWithHome - b.distanceWithHome
    })

    console.log(cinemas)

    let html = cinemas.map((cinema)=>{
        return `
            <li>
                <h3>${cinema.nom}</h3>
                <p>
                    ${cinema.adresse}, ${cinema.commune}
                </p>
            </li>
        
        `
    }).join('')

    cinemaList.innerHTML = html
}

form.addEventListener("submit", (e) => formSubmitHandler(e))

// Find distance between cinema and home - Pythagorys theorema
function distanceBetween(latitudeH, longitudeH, latitudeC, longitudeC){
    let d1 = latitudeH - latitudeC
    let d2 = longitudeH - longitudeC

    return Math.sqrt( d1**2 + d2**2 )
}