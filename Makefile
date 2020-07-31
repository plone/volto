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

release:
	./node_modules/.bin/release-it

build:
	make build-backend
	make build-frontend

build-frontend:
	yarn && RAZZLE_API_PATH=http://localhost:55001/plone yarn build

.PHONY: Build Plone 5.2
build-backend:  ## Build Plone 5.2
	(cd api && python3 -m venv .)
	(cd api && bin/pip install --upgrade pip)
	(cd api && bin/pip install -r requirements.txt)
	(cd api && bin/buildout)

.PHONY: Build Plone 5.2 in specific port
build-backend-withport:  ## Build Plone 5.2 with port
	(cd api && python3 -m venv .)
	(cd api && bin/pip install --upgrade pip)
	(cd api && bin/pip install -r requirements.txt)
	(cd api && bin/buildout instance:http-address=$(INSTANCE_PORT))

dist:
	yarn
	yarn build

test:
	(cd api && bin/test)

docs-serve:
	(cd docs && ../bin/mkdocs serve)

docs-build:
	# The build in netlify breaks because they have not installed ensurepip
	# So we should continue using virtualenv
	virtualenv --python=python3 .
	./bin/pip install -r requirements-docs.txt
	(cd docs && ../bin/mkdocs build)

start-frontend: dist
	yarn start:prod

start-backend-docker:
	docker run -it --rm --name=plone -p 8080:8080 -e SITE=Plone -e ADDONS="kitconcept.volto" -e ZCML="kitconcept.volto.cors" plone

start-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml up -d

stop-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml down

test-acceptance-server:
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.volto,kitconcept.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.volto:default-homepage ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

test-acceptance-guillotina:
	docker-compose -f g-api/docker-compose.yml up > /dev/null

clean:
	(cd api && rm -rf bin eggs develop-eggs include lib parts .installed.cfg .mr.developer.cfg)
	rm -rf node_modules

.PHONY: start-backend
start-backend: ## Start Plone Backend
	@echo "$(GREEN)==> Start Plone Backend$(RESET)"
	(cd api && PYTHONWARNINGS=ignore bin/instance fg)

.PHONY: start-test-backend
start-test-backend: ## Start Test Plone Backend
	@echo "$(GREEN)==> Start Test Plone Backend$(RESET)"
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.volto,kitconcept.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.volto:default-homepage ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: start-test-frontend
start-test-frontend: ## Start Test Volto Frontend
	@echo "$(GREEN)==> Start Test Volto Frontend$(RESET)"
	RAZZLE_API_PATH=http://localhost:55001/plone yarn build && NODE_ENV=production node build/server.js

.PHONY: start-test
start-test: ## Start Test
	@echo "$(GREEN)==> Start Test$(RESET)"
	yarn cypress:open

.PHONY: start-test-all
start-test-all: ## Start Test
	@echo "$(GREEN)==> Start Test$(RESET)"
	yarn ci:cypress:run

.PHONY: all start test-acceptance
