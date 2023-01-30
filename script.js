let APIKey = "f44cfcc45327fddc443fa6767211b14b";
let city;

fetch("https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + APIKey)

fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey);

