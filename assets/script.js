

var WeatherAPIKey = a749e0f3c96ca48cd42ff8ccf52c401a

var cityName;

var queryURL = http: "//api.openweathermap.org/geo/1.0/direct?q="{cityName}&appid="WeatherAPIKey";

fetch(queryURL)

response 

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