import { CITIES } from '/static/cities.js';
import { WeatherAPI } from '/static/weather-api.js';

const cityInput = document.getElementById('city-input');
const suggestionsContainer = document.getElementById('suggestions-container');
const weatherDisplay = document.getElementById('weather-display');

const weatherApi = new WeatherAPI();

cityInput.addEventListener('input', handleInput);
cityInput.addEventListener('focus', () => {
    if (cityInput.value.trim().length > 0) {
        handleInput(); // Show suggestions if there's text already
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (event) => {
    if (!cityInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none';
    }
});

function handleInput() {
    const query = cityInput.value.toLowerCase().trim();
    if (query.length === 0) {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none';
        return;
    }

    const filteredCities = CITIES.filter(city =>
        city.toLowerCase().startsWith(query)
    ).slice(0, 10); // Limit suggestions

    displaySuggestions(filteredCities);
}

function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';
    if (suggestions.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    suggestions.forEach(city => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = city;
        suggestionItem.addEventListener('click', () => selectCity(city));
        suggestionsContainer.appendChild(suggestionItem);
    });
    suggestionsContainer.style.display = 'block';
}

async function selectCity(cityName) {
    cityInput.value = cityName;
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
    cityInput.blur(); // Remove focus from input

    weatherDisplay.innerHTML = '<p>Загрузка данных о погоде...</p>';

    try {
        const weatherData = await fetch('/weather/'+cityName, {method: "post"})
        const data = await weatherData.json();
        displayWeather(data);
    } catch (error) {
        console.error("Ошибка получения погоды:", error);
        weatherDisplay.innerHTML = `<p>Не удалось загрузить данные о погоде для города ${cityName}. Попробуйте еще раз.</p>`;
    }
}

function displayWeather(data) {
    if (!data) {
        weatherDisplay.innerHTML = '<p>Данные о погоде недоступны.</p>';
        return;
    }

    let iconUrl = 'default_weather_icon.png';
    switch (data.description.toLowerCase()) {
        case 'ясно':
            iconUrl = '/static/sunny_icon.png';
            break;
        case 'облачно':
            iconUrl = '/static/cloudy_icon.png';
            break;
        case 'дождь':
            iconUrl = '/static/rainy_icon.png';
            break;
        case 'сильный дождь':
            iconUrl = '/static/rainy_icon.png';
            break;
        case 'снег':
            iconUrl = '/static/snowy_icon.png';
            break;
    }


    weatherDisplay.innerHTML = `
        <h2>Погода в ${data.city}</h2>
        <img src="${iconUrl}" alt="${data.description}" class="weather-icon">
        <p>Температура: ${data.temperature}°C</p>
        <p>Описание: ${data.description}</p>
        <p>Влажность: ${data.humidity}%</p>
        <p>Ветер: ${data.windSpeed} м/с</p>
    `;
}

