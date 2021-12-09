# Volto development

### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# Project settings

INSTANCE_PORT=8080

# Recipe snippets for reuse

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`


# Top-level targets

.PHONY: all
all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: .SHELLFLAGS:=-eu -o pipefail -O inherit_errexit -c
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: release
release:
	./node_modules/.bin/release-it

.PHONY: build
build:
	make build-backend
	make build-frontend

.PHONY: build-frontend
build-frontend:
	yarn && RAZZLE_API_PATH=http://localhost:55001/plone yarn build

.PHONY: build-backend
build-backend:  ## Build Plone 5.2
	$(MAKE) -C "./api/" build

.PHONY: dist
dist:
	yarn
	yarn build

.PHONY: test
test:
	$(MAKE) -C "./api/" test

.PHONY: docs-serve
docs-serve:
	(cd docs && ../bin/mkdocs serve)

.PHONY: docs-build
docs-build:
# The build in netlify breaks because they have not installed ensurepip
# So we should continue using virtualenv
	virtualenv --python=python3 .
	./bin/pip install -r requirements-docs.txt
	(cd docs && ../bin/mkdocs build)
	yarn build-storybook -o docs/build/storybook

.PHONY: start
# Run both the back-end and the front end
start:
	$(MAKE) -j 2 start-backend start-frontend

.PHONY: start-frontend
start-frontend:
	yarn start

.PHONY: start-backend
start-backend: ## Start Plone Backend
	$(MAKE) -C "./api/" start

.PHONY: start-backend-docker
start-backend-docker:
	docker run -it --rm --name=plone -p 8080:8080 -e SITE=Plone -e ADDONS="plone.volto" -e ZCML="plone.volto.cors" plone

.PHONY: start-backend-docker-guillotina
start-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml up -d

.PHONY: start-test
start-test: ## Start Test
	@echo "$(GREEN)==> Start Test$(RESET)"
	yarn cypress:open

.PHONY: start-test-all
start-test-all: ## Start Test
	@echo "$(GREEN)==> Start Test$(RESET)"
	yarn ci:cypress:run

.PHONY: start-test-frontend
start-test-frontend: ## Start Test Volto Frontend
	@echo "$(GREEN)==> Start Test Volto Frontend$(RESET)"
	RAZZLE_API_PATH=http://localhost:55001/plone yarn build && NODE_ENV=production node build/server.js

.PHONY: start-test-backend
start-test-backend: ## Start Test Plone Backend
	$(MAKE) -C "./api/" start-test

.PHONY: stop-backend-docker-guillotina
stop-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml down

.PHONY: test-acceptance-server
test-acceptance-server:
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e VERSIONS="plone.restapi=8.16.2 plone.rest=2.0.0a1" -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors -e ADDONS='plone.app.robotframework plone.app.contenttypes plone.restapi plone.volto' plone ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: test-acceptance-server-multilingual
test-acceptance-server-multilingual:
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e VERSIONS="plone.restapi=8.16.2 plone.rest=2.0.0a1" -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:multilingual -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors -e ADDONS='plone.app.robotframework plone.app.contenttypes plone.restapi plone.volto' plone ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: test-acceptance-server-workingcopy
test-acceptance-server-workingcopy:
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e VERSIONS="plone.restapi=8.16.2 plone.app.iterate=4.0.2 plone.rest=2.0.0a1" -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors -e ADDONS='plone.app.robotframework plone.app.contenttypes plone.restapi plone.app.iterate plone.volto' plone ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING
	# ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.app.iterate,plone.volto,plone.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: test-acceptance-server-old
test-acceptance-server-old:
	$(MAKE) -C "./api/" test-acceptance-server-old

.PHONY: test-acceptance-guillotina
test-acceptance-guillotina:
	docker-compose -f g-api/docker-compose.yml up > /dev/null

.PHONY: clean
clean:
	$(MAKE) -C "./api/" clean
	rm -rf node_modules
