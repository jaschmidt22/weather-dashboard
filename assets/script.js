document.addEventListener("DOMContentLoaded", function () {
  var cityName = "";
  var previouslySearchedCities = [];

  var savedCities = localStorage.getItem("previouslySearchedCities"); //load prev searches from local storage

  if (savedCities) {
    previouslySearchedCities = JSON.parse(savedCities);
  }

  //function to get latitutde and longitude of city name
  function getLatLong(cityName) {
    var queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=a749e0f3c96ca48cd42ff8ccf52c401a`;

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        // Call a function to fetch weather data using lat and long
        getWeatherData(lat, lon);
      })
      .catch(function (error) {
        console.log("Error: " + error); //log any error
      });
  }
  function getWeatherData(lat, lon) {
    // URL for fetching weather data
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a749e0f3c96ca48cd42ff8ccf52c401a&units=imperial`;

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
        console.log("Error fetching weather data: " + error); //log any error
      });
  }

  function displayWeatherData(data) {
    // Extract and display relevant weather information
    var cityName = data.name;
    var now = dayjs().format("MM/D/YY");
    console.log(now);
    var temperatureFahrenheit = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var weatherDescription = data.weather[0].description;
    var weatherIcon = data.weather[0].icon;

    // Update the HTML elements with the weather data
    document.getElementById("city-name").textContent = cityName + now;
    document.getElementById("temperature").textContent =
      temperatureFahrenheit + "°F";
    document.getElementById("humidity").textContent = humidity + "%";
    document.getElementById("wind-speed").textContent = windSpeed + "MPH";
    document.getElementById("weather-description").textContent =
      weatherDescription;
    document
      .getElementById("weather-icon-current")
      .setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      );
  }

  function getLatLongForForecast(cityName) {
    var queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=a749e0f3c96ca48cd42ff8ccf52c401a`;

    return fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        return { lat, lon };
      })
      .catch(function (error) {
        console.log("Error: " + error); // log any error
      });
  }

  //get 5 day forecast
  function getFiveDayForecast(lat, lon) {
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=0&appid=a749e0f3c96ca48cd42ff8ccf52c401a&units=imperial`; //5 day

    // fetch 5 day forecast
    fetch(forecastURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (forecastData) {
        displayFiveDayForecast(forecastData);
        console.log(forecastData);
      })
      .catch(function (error) {
        console.log("error fetching 5 day forecast data:" + error); //log any errors
      });
  }
  function displayFiveDayForecast(forecastData) {
    //function to display 5 day forecast
    console.log(forecastData);
    if (forecastData.list && forecastData.list.length > 0) {
      for (var i = 0; i < forecastData.list.length; i += 8) {
        console.log(i);
        var forecastItem = forecastData.list[i];
        console.log(forecastItem);
        var dateID = "forecast-date-" + i;
        var tempID = "forecast-temperature-fahrenheit-" + i;
        var windID = "forecast-wind-speed-" + i;
        var humidityID = "forecast-humidity-" + i;
        var weatherIconID = "weather-icon-" + i;

        // if (forecastItem) {
        var forecastDate = dayjs.unix(forecastItem.dt).format("MM/D/YY");
        var forecastTemperatureFahrenheit = forecastItem.main.temp;
        var forecastWindSpeed = forecastItem.wind.speed;
        var forecastHumidity = forecastItem.main.humidity;
        var weatherIcon = forecastItem.weather[0].icon;

        //update HTML elements with forecast data
        document.getElementById(dateID).textContent = "Date: " + forecastDate;
        document.getElementById(weatherIconID).textContent = weatherIcon;
        document.getElementById(tempID).textContent =
          "Temp: " + forecastTemperatureFahrenheit + "°F";
        document.getElementById(windID).textContent =
          "Wind: " + forecastWindSpeed + " MPH";
        document.getElementById(humidityID).textContent =
          "Humidity:" + forecastHumidity + "%";
        document
          .getElementById(weatherIconID)
          .setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
          );
        //}
      }
    } else {
      console.log("No forecast data available.");
    }
  }

  //store prev searched cities

  // Function to save list of previously searched cities to local storage
  function saveCitiesToLocalStorage() {
    localStorage.setItem(
      "previouslySearchedCities",
      JSON.stringify(previouslySearchedCities)
    );
  }

  function addCityToPreviouslySearched(cityName) {
    if (!previouslySearchedCities.includes(cityName)) {
      previouslySearchedCities.push(cityName);
      saveCitiesToLocalStorage();
    }
    updatePreviouslySearchedButtons();
  }

  //function to update HTML with buttons of previous searches
  function updatePreviouslySearchedButtons() {
    var previousSearchesContainer =
      document.getElementById("previous-searches");
    previousSearchesContainer.innerHTML = "";

    previouslySearchedCities.forEach(function (cityName) {
      var button = document.createElement("button");
      button.textContent = cityName;
      button.classList.add("btn-prev");
      button.addEventListener("click", function () {
        getLatLong(cityName); //when button is clicked fetch weather info
      });
      previousSearchesContainer.appendChild(button);
    });
  }

  document
    .getElementById("city-form")
    .addEventListener("submit", function (event) {
      //event listener for the form submission
      event.preventDefault();
      cityName = document.getElementById("cityname").value;
      addCityToPreviouslySearched(cityName);
      getLatLong(cityName); //call function to fetch current weather
      getLatLongForForecast(cityName).then(function (coordinates) {
        //call function for 5 day
        getFiveDayForecast(coordinates.lat, coordinates.lon);
      });
    });
});
