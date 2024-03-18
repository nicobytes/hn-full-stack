build:
	docker compose build

up:
	docker compose up -d

check:
	docker compose ps

down:
	docker compose down

celery-build:
	docker compose build celery

celery-up:
	docker compose up celery -d

celery-dev:
	docker compose up celery -d
	docker compose exec -it celery bash

webapp-build:
	docker compose build webapp

webapp-up:
	docker compose up webapp -d

api-build:
	docker compose build api

api-up:
	docker compose up api -d

postgres-up:
	docker compose up postgres adminer -d