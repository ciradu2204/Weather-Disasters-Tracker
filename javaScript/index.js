 
const api = {
  openWeatherApiKey: "9476ad1e5c7f52fb8d9bf31ee8cbddaa",
  base: "https://api.openweathermap.org/data/2.5/",
  mapKey: "AIzaSyDgyUFeSUGpSugvMGDALnIBqVLILinzFSA"
}

let map; 
let markers = [];
let result = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 3,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#38414e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#212a37"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#1f2835"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3d19c"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      }
    ],
    disableDefaultUI: true,
  });
} 


const dateBuilder = () => {
  const now = new Date();
  var optionsMonth = { month: 'long' };
  let optionsDay = { weekday: 'long' };
  const h2 = document.createElement("h2");
  let day = new Intl.DateTimeFormat('en-US', optionsDay).format(now);
  let month = new Intl.DateTimeFormat('en-US', optionsMonth).format(now)
  let year = now.getFullYear();
  h2.innerHTML = `${day}, ${month} ${year}`;
   const date = `${day},${month} ${year}`;
  return date;
}

const markerClicked = async(markerPosition, dataId, long, lat, status,  country) =>{
  await fetch(`${api.base}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.openWeatherApiKey}`)
  .then((response) => response.json())
  .then((data) =>{
     const ul = document.createElement("ul");
     result[dataId].fields.type.forEach((disasterType) => {
      let li  = document.createElement("li");
      li.innerHTML = disasterType.name;
      ul.appendChild(li);
     })
      
     const contentString = document.createElement("div");
     contentString.className = "info_Window"
    const div1 = document.createElement("div");
    div1.innerHTML = `<div id="alertWeather"><h2>WEATHER</h2><h2>${Math.round(data.main.temp)}°C</h2> </div> <div id="alertLocation"><h3>${country}</h3></div> <div id="alertDate"><h3>${dateBuilder()}</h3></div> `
    contentString.appendChild(div1);
     
    const div2 = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.innerHTML = `${(status ==="alert")?"ONGOING":"ALERT"} DISASTER TYPE`
    div2.appendChild(h3);
    div2.appendChild(ul);
    contentString.appendChild(div2)
 
     const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
     infowindow.open({
      anchor: markers[markerPosition],
      map,
      shouldFocus: false,
    })
   })

}

const addMarkers = () =>{
  for(let i=0; i<markers.length; i++){
     markers[i].setMap(map)
  }
}

const createMarkers = (country, markerPosition, i, status) =>{
   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${api.mapKey}`)
  .then(response => response.json())
  .then(data => {
    let long = data.results[0].geometry.location.lng
   let lat = data.results[0].geometry.location.lat
    let  marker = '';
    if (status === "alert") {
       marker= new google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(long) },
        map,
        title: country,
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      });
    }
    else {
 
     marker = new google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(long) },
        title: country,
        icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        map
      });
    }
    google.maps.event.addListener(marker, 'click', () => {
      markerClicked(markerPosition, i, long, lat, status, country);
    })
     markers[markerPosition] = marker;

})

}




const getData = async() =>{

  await fetch("https://api.reliefweb.int/v1/disasters?appname=apidoc&filter[operator]=AND&filter[conditions][1][operator]=OR&filter[conditions][0][field]=name&filter[conditions][0][value]=&filter[conditions][1][conditions][0][field]=status&profile=list&preset=latest&filter[conditions][1][conditions][0][value][]=alert&filter[conditions][1][conditions][0][value][]=current&limit=300")
  .then((response) => response.json())
  .then((data) =>{
    //markerPosition in the marker Array
     let markerPosition =0;
     result = data.data;
        for(let i=0; i<result.length; i++){
         result[i].fields.country.forEach(country =>{
           console.log(markerPosition);
             createMarkers(country.name, markerPosition, i, result[i].fields.status)
             markerPosition++;
        })
    }
         addMarkers()    
  })

}

getData();
 











 