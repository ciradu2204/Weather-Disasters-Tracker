
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