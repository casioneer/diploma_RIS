.PHONY: b
b:
	docker compose -f ./docker-compose.dev.yml up --build

.PHONY: cu
cu:
	docker compose -f ./docker-compose.dev.yml up

.PHONY: release-build
release-build:
	docker compose -f ./docker-compose.yml up --build

.PHONY: release-up:
release-up:
	docker compose -f ./docker-compose.yml up