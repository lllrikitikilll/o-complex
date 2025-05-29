import { CITIES } from '/static/russian-cities.js';

const cityInput = document.getElementById('city-input');
const suggestionsContainer = document.getElementById('suggestions-container');
const weatherDisplay = document.getElementById('weather-display');

cityInput.addEventListener('input', autocomplete);
cityInput.addEventListener('focus', () => {
    if (cityInput.value.trim().length > 0) {
        autocomplete(); // Показать предложения, если есть текст
    }
});

// Скрыть предложения при клике вне
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
        )
    );

        suggestionsContainer.appendChild(suggestionItem);
    });
    suggestionsContainer.style.display = 'block';
}

async function selectCity(cityName, lat, lon) {
    cityInput.value = cityName;
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
    cityInput.blur(); // Убираем фокус с поля ввода

    weatherDisplay.innerHTML = '<p>Загрузка данных о погоде...</p>';

    try {
        let coords = {"lat": lat, "lon": lon}
        const response = await fetch(
            `/weather` , { 
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
        data.city = cityName
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

    weatherDisplay.innerHTML = `
        <h2>Погода в ${data.city}</h2>
        <p>Температура: ${data.temperature}°C</p>
        <p>Ветер: ${data.windSpeed} м/с</p>
    `;
}
