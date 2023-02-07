let APIKey = "f44cfcc45327fddc443fa6767211b14b";
let searchButtonEl = document.querySelector("#search-button");
let searchCityEl = document.querySelector("#search-input");
let historySearchedEl = document.querySelector("#history");




let city = "";
const searchedCities = JSON.parse(localStorage.getItem("searchedCity")) || [];

displayCities();
historySet();

searchButtonEl.addEventListener("click",function(event){
    event.preventDefault();
    city = searchCityEl.value.trim();
    console.log(searchedCities);
    if(!searchedCities.includes(city)){
    
        searchedCities.unshift(city);
        displayCities();
        historySet();
    }
 
    fetchCity(city);
    console.log(`city `, city );

    localStorage.setItem("searchedCity", JSON.stringify(searchedCities));

    
})

function historySet() {
    const historyButtons = document.querySelectorAll(".searched-history");
    for (let i = 0; i < historyButtons.length; i++) {
        const element = historyButtons[i];
        element.addEventListener("click", function (event) {
            
            fetchCity(element.innerText);
            
        })
        
    }
    
}



// event listener for the fetch response 


function fetchCity(city) {
    if (city != ""){

        fetch("http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=5&appid=" + APIKey)
        .then(response => response.json())
        .then(dataOfCity => {
            console.log(dataOfCity);
            console.log(`fetch city`,city);
            let userInput = dataOfCity[0]; 
            // let cityLat = userInput.lat;
            // let cityLon = userInput.lon;
            localStorage.setItem("cityLat", cityLat = userInput.lat)
            localStorage.setItem("cityLon", cityLon = userInput.lon)

            // console.log(userInput.lat);
            // console.log(userInput.lon);
            // console.log(cityLat);
            // console.log(cityLon);
            
            return fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon="+ cityLon +"&appid=" + APIKey)
            
        })
        
        .then(response => response.json())
        .then(weatherOfCity => {
            // let userInput = weatherOfCity[0]; 
            console.log(weatherOfCity);
            
            
        })
    }
    
}
function displayCities() {
    historySearchedEl.innerHTML= "";
    
    for (let i = 0; i < searchedCities.length; i++) {
        
        let searchedValue = searchedCities[i];
        let button = document.createElement("div");
        
        
        
        button.innerHTML = 
        ` <div class="d-grid gap-3 d-md-block pb-1">
        <button class="btn search-button btn-primary searched-history " 
        aria-label="submit search">
        ${searchedValue}
        </button>
        </div>`;
        
        
        historySearchedEl.prepend(button);
    }
    
    
}