const next = document.getElementById("next");
const prev = document.getElementById("prev");
const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
const form = document.getElementById("form");
let loading = false; 

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


const addLoader = () =>{
    if(loading == false){
      document.getElementById("loader").style.display = "none";
    }else{
     document.getElementById("loader").style.display = "flex";
  
    }
  }
  
  
  const removeNews =  () =>{
    const table = document.getElementById("table");
    const tbody = document.getElementById("body");
    const error = document.getElementById("error");
  
    if(table.contains(tbody)){
      table.removeChild(tbody);
    }
    error.innerHTML = "";
    error.style.margin = "";
    
  }
  const getCycloneNews =  async() => {
     loading = true;
      addLoader();
      const status = document.getElementById("status").options[document.getElementById("status").selectedIndex].value;
      const country = document.getElementById("search").value;
     await fetch("https://api.reliefweb.int/v1/disasters?appname=apidoc&filter[operator]=AND&filter[conditions][0][operator]=OR&filter[conditions][0][conditions][0][field]=name&filter[conditions][0][conditions][0][value][]=Tropical Cyclone&filter[conditions][0][conditions][0][value][]=Storm Surge&filter[conditions][0][conditions][0][value][]=Hurricane&filter[conditions][0][conditions][0][value][]=Typhoon&filter[conditions][1][field]=country&filter[conditions][1][value]=" + country + "&filter[conditions][2][field]=status&filter[conditions][2][value]=" + status + "&profile=list&preset=latest")
     .then((response) => {return response.json()})
     .then((data) => {
       loading = false;
       addLoader();
      if(data.data.length > 0){
      let tbody = document.createElement("tbody");
      let table = document.getElementById("table");
      let nDisaster  = 0
      tbody.id ="body";
      data.data.forEach((disaster)  =>{
         if(nDisaster <4){
        let ul = document.createElement("ul");
        disaster.fields.country.forEach(country =>{
           let li = document.createElement("li");
          li.innerHTML = country.name;
          ul.appendChild(li); 
        })
  
        let date = new Date(disaster.fields.date.created);
        let status  = disaster.fields.status;
        let link  = disaster.fields.url;
        let name = disaster.fields.name;
        // let hours = ((date.getHours() < 10)? "0":"") + date.getHours();
        // let minutes = ((date.getMinutes() < 10)? "0":"") + date.getMinutes();
        // let period  = (hours < 12)? "AM": "PM";
        let row2 = document.createElement("tr");
        row2.className = 'row';
        let row2_data0 = document.createElement("td");
        row2_data0.className="rowList"
        row2_data0.appendChild(ul) ;
        let row2_data1 = document.createElement("td");
        row2_data1.innerHTML = (name.includes("Tropical Cyclone"))? "Tropical Cyclone": (name.includes("Hurricane"))? "Hurricane" :(name.includes("Typhoon"))? "Typhoon": "Storm Surge"
        let row2_data2 = document.createElement("td");
        const options = { month: 'long'};
        row2_data2.innerHTML = `${date.getDate()} ${new Intl.DateTimeFormat('en-US', options).format(date)} ${date.getFullYear()}`; 
        let row2_data3 = document.createElement("td");
        row2_data3.className = status;
        row2_data3.innerHTML = `<span>${status.charAt(0).toUpperCase()}${status.slice(1)} </span>`; 
        let row2_data4 = document.createElement("td");
        row2_data4.innerHTML = `<a href="${link}"  target="_blank">Read More</a>`; 
        row2.appendChild(row2_data0)
        row2.appendChild(row2_data1)
        row2.appendChild(row2_data2)
        row2.appendChild(row2_data3)
        row2.appendChild(row2_data4)
        tbody.appendChild(row2);
       nDisaster++;
      
      }
      })
      table.appendChild(tbody);  
     }else{
       document.getElementById("error").innerHTML = "<p>No Information Found</p>";
       document.getElementById("error").style.margin = "20px";
     }
     })
     
  }
  
  
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    removeNews();
    getCycloneNews()
  }
  );
  window.addEventListener('load', getCycloneNews());
  
  

  

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  autocomplete(document.getElementById("search"), countries);


  /** News Slider Mobile View */
  const slideRight = document.getElementById("slideRight");
  const slideLeft = document.getElementById("slideLeft")
  const table = document.getElementById("tableContainer");
  const maxScrollLeft = table.scrollWidth - table.clientWidth;


  slideRight.addEventListener('click', ()=>{
     table.scrollLeft += 20;

     if(table.scrollLeft >100){
       slideLeft.style.display = "flex";
     }

     if(table.scrollLeft >= maxScrollLeft){
      slideRight.style.display = "none";

     }
  })


  slideLeft.addEventListener('click', () =>{
    table.scrollLeft -= 20;
    if(table.scrollLeft <=0){
      slideLeft.style.display = "none";
      slideRight.style.display ="flex";
    }
  })