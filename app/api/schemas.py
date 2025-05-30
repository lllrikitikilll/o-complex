from pydantic import BaseModel


class RequestSchema(BaseModel):
    lat: str
    lon: str
    city: str


class BaseWeatherSchema(BaseModel):
    temperature_2m: float
    wind_speed_10m: float
    time: str
    interval: int
