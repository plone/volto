
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

docs-serve:
	(cd docs && ../bin/mkdocs serve)

docs-build: bin/pip
	(cd docs && ../bin/mkdocs build)

start-frontend: dist
	yarn start:prod

start-api-docker:
	docker-compose -f api/docker-compose.yml up

start-backend-docker:
	docker run --rm -it -p 8080:8080 kitconcept/plone.restapi:latest

start-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml up -d

test-acceptance-server:
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.voltodemo,kitconcept.voltodemo.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.voltodemo:default ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

test-acceptance-guillotina:
	PYTHONPATH=$(pwd)/tests pybot -v BROWSER:headlesschrome -v API:Guillotina tests;

.PHONY: all start test-acceptance
