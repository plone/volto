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

# Recipe snippets for reuse

CHECKOUT_BASENAME=$(shell basename $(shell realpath ./))
CHECKOUT_BRANCH=$(shell git branch --show-current)
CHECKOUT_TMP=../$(CHECKOUT_BASENAME).tmp
CHECKOUT_TMP_ABS=$(shell realpath $(CHECKOUT_TMP))

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

# TODO: Review release commands for all packages
# Use TurboRepo

.PHONY: build
build:
	pnpm i && RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build

.PHONY: clean
clean:
	rm -rf node_modules

##### Build
.PHONY: patches
patches:
	/bin/bash patches/patchit.sh > /dev/null 2>&1 ||true

.PHONY: cypress-install
cypress-install:
	$(NODEBIN)/cypress install

.PHONY: build-deps
build-deps:
	@if [ ! -d $$(pwd)/../registry/dist ] || [ $$(find $$(pwd)/../registry -newer $$(pwd)/../registry/dist -print -quit) ]; then \
		(cd ../../ && pnpm build:deps); \
	fi

## Storybook
.PHONY: storybook-start
storybook-start: ## Start Storybook server on port 6006
	@echo "$(GREEN)==> Start Storybook$(RESET)"
	pnpm run storybook

.PHONY: storybook-build
storybook-build: build-deps ## Build Storybook
	pnpm build-storybook -o ../../docs/_build/html/storybook

##### Release (it runs the one inside)

.PHONY: copyreleasenotestodocs
copyreleasenotestodocs:
	cp CHANGELOG.md ../../docs/source/release-notes/index.md
	git add ../../docs/source/release-notes/index.md

##### Docker containers

.PHONY: backend-docker-start
backend-docker-start:
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

.PHONY: frontend-docker-start
frontend-docker-start:
	docker run -it --rm --name=volto --link backend -p 3000:3000 -e RAZZLE_INTERNAL_API_PATH=http://backend:8080/Plone -e RAZZLE_DEV_PROXY_API_PATH=http://backend:8080/Plone plone/plone-frontend:latest

.PHONY: guillotina-acceptance-backend-start
guillotina-acceptance-backend-start:
	docker-compose -f ../../g-api/docker-compose.yml up -d

.PHONY: guillotina-acceptance-backend-stop
guillotina-acceptance-backend-stop:
	docker-compose -f ../../g-api/docker-compose.yml down

##### Acceptance tests (Cypress)
######### Dev mode Acceptance tests

.PHONY: acceptance-frontend-dev-start
acceptance-frontend-dev-start: ## Start acceptance frontend in development mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm start

######### Core Acceptance tests

.PHONY: acceptance-backend-start
acceptance-backend-start: ## Start backend acceptance server
	docker run -it --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)
	# Uncomment next line and comment line above to use a custom image with the acceptance server (in case you need to use an specific backend add-on or version)
	# docker run -it --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: ci-acceptance-backend-start
ci-acceptance-backend-start: ## Start backend acceptance server in headless mode for CI
	docker run -i --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)
	# Uncomment next line and comment line above to use a custom image with the acceptance server (in case you need to use an specific backend add-on or version)
	# docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: acceptance-frontend-prod-start
acceptance-frontend-prod-start: ## Start acceptance frontend in production mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: acceptance-test
acceptance-test: ## Start Cypress in interactive mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open

.PHONY: ci-acceptance-test
ci-acceptance-test: ## Run cypress tests in headless mode for CI
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/core/**/*.{js,jsx,ts,tsx}'

.PHONY: ci-acceptance-test-run-all
ci-acceptance-test-runall: ## Run in one command the backend, frontend and the cypress tests in headless mode for CI
	$(NODEBIN)/start-test "make ci-acceptance-backend-start" http-get://127.0.0.1:55001/plone "make acceptance-frontend-prod-start" http://127.0.0.1:3000 "make ci-acceptance-test"

######### Seamless Core Acceptance tests

.PHONY: seamless-acceptance-frontend-prod-start
seamless-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for Seamless tests
	pnpm build && pnpm start:prod

.PHONY: seamless-acceptance-test
seamless-acceptance-test: ## Start Cypress in interactive mode for Seamless tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config baseUrl='http://localhost'

.PHONY: seamless-acceptance-webserver-start
seamless-acceptance-webserver-start: ## Start the Seamless reverse proxy (traefik) in port 80
	cd cypress/docker && docker-compose -f seamless.yml up

.PHONY: seamless-ci-acceptance-test-runall
seamless-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for Seamless tests
	$(NODEBIN)/start-test "make acceptance-backend-start" http-get://127.0.0.1:55001/plone "make seamless-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make ci-acceptance-test"

######### Project Acceptance tests

