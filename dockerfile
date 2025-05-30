FROM python:3.11-slim


WORKDIR /src
COPY . /src

COPY poetry.lock pyproject.toml /src/

RUN python3 -m pip install poetry
RUN python3 -m poetry install --no-root
RUN python3 -m poetry add uvicorn 

ENV APP_ENV=.env

CMD ["poetry","run", "uvicorn", "app.main:app", "--reload" , "--host", "0.0.0.0"]