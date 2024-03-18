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

## Populating the database

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

The API was create using NestJS, and once an hour the app to connect to this API (https://hn.algolia.com/api/v1/search_by_date?query=nodejs) using [Task Scheduling](https://docs.nestjs.com/techniques/task-scheduling) by NestJS and get the news and save it in the database.

The swagger documentation is available at the following endpoint:

```bash
[GET] http://localhost:3001/docs
```

![image](/images/full_stack_docs.jpg)


## Frontend WebApp - NextJS/React

The frontend was built using Tailwindcss, NextJS and React, and connects to the backend API to retrieve the news and display it in the web application. At this point, I used [React](https://tanstack.com/query/v3/) Query to manage the state of the application and make the requests to the backend API with great performance.

To dockerize a NextJS, I used the multi-stage build to build the application and serve it using NodeJS.

<details>
<summary>Click to view</summary>

```
FROM node:20 AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD node server.js
```

</details>


## Database - PostgreSQL 

The database was created using PostgreSQL and the migrations are performed by TypeORM, and the database is populated with the news from the Hacker News API. If is necessary to run the migrations manually, you can run the following command:

```bash
docker compose exec -it api npm run migrations:run

#or

make migrations
```

But the migrations are performed automatically when the service starts. Also using adminer, you can access the database and see the tables and data in localhost:8080.

![image](/images/full_stack_adminer.jpg)

Here data access to postgres:

```bash
POSTGRES_DB=news
POSTGRES_USER=admin_nico
POSTGRES_PASSWORD=2am3d24in&!
POSTGRES_HOST=postgres
POSTGRES_PORT=postgres

# OR
POSTGRES_URL=postgres://admin_nico:2am3d24in&!@postgres:5432/news
```

### Tasks

- [x] If "story_title" is null, then use "title". If both are null, discard.
- [x] Clicking on a row should open "story_url" or "url" on new tab accordingly.
- [x] The trash button should remove the item from the list, the removed item should not appear the app is restarted.
- [x] The client should render a web page that lists the articles in chronological order.
- [x] Once an hour, the server app should connect to this API which shows recently posted articles about Node.js on Hacker News
- [x] The server app should insert the data from the API into a database
- [x] The server app should define a REST API which the client will use to retrieve the data.
- [x] The user should be able to view a web page which shows the most recent posts in date order (newer first).
- [x] Relative format using DayJS
- [x] The server component should be coded in TypeScript.
- [x] At least 30% test coverage (statements) for the server component.
- [x] The whole project has to be uploaded to GitHub.
- [x] Both artifacts (server and client) must be Dockerized.
- [x] To start the project there should be a docker-compose that uses both images and the database image.
- [x] The repository should be only one (monorepo), for both server and client.
- [x] Include a README which explains anything we need to do to run the demo app, for example: setting up a database, forcing a data refresh to populate the DB for the first time, etc.
- [x] Extra: The client should be compiled in a Docker multi-stage build.
- [x] Extra: Tests and linters should run on GitHub actions.

- as
