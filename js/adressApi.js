export async function getAdressFromCoords(latitude, longitude){
    let adress = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lat=${latitude}&lon=${longitude}`)
        .then(res => res.json())
        .then(json => json.features[0].properties.label)

    return adress
}

export async function getCoordsFromAdress(adress){
    let coords = await fetch(`https://api-adresse.data.gouv.fr/search/?q=8+${adress}`)
        .then(res => res.json())
        .then(json => json.features[0].geometry.coordinates)

    return {
        latitude:coords[1],
        longitude:coords[0]
    }
}