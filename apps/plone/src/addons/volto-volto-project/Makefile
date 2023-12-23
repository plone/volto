# Yeoman Volto App development

### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-eu -o pipefail -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Recipe snippets for reuse

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

PLONE_VERSION=6
VOLTO_VERSION=17.0.0

ADDON_NAME='volto-volto-project'
ADDON_PATH='volto-volto-project'
COMPOSE_FILE=dockerfiles/docker-compose.yml
ACCEPTANCE_COMPOSE=acceptance/docker-compose.yml
CMD=CURRENT_DIR=${CURRENT_DIR} ADDON_NAME=${ADDON_NAME} ADDON_PATH=${ADDON_PATH} VOLTO_VERSION=${VOLTO_VERSION} PLONE_VERSION=${PLONE_VERSION} docker compose
DOCKER_COMPOSE=${CMD} -p ${ADDON_PATH} -f ${COMPOSE_FILE}
DEV_COMPOSE=COMPOSE_PROFILES=dev ${DOCKER_COMPOSE}
LIVE_COMPOSE=COMPOSE_PROFILES=dev ${DOCKER_COMPOSE}
ACCEPTANCE=${CMD} -p ${ADDON_PATH}-acceptance -f ${ACCEPTANCE_COMPOSE}

.PHONY: build-backend
build-backend: ## Build
	@echo "$(GREEN)==> Build Backend Container $(RESET)"
	${DEV_COMPOSE} build backend

.PHONY: start-backend
start-backend: ## Starts Docker backend
	@echo "$(GREEN)==> Start Docker-based Plone Backend $(RESET)"
	${DEV_COMPOSE} up backend -d

.PHONY: stop-backend
stop-backend: ## Stop Docker backend
	@echo "$(GREEN)==> Stop Docker-based Plone Backend $(RESET)"
	${DEV_COMPOSE} stop backend

.PHONY: build-live
build-live: ## Build Addon live
	@echo "$(GREEN)==> Build Addon development container $(RESET)"
	${LIVE_COMPOSE} build addon-live

.PHONY: build-addon
build-addon: ## Build Addon dev
	@echo "$(GREEN)==> Build Addon development container $(RESET)"
	${DEV_COMPOSE} build addon-dev

.PHONY: start-dev
start-dev: ## Starts Dev container
	@echo "$(GREEN)==> Start Addon Development container $(RESET)"
	${DEV_COMPOSE} up addon-dev

.PHONY: dev
dev: ## Develop the addon
	@echo "$(GREEN)==> Start Development Environment $(RESET)"
	make build-backend
	make start-backend
	make build-addon
	make start-dev

.PHONY: help
help:		## Show this help.
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"

## Setup the local environment
.PHONY: install
install: ## Install the local environment, Cypress, build acceptance containers
	yarn
	make install-acceptance

# Dev Helpers
.PHONY: i18n
i18n: ## Sync i18n
	@echo "$(YELLOW)==> Do not forget to setup the local environment (make install) $(RESET)"
	yarn i18n

.PHONY: format
format: ## Format codebase
	${DEV_COMPOSE} run --rm addon-dev lint:fix
	${DEV_COMPOSE} run --rm addon-dev prettier:fix
	${DEV_COMPOSE} run --rm addon-dev stylelint:fix

.PHONY: lint
lint: ## Lint Codebase
	${DEV_COMPOSE} run --rm addon-dev lint
	${DEV_COMPOSE} run --rm addon-dev prettier
	${DEV_COMPOSE} run --rm addon-dev stylelint --allow-empty-input

.PHONY: test
test: ## Run unit tests
	${DEV_COMPOSE} run --rm addon-dev test --watchAll

.PHONY: test-ci
test-ci: ## Run unit tests in CI
	${DEV_COMPOSE} run -e CI=1 addon-dev test

## Acceptance
.PHONY: install-acceptance
install-acceptance: ## Install Cypress, build acceptance containers
	(cd acceptance && yarn)
	${ACCEPTANCE} --profile dev --profile prod build

.PHONY: start-test-acceptance-server
start-test-acceptance-server: ## Start acceptance server (for use it in while developing)
	${ACCEPTANCE} --profile dev up

.PHONY: start-test-acceptance-server-prod
start-test-acceptance-server-prod: ## Start acceptance server in prod (used by CI)
	${ACCEPTANCE} --profile prod up -d

.PHONY: test-acceptance
test-acceptance: ## Start Cypress (for use it while developing)
	(cd acceptance && ./node_modules/.bin/cypress open)

.PHONY: test-acceptance-headless
test-acceptance-headless: ## Run cypress tests in CI
	(cd acceptance && ./node_modules/.bin/cypress run)

.PHONY: stop-test-acceptance-server
stop-test-acceptance-server: ## Stop acceptance server (for use it while finished developing)
	${ACCEPTANCE} --profile dev down

.PHONY: status-test-acceptance-server
status-test-acceptance-server: ## Status of Acceptance Server (for use it while developing)
	${ACCEPTANCE} ps

.PHONY: debug-frontend
debug-frontend:  ## Run bash in the Frontend container (for debug infrastructure purposes)
	${DEV_COMPOSE} run --entrypoint bash addon-dev

.PHONY: pull-backend-image
pull-backend-image:  ## Pulls and updates the backend image (for use it while developing)
	docker pull ghcr.io/voltovolto-project:latest

.PHONY: release
release:  ## Release a version of the add-on
	yarn release
