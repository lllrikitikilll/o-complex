from fastapi import Request
from httpx import AsyncClient


async def get_async_http_client():
    async with AsyncClient() as client:
        yield client
