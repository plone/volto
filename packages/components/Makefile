# Project settings
include ../../variables.mk

CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

DOCKER_IMAGE=plone/plone-backend:6.0.1
TESTING_ADDONS=plone.app.robotframework==2.0.0 plone.app.testing==7.0.0

.PHONY: all
all: help

.PHONY: help
help: ## This help message
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/$(CYAN)\1$(RESET):\2/' | column -c2 -t -s :)"

.PHONY: install
install: ## Install dependencies
	pnpm install

.PHONY: build
build: ## Build the package
	pnpm run build

.PHONY: storybook-start
storybook-start: ## Start Storybook
	pnpm run storybook

.PHONY: storybook-build
storybook-build: ## Build Storybook
	pnpm run build-storybook

.PHONY: start-test-acceptance-server
start-test-acceptance-server: ## Start Test Acceptance Server Main Fixture (docker container)
	docker run -i --rm -d -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING
