from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from httpx import AsyncClient

from app.api.dependencies import get_async_http_client, get_session_id
from app.api.schemas import RequestSchema
from app.api.weatherapi import weather_api
from app.dao.db_methods import add_search_log, get_history

router = APIRouter(prefix="", tags=["API"])
templates = Jinja2Templates(directory="app/templates")


@router.get("/")
async def get_main_page(request: Request):
    return templates.TemplateResponse(name="index.html", context={"request": request})


@router.post("/history")
async def get_main_page():
    return await get_history()



@router.post("/weather")
async def get_weather_on_city(
    search_request: RequestSchema,
    client: AsyncClient = Depends(get_async_http_client),
    session_id: str = Depends(get_session_id),
):
    weather = await weather_api.get_basic_weather(
        client, search_request.lat, search_request.lon
    )
    response = JSONResponse(
        {"temperature": weather.temperature_2m, "windSpeed": weather.wind_speed_10m}
    )
    await add_search_log(session_id=session_id, search_request=search_request.city)
    response.set_cookie(
        key="session_id",
        value=session_id,
        max_age=3600,
    )
    return response
