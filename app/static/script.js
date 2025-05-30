import { CITIES } from '/static/russian-cities.js';

const cityInput = document.getElementById('city-input');
const suggestionsContainer = document.getElementById('suggestions-container');
const weatherDisplay = document.getElementById('weather-display');

cityInput.addEventListener('input', autocomplete);
cityInput.addEventListener('focus', () => {
    if (cityInput.value.trim().length > 0) {
        autocomplete();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    displayLastSearch();
});

document.addEventListener('click', (event) => {
    if (!cityInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none';
    }
});

function autocomplete() {
    const filter = cityInput.value.toLowerCase();
    suggestionsContainer.innerHTML = '';

    if (filter) {
        const filteredCities = CITIES.filter(city => city.name.toLowerCase().includes(filter));
        displaySuggestions(filteredCities);
    } else {
        suggestionsContainer.style.display = 'none';
    }
}

function displaySuggestions(cities) {
    suggestionsContainer.innerHTML = '';
    if (cities.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    cities.forEach(city => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = city.name;
        suggestionItem.addEventListener('click', () => selectCity(
            city.name,
            city.coords.lat,
            city.coords.lon,
        ));

        suggestionsContainer.appendChild(suggestionItem);
    });
    suggestionsContainer.style.display = 'block';
}

async function selectCity(cityName, lat, lon) {
    cityInput.value = cityName;
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
    cityInput.blur();

    document.cookie = `last_search=${encodeURIComponent(cityName)}; path=/`;

    weatherDisplay.innerHTML = '<p>Загрузка данных о погоде...</p>';

    try {
        let coords = {"lat": lat, "lon": lon, "city": cityName}
        const response = await fetch(
            `/api/weather`, { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(coords) 
            }
        );
        if (!response.ok) {
            throw new Error('Сетевая ошибка');
        }
        const data = await response.json();
        data.city = cityName;
        displayWeather(data);
    } catch (error) {
        console.error("Ошибка получения погоды:", error);
        weatherDisplay.innerHTML = `<p>Не удалось загрузить данные о погоде для города ${cityName}. Попробуйте еще раз.</p>`;
    }
}

function displayLastSearch() {
    const lastSearch = getCookie('last_search');
    if (lastSearch) {
        const cityName = decodeURIComponent(lastSearch);
        cityInput.value = cityName;
        const city = CITIES.find(city => city.name === cityName);
        selectCity(city.name, city.coords.lat, city.coords.lon);
    } else {
        autocomplete();
    }
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function displayWeather(data) {
    if (!data) {
        weatherDisplay.innerHTML = '<p>Данные о погоде недоступны.</p>';
        return;
    }

    weatherDisplay.innerHTML = `
        <h2>Погода в ${data.city}</h2>
        <p>Температура: ${data.temperature}°C</p>
        <p>Ветер: ${data.windSpeed} м/с</p>
    `;
}
