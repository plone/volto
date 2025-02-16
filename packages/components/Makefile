SHELL := /bin/bash
CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))


# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

DOCKER_IMAGE=plone/plone-backend:6.0.1
TESTING_ADDONS=plone.app.robotframework==2.0.0 plone.app.testing==7.0.0

.PHONY: all
all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: start-test-acceptance-server
start-test-acceptance-server: ## Start Test Acceptance Server Main Fixture (docker container)
	docker run -i --rm -d -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: build-storybook
build-storybook: ## Build Storybook
	yarn && yarn build-storybook
