
let targetElement =  document.getElementById('dropDown');
let targetElement2 = document.getElementById('content');
 
document.addEventListener('click', function(event){


   if(window.innerWidth < 1023){
      if(targetElement2.contains(event.target)){
         document.getElementById('pages').style.display = "block";
       }else if(!targetElement2.contains(event.target)){
         document.getElementById('pages').style.display = "none";
      
       }
       if(targetElement.contains(event.target)){
         document.getElementById('dropdownContent').style.display = "block";
         
      }else if(!targetElement.contains(event.target)){
         document.getElementById('dropdownContent').style.display = "none";

      }
   }else{
      if(targetElement.contains(event.target)){
         document.getElementById('dropdownContent').style.display = "block";
         
      }else if(!targetElement.contains(event.target)){
         document.getElementById('dropdownContent').style.display = "none";

      }
   }




})
let loading = true; 
if(loading)document.getElementById("loaderContainer").style.display= "block";

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
                    img.src= (types[0] == "Flood")? "./images/overview/Flood.png": (types[0]== "Earthquake")? "./images/overview/earthquakes.png":"./images/Cyclone.png"
                    div1.appendChild(img);
                    let status = capitalizeFirstLetter(disaster.fields.status);
                    let h3 = document.createElement('h3');
                    let p = document.createElement('p');
                    let date = new Date(disaster.fields.date.created);
                    h3.innerHTML = `${disaster.fields.name}`
                    p.innerHTML = `<span><i class="fa fa-flag"></i> Countries Affected: ${countries}</span></br>
                                    <span class=${disaster.fields.status} == "current"? "current":${disaster.fields.status} == "alert"? "alert": "past">Status: ${status}</span></br>
                                    <span><i class="fa fa-bolt"></i> Disaster Type: ${types}</span></br>
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
        if(loading == false) document.getElementById("loaderContainer").style.display= "none";
});

setTimeout(() => {
    fetchData()
}, 3000);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
