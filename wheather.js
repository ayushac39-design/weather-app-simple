const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const api_Key = "1ec2c52cc9fe961656421c101acf392f";

// When user clicks search button
searchBtn.addEventListener("click" ,  async () => {
    const city = inputBox.value;
    if (city === "") {
        displayError("Please enter a city name");
        return;
    }
    await getWeatherData(city);
});
async function getWeatherData(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        displayWeatherInfo(data);
    } catch (error) {
        displayError(error.message);
    }
}
function displayWeatherInfo(data) {
    temperature.innerHTML = `${Math.round(data.main.temp)} <sup>°C</sup>`;
    description.innerHTML = data.weather[0].description;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind_speed.innerHTML = `${data.wind.speed} Km/h`;
    weather_img.src = getWeatherEmoji(data.weather[0].main);
}
function getWeatherEmoji(weatherType) {

    
    switch (weatherType) {
       

        case 'Clear':
            return './asset/clear.png';
        case 'Clouds':
            return './asset/cloud.png';
        case 'Rain':
            return './asset/rain.png';
        case 'Drizzle':
            return './asset/drizzle.png'; 
        case 'Snow':
            return './asset/snow.png';
        case 'Thunderstorm':
            return './asset/thunder.png';
        default:
            return './asset/cloud.png';
              
        }
 
       
}
function displayError(message) {
    alert(message);
}
