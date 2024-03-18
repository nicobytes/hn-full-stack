start:
	docker compose up -d --build
	docker compose ps

build:
	docker compose build

up:
	docker compose up -d

check:
	docker compose ps

down:
	docker compose down

celery-up:
	docker compose up celery -d

celery-dev:
	docker compose up celery -d --build
	docker compose exec -it celery bash

webapp-up:
	docker compose up webapp -d --build

api-up:
	docker compose up api -d --build

postgres-up:
	docker compose up postgres adminer -d