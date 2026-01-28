// WEATHER APP

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "3850b14ed0be25e29ecfb0905c04078a";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city) {

        try {

            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        } catch (error) {
            console.log(error);
            displayError(error);
        }

    }
    else {
        displayError("Please enter a city");
    }

});

async function getWeatherData(city) {

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if(!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();

}

function displayWeatherInfo(data) {

    const  {name: city,
            main: {temp, humidity},
            weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("h1");
    const humidityDisplay = document.createElement("h1");
    const descDisplay = document.createElement("h1");
    const weatherEmoji = document.createElement("h1");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.round(temp - 273.15)* 9/5 + 32}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId) {

    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"; // Atmosphere
        case (weatherId >= 800):
            return "☀️"; // Clear
        default:
            return "❓";
    }

}

function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}