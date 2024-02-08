### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules
IMAGE_NAME=ghcr.io/ellizurigo/plone-conference-website-2070-frontend
IMAGE_TAG=latest

NODEBIN = ./node_modules/.bin

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: clean
clean: ## Clean installation
	@echo "Clean installation"
	rm -Rf node_modules

.PHONY: build
build: install ## Build the frontend
	@echo "Build Frontend"
	yarn build

.PHONY: start
start: ## Start Frontend
	yarn start

.PHONY: format-prettier
format-prettier: ## Format Code with Prettier
	yarn run prettier:fix

.PHONY: format-stylelint
format-stylelint: ## Format Code with Stylelint
	yarn run stylelint:fix

.PHONY: format-lint
format-lint: ## Format Code with Lint
	yarn run lint:fix

.PHONY: format
format: format-prettier format-lint format-stylelint ## Format the codebase according to our standards

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
	if [ -f $$(pwd)/tsconfig.json ]; then npx -p mrs-developer missdev --config=tsconfig.json --output=addons --fetch-https; else  npx -p mrs-developer missdev --config=jsconfig.json --output=addons --fetch-https;fi

.PHONY: omelette
omelette: ## Creates the omelette folder that contains a link to the installed version of Volto (a softlink pointing to node_modules/@plone/volto)
	if [ ! -d omelette ]; then ln -sf node_modules/@plone/volto omelette; fi

.PHONY: patches
patches:
	/bin/bash patches/patchit.sh > /dev/null 2>&1 ||true

.PHONY: i18n
i18n: ## Sync i18n
	yarn i18n

.PHONY: i18n-ci
i18n-ci: ## Check if i18n is not synced
	yarn i18n && git diff -G'^[^\"POT]' --exit-code


.PHONY: test
test: ## Run tests
	CI=true yarn test

.PHONY: storybook
storybook: ## Generate Storybook
	yarn storybook

.PHONY: build-image
build-image:  ## Build Docker Image
	@DOCKER_BUILDKIT=1 docker build . -t $(IMAGE_NAME):$(IMAGE_TAG) -f Dockerfile

# Acceptance tests

.PHONY: test-acceptance
test-acceptance: ## Start Core Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open

.PHONY: test-acceptance-headless
test-acceptance-headless: ## Start Core Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run
