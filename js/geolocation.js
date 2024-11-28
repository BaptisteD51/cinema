export function getCoords(){
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            let coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
            resolve(coords)
       })
    })
}