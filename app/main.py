from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles

from app.api.router import router as router_api
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), "static")
templates = Jinja2Templates(directory="app/templates")

app.include_router(router_api)



@app.get("/")
async def get_main_page(request: Request):
    return templates.TemplateResponse(name="index.html", context={"request": request})