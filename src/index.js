function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} mph`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class= "weather-app-icon"></img>`;

}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;

}

function searchCity(city) {
    let apiKey = "b7t5eb0b5346579b2f451db58acf42o3";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let days = ["Tue", "Wed", "Thurs", "Fri", "Sat"];
    let forecastHtml = "";

    days.forEach(function (day) {
        forecastHtml = forecastHtml + `
    <div class="row">
            <div class="col-1">
              <div class="weather-forecast-date">${day}</div>
              <div class="weather-forecast-icon">
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-night.png"
                  alt=""
                  width="36"
                />
              </div>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">18&deg </span>
                <span class="weather-forecast-temperature-min">12&deg</span>
              </div>
            </div>
          </div>`;
    });
    forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
displayForecast();
