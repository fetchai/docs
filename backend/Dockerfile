# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt
RUN pip install alembic
RUN pip install pg8000


RUN chmod +x startup.sh

# Make port 80 available to the world outside this container
EXPOSE 80

# Run app.py when the container launches
CMD ["./startup.sh"]