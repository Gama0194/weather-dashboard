const API_KEY = '6689c9fb7ce6aebb09e22e1093b598b8';

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    getWeather(city);
    addToSearchHistory(city);
    document.getElementById('cityInput').value = '';
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Handle current weather data
            const currentWeather = document.getElementById('currentWeather');
            currentWeather.innerHTML = ''; // Clear previous data
            // Add code to display current weather information
            const cityName = document.createElement('h2');
            cityName.textContent = data.name;
            currentWeather.appendChild(cityName);
            currentWeather.appendChild(document.createElement('hr'));
            const temperature = document.createElement('p');
            temperature.textContent = `Temperature: ${data.main.temp} °C`;
            currentWeather.appendChild(temperature);
            const humidity = document.createElement('p');
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            currentWeather.appendChild(humidity);
            const windSpeed = document.createElement('p');
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            currentWeather.appendChild(windSpeed);
            const uvIndex = document.createElement('p');
            uvIndex.textContent = `UV Index: ${data.wind.speed}`;
            currentWeather.appendChild(uvIndex);

            const lat = data.coord.lat;
            const lon = data.coord.lon;
            getForecast(lat, lon);
        })
        .catch(error => console.log('Request failed', error));
}
function getForecast(lat, lon) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Handle 5-day forecast data
            const forecastWeather = document.getElementById('forecastWeather');
            forecastWeather.innerHTML = ''; // Clear previous data
            // Add code to display 5-day forecast information
            for (let i = 1; i < 6; i++) {
                const forecastItem = document.createElement('div');
                const date = new Date(data.daily[i].dt * 1000);
                const day = date.toLocaleDateString('en-US', { weekday: 'long' });
                const temperature = data.daily[i].temp.day;
                const weatherDescription = data.daily[i].weather[0].description;

                forecastItem.innerHTML = `<h3>${day}</h3>
                <p>Temperature: ${temperature} °C</p>
                <p>Description: ${weatherDescription}</p>`;
                forecastWeather.appendChild(forecastItem);
            }
        })
        .catch(error => console.log('Request failed', error));
}


function addToSearchHistory(city) {
    // Add the city to the search history
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        displaySearchHistory();
    }
}

function displaySearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const searchHistoryElement = document.getElementById('searchHistory');
    searchHistoryElement.innerHTML = '';
    searchHistory.forEach(city => {
        const button = document.createElement('button');
        button.textContent = city;
        button.addEventListener('click', function () {
            getWeather(city);
        });
        searchHistoryElement.appendChild(button);
    });
}

// Display search history on page load
displaySearchHistory();

function storeData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Retrieving data from localStorage
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}