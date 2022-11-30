### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# Update the versions depending on your project requirements | Last Updated 2022-11-24
DOCKER_IMAGE=plone/plone-backend:6.0.0rc1
KGS=
TESTING_ADDONS=plone.app.robotframework==2.0.0b2 plone.app.testing==7.0.0b2
NODEBIN = ./node_modules/.bin

# Plone 5 legacy
DOCKER_IMAGE5=plone/plone-backend:5.2.9
KGS5=plone.restapi==8.32.2 plone.volto==4.0.0 plone.rest==2.0.0

# Project settings

DIR=$(shell basename $$(pwd))

# Recipe snippets for reuse

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`


# Top-level targets
.PHONY: all
all: project

.PHONY: help
help:		## Show this help.
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"

.PHONY: start-backend-docker
start-backend-docker:		## Starts a Docker-based backend
	@echo "$(GREEN)==> Start Docker-based Plone Backend$(RESET)"
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

.PHONY: install
install: ## Install the frontend
	@echo "Install frontend"
	$(MAKE) omelette
	$(MAKE) preinstall
	yarn install

.PHONY: preinstall
preinstall: ## Preinstall task, checks if missdev (mrs-developer) is present and runs it
	if [ -f $$(pwd)/mrs.developer.json ]; then make develop; fi

.PHONY: develop
develop: ## Runs missdev in the local project (mrs.developer.json should be present)
	npx -p mrs-developer missdev --config=jsconfig.json --output=addons --fetch-https

.PHONY: omelette
omelette: ## Creates the omelette folder that contains a link to the installed version of Volto (a softlink pointing to node_modules/@plone/volto)
	if [ ! -d omelette ]; then ln -sf node_modules/@plone/volto omelette; fi

.PHONY: patches
patches:
	/bin/bash patches/patchit.sh > /dev/null 2>&1 ||true

.PHONY: start-test-acceptance-server start-test-backend
start-test-acceptance-server start-test-backend : ## Start Test Plone Backend
	@echo "$(GREEN)==> Start Test Plone Backend$(RESET)"
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING
	## KGS in case you need a Plone 5.2 series (comment/remove above line):
	# docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS5) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE5) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: start-test-acceptance-frontend
start-test-acceptance-frontend: ## Start the Acceptance Frontend Fixture
	RAZZLE_API_PATH=http://localhost:55001/plone yarn build && yarn start:prod

.PHONY: test-acceptance
test-acceptance: ## Start Core Cypress Acceptance Tests
	$(NODEBIN)/cypress open

.PHONY: test-acceptance-headless
test-acceptance-headless: ## Start Core Cypress Acceptance Tests in headless mode
	$(NODEBIN)/cypress run

.PHONY: full-test-acceptance
full-test-acceptance: ## Runs Core Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server" http-get://localhost:55001/plone "make start-test-acceptance-frontend" http://localhost:3000 "make test-acceptance-headless"

.PHONY: test-acceptance
test-acceptance-addon: ## Start Core Cypress Acceptance Tests for an addon
	$(NODEBIN)/cypress open -P $(ADDONPATH)

.PHONY: test-acceptance-headless
test-acceptance-addon-headless: ## Start Core Cypress Acceptance Tests for an addon in headless mode
	$(NODEBIN)/cypress run -P $(ADDONPATH)

.PHONY: full-test-acceptance-addon
full-test-acceptance-addon: ## Runs Core Full Acceptance Testing for an addon in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server" http-get://localhost:55001/plone "make start-test-acceptance-frontend" http://localhost:3000 "make test-acceptance-addon-headless"
