# Volto development

### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-eu -o pipefail -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# Project settings (read from repo root)
include ../../variables.mk

# Allow setting the language for backend-docker-start. Default is `en`.
LANGUAGE ?=en

# Recipe snippets for reuse

CHECKOUT_BASENAME="$(shell basename $(shell realpath ./))"
CHECKOUT_BRANCH=$(shell git branch --show-current)
CHECKOUT_TMP=../$(CHECKOUT_BASENAME).tmp
CHECKOUT_TMP_ABS="$(shell realpath $(CHECKOUT_TMP))"

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`


# Top-level targets

.PHONY: all
all: help

# Add the following 'help' target to your Makefile
# and add help text after each target name starting with ' ##'
# to return a pretty list of targets and their descriptions.
.PHONY: help
help: ## This help message
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"

.PHONY: start
start: ## Starts Volto, allowing reloading of the add-on during development
	pnpm start

.PHONY: build
build: ## Build a production bundle for distribution
	pnpm i && RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build

.PHONY: test
test: ## Run unit tests
	pnpm test

.PHONY: clean
clean: ## Clean development environment
	rm -rf node_modules

.PHONY: install
install: ## Set up development environment
	# Setup ESlint for VSCode
	node packages/scripts/vscodesettings.js
	pnpm i
	make build-deps

##### Build

.PHONY: cypress-install
cypress-install: ## Install Cypress for acceptance tests
	$(NODEBIN)/cypress install

../registry/dist: ../registry/src
	(cd ../../ && pnpm build:registry)

../components/dist: ../components/src
	(cd ../../ && pnpm build:components)

.PHONY: build-deps
build-deps: ../registry/dist ## Build dependencies

## Storybook

.PHONY: storybook-start
storybook-start: ## Start Storybook server on port 6006
	@echo "$(GREEN)==> Start Storybook$(RESET)"
	pnpm run storybook

.PHONY: storybook-build
storybook-build: build-deps ## Build Storybook
	pnpm build-storybook -o ../../docs/_build/html/storybook

##### Release (it runs the one inside)

.PHONY: release-notes-copy-to-docs
release-notes-copy-to-docs: ## Copy release notes into documentation
	cp CHANGELOG.md ../../docs/source/release-notes/index.md
	git add ../../docs/source/release-notes/index.md

##### Docker containers

.PHONY: backend-docker-start
backend-docker-start: ## Starts a Docker-based backend for development
	docker run -it --rm --name=backend -p 8080:8080 -v volto-backend-data:/data -e SITE=Plone -e ADDONS='$(KGS)' -e LANGUAGE='$(LANGUAGE)' $(DOCKER_IMAGE)

.PHONY: frontend-docker-start
frontend-docker-start: ## Starts a Docker-based frontend for development
	docker run -it --rm --name=volto --link backend -p 3000:3000 -e RAZZLE_INTERNAL_API_PATH=http://backend:8080/Plone -e RAZZLE_DEV_PROXY_API_PATH=http://backend:8080/Plone plone/plone-frontend:latest

##### Acceptance tests (Cypress)
######### Dev mode Acceptance tests

.PHONY: acceptance-frontend-dev-start
acceptance-frontend-dev-start: ## Start acceptance frontend in development mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm start

######### Core Acceptance tests

.PHONY: acceptance-backend-start
acceptance-backend-start: ## Start backend acceptance server
	#docker run -it --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)
	# Uncomment next line and comment line above to use a custom image with the acceptance server (in case you need to use an specific backend add-on or version)
	docker run -it --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: ci-acceptance-backend-start
ci-acceptance-backend-start: ## Start backend acceptance server in headless mode for CI
	#docker run -i --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)
	# Uncomment next line and comment line above to use a custom image with the acceptance server (in case you need to use an specific backend add-on or version)
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: acceptance-frontend-prod-start
acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: acceptance-test
acceptance-test: ## Start Cypress in interactive mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open

.PHONY: ci-acceptance-test
ci-acceptance-test: ## Run cypress tests in headless mode for CI
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/core/**/*.{js,jsx,ts,tsx}'

.PHONY: ci-acceptance-test-run-all
ci-acceptance-test-run-all: ## With a single command, start both the acceptance frontend and backend acceptance server, and run Cypress tests in headless mode
	$(NODEBIN)/start-test "make ci-acceptance-backend-start" http-get://127.0.0.1:55001/plone "make acceptance-frontend-prod-start" http://127.0.0.1:3000 "make ci-acceptance-test"

######### Deployment Core Acceptance tests

.PHONY: deployment-acceptance-frontend-prod-start
deployment-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for deployment
	pnpm build && pnpm start:prod

.PHONY: deployment-acceptance-test
deployment-acceptance-test: ## Start Cypress in interactive mode for tests in deployment
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config baseUrl='http://localhost'

.PHONY: deployment-acceptance-web-server-start
deployment-acceptance-web-server-start: ## Start the reverse proxy (Traefik) in port 80 for deployment
	cd cypress/docker && docker compose -f seamless.yml up

.PHONY: deployment-ci-acceptance-test-run-all
deployment-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for deployment tests
	$(NODEBIN)/start-test "make acceptance-backend-start" http-get://127.0.0.1:55001/plone "make deployment-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make ci-acceptance-test"

######### Project Acceptance tests

.PHONY: project-acceptance-frontend-prod-start
project-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for project tests
	(cd ../../my-volto-app && RAZZLE_API_PATH=http://127.0.0.1:55001/plone yarn build && yarn start:prod)

######### Core Sandbox Acceptance tests

.PHONY: coresandbox-acceptance-backend-start
coresandbox-acceptance-backend-start: ## Start backend acceptance server for core sandbox tests
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage,plone.volto:coresandbox -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors,plone.volto.coresandbox $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: coresandbox-acceptance-frontend-prod-start
coresandbox-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for core sandbox tests
	ADDONS=@plone/volto-coresandbox RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: coresandbox-acceptance-frontend-dev-start
coresandbox-acceptance-frontend-dev-start: build-deps ## Start acceptance frontend in development mode for core sandbox tests
	ADDONS=@plone/volto-coresandbox RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm start

.PHONY: coresandbox-acceptance-test
coresandbox-acceptance-test: ## Start Cypress in interactive mode for core sandbox tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/coresandbox/**/*.{js,jsx,ts,tsx}'

.PHONY: coresandbox-ci-acceptance-test
coresandbox-ci-acceptance-test: ## Run Cypress tests in headless mode for CI for core sandbox tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/coresandbox/**/*.{js,jsx,ts,tsx}'

.PHONY: coresandbox-ci-acceptance-test-run-all
coresandbox-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for core sandbox tests
	$(NODEBIN)/start-test "make coresandbox-acceptance-backend-start" http-get://127.0.0.1:55001/plone "make coresandbox-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make coresandbox-ci-acceptance-test"

######### Multilingual Acceptance tests

.PHONY: multilingual-acceptance-backend-start
multilingual-acceptance-backend-start: ## Start backend acceptance server for multilingual tests
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:multilingual $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: multilingual-acceptance-frontend-prod-start
multilingual-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for multilingual tests
	ADDONS=@plone/volto-coresandbox:multilingualFixture RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: multilingual-acceptance-test
multilingual-acceptance-test: ## Start Cypress in interactive mode for multilingual tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: multilingual-ci-acceptance-test
multilingual-ci-acceptance-test: ## Run Cypress tests in headless mode for CI for multilingual tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: multilingual-ci-acceptance-test-run-all
multilingual-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for multilingual tests
	$(NODEBIN)/start-test "make multilingual-acceptance-backend-start" http-get://127.0.0.1:55001/plone "make multilingual-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make multilingual-ci-acceptance-test"

######### Deployment Multilingual Acceptance tests

.PHONY: deployment-multilingual-acceptance-backend-start
deployment-multilingual-acceptance-backend-start: ## Start backend acceptance server for multilingual tests for deployment
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:multilingual $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: deployment-multilingual-acceptance-frontend-prod-start
deployment-multilingual-acceptance-frontend-prod-start: build-deps ##Start acceptance frontend in production mode for multilingual tests for deployment
	ADDONS=@plone/volto-coresandbox:multilingualFixture pnpm build && pnpm start:prod

.PHONY: deployment-multilingual-acceptance-test
deployment-multilingual-acceptance-test: ## Start Cypress in interactive mode for multilingual tests for deployment
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config baseUrl='http://localhost',specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: deployment-multilingual-ci-acceptance-test
deployment-multilingual-ci-acceptance-test: ## Run Cypress tests in headless mode for CI for multilingual tests for deployment
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: deployment-multilingual-ci-acceptance-test-run-all
deployment-multilingual-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for multilingual tests for deployment
	$(NODEBIN)/start-test "make deployment-multilingual-acceptance-backend-start" http-get://127.0.0.1:55001/plone "make deployment-multilingual-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make deployment-multilingual-ci-acceptance-test"

######### Working Copy Acceptance tests

.PHONY: working-copy-acceptance-backend-start
working-copy-acceptance-backend-start: ## Start backend acceptance server for working copy tests
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: working-copy-acceptance-frontend-prod-start
working-copy-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for working copy tests
	ADDONS=@plone/volto-coresandbox:workingCopyFixture RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: working-copy-acceptance-test
working-copy-acceptance-test: ## Start Cypress in interactive mode for working copy tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/workingCopy/**/*.{js,jsx,ts,tsx}'

.PHONY: working-copy-ci-acceptance-test
working-copy-ci-acceptance-test: ## Run Cypress tests in headless mode for CI for working copy tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/workingCopy/**/*.{js,jsx,ts,tsx}'

.PHONY: working-copy-ci-acceptance-test-run-all
working-copy-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for working copy tests
	$(NODEBIN)/start-test "make working-copy-acceptance-backend-start" http-get://127.0.0.1:55001/plone "make working-copy-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make working-copy-ci-acceptance-test"

######### Guillotina Acceptance tests

.PHONY: guillotina-acceptance-backend-start
guillotina-acceptance-backend-start: ## Start backend acceptance server for Guillotina tests
	docker-compose -f g-api/docker-compose.yml up > /dev/null

.PHONY: guillotina-acceptance-frontend-prod-start
guillotina-acceptance-frontend-prod-start: ## Start acceptance frontend in production mode for Guillotina tests
	ADDONS=volto-guillotina RAZZLE_API_PATH=http://127.0.0.1:8081/db/web RAZZLE_LEGACY_TRAVERSE=true pnpm build && pnpm start:prod

.PHONY: guillotina-acceptance-test
guillotina-acceptance-test: ## Start Cypress in interactive mode for Guillotina tests
	NODE_ENV=production CYPRESS_API=guillotina $(NODEBIN)/cypress open --config specPattern='cypress/tests/guillotina/**/*.{js,jsx,ts,tsx}'

.PHONY: guillotina-ci-acceptance-test
guillotina-ci-acceptance-test: ## Run Cypress tests in headless mode for CI for Guillotina tests
	NODE_ENV=production CYPRESS_API=guillotina $(NODEBIN)/cypress run --config specPattern='cypress/tests/guillotina/**/*.{js,jsx,ts,tsx}'

.PHONY: guillotina-ci-acceptance-test-run-all
guillotina-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for Guillotina tests
	$(NODEBIN)/start-test "make guillotina-acceptance-backend-start" http-get://127.0.0.1:8081 "make guillotina-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make guillotina-ci-acceptance-test"

######### Plone 5 Acceptance tests

.PHONY: plone5-acceptance-backend-start
plone5-acceptance-backend-start: ## Start backend acceptance server for Plone 5 tests
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS5) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE5) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING
