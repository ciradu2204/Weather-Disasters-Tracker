let map;
let markers = [];
let earthquakes = [];
let greenCircle = {
  path: 'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0',
  strokeColor: 'black',
  strokeOpacity: 1,
  strokeWeight: 1,
  fillColor: '#6f8280',
  fillOpacity: 1,
  rotation: 0,
  scale: 0.1
};

let yellowCircle = {
  path: 'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0',
  strokeColor: 'black',
  strokeOpacity: 1,
  strokeWeight: 1,
  fillColor: '#d9cb9e',
  fillOpacity: 1,
  rotation: 0,
  scale: 0.2,
};
const openBar = document.getElementById("openBar");
const closeBar = document.getElementById("closeBar");
const drawer = document.getElementById("drawer");
const formElement = document.getElementById("form");
let loading = false;
let path  = "../images/earthquake";
let markerClusterer;
let lastClicked ; 
let data = [];





function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: new google.maps.LatLng(2.8, -187.3),
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
    mapTypeId: "terrain",
   })

   const legend = document.getElementById("legend");
   const div1 = document.createElement("div");
   div1.innerHTML = '<img src="../images/earthquake/moon.png"> ' + "Earthquake";
   const div2 = document.createElement("div");
   div2.innerHTML = '<img src="../images/earthquake/wifi.png"> ' + "Number of Earthquakes in that area";
   legend.appendChild(div1);
   legend.appendChild(div2);
   map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend)
}

const openDrawer = () =>{
  openBar.style.display = "none";
  drawer.style.display = "block";
}

const closeDrawer = () =>{
  openBar.style.display = "block";
  drawer.style.display = "none";
}
openBar.addEventListener('click', () =>{
  openDrawer();
} )

closeBar.addEventListener('click', () =>{
     closeDrawer();
} )
 

const addOrRemoveMarkers = (map) =>{
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }

  if(map == null){
    markers = [];
  }
}

const filterData = (data, country) =>{
  return data = data.features.filter( (eq) =>{
    if(country === ""){
      return eq;
    }else{
     return eq.properties.place.includes(country);
    }
  })
}

const sortData = (sortingType, data) =>{
   if(sortingType === "NewestFirst"){
    data.sort((a, b) => {
      let dateA = a.properties.time;
      let dateB = b.properties.time;
       return dateB - dateA;
    })
  }else if(sortingType === "OldestFirst"){
       data.sort((a, b) => {
        let dateA = a.properties.time;
        let dateB = b.properties.time;
         return dateA - dateB;        })
  }else if(sortingType === "LargestMagnitudeFirst"){
    data.sort((a, b) => {
      let  c = a.properties.mag;
      let  d = b.properties.mag;
      return d-c}
      )
  }else if(sortingType === "SmallestMagnitudeFirst"){
    data.sort((a, b) => {
      let  c = a.properties.mag;
      let  d = b.properties.mag;
      return c-d
    })
  }


}

const closeAlert = () => {
  const container =  document.getElementById("container");
  const earthquakeAlert = document.getElementById("earthquakeAlert");
  container.removeChild(earthquakeAlert);
   if(document.getElementById(lastClicked) !== null){
    document.getElementById(lastClicked).removeAttribute("style", "");
    markers[lastClicked].setIcon(greenCircle);
  }
  
}

const removeEathquakeInfo = () => {
  const drawerInfo =  document.getElementById("drawerInfo");
  const earthquakesInfo = document.getElementById("earthquakesInfo")

  if(earthquakesInfo !== null){
    drawerInfo.removeChild(earthquakesInfo);
  }
  const container =  document.getElementById("container");
  const earthquakeAlert = document.getElementById("earthquakeAlert");
   if(earthquakeAlert !== null && container.contains(earthquakeAlert)){
    closeAlert();
  }
  
  
}
 


const createAlertTable = (id, data) =>{
  let table = document.createElement("table");
  let row1 = document.createElement('tr');
  let row1_data1 = document.createElement('td');
  row1_data1.innerHTML = "Time";
  let row1_data2 = document.createElement('td');
  let date = new Date(data[id].properties.time);
  row1_data2.innerHTML = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
  row1.appendChild(row1_data1);
  row1.appendChild(row1_data2);
  table.appendChild(row1);

  let row2 = document.createElement('tr');
  let row2_data1 = document.createElement('td');
  row2_data1.innerHTML = "Location";
  let row2_data2 = document.createElement('td');
  row2_data2.innerHTML = `${Math.round(data[id].geometry.coordinates[1]*10)/10}&degN ${Math.round(data[id].geometry.coordinates[0]*10/10)}&degW`;
  row2.appendChild(row2_data1);
  row2.appendChild(row2_data2);
  table.appendChild(row2)
 
  let row3 = document.createElement('tr');
  let row3_data1 = document.createElement('td');
  row3_data1.innerHTML = "Magnitude";
  let row3_data2 = document.createElement('td');
  row3_data2.innerHTML = data[id].properties.mag;
  row3.appendChild(row3_data1);
  row3.appendChild(row3_data2);
  table.appendChild(row3)


  let row4 = document.createElement('tr');
  let row4_data1 = document.createElement('td');
  row4_data1.innerHTML = "Depth";
  let row4_data2 = document.createElement('td');
  row4_data2.innerHTML = `${data[id].geometry.coordinates[2]} km`;
  row4.appendChild(row4_data1);
  row4.appendChild(row4_data2);
  table.appendChild(row4)

  return table;
}

