
const form = document.getElementById("form");
let loading = false;

const addLoader = () => {
  if (loading == false) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("floodNews").style.display = "block";
  } else {
    document.getElementById("loader").style.display = "flex";
    document.getElementById("floodNews").style.display = "none";
  }
}
function removeNews() {
  document.getElementById('floodNews').innerHTML = "";
}

const getFloodNews = async () => {
  loading = true;
  addLoader();
  const status = document.getElementById("status").options[document.getElementById("status").selectedIndex].value;
  const country = document.getElementById("search").value;
  await fetch("https://api.reliefweb.int/v1/disasters?appname=apidoc&filter[operator]=AND&filter[conditions][0][operator]=OR&filter[conditions][0][conditions][0][field]=name&filter[conditions][0][conditions][0][value][]=Flood&filter[conditions][0][conditions][0][value][]=Flash flood&filter[conditions][1][field]=status&filter[conditions][1][value]=" + status + "&filter[conditions][2][field]=country&filter[conditions][2][value]=" + country + "&profile=list&preset=latest")
    .then((response) => { return response.json() })
    .then((data) => {
      loading = false;
      addLoader();
      const floodNews = document.getElementById("floodNews");
      if(data.data.length > 0){
        let numOfDisasters = 0;
        data.data.forEach(element => {
          if (numOfDisasters < 4) {
            let mainDiv = document.createElement("div");
            mainDiv.className = "news";
            let div1 = document.createElement("div");
  
            div1.innerHTML = `<img src="../images/floods/news.png">`
            let div2 = document.createElement("div");
            let h1 = document.createElement("h1");
  
            h1.innerHTML = element.fields.name;
            let p = document.createElement("p");
  
            const countryArray = element.fields.country.map(element => {
              return element.name;
            }).join();
            p.innerHTML = `<span id="span-1"><strong>Status</strong>: ${element.fields.status.charAt(0).toUpperCase()}${element.fields.status.substring(1)}</span> <span id="span-2"><strong>Affected Country</strong>: ${countryArray}</span>`
            div2.appendChild(h1);
            div2.appendChild(p);
            mainDiv.appendChild(div1);
            mainDiv.appendChild(div2);
            floodNews.appendChild(mainDiv);
            numOfDisasters++;
          }
  
  
        });

      }else{
   
          const div = document.createElement("div");
          div.className = "error"
          div.innerHTML = "<span>No Flood News Found</span>"
          floodNews.appendChild(div);

      }
 

    })

}


const searchIcon = document.getElementById("searchIcon");
const status = document.getElementById("status");

searchIcon.addEventListener('click', (e) => {
  e.preventDefault();
  removeNews();
  getFloodNews()
});

status.addEventListener('change', (e) => {
  e.preventDefault();
  removeNews();
  getFloodNews()
})
window.addEventListener('load', getFloodNews());



