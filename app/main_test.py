from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse
from httpx import AsyncClient

app = FastAPI()


async def get_async_client_http() -> AsyncClient:
    async with AsyncClient() as client:
        client = AsyncClient()
    return client


@app.get("/weather")
async def get_weather_on_city(
    client1: AsyncClient = Depends(get_async_client_http),
    client2: AsyncClient = Depends(get_async_client_http),
):

    weather = await client1.post("https://www.google.ru")
    print(id(client1), id(client2))
    return JSONResponse({"temperature": 1, "windSpeed": 2})
