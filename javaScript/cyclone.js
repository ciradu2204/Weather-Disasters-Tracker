
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const form = document.getElementById("form");
let loading = false;

let displayId = 1;

/** Cyclone Info slider */
const createSlider = () => {
  if (window.innerWidth < 1024) {
    document.getElementById("2").style.display = "none";
    document.getElementById("3").style.display = "none";
    next.addEventListener('click', () => {
      if (displayId < 3) {
        document.getElementById(displayId).style.display = "none";
        document.getElementById(++displayId).style.display = "flex";
      }
    })

    prev.addEventListener('click', () => {
      if (displayId > 1) {
        document.getElementById(displayId).style.display = "none";
        document.getElementById(--displayId).style.display = "flex";
      }
    })
  }


}
createSlider();

const addLoader = () => {
  if (loading == false) {
    document.getElementById("loader").style.display = "none";
  } else {
    document.getElementById("loader").style.display = "flex";

  }
}

/** Remove news when a user filters or search for a country */
const removeNews = () => {
  const table = document.getElementById("table");
  const tbody = document.getElementById("body");
  const error = document.getElementById("error");

  if (table.contains(tbody)) {
    table.removeChild(tbody);
  }
  error.innerHTML = "";
  error.style.margin = "";

}


const getCycloneNews = async () => {
  loading = true;
  addLoader();
  const status = document.getElementById("status").options[document.getElementById("status").selectedIndex].value;
  const country = document.getElementById("search").value;
  await fetch("https://api.reliefweb.int/v1/disasters?appname=apidoc&filter[operator]=AND&filter[conditions][0][operator]=OR&filter[conditions][0][conditions][0][field]=name&filter[conditions][0][conditions][0][value][]=Tropical Cyclone&filter[conditions][0][conditions][0][value][]=Storm Surge&filter[conditions][0][conditions][0][value][]=Hurricane&filter[conditions][0][conditions][0][value][]=Typhoon&filter[conditions][1][field]=country&filter[conditions][1][value]=" + country + "&filter[conditions][2][field]=status&filter[conditions][2][value]=" + status + "&profile=list&preset=latest")
    .then((response) => { return response.json() })
    .then((data) => {
      loading = false;
      addLoader();
      if (data.data.length > 0) {
        let tbody = document.createElement("tbody");
        let table = document.getElementById("table");
        let nDisaster = 0
        tbody.id = "body";
        data.data.forEach((disaster) => {
          /** Display only 4 disasters */
          if (nDisaster < 4) {
            let ul = document.createElement("ul");
            disaster.fields.country.forEach(country => {
              let li = document.createElement("li");
              li.innerHTML = country.name;
              ul.appendChild(li);
            })

            let date = new Date(disaster.fields.date.created);
            let status = disaster.fields.status;
            let link = disaster.fields.url;
            let name = disaster.fields.name;
            // let hours = ((date.getHours() < 10)? "0":"") + date.getHours();
            // let minutes = ((date.getMinutes() < 10)? "0":"") + date.getMinutes();
            // let period  = (hours < 12)? "AM": "PM";
            let row2 = document.createElement("tr");
            row2.className = 'row';
            let row2_data0 = document.createElement("td");
            row2_data0.className = "rowList"
            row2_data0.appendChild(ul);
            let row2_data1 = document.createElement("td");
            row2_data1.innerHTML = (name.includes("Tropical Cyclone")) ? "Tropical Cyclone" : (name.includes("Hurricane")) ? "Hurricane" : (name.includes("Typhoon")) ? "Typhoon" : "Storm Surge"
            let row2_data2 = document.createElement("td");
            const options = { month: 'long' };
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
      } else {
        document.getElementById("error").innerHTML = "<p>No Information Found</p>";
        document.getElementById("error").style.margin = "20px";
      }
    })

}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  removeNews();
  getCycloneNews()
}
);
window.addEventListener('load', getCycloneNews());


/** News Slider Mobile View */
const slideRight = document.getElementById("slideRight");
const slideLeft = document.getElementById("slideLeft")
const table = document.getElementById("tableContainer");
const maxScrollLeft = table.scrollWidth - table.clientWidth;


slideRight.addEventListener('click', () => {
  table.scrollLeft += 20;

  if (table.scrollLeft > 100) {
    slideLeft.style.display = "flex";
  }

  if (table.scrollLeft >= maxScrollLeft) {
    slideRight.style.display = "none";

  }
})


slideLeft.addEventListener('click', () => {
  table.scrollLeft -= 20;
  if (table.scrollLeft <= 0) {
    slideLeft.style.display = "none";
    slideRight.style.display = "flex";
  }
})
