.PHONY: b
b:
	Docker compose -f .\docker-compose.dev.yml up --build

.PHONY: cu
cu:
	Docker compose -f .\docker-compose.dev.yml up

.PHONY: release-build
release-build:
	Docker compose -f .\docker-compose.yml up --build

.PHONY: release-up:
release-up:
	Docker compose -f .\docker-compose.yml up