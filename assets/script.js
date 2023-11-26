

var cityName = "";
//store prev searched cities
var previouslySearchedCities = JSON.parse(localStorage.getItem("previouslySearchedCities")) || []; 

var savedCities = localStorage.getItem("previouslySearchedCities");  //load prev searches from local storage
if (savedCities) {
    previouslySearchedCities = JSON.parse(savedCities);
}

// Function to save list of previously searched cities to local storage
function saveCitiesToLocalStorage() {
    localStorage.setItem("previouslySearchedCities", JSON.stringify(previouslySearchedCities));
}

function addCityToPreviouslySearched(cityName) {
    previouslySearchedCities.push(cityName);
    saveCitiesToLocalStorage();
    updatePreviouslySearchedButtons();
}
    
//function to update HTML with buttons of previous searches
function updatePreviouslySearchedButtons() {
    var previousSearchesContainer = document.getElementById("previous-searches");
    previousSearchesContainer.innerHTML = "";   
    
    previouslySearchedCities.forEach(function (cityName) {
        var button = document.createElement("button");
        button.textContent = cityName;
        button.classList.add("btn-prev");
        button.addEventListener("click", function () {
            getLatLong(cityName);   //when button is clicked fetch weather info
        });
        previousSearchesContainer.appendChild(button);
    });
}
    
addCityToPreviouslySearched(cityName);
    console.log(cityName);
    
//event listener for the form submission
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
            console.log("Error: " + error);      //log any error
        });
}
function getWeatherData(lat, lon) {
    var weatherAPIKey = "a749e0f3c96ca48cd42ff8ccf52c401a"; //API key

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
            console.log("Error fetching weather data: " + error);    //log any error
        });
}

function displayWeatherData(data) {
    // Extract and display relevant weather information
    var cityName = data.name;
    var now = dayjs().format('MM/D/YY');
    console.log(now);
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

//get 5 day forecast
function getFiveDayForecast(lat, lon) {
    var weatherAPIKey = "a749e0f3c96ca48cd42ff8ccf52c401a";

    var forecastURL= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=imperial`;


    // fetch 5 day forecast
    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayFiveDayForecast(forecastData);
        })
        .catch(function (error) {
            console.loge("error fetching 5 day forecast data:" + error);   //log any errors 
        });
    }
function displayFiveDayForecast(forecastData) {   //function to display 5 day forecast 
    for (var i = 0; i < 5; i++) {
        var forecastItem = forecastData[i];  
        var dateID = "forecast-date-" + i;
        var tempID = "forecast-temperature-fahrenheit-" + i;
        var windID = "forecast-wind-speed-" + i;
        var humidityID = "forecast-humidity-" + i;

        var forecastDate = dayjs.unix(forecastItem.dt).format('MM/D/YY');
        var forecastTemperatureFahrenheit = forecastItem.main.temp;
        var forecastWindSpeed = forecastItem.wind.speed;
        var forecastHumidity = forecastItem.main.humidity;

        //update HTML elements with forecast data
        document.getElementById(dateID).textContext = "Date: " + forecastDate;
        document.getElementById(tempID).textContent = "Temp: " + forecastTemperatureFahrenheit + "°F";
        document.getElementById(windID).textContent = "Wind: " +  forecastWindSpeed + " MPH";
        document.getElementById(humidityID).textContent = "Humidity:" + forecastHumidity + "%";
    }
}




   
  
 
   
   
    //var forecastWeatherDescription = forecastItem.weather[0].description;

//forecastContainer.appendChild(forecastData);

//add city to list of previous searches


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
