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
	(cd api && PYTHONWARNINGS=ignore ./bin/instance fg)

test:
	(cd api && bin/test)

docs-serve:
	(cd docs && ../bin/mkdocs serve)

docs-build: bin/pip
	(cd docs && ../bin/mkdocs build)

start-frontend: dist
	yarn start:prod

start-backend-docker:
	docker run --rm -it -p 8080:8080 kitconcept/plone.restapi:latest

start-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml up -d

test-acceptance:
	PYTHONPATH=$(pwd)/tests ZSERVER_PORT=55001 api/bin/pybot -v API:Plone -v BROWSER:headlesschrome tests

test-acceptance-guillotina:
	PYTHONPATH=$(pwd)/tests pybot -v BROWSER:headlesschrome -v API:Guillotina tests;

.PHONY: all start test-acceptance