const addAlert = (id) =>{ 
  const container =  document.getElementById("container");
  const earthquakeAlert = document.getElementById("earthquakeAlert");
  if(lastClicked !== null && container.contains(earthquakeAlert) ) {
     closeAlert(lastClicked);
  };

  markers[id].setIcon(yellowCircle);
  document.getElementById(id).style.backgroundColor = "#374140";
  document.getElementById(id).style.color = "white";
  let mainDiv =  document.createElement("div");
  mainDiv.id = "earthquakeAlert";
  let h2  = document.createElement("h2");
  h2.innerHTML = `<a href="${data[id].properties.detail}">${data[id].properties.place}</a>`
  childDiv = document.createElement("div");
  let button = document.createElement("button");
  button.onclick = () => {closeAlert()};
  button.innerHTML = "Close";
  childDiv.appendChild(button);
  let table = createAlertTable(id, data);
  mainDiv.appendChild(h2);
  mainDiv.appendChild(table);
  mainDiv.appendChild(childDiv)
  container.appendChild(mainDiv);
   lastClicked = id;
 }

 const markerClicked = (id) =>{
  addAlert(id);
  }

  const createMarker  = (id, data) => {
    const coords = data[id].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    const  marker =  new google.maps.Marker({
      position: latLng,
      icon: greenCircle,
      optimized: false,
      });
      google.maps.event.addListener(marker, 'click', () =>{
        markerClicked(id);
      });
      markers.push(marker);
  }

  const createEarthquakeInfo = (id, mainDiv, data ) =>{
    let div = document.createElement("div");
    div.className = "earthquake"
    div.id = `${id}`
    let date = new Date(data[id].properties.time);
    let place = data[id].properties.place;
    let depth = Math.round(data[id].geometry.coordinates[2] *10)/10;
    let mag = Math.round(data[id].properties.mag *10)/10;
    div.onclick =  function() { addAlert(div.id) }
    div.innerHTML = `<div class="mag">${mag}</div> <div class="text"><h3>${place}</h3><p>${date}</p><p>${depth} km</p></div>`
    mainDiv.appendChild(div); 
  }

  const addLoader = () =>{
     if(loading == false){
       document.getElementById("loader").style.display = "none";
     }else{
      document.getElementById("loader").style.display = "flex";

     }
  }

  const removeMarkers = () =>{
    if(markerClusterer){
      for (let i; i < markers.length; i++) {
        markers[i].setMap(null)
    }
    markers = [];
    markerClusterer.clearMarkers();
    }
   
  }

const getData = ()=> {
const time = document.getElementById("time").options[document.getElementById("time").selectedIndex].value;
const earthquakeType = document.getElementById("earthquakeTypes").options[document.getElementById("earthquakeTypes").selectedIndex].value;
const country  = document.getElementById("country").options[document.getElementById("country").selectedIndex].value;
const sortingType = document.getElementById("filter").options[document.getElementById("filter").selectedIndex].value;
let drawer = document.getElementById("drawerInfo");
let earthquakesInfo = document.createElement("div");
earthquakesInfo.id = "earthquakesInfo";
removeMarkers();
loading = true;
addLoader();
 fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/" + earthquakeType + "_" + time + ".geojson")
 .then(resp =>{ return resp.json()})
 .then(mainData =>{
   loading = false;
   addLoader();
   data = filterData(mainData, country);
   sortData(sortingType, data);
    if(data.length === 0){
      let div = document.createElement("div");
     div.id = "Error"
     div.innerHTML = "No Eathquakes Found"
     earthquakesInfo.appendChild(div);
  }else{   
    for(let i= 0; i<data.length; i++){
     createMarker(i, data);
     createEarthquakeInfo(i, earthquakesInfo, data)
    }
  }
   
  drawer.appendChild(earthquakesInfo);
  markerClusterer = new MarkerClusterer(map, markers,  {imagePath: `${path}/m`});
        //adding the markers
      
 

})
 .catch(error => {console.log(error)})
}


window.addEventListener('load', getData, true);

formElement.addEventListener('change', () =>{
  removeEathquakeInfo();
  getData();
  }, true);
  
 

 
