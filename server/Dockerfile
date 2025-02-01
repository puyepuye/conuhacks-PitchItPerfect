# Use an official Python runtime as a parent image
FROM continuumio/miniconda3

# Set the working directory
WORKDIR /app

# Copy the Conda environment specification file
COPY requirements.yml /app/

# Create the Conda environment using the .yml file
RUN pip install --no-cache-dir -r requirements.txt

# Activate the environment
SHELL ["conda", "run", "-n", "myenv", "/bin/bash", "-c"]

# Copy the rest of the application code
COPY . .

# Expose the port your Flask app runs on (default: 5000)
EXPOSE 5000

# Define environment variables (adjust if needed)
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

# Start the Flask application using the Conda environment
CMD ["conda", "run", "-n", "myenv", "python", "run.py"]
