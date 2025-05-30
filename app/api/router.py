from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from httpx import AsyncClient

from app.api.dependencies import get_async_http_client
from app.api.schemas import RequestSchema
from app.api.weatherapi import weather_api

router = APIRouter(prefix="", tags=["API"])
templates = Jinja2Templates(directory="app/templates")


@router.get("/")
async def get_main_page(request: Request):
    return templates.TemplateResponse(name="index.html", context={"request": request})


@router.post("/weather")
async def get_weather_on_city(
    coords: RequestSchema, client: AsyncClient=Depends(get_async_http_client)
    ):
    weather = await weather_api.get_basic_weather(client, coords.lat, coords.lon)
    return JSONResponse(
        {"temperature": weather.temperature_2m, "windSpeed": weather.wind_speed_10m}
    )
