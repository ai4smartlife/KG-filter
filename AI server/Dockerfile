# Use a Python base image
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Copy project files into the container
COPY . /app

# Install virtualenv and create a virtual environment
RUN python -m venv venv

# Activate venv and install dependencies
RUN /bin/bash -c "source venv/bin/activate && pip install -r requirements.txt"

# Set the entrypoint (optional)
CMD ["/bin/bash"]
