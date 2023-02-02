let APIKey = "f44cfcc45327fddc443fa6767211b14b";
let searchButtonEl = document.querySelector("#search-button");
let searchCityEl = document.querySelector("#search-input");


let city = "";

searchButtonEl.addEventListener("click",function(event){
    event.preventDefault();
    city = searchCityEl.value.trim();
    
    fetchCity(city);
    console.log(`city `, city );
})

// event listener for the fetch response 


function fetchCity(city) {
    if (city != ""){

        fetch("http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=5&appid=" + APIKey)
        .then(response => response.json())
        .then(dataOfCity => {
            console.log(dataOfCity);
            console.log(`fetch city`,city);
            let userInput = dataOfCity[0]; 
            let cityLat = userInput.lat;
            let cityLon = userInput.lon;
            console.log(userInput.lat);
            console.log(userInput.lon);
            
            return fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon="+cityLon +"&appid=" + APIKey)
            
        })
        
        .then(response => response.json())
        .then(weatherOfCity => {
            // let userInput = weatherOfCity[0]; 
            console.log(weatherOfCity);
            
        })
    }
    
}
