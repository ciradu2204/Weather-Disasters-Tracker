/** Nav bar */
includeHTML();

const navBarOnClick = () =>{
   const iconUp = document.getElementById("iconUp");
   const iconDown = document.getElementById("iconDown");
   const dropDownContent = document.getElementById("dropdownContent");
   const mobileBar = document.getElementById("bars");
   const disasterPage = document.getElementById("disastersPage")
   const mNavbarContent = document.getElementById("content");
   const mobileClose = document.getElementById("close");
   const dropdownContent = document.getElementById("dropdownContent");
    
   
   iconUp.addEventListener('click', () => {
      iconUp.style.display = "none";
      iconDown.style.display = "inline";
      dropDownContent.style.display = "block";
   
   })
   
   iconDown.addEventListener('click', () => {
      iconDown.style.display = "none";
      iconUp.style.display = "inline";
      dropDownContent.style.display = "none";
   
   })
   
   
   mobileBar.addEventListener('click', () => {
      mNavbarContent.style.display = "grid";
      mobileClose.style.display = "block";
      dropdownContent.style.display = "none"
      mobileBar.style.display = "none";
   })
   
   mobileClose.addEventListener('click', () => {
      mNavbarContent.style.display = "none";
      mobileClose.style.display = "none";
      mobileBar.style.display = "block";
   
   
   })
   
   disasterPage.addEventListener('click', () =>{
      if(iconDown.style.display === "inline"){
       iconDown.style.display = "none";
       iconUp.style.display = "inline";
       dropDownContent.style.display = "none";
     }else{
       iconUp.style.display = "none";
       iconDown.style.display = "inline";
       dropDownContent.style.display = "block";
     }
   })
   
}



/** Autocomplete function from https://www.w3schools.com/howto/howto_js_autocomplete.asp */
const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

function autocomplete(inp, arr) {
   var currentFocus;
   inp.addEventListener("input", function (e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false; }
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
         if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function (e) {
               inp.value = this.getElementsByTagName("input")[0].value;
               closeAllLists();
            });
            a.appendChild(b);
         }
      }
   });
   inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
         currentFocus++;
         addActive(x);
      } else if (e.keyCode == 38) {
         currentFocus--;
         addActive(x);
      } else if (e.keyCode == 13) {
         e.preventDefault();
         if (currentFocus > -1) {
            if (x) x[currentFocus].click();
         }
      }
   });
   function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
   }
   function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
         x[i].classList.remove("autocomplete-active");
      }
   }
   function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
         if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
         }
      }
   }
   document.addEventListener("click", function (e) {
      closeAllLists(e.target);
   });
}

autocomplete(document.getElementById("search"), countries);

/** Include from w3schoool  */

function includeHTML() {
   var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
   for (i = 0; i < z.length; i++) {
     elmnt = z[i];
      file = elmnt.getAttribute("w3-include-html");
     if (file) {
        xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function() {
         if (this.readyState == 4) {
           if (this.status == 200) {elmnt.innerHTML = this.responseText;}
           if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            elmnt.removeAttribute("w3-include-html");
           includeHTML();
         }
       }
       xhttp.open("GET", file, true);
       xhttp.send();
        return;
     }
   }
  }

//   /** Add an active link to the navbar links */
//    let btnContainer = document.getElementById("content");
//    let aTags = btnContainer.getElementsByTagName("a");
//      for(let i= 0; i<aTags.length; i++){
//      aTags[i].addEventListener('click', () =>{
//        console.log(aTags[i]);
//        let current = document.getElementsByClassName("active");
//        if(current.length >0){
//          current[0].className = current[0].className.replace(" active", "");

//        }
//         this.className += "active"
//     })
//    }
   

