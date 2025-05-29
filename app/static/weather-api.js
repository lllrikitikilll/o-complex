// Мок API для погоды
// В реальном приложении здесь будет взаимодействие с настоящим API погоды

export class WeatherAPI {
    constructor() {
        // Здесь можно было бы инициализировать API ключ, базовый URL и т.д.
        this.mockWeatherData = {
            "Москва": { temperature: 15, description: "Облачно", humidity: 70, windSpeed: 5 },
            "Санкт-Петербург": { temperature: 12, description: "Дождь", humidity: 85, windSpeed: 7 },
            "Новосибирск": { temperature: 10, description: "Ясно", humidity: 50, windSpeed: 3 },
            "Екатеринбург": { temperature: 13, description: "Облачно", humidity: 65, windSpeed: 4 },
            "Казань": { temperature: 16, description: "Ясно", humidity: 60, windSpeed: 6 },
            "Сочи": { temperature: 22, description: "Ясно", humidity: 75, windSpeed: 2 },
            "Владивосток": { temperature: 18, description: "Дождь", humidity: 90, windSpeed: 8 },
            "Мурманск": { temperature: 5, description: "Снег", humidity: 80, windSpeed: 10 }
        };
    }

    async getWeather(cityName) {
        console.log(`Запрос погоды для города: ${cityName}`);
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 500));

        const cityData = this.mockWeatherData[cityName];

        if (cityData) {
            return {
                city: cityName,
                ...cityData
            };
        } else {
            // Возвращаем случайные данные для городов, которых нет в моке
            console.warn(`Нет мок-данных для ${cityName}, генерируем случайные.`);
            const descriptions = ["Ясно", "Облачно", "Небольшой дождь", "Сильный дождь", "Снег", "Туман"];
            return {
                city: cityName,
                temperature: Math.floor(Math.random() * 30) - 5, // от -5 до 24
                description: descriptions[Math.floor(Math.random() * descriptions.length)],
                humidity: Math.floor(Math.random() * 70) + 30, // от 30 до 99
                windSpeed: Math.floor(Math.random() * 10) + 1 // от 1 до 10
            };
        }
    }
}

