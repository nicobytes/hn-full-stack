![image](/images/cover.jpg)

# Running the project

Using docker-compose to run the project
```bash
docker compose up -d --build
docker compose ps
```

Or using the Makefile
```bash
make start
```

# Services

![image](/images/services.png)

- localhost:3001 => Backend API - NestJS
- localhost:3000 => Frontend WebApp - NextJS/React
- localhost:5432 => Database - PostgreSQL 
