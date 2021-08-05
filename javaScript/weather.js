const api = {
    key: "2ed0ff2dc64c56e802a83ed9048e168e",
    base: "http://api.weatherstack.com/"
}
let longs = null;
let lats = null;
let countryName = "";
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const apiKey = "9476ad1e5c7f52fb8d9bf31ee8cbddaa"
const table = document.getElementById("table");
const date = new Date();
let searchIcon = document.getElementById("searchIcon")
const headerTemp = document.getElementById("tempH");
const deg = "°C";
let geocoder = null;

const dateBuilder = () => {
    var optionsMonth = { month: 'long' };
    let optionsDay = { weekday: 'long' };
    let dateDiv = document.getElementById("date");
    const h2 = document.createElement("h2");
    let day = new Intl.DateTimeFormat('en-US', optionsDay).format(date);
    let month = new Intl.DateTimeFormat('en-US', optionsMonth).format(date)
    let year = date.getFullYear();
    h2.innerHTML = `${day} ${month} ${year}`;
    dateDiv.appendChild(h2);
}

const changeMap = async(value) =>{
    await getCoordinate(value);
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: parseFloat(lats), lng: parseFloat(longs) },
        zoom: 8
    });

    new google.maps.Marker({
        position: { lat: parseFloat(lats), lng: parseFloat(longs) },
        map,
        title: value,
    });
}
 


const removeContent = () => {
    const tbody = document.getElementById("tbody");
    table.removeChild(tbody);
    document.getElementById("weather-icon").src = "";
    document.getElementById("temp").innerHTML = "";
    document.getElementById("description").innerHTML = "";
    document.getElementById("location").innerHTML = "";
    document.getElementById("date").innerHTML = "";


}

searchIcon.addEventListener('click', (event) => {
    let searchBox = document.querySelector(".search-box");
    removeContent();
    dateBuilder();
    getResults(searchBox.value);
    changeMap(searchBox.value);


});

async function getResults(country) {
       await getCoordinate(country);
          await  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lats}&lon=${longs}&exclude=hourly,minutely,alerts&units=metric&appid=${apiKey}`)
                .then(forecastResponse => forecastResponse.json())
                .then(json => {
                    console.log(json);
                    const weeklyData = json.daily.filter((ele, index) => index > 0);
                    const iconURL = "http://openweathermap.org/img/w/"
                    const tbody = document.createElement("tbody");
                    tbody.id = "tbody";
                    let location = document.getElementById("location");
                    const h1 = document.createElement("h1");
                    const myArr = json.timezone.split("/");
                    h1.innerHTML = `${myArr[1]} , ${countryName}`
                    location.appendChild(h1);
                    let icon = document.getElementById("weather-icon");
                    let desc = document.getElementById("description");
                    var temp = document.getElementById("temp");
                    icon.src = `${iconURL + json.current.weather[0].icon}.png` ;
                    const descriptionData = json.current.weather[0].description;
                    desc.innerHTML = descriptionData.charAt(0).toUpperCase() + descriptionData.slice(1);
                    const restOfDays = days.slice(date.getDay() + 1)
                    const otherDays = days.splice(0, date.getDay() + 1)
                    const combinedDays = restOfDays.concat(otherDays)
                    for (var i = 0; i < combinedDays.length; i++) {
                        const row = document.createElement("tr");
                        headerTemp.innerHTML = `TEMP (${deg})`
                        const row_data1 = document.createElement("td")
                        row_data1.innerHTML = combinedDays[i];
                        const row_data2 = document.createElement("td")
                        row_data2.className = "row2"
                        const row_data3 = document.createElement("td");
                        row_data3.innerHTML = `${weeklyData[i].humidity} <span> %</span>`
                        const row_data4 = document.createElement("td");
                        row_data4.innerHTML = `${weeklyData[i].pop} <span> %</span>`
                        const icon = weeklyData[i].weather[0].icon;
                        const img = document.createElement('img');
                        img.src = `${iconURL + icon}` + ".png";

                        row_data2.appendChild(img);
                        const p = document.createElement("p");
                        p.id = "forecastTemp"
                        const span = document.createElement("span");
                        temp.innerHTML = `${Math.round(weeklyData[i].temp.max)}`;
                        p.innerHTML = ` ${weeklyData[i].temp.max}`
                        span.innerHTML = `°`
                        row_data2.appendChild(p);
                        row_data2.appendChild(span);
                        row.appendChild(row_data1);
                        row.appendChild(row_data2);
                        row.appendChild(row_data3);
                        row.appendChild(row_data4);
                        tbody.appendChild(row)
                        table.appendChild(tbody);

                    }


                    const container = document.getElementById("container")
                    switch (json.current.weather[0].main) {
                        case "Clouds":
                            container.style.backgroundImage = `url("../images/weather/clouds.jpeg")`;
                            break;

                        case "Thunderstorm":
                            container.style.backgroundImage = `url("../images/weather/storm.jpeg")`;
                            break;

                        case "Drizzle":
                        case "Rain":
                        case "Mist":
                            container.style.backgroundImage = `url("../images/weather/rainy.jpeg")`;
                            break;

                        case "Snow":
                            container.style.backgroundImage = `url("../images/weather/snow.jpeg")`;
                            break;


                        case "Clear":
                            container.style.backgroundImage = `url("../images/weather/sunny.jpeg")`;
                            break;

                    }
                })
                .catch(error => console.log(error))
 
}




const changeToDegreeCelsius = (value) => {
    return (value - 32) * (5 / 9)
}

const changeToFanheit = (value) => {
    return (value * (9 / 5)) + 32
}

const degreeC = document.getElementById("degreeCelsius")
const degreeF = document.getElementById("degreeFanheit")
const trElements = document.getElementsByTagName("tr");
let temp = document.getElementById("temp");

degreeC.addEventListener('click', () => {

    if (!degreeC.classList.contains("active")) {
        let degreeFanheit = temp.innerHTML;
        let degreeCelsius = changeToDegreeCelsius(degreeFanheit);
        temp.innerHTML = Math.round(degreeCelsius);
        degreeF.classList.remove("active");
        degreeC.classList.add("active");

        for (let i = 1; i < trElements.length; i++) {
            const td = trElements[i].cells[1];
            const data = td.children[1].innerHTML;
            td.children[1].innerHTML = Math.round(changeToDegreeCelsius(data));
        }
        headerTemp.innerHTML = `TEMP (°C)`


    }

})

degreeF.addEventListener('click', () => {

    if (!degreeF.classList.contains("active")) {

        let degreeCelsius = temp.innerHTML;
        let degreeFanheit = changeToFanheit(degreeCelsius);
        temp.innerHTML = Math.round(degreeFanheit);
        degreeF.classList.add("active");
        degreeC.classList.remove("active");

        for (let i = 1; i < trElements.length; i++) {
            const td = trElements[i].cells[1];
            const data = td.children[1].innerHTML;
            td.children[1].innerHTML = Math.round(changeToFanheit(data));
        }
        headerTemp.innerHTML = `TEMP (°F)`

    }
})

 

var map;
async function initMap() {

    const long = -0.106
    const lat = 51.517

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: parseFloat(lat), lng: parseFloat(long) },
        zoom: 8
    });

    new google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(long) },
        map,
        title: "London",
    });


}

const getCoordinate = async (country) => {
    geocoder = new google.maps.Geocoder();
    await geocoder.geocode({ componentRestrictions: { country: country, } })
        .then((response) => {
            countryName =  response.results[0].formatted_address;
            lats = response.results[0].geometry.location.lat();
            longs = response.results[0].geometry.location.lng();
        })
        .catch(error => { console.log(error) })
}

window.addEventListener('load', () => {
    dateBuilder();
    getResults("UK");
})

      
 









