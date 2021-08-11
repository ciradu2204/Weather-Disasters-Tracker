const profiles = [
  {
    "imageName": "reynald.jpeg",
    "header": "What's up, It is Reynald",
     "bio": "Liyeuk Reynald is a fourth-year student at the African Leadership College. He hails from Cameroon, often referred to as Africa in miniature. He has a keen interest in functional programming, backend software engineering and big data. He is passionate about how technology can be used to improve healthcare, education and agriculture."
     
    
  },
  {
    "imageName":"cynthia.jpeg",
    "header": "Hi, It is Cynthia",
    "bio": "Cynthia is a front-end developer aspiring to be a full stack developer. She's worked with languages including Java and JavaScript, as well as frameworks like VUE and React. Cynthia is currently looking for opportunities to grow her front end skills and learn more about the backend side. "
 
  },
  {
   "imageName": "celine.jpeg",
   "header": "What's up, It is Celine ",
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, velporttitor rhoncus dolor purus non "


   
 },
 {
   "imageName":"Rudo.jpg",
   "header": "Hi, It is  Rudo ",
   "bio": " I am front-end web developer and I am an aspiring UI/UX designer. For web development, I am fluent in HTML, CSS and JavaScript with a growing interest in JavaScript frameworks such as React. At present, I am looking into expanding my design field of interest. "
 }
]

  const createElement = (leftElement) =>{
   let div = document.createElement("div");
   div.className = "profile";
   div.id = leftElement;
   let img = document.createElement("img");
   img.src= "../images/author/" + profiles[leftElement].imageName
   let div2 = document.createElement("div");
    div2.innerHTML = `<h3> ${profiles[leftElement].header}</h3> <p>${profiles[leftElement].bio}</p> <div class="socialIcons"> <a href="#" class="fab fa-facebook"></a>
    <a href="#" class="fab fa-github"></a>
    <a href="#" class="twitter">@</a></div>`
    div.appendChild(img);
    div.appendChild(div2);
      return div; 
  }


 let leftElement = 0; 
 let rightElement = 1; 
 let element = 0; 
const leftSide = () => {
      if(leftElement > 0 &&  window.innerWidth > 1024 ){
        let removeDiv = document.getElementById(rightElement);
        let currentDiv = document.getElementById(leftElement);
        let addDiv =  createElement(--leftElement);
         document.getElementById("profiles").insertBefore(addDiv, currentDiv);
         document.getElementById("profiles").removeChild(removeDiv);
         rightElement--;
     }else if(element >0 && window.innerWidth < 1023){
      let removeDiv = document.getElementById(element);
      let addDiv =  createElement(--element);
       document.getElementById("profiles").appendChild(addDiv);
      document.getElementById("profiles").removeChild(removeDiv);
     }
}
const rightSide = () => {
  if(rightElement <profiles.length-1 && window.innerWidth > 1024){
   let removeDiv = document.getElementById(leftElement);
    let addDiv =  createElement(++rightElement);
    document.getElementById("profiles").appendChild(addDiv);
    document.getElementById("profiles").removeChild(removeDiv);
   leftElement++;
 }else if(element <profiles.length-1 && window.innerWidth < 1023){
   let removeDiv =  document.getElementById(element);
   let addDiv = createElement(++element);
   document.getElementById("profiles").appendChild(addDiv);
   document.getElementById("profiles").removeChild(removeDiv);
 }
}

 const addProfiles = () =>{
     let i= 0; 
      let max  = (window.innerWidth >1023)? 2 : 1; 
     while(i < max){
       let div = createElement(i);
           document.getElementById("profiles").appendChild(div);
           i++; 
     }
}

addProfiles()
