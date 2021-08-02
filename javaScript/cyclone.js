
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let displayId = 1;

const createSlider = () =>{
    if(window.innerWidth < 1024){
        document.getElementById("2").style.display = "none";
        document.getElementById("3").style.display = "none";
        next.addEventListener( 'click', () =>{
            if(displayId < 3){
                document.getElementById(displayId).style.display = "none";
                document.getElementById(++displayId).style.display = "flex";
            }
        })
    
        prev.addEventListener('click', () =>{
            if(displayId > 1){
                document.getElementById(displayId).style.display ="none";
                document.getElementById(--displayId).style.display="flex";
            }
        })
    }
  
    
}

createSlider();


const getCycloneNews =  async() => {

   await fetch("https://api.reliefweb.int/v1/disasters?appname=NaturalDisasterTracker&profile=list&preset=latest&slim=1&query[value]=Tropical%20Cyclone%20OR%20Storm%20Surge&query[operator]=AND")
   .then((response) => {return response.json()})
   .then((data) => console.log(data))
}

getCycloneNews();

