let map;
let markers = [];

let earthquakes = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: new google.maps.LatLng(2.8, -187.3),
    mapTypeId: "terrain",
    disableDefaultUI: true,
  })



}

const addOrRemoveMarkers = (map) =>{
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }

  if(map == null){
    markers = [];
  }
}


const formElement = document.getElementById("form");
const getData = ()=> {
  console.log("changed");
let time = document.getElementById("time")
let earthquakeType = document.getElementById("earthquakeTypes")
let value = time.options[time.selectedIndex].value;
let value2 = earthquakeType.options[earthquakeType.selectedIndex].value;
addOrRemoveMarkers(null);
fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/" + value2 + "_" + value + ".geojson")
 .then(resp =>{ return resp.json()})
 .then(data =>{
   for(let i= 0; i<data.features.length; i++){
        const coords = data.features[i].geometry.coordinates;
        const latLng = new google.maps.LatLng(coords[1], coords[0]);
        const  marker =  new google.maps.Marker({
          position: latLng,
        });
       markers.push(marker);
 }
      addOrRemoveMarkers(map);
})
 .catch(error => {console.log(error)})
}

formElement.addEventListener('change', getData, true);

//drawe js

const openBar = document.getElementById("openBar");
const closeBar = document.getElementById("closeBar");
const drawer = document.getElementById("drawer");
openBar.addEventListener('click', () =>{
  openBar.style.display = "none";
   drawer.style.display = "block";
} )

closeBar.addEventListener('click', () =>{
  openBar.style.display = "block";
   drawer.style.display = "none";
} )