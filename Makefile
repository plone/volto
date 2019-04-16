all: build

dist:
	yarn
	yarn build

build-frontend:
	yarn && RAZZLE_API_PATH=http://localhost:55001/plone yarn build

.PHONY: Build Plone 5.2
build-backend:  ## Build Plone 5.2
	(cd api && virtualenv --clear --python=python3 .)
	(cd api && bin/pip install --upgrade pip)
	(cd api && bin/pip install -r requirements.txt)
	(cd api && bin/buildout -c plone-5.2.x.cfg)

.PHONY: Build Plone 5.2
start-backend:  ## Install Plone 5.2
	(cd api && ./bin/instance fg)

test:
	(cd api && bin/test)

test-acceptance:
	(cd api && ZSERVER_PORT=55001 bin/pybot -v API:Plone ../tests)

docs-serve:
	(cd docs && ../bin/mkdocs serve)

docs-build: bin/pip
	(cd docs && ../bin/mkdocs build)

start: dist
	yarn start:prod

start-backend-docker:
	docker run --rm -it -p 8080:8080 kitconcept/plone.restapi:latest

clean-api-docker:
	docker-compose -f api/docker-compose.yml rm -vf

# test-acceptance: dist api/bin/pybot
# 	PYTHONPATH=$$(pwd)/tests api/bin/pybot tests

test-acceptance-start-backend:
	docker-compose -f api/docker-compose.yml up

test-acceptance-start-frontend:
	yarn && yarn build && RAZZLE_API_PATH=http://localhost:55001/plone yarn start:prod

test-acceptance-build:
	api/bin/pip install -r api/requirements-robot-framework.txt

api/bin/pybot:
	make -C api

.PHONY: all start test-acceptance
