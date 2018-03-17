all: build

dist:
	yarn
	yarn build

start: dist
	yarn start

start-api-docker:
	docker-compose -f api/docker-compose.yml up

clean-api-docker:
	docker-compose -f api/docker-compose.yml rm -vf

test-acceptance: dist api/bin/pybot
	PYTHONPATH=$$(pwd)/tests api/bin/pybot tests

api/bin/pybot:
	make -C api

.PHONY: all start test-acceptance
