---
title: "Use Case"
date: 2024-06-28
draft: false
description: "This is a use case example to the reverse proxy using traefik and fastAPI with temporal python SDK."
type: "learning-center"
weight: 1
---
## Building a Scalable Greeting Service with Temporal, FastAPI, Docker, and Traefik

In this post, we'll walk through building a scalable greeting service using Temporal, a powerful orchestration framework, and FastAPI, a modern web framework for building APIs with Python. We'll also containerize our application using Docker and set up a reverse proxy with Traefik for secure routing and load balancing. We'll cover the code structure, key components, containerization, and how they work together to provide a robust and efficient service.

### Project Structure

Here's the structure of our project:

```
root
├── internal
│   ├── activity
│   │   └── name.py
│   ├── worker
│   │   ├── name.py
│   │   └── run.py
├── main.py
├── Dockerfile
└── docker-compose.yaml
```

### Activities in Temporal

An activity in Temporal is a unit of work that can be executed independently. In our project, we define an activity to say hello in `internal/activity/name.py`.

```python
from temporalio import activity

@activity.defn
async def say_hello(name: str) -> str:
    return f"Hello {name}!"
```

### Workflows in Temporal

A workflow in Temporal orchestrates the execution of activities. We define a workflow to use our `say_hello` activity in `internal/worker/name.py`.

```python
from temporalio import workflow
from datetime import timedelta
from internal.activity.name import say_hello

@workflow.defn
class GreetingWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            say_hello, name, start_to_close_timeout=timedelta(seconds=120)
        )
```

### Worker to Execute Workflows

Temporal workers are responsible for polling the Temporal server for tasks and executing workflows and activities. We set up a worker in `internal/worker/run.py`.

```python
import asyncio
import concurrent.futures

from internal.activity.name import say_hello
from internal.worker.name import GreetingWorkflow
from temporalio.client import Client
from temporalio.worker import Worker

async def main() :
    client = await Client.connect('localhost:7233')

    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
        worker = Worker(client, task_queue='name-task-queue', workflows=[GreetingWorkflow], activities=[say_hello], activity_executor=executor)
        await worker.run()

if __name__ == "__main__":
    asyncio.run(main())
```

### FastAPI Application

We use FastAPI to expose our greeting service via HTTP endpoints. The main application is defined in `main.py`.

```python
import logging
from contextlib import asynccontextmanager
from pydantic import BaseModel
from fastapi import FastAPI
from temporalio.client import Client
from internal.worker.name import GreetingWorkflow
import uvicorn

log = logging.getLogger(__name__)

class NameRequest(BaseModel):
    name: str

@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.info("Setting up temporal client")
    app.state.temporal_client = await Client.connect('localhost:7233')
    yield

app = FastAPI(lifespan=lifespan)

@app.get('/', status_code=200, response_model=dict)
def root():
    return {"hello": "world"}

@app.post('/name', status_code=201, response_model=dict)
async def say_hello(request: NameRequest):
    result = await app.state.temporal_client.execute_workflow(
        GreetingWorkflow.run, request.name, id=f"name-workflow-{request.name}", task_queue='name-task-queue'
    )
    return {
        "result": result
    }

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, port=8000)
```

### Containerization with Docker

We'll use Docker to containerize our application. The `Dockerfile` defines the build process for both the FastAPI application and the Temporal worker.

```dockerfile
# Use an official Python runtime as a parent image
FROM python:3.11-slim as base

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
    
# Multi-stage build to separate FastAPI and Temporal worker
# FastAPI stage
FROM base as fastapi

# Expose the port that the FastAPI app runs on
EXPOSE 8000

# Command to run FastAPI application
CMD ["python", "main.py"]

# Temporal worker stage
FROM base as worker

# Command to run the Temporal worker
CMD ["python", "internal/worker/run.py"]
```

### Docker Compose for Orchestration

We use Docker Compose to define and run multi-container Docker applications. Our `docker-compose.yaml` file sets up the FastAPI app, the Temporal worker, and the Traefik reverse proxy.

```yaml
version: "3.8"

services:
  reverse-proxy:
    image: traefik:v3.0.2
    container_name: "traefik"
    command:
      - --api.insecure=true
      - --providers.docker=true
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.myresolver.acme.tlschallenge=true
      - --certificatesresolvers.myresolver.acme.email=cimomof752@cnurbano.com
      - --certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - ./letsencrypt:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - traefik-net

  fastapi:
    build:
      context: .
      dockerfile: Dockerfile
      target: fastapi
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.fastapi.rule=Host(`fastapi.localhost.com`)"
      - "traefik.http.routers.fastapi.entrypoints=websecure"
      - "traefik.http.routers.fastapi.tls.certresolver=myresolver"
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"
      - "traefik.http.routers.redirs.rule=hostregexp(`{host:.+}`)"
      - "traefik.http.routers.redirs.entrypoints=web"
      - "traefik.http.routers.redirs.middlewares=redirect-to-https"
    networks:
      - traefik-net

networks:
  traefik-net:
    external: true
```

### Running the Application with Traefik

1. **Start the Temporal Server**: Ensure that your Temporal server is running on `localhost:7233`.
2. **Build and Run the Containers**: Use Docker Compose to build and start the containers.
    ```sh
    docker-compose -f docker-compose.yaml up -d
    ```

### Running the Application in local
# Temporal Worker with FastAPI
create virtual environment
```bash
python -m venv .venv
source .venv/bin/activate
```

Install requirements
```bash
pip install -r requirements.txt
```
**NOTE: TEMPORAL SHOULD BE INSTALLED IN THE VIRTUAL ENVIRONMENT**

Run the temporal server in development mode
```bash
temporal server start-dev
```
[temporal UI](./TemporalUI.png)

Set Python Path and Run the Application

When running your scripts, make sure to set the `PYTHONPATH` so that Python can locate the `internal` module:

```bash
export PYTHONPATH=$(pwd)
```

Run the Temporal worker:

```bash
python internal/worker/run.py
```

Run the FastAPI application:

```bash
python main.py
```
[python UI](./FastAPI_Swagger.png)

### Test the API

Test the API using `curl` or any HTTP client like Postman:

```bash
curl -X POST "http://127.0.0.1:8000/name" -H "Content-Type: application/json" -d '{"name": "Suresh"}'
```

You should receive a response like:

```json
{
  "result": "Hello Suresh!"
}
```
[swagger test](./TestAPI.png)


Check the workflows in the Temporal UI \
http://localhost:8233/namespaces/default/workflows

[workflow](./WorkflowTest.png)
[overview](./Overflow.png)


Source Code: [https://github.com/azar-writes-code/fastapi-traefik-temporal-poc](https://github.com/azar-writes-code/fastapi-traefik-temporal-poc)

### Conclusion

In this post, we've built a greeting service using Temporal for workflow orchestration, FastAPI for exposing our service via HTTP endpoints, Docker for containerization, and Traefik for reverse proxy and load balancing. This setup provides a scalable, secure, and reliable way to handle complex workflows in a microservices architecture. The combination of these technologies makes it a powerful solution for building modern web services.