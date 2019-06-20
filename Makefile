# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build:
	make build-backend
	make build-frontend

build-frontend:
	yarn && RAZZLE_API_PATH=http://localhost:55001/plone yarn build

.PHONY: Build Plone 5.2
build-backend:  ## Build Plone 5.2
	(cd api && virtualenv --clear --python=python3 .)
	(cd api && bin/pip install --upgrade pip)
	(cd api && bin/pip install -r requirements.txt)
	(cd api && bin/buildout -c plone-5.2.x.cfg)

dist:
	yarn
	yarn build

.PHONY: Build Plone 5.2
start-backend:  ## Install Plone 5.2
	(cd api && ./bin/instance fg)

test:
	(cd api && bin/test)

bin/pip:
	virtualenv --clear --python=python3 .
	bin/pip install -r requirements-docs.txt

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

stop-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml down

test-acceptance-server:
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.voltodemo,kitconcept.voltodemo.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.voltodemo:default ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

test-acceptance-guillotina:
	docker-compose -f g-api/docker-compose.yml up > /dev/null

clean:
	(cd api && rm -rf bin)
	rm -rf node_modules

.PHONY: all start test-acceptance
