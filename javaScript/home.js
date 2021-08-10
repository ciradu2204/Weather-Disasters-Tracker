



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
                        
                        

                
                        

                              fetch(`${api.base}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.apiKey}`)
                              .then(response=>response.json())
                              .then(json=>{
                                console.log(json)
                                const name=json.name
                                const country=json.sys.country
                                const positions=`${name} ,${country}`;

                                const temperature=json.main.temp;
                                console.log(positions)
                              })// end of last fetch



                              marker.addListener("click", () => {
                                infowindow.open({map,
                                  marker,
                                  shouldFocus:true
                                  
                                })
                              });
                        })// end of second fetch

                    }// end of outer for loop



                });// end of first fetch






   
}

                    


                    


   

const dateBuilder = () => {
    const now= new Date();
    var optionsMonth = { month: 'long' };
    let optionsDay = { weekday: 'long' };
    let dateDiv = document.getElementById("date");
    const h2 = document.createElement("h2");
    let day = new Intl.DateTimeFormat('en-US', optionsDay).format(now);
    let month = new Intl.DateTimeFormat('en-US', optionsMonth).format(now)
    let year = now.getFullYear();
    h2.innerHTML = `${day}, ${month} ${year}`;
   // dateDiv.appendChild(h2);
   const date=`${day},${month} ${year}`;
   console.log(date)
}



