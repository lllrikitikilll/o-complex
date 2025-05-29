import httpx

from app.api.schemas import BaseWeatherSchema


URL = "https://api.open-meteo.com/v1/forecast"


class WeatherAPIAsync:
    """Асинхронный апи погоды
    """
    def __init__(self, api_url: str):
        self.api_url = api_url

    async def get_basic_weather(
        self, client: httpx.AsyncClient, lat: str, lon: str
        ):
        request_data = {
            "latitude": lat,
            "longitude": lon,
            "current": "temperature_2m,wind_speed_10m",
        }
        response = await client.post(self.api_url , data=request_data)
        weather_data = BaseWeatherSchema(**response.json()["current"])
        return weather_data



weather_api = WeatherAPIAsync(api_url=URL)
