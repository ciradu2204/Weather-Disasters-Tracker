/** Nav bar */
const iconUp = document.getElementById("iconUp");
const iconDown = document.getElementById("iconDown");
const dropDownContent = document.getElementById("dropdownContent");
const mobileBar = document.getElementById("bars");
const mNavbarContent = document.getElementById("content");
const mobileClose = document.getElementById("close");

iconUp.addEventListener('click', () =>{
iconUp.style.display = "none";
iconDown.style.display = "inline";
dropDownContent.style.display= "block";

})

iconDown.addEventListener('click', () =>{
   iconDown.style.display = "none";
   iconUp.style.display = "inline";
   dropDownContent.style.display= "none";
   
})

mobileBar.addEventListener('click', () =>{
   mNavbarContent.style.display = "grid";
   mobileClose.style.display = "block";
   mobileBar.style.display = "none";
})

mobileClose.addEventListener('click', () =>{
   mNavbarContent.style.display = "none";
   mobileBar.style.display = "block";


})