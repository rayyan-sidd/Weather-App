const API_KEY = "2a803218f5b34bc16ddf8dd9518a3729";
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherCard = document.getElementById('weather-card');
const errorMessage = document.getElementById('error-message');
const loading = document.getElementById('loading');

const cityName = document.getElementById("city-name");
const country = document.getElementById("country");
const temperature = document.getElementById("temp");
const weatherIcon = document.getElementById("weather-icon");
const weatherDecsription = document.getElementById("weather-desc");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const feelsLike = document.getElementById("feels-like");
const pressure = document.getElementById("pressure");
// const lastUpdated = document.getElementById("last-updated");

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", function(e){
    if(e.key === "Enter")   getWeather();
})

//Get Weather Data:
async function getWeather(){
    const city = cityInput.value.trim();
    if (!city) return;

    loading.classList.remove("hidden");
    weatherCard.classList.add("hidden");
    errorMessage.classList.add("hidden");

    try {
        const weatherData = await fetchWeatherData(city)
        displayWeatherData(weatherData);
        loading.classList.add("hidden");
    } catch (error) {
      errorDisplay();
      loading.classList.add("hidden");
    }
}


//Fetchind Weather Data:
async function fetchWeatherData(city){
    try {
        
        if (!city) {
            throw new Error("City name is missing.");
        }
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url)
        console.log(response);
        
        
        if(!response.ok){
            // Better error messages based on status code
            if (response.status === 404) {
                throw new Error("City not found. Please check the spelling.");
            } else if (response.status === 401) {
                throw new Error("Invalid API key.");
            } else {
                throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
            }
        }
        
        const data = await response.json()
        return data
    } catch (error) {
        throw error;
    }
}

//Display Weather Data:
function displayWeatherData(data){
    const { weather, main, wind, name, sys } = data;
    
    cityName.innerText = name;
    country.innerText = sys.country;
    temperature.innerText = `${main.temp}`;
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">`;
    weatherDecsription.innerText = weather[0].description;
    humidity.innerText = `${main.humidity}%`
    windSpeed.innerText = `${wind.speed} km/h`
    feelsLike.innerText = `${main.feels_like}`
    pressure.innerText = `${main.pressure} hPa`
    
    weatherCard.classList.remove("hidden")
    errorMessage.classList.add("hidden")
}

//Update UI:
// function updateUi(){
    
// }

//Error Message:
function errorDisplay(){
    weatherDecsription.classList.add("hidden")
    errorMessage.classList.remove("hidden")
    
    loading.classList.add("hidden");
    errorMessage.innerHTML = `<p>⚠️ ${
      error.message || "Failed to fetch weather data"
    }</p>`;
}