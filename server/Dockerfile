# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port your Flask app runs on (default: 5000)
EXPOSE 5000

# Define environment variables (adjust if needed)
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

# Start the Flask application
CMD ["python", "run.py"]
