<<<<<<< HEAD
   
=======




const api = {
  apiKey : "9476ad1e5c7f52fb8d9bf31ee8cbddaa",
  base: "https://api.openweathermap.org/data/2.5/"
}
 

const apiKey="AIzaSyDgyUFeSUGpSugvMGDALnIBqVLILinzFSA";

const temp=document.getElementById("temp");
const weather=document.getElementById("weather");
const content=document.getElementById("content");
const date=document.getElementById("date");
const recent=document.getElementById("recent");
const position=document.getElementById("location");


 
    

 async function initMap() {
   
    var long;
    var lat;
  let marker =null;
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat:0, lng: 0},
        zoom: 3
    });


     await fetch("https://api.reliefweb.int/v1/disasters?appname=apidocs-user-0&profile=list&preset=latest&slim=0&limit=300")
    .then(response=>response.json())
   .then(json=>{ 
   const  alertAndOngoingData=json.data.filter((data)=>data.fields.status=="alert" ||data.fields.status=="current")
   //console.log(json.data)
  // console.log(alertAndOngoingData)
  //console.log(alertAndOngoingData)

     for(let i=0; i<alertAndOngoingData.length;i++){
   const data=alertAndOngoingData[i];
   const countryName=data.fields.country[0].name;
   const type=data.fields.type[0].name;
   const status=data.fields.status;

   const recentDisasters=alertAndOngoingData.filter((dat)=>dat.fields.country[0].name==countryName)

   const ul = document.createElement("ul");
   for(let k=0; k<recentDisasters.length;k++){
       
       const status=recentDisasters[k].fields.status
       const statusData=status.charAt(0).toUpperCase() + status.slice(1);
       if(recentDisasters.length>=0){
           for(let j=0; j<recentDisasters[k].fields.type.length;j++){
               ul.append(`<li>${recentDisasters[k].fields.type[j].name} </li>`);
               
           }
       }

       
   }


   const contentString = `<div id="weather">
<div id="location">
</div>  
<div id="date">
</div> 
<div id="temp">
</div>
</div> 
<div id="recent"> 
${ul.children}
</div> `
 
   console.log(ul)//list of recent disasters
   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${countryName}&key=${apiKey}`)
                        .then(response=>response.json())
                        .then(json=>{
                             long=json.results[0].geometry.location.lng
                            lat=json.results[0].geometry.location.lat
                            
                            if(status==="alert"){
                              marker= new google.maps.Marker({
                                position: { lat: parseFloat(lat), lng: parseFloat(long) },
                                map,
                                icon:"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                            });  
                            }
                             else{
                              marker= new google.maps.Marker({
                                position: { lat: parseFloat(lat), lng: parseFloat(long) },
                                map
                            });  
                             }
                            
                            
                           const   infowindow = new google.maps.InfoWindow({
                                content: contentString,
                                position:{ lat: parseFloat(lat), lng: parseFloat(long) }
                               
                              });
                        
                        
>>>>>>> c4b30dea12ab18799c87b88cb307c4a03cd409a4

let loading = true; 
if(loading)document.getElementById("loader").style.display= "flex";

const fetchData = (async () => {
      await fetch("https://api.reliefweb.int/v1/disasters?appname=rwint-user-0&profile=list&preset=latest&slim=1&query[value]=%22earthquake%22%20OR%20%22flood%22%20OR%20%22Tropical%20Cylone%22&query[operator]=AND")
        .then((response) =>{
           return response.json()
        })
        .then((data) => {
            let count = 0; 
            data.data.forEach(disaster =>{
                if(count<2){
                    let types = disaster.fields.type.map(value =>{
                        return value.name;
                   });
                   let countries = disaster.fields.country.map(value =>{
                    return value.name;
                   }).join(",");

                    let div = document.createElement("div"); 
                    let div1 = document.createElement("div");
                    let div2 = document.createElement("div");
                    div.setAttribute("class", "news")
                    div1.setAttribute("class", "div1")
                    div2.setAttribute("class", "div2")
                    let img = document.createElement("img");
                     img.src= (types[0] == "Flood" || "Flash Flood")? "../images/overview/Flood.png": (types[0]== "Earthquake")? "../images/overview/earthquakes.png":"../images/Cyclone.png"
                    div1.appendChild(img);
                    let status = capitalizeFirstLetter(disaster.fields.status);
                    let h3 = document.createElement('h3');
                    let p = document.createElement('p');
                    let date = new Date(disaster.fields.date.created);
                    h3.innerHTML = `${disaster.fields.name}`
                    p.innerHTML = `<span><i class="fa fa-flag"></i> Countries Affected: ${countries}</span></br>
                                    <span class=${disaster.fields.status} == "current"? "current":${disaster.fields.status} == "alert"? "alert": "past">Status: ${status}</span></br>
                                    <span><span class="iconify" data-icon="mdi:weather-hurricane"></span> Disaster Type: ${types}</span></br>
                                    <span><i class="fa fa-clock-o"></i> Time: ${date}</span></br>
                                    <div><a href="${disaster.fields.url}" target="_blank">Read More</a></div>`
                    div2.appendChild(h3);
                    div2.appendChild(p);
                    div.appendChild(div1);
                    div.appendChild(div2);
                
                     document.getElementById("latestNews").appendChild(div)
                }
              count++; 
            })
        })
        .catch((error)=> {
            console.log(error)
        })
        loading = false;
        if(loading == false) document.getElementById("loader").style.display= "none";
});

setTimeout(() => {
    fetchData()
}, 3000);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