.PHONY: project-acceptance-frontend-prod-start
project-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for Project tests
	(cd ../../my-volto-app && RAZZLE_API_PATH=http://127.0.0.1:55001/plone yarn build && yarn start:prod)

######### CoreSandbox Acceptance tests

.PHONY: coresandbox-acceptance-backend-start
coresandbox-acceptance-backend-start: ## Start backend acceptance server for CoreSandbox tests
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage,plone.volto:coresandbox -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors,plone.volto.coresandbox $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: coresandbox-acceptance-frontend-prod-start
coresandbox-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for Coresandbox tests
	ADDONS=@plone/volto-coresandbox RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: coresandbox-acceptance-frontend-dev-start
coresandbox-acceptance-frontend-dev-start: build-deps ## Start acceptance frontend in development mode for Coresandbox tests
	ADDONS=@plone/volto-coresandbox RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm start

.PHONY: coresandbox-acceptance-test
coresandbox-acceptance-test: ## Start Cypress in interactive mode for CoreSandbox tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/coresandbox/**/*.{js,jsx,ts,tsx}'

.PHONY: coresandbox-ci-acceptance-test
coresandbox-ci-acceptance-test: ## Run cypress tests in headless mode for CI for CoreSandbox tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/coresandbox/**/*.{js,jsx,ts,tsx}'

.PHONY: coresandbox-ci-acceptance-test-runall
coresandbox-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for CoreSandbox tests
	$(NODEBIN)/start-test "make coresandbox-acceptance-backend-start" http-get://127.0.0.1:55001/plone "make coresandbox-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make coresandbox-ci-acceptance-test"

######### Multilingual Acceptance tests

.PHONY: multilingual-acceptance-backend-start
multilingual-acceptance-backend-start: ## Start backend acceptance server for Multilingual tests
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:multilingual $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: multilingual-acceptance-frontend-prod-start
multilingual-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for Multilingual tests
	ADDONS=@plone/volto-coresandbox:multilingualFixture RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: multilingual-acceptance-test
multilingual-acceptance-test: ## Start Cypress in interactive mode for Multilingual tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: multilingual-ci-acceptance-test
multilingual-ci-acceptance-test: ## Run cypress tests in headless mode for CI for Multilingual tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: multilingual-ci-acceptance-test-runall
multilingual-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for Multilingual tests
	$(NODEBIN)/start-test "make multilingual-acceptance-backend-start" http-get://127.0.0.1:55001/plone "make multilingual-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make multilingual-ci-acceptance-test"

######### Seamless Multilingual Acceptance tests

.PHONY: seamless-multilingual-acceptance-backend-start
seamless-multilingual-acceptance-backend-start: ## Start backend acceptance server for Seamless Multilingual tests
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:multilingual $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: seamless-multilingual-acceptance-frontend-prod-start
seamless-multilingual-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for Seamless Multilingual tests
	ADDONS=@plone/volto-coresandbox:multilingualFixture pnpm build && pnpm start:prod

.PHONY: seamless-multilingual-acceptance-test
seamless-multilingual-acceptance-test: ## Start Cypress in interactive mode for Seamless Multilingual tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config baseUrl='http://localhost',specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: seamless-multilingual-ci-acceptance-test
seamless-multilingual-ci-acceptance-test: ## Run cypress tests in headless mode for CI for Seamless Multilingual tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: seamless-multilingual-ci-acceptance-test-runall
seamless-multilingual-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for Seamless Multilingual tests
	$(NODEBIN)/start-test "make seamless-multilingual-acceptance-backend-start" http-get://127.0.0.1:55001/plone "make seamless-multilingual-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make seamless-multilingual-ci-acceptance-test"

######### WorkingCopy Acceptance tests

.PHONY: workingcopy-acceptance-backend-start
workingcopy-acceptance-backend-start: ## Start backend acceptance server for WorkingCopy tests
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: workingcopy-acceptance-frontend-prod-start
workingcopy-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for WorkingCopy tests
	ADDONS=@plone/volto-coresandbox:workingCopyFixture RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: workingcopy-acceptance-test
workingcopy-acceptance-test: ## Start Cypress in interactive mode for WorkingCopy tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/workingCopy/**/*.{js,jsx,ts,tsx}'

.PHONY: workingcopy-ci-acceptance-test
workingcopy-ci-acceptance-test: ## Run cypress tests in headless mode for CI for WorkingCopy tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/workingCopy/**/*.{js,jsx,ts,tsx}'

.PHONY: workingcopy-ci-acceptance-test-runall
workingcopy-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for WorkingCopy tests
	$(NODEBIN)/start-test "make workingcopy-acceptance-backend-start" http-get://127.0.0.1:55001/plone "make workingcopy-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make workingcopy-ci-acceptance-test"

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
guillotina-ci-acceptance-test: ## Run cypress tests in headless mode for CI for Guillotina tests
	NODE_ENV=production CYPRESS_API=guillotina $(NODEBIN)/cypress run --config specPattern='cypress/tests/guillotina/**/*.{js,jsx,ts,tsx}'

.PHONY: guillotina-ci-acceptance-test-runall
guillotina-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for Guillotina tests
	$(NODEBIN)/start-test "make guillotina-acceptance-backend-start" http-get://127.0.0.1:8081 "make guillotina-acceptance-frontend-prod-start" http://127.0.0.1:3000 "make guillotina-ci-acceptance-test"

######### Plone 5 Acceptance tests

.PHONY: plone5-acceptance-backend-start
plone5-acceptance-backend-start: ## Start backend acceptance server for Plone 5 tests
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS5) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE5) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING
