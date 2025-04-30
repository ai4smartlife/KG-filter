# KG-Filter Docker Setup

This README provides instructions for building and running the `kg-filter` application using Docker.

## Prerequisites

- Docker installed on your system.

## Building the Docker Image

To build the Docker image for the `kg-filter` application, run the following command in the project directory:

```bash
docker build -t kg-filter:1.0 .
```

This command creates an image tagged as `kg-filter:1.0`.

## Running the Docker Container

To run the `kg-filter` application in a Docker container, use the following command:

```bash
docker run -p 8085:8085 --name nckh kg-filter:1.0
```

This command:

- Maps port `8085` on the host to port `8085` in the container.
- Names the container `nckh`.
- Uses the `kg-filter:1.0` image.

## Accessing the Application

Once the container is running, the application should be accessible at:

```
http://localhost:8085
```

## Stopping the Container

To stop the running container, use:

```bash
docker stop nckh
```

## Removing the Container

To remove the container after stopping it, use:

```bash
docker rm nckh
```

## Notes

- Ensure port `8085` is not in use on the host machine before running the container.
- If you need to rebuild the image, ensure to remove the old image using `docker rmi kg-filter:1.0` if necessary.