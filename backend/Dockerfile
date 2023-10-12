FROM bitnami/minideb:bullseye-amd64
ENV PATH="$PATH:/root/.local/bin"

RUN apt-get update && \
    apt-get install -y tree python3 python3-distutils curl postgresql-client gcc python3.9-dev && \
    curl -sSL https://install.python-poetry.org | python3 -


WORKDIR /app

# install the dependencies
ADD pyproject.toml poetry.lock /app/
RUN poetry install --only main

# add the main codebase
ADD . /app

EXPOSE 8000
ENV PYTHONUNBUFFERED=1
ENTRYPOINT ["poetry", "run"]
CMD ["uvicorn", "main:app", "--host=0.0.0.0"]

