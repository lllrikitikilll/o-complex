from fastapi import APIRouter, Request, HTTPException, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
router = APIRouter(prefix='', tags=['API'])
templates = Jinja2Templates(directory='app/templates')


@router.get('/')
async def get_main_page(request: Request):
    return templates.TemplateResponse(name='index.html', context={'request': request})


@router.post('/weather/{city:str}')
async def get_weather_on_city(city):
    return JSONResponse({
        "city": city,
        "temperature": "Проверка",
        "description": "Проверка",
        "humidity": "Проверка",
        "windSpeed": "Проверка"
        })