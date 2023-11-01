function getWeather() {
    var city = document.getElementById("cityInput").value;
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=YOUR_API_KEY&units=metric';

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = "City: " + data.name + "<br>" +
                "Temperature: " + data.main.temp + "°C" + "<br>" +
                "Description: " + data.weather[0].description;
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}
