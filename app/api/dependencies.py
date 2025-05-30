import uuid

from fastapi import Cookie
from httpx import AsyncClient


async def get_async_http_client():
    async with AsyncClient() as client:
        yield client


def get_session_id(session_id: str = Cookie(None)):
    if session_id is None:
        session_id = str(uuid.uuid4())
    return session_id
