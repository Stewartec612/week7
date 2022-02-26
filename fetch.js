let url = 'https://api.wheretheiss.at/v1/satellites/25544'


let issLat = document.querySelector('#iss_lat')
let issLong = document.querySelector('#iss_long')
let issTimeFetched = document.querySelector('#time')

let update = 10000
let issMarker

let map = L.map('iss-map').setView([0,0], 1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss()
setInterval(iss,10000)//10000 = 10 seconds
function iss() {
    fetch(url).then(res => {
        return res.json()
    }).then((issData) => {
        console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        let icon = L.icon({
            iconUrl: 'iss.png',
            iconSize: [50, 50],
            iconAnchor: [25,25]
        })

        if (!issMarker){
            issMarker = L.marker([lat,long],{icon: icon}).addTo(map)
        }
        else{
            issMarker.setLatLng([lat,long])
        }

        let now = Date()
        issTimeFetched.innerHTML = `Current ISS location data fetched at ${now}`

    }). catch((err) => {
            console.log('ERROR!', err)
    })
}