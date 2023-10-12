#!/bin/bash

# Run Alembic migration
alembic upgrade head

# Start the server
uvicorn app.main:app --host 0.0.0.0 --port 80