export async function getNearbyCinema(latitude, longitude, distance){
    let url = `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=within_distance(geolocalisation%2C%20geom%27POINT(${longitude}%20${latitude})%27%2C%20${distance}km)&limit=100`
    let data = await fetch(url)
        .then(res => res.json())
        .then(json => json.results)
    
    return data
}