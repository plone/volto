SHELL := /bin/bash
CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))


# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

GIT_NAME = volto-quanta
NAMESPACE = @plone
RAZZLE_JEST_CONFIG = jest-addon.config.js

.PHONY: all
all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: test
test: ## Run unit test suite for the addon
	@echo "$(GREEN)==> Run unit test suite for the addon$(RESET)"
	docker run -it --rm -e NAMESPACE="$(NAMESPACE)" -e DEPENDENCIES="$(DEPENDENCIES)" -e GIT_NAME="$(GIT_NAME)" -v $(shell pwd):/opt/frontend/my-volto-project/src/addons/$(GIT_NAME) plone/volto-addon-ci bash -c "RAZZLE_JEST_CONFIG=$(RAZZLE_JEST_CONFIG) yarn test src/addons/$(GIT_NAME) --watchAll"

.PHONY: cypress
cypress: ## Run unit test suite for the addon
	@echo "$(GREEN)==> Run cypress for the addon$(RESET)"
	docker run -i --rm --link plone -e RAZZLE_API_PATH="http://plone:55001/plone" -e CYPRESS_BACKEND_HOST="plone" -e NAMESPACE="$(NAMESPACE)" -e DEPENDENCIES="$(DEPENDENCIES)" -e GIT_NAME="$(GIT_NAME)" -v $(shell pwd):/opt/frontend/my-volto-project/src/addons/$(GIT_NAME) plone/volto-addon-ci cypress

.PHONY: prettier
prettier: ## Run unit test suite for the addon
	@echo "$(GREEN)==> Run prettier for the addon$(RESET)"
	docker run -it --rm -e NAMESPACE="$(NAMESPACE)" -e DEPENDENCIES="$(DEPENDENCIES)" -e GIT_NAME="$(GIT_NAME)" -v $(shell pwd):/opt/frontend/my-volto-project/src/addons/$(GIT_NAME) plone/volto-addon-ci prettier

.PHONY: lint
lint: ## Run unit test suite for the addon
	@echo "$(GREEN)==> Run ESlint for the addon$(RESET)"
	docker run -it --rm -e NAMESPACE="$(NAMESPACE)" -e DEPENDENCIES="$(DEPENDENCIES)" -e GIT_NAME="$(GIT_NAME)" -v $(shell pwd):/opt/frontend/my-volto-project/src/addons/$(GIT_NAME) plone/volto-addon-ci eslint

.PHONY: stylelint
stylelint: ## Run unit test suite for the addon
	@echo "$(GREEN)==> Run stylelint for the addon$(RESET)"
	docker run -it --rm -e NAMESPACE="$(NAMESPACE)" -e DEPENDENCIES="$(DEPENDENCIES)" -e GIT_NAME="$(GIT_NAME)" -v $(shell pwd):/opt/frontend/my-volto-project/src/addons/$(GIT_NAME) plone/volto-addon-ci stylelint

.PHONY: test-acceptance-server
test-acceptance-server: ## Run test acceptance server
	docker run -i --rm --name=plone -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e SITE=plone -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.volto,kitconcept.volto.cors -e ADDONS='plone.app.robotframework plone.app.contenttypes plone.restapi kitconcept.volto' plone ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING
