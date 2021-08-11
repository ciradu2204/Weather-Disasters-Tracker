const api = {
    apiKey : "9476ad1e5c7f52fb8d9bf31ee8cbddaa",
    base: "https://api.openweathermap.org/data/2.5/"
}
let longs = null;
let lats = null;
let formatedAddress = "";
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const table = document.getElementById("table");
const date = new Date();
let searchIcon = document.getElementById("searchIcon")
const headerTemp = document.getElementById("tempH");
const deg = "°C";
let geocoder = null;
let loading = false;

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

const changeMap = async (value) => {
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

const activatePlacesSearch = () =>{
    let input = document.getElementById("search");
      new google.maps.places.Autocomplete(input);
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

searchIcon.addEventListener('click', () => {
    let searchBox = document.querySelector(".search-box");
    removeContent();
    dateBuilder();
    getResults(searchBox.value);
    changeMap(searchBox.value);


});

const isLoading = () => {
    if (loading) {
        document.getElementById("container").style.display = "none";
        document.getElementById("loader").style.display = "flex"
    } else {
        document.getElementById("container").style.display = "block";
        document.getElementById("loader").style.display = "none"
    }
}


async function getResults(city) {
     loading = true;
    isLoading(loading);
     await getCoordinate(city);
    await fetch(`${api.base}onecall?lat=${lats}&lon=${longs}&exclude=hourly,minutely,alerts&units=metric&appid=${api.apiKey}`)
        .then(forecastResponse => forecastResponse.json())
        .then(json => {
             loading = false;
            isLoading(loading);
            const weeklyData = json.daily.filter((ele, index) => index > 0);
            const iconURL = "http://openweathermap.org/img/w/"
            const tbody = document.createElement("tbody");
            tbody.id = "tbody";
            let location = document.getElementById("location");
            const h1 = document.createElement("h1");
             const address  = (formatedAddress.length >3)? formatedAddress.slice(formatedAddress.length-3, formatedAddress.length):formatedAddress
             h1.innerHTML = `${address.join(", ")}`
            location.appendChild(h1);
            let icon = document.getElementById("weather-icon");
            let desc = document.getElementById("description");
            let temp = document.getElementById("temp");
            icon.src = `${iconURL + json.current.weather[0].icon}.png`;
            const descriptionData = json.current.weather[0].description;
            desc.innerHTML = descriptionData.charAt(0).toUpperCase() + descriptionData.slice(1);
            const restOfDays = days.slice(date.getDay() + 1)
            const otherDays = days.slice(0, date.getDay() + 1)
            const combinedDays = restOfDays.concat(otherDays);
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
                p.innerHTML = ` ${Math.round(weeklyData[i].temp.max)}`
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
                    container.style.backgroundImage = `url("../images/weather/rainy.png")`;
                    break;

                case "Snow":
                    container.style.backgroundImage = `url("../images/weather/snow.jpeg")`;
                    break;


                case "Clear":
                    container.style.backgroundImage = `url("../images/weather/sunny.jpeg")`;
                    break;

            }
        })
        .catch(error => {
            loading = false;
            isLoading(loading);
            console.log(error)
        })

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
async function initMap(lat, long, city) {


    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: parseFloat(lat), lng: parseFloat(long) },
        zoom: 7
    });

    new google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(long) },
        map,
        title: city,
    });

    activatePlacesSearch();
}

const getCoordinate =  async(city) => {
    geocoder = new google.maps.Geocoder();
   await geocoder.geocode( { 'address': city})
    .then((response) => {
        lats =  response.results[0].geometry.location.lat()
       longs = response.results[0].geometry.location.lng()
        formatedAddress = response.results[0].formatted_address.split(',')
    })
    .catch(error => {console.log(error)})
}

window.addEventListener('load', async() => {

navigator.geolocation.getCurrentPosition (async (success)=>{
         const longs=success.coords.longitude;
        const  lats=success.coords.latitude
        let latlng = new google.maps.LatLng(lats,longs)
          geocoder = new google.maps.Geocoder();
         await geocoder.geocode( { latLng: latlng})
         .then(response =>{
             let addressArray = response.results[0].formatted_address.split(',');
            let city = addressArray[addressArray.length -2];
            dateBuilder();
            initMap(lats,longs, city);
           getResults(city);
        })
    },()=>{
 
        dateBuilder();
        initMap(-1.95, 30.0588, "Kigali");
        getResults("Kigali");
    })
    activatePlacesSearch()

})












