![image](/images/cover.jpg)

## Running the project

Using docker-compose to run the project
```bash
docker compose up -d --build
docker compose ps
```

Or using the Makefile
```bash
make start
```

## Populate the database

As part of the project, when the NestJS service starts, it will perform the migrations and make the first request to get news automatically, but if you want to run the process to get news and populate the database, you can run the following endpoint:

```bash
[GET] http://localhost:3001/api/v1/tasks/news
```

Or run the following command in a terminal

```bash
curl --location 'http://localhost:3001/api/v1/tasks/news'
```

## Services

![image](/images/services.png)

- localhost:3001 => Backend API - NestJS
- localhost:3000 => Frontend WebApp - NextJS/React
- localhost:5432 => Database - PostgreSQL 

## Backend API - NestJS

## Frontend WebApp - NextJS/React

## Database - PostgreSQL 