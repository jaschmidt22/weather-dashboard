

var cityName = "";

// Add an event listener for the form submission

document.getElementById("city-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting
    cityName = document.getElementById("cityname").value;
    getLatLong(cityName); // Call a function to fetch lat and long
});

function getLatLong(cityName) {
    var queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=a749e0f3c96ca48cd42ff8ccf52c401a`;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            // Call a function to fetch weather data using lat and lon
            getWeatherData(lat, lon);
        })
        .catch(function (error) {
            console.log("Error: " + error);
        });
}
function getWeatherData(lat, lon) {
    var weatherAPIKey = "a749e0f3c96ca48cd42ff8ccf52c401a"; // Replace with your OpenWeatherMap API key

    // Construct the URL for fetching weather data
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=imperial`;

    //fetch the weather data
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Handle and display the weather data here
            displayWeatherData(data);
        })
        .catch(function (error) {
            console.log("Error fetching weather data: " + error);
        });
}

function displayWeatherData(data, forecastData) {
    // Extract and display relevant weather information
    var cityName = data.name;
    var now = dayjs().format('MM/D/YY');
   //console.log(now.format());
    var temperatureFahrenheit = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var weatherDescription = data.weather[0].description;

    // Update the HTML elements with the weather data
    document.getElementById("city-name").textContent = cityName + (now);
    document.getElementById("temperature").textContent = temperatureFahrenheit + "°F"
    document.getElementById("humidity").textContent = humidity + "%";
    document.getElementById("wind-speed").textContent = windSpeed +  "MPH";
    document.getElementById("weather-description").textContent = weatherDescription;
}

// Call the getLatLong function when the form is submitted
document.getElementById("city-form").addEventListener("submit", function (event) {
    event.preventDefault();
    cityName = document.getElementById("cityname").value;
    getLatLong(cityName);
})

//display 5 day forecast
var forecastContainer = document.getElementById("forecast-container");
forecastContainer.innerHTML = "";  //clear previous forecast info


for (var i = 1; i <= 5; i++) {
    var forecastItem = forecastData[i];
    var forecastDate = dayjs.unix(forecastItem.dt).format('MM/D/YY');
    var forecastTemperatureFahrenheit = forecastItem.main.temp;
    var forecastWindSpeed = forecastItem.wind.speed;
    var forecastHumidity = forecastItem.main.humidity;
    var forecastWeatherDescription = forecastItem.weather[0].description;

forecastContainer.appendChild(forecastData);
}


//event listener for click city search
//function? for converting to lat and long of city
//function? for date
//fetch forecast for current temp wind and humidity
//fetch next 5 days forecast with temp wind and humidity
//weather icon
//store search in local storage
//button populates below search box with name of city and link to 5 day forecast










//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city
