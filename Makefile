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

# Project settings
include variables.mk

# Sphinx variables
# You can set these variables from the command line.
SPHINXOPTS      ?=
# Internal variables.
SPHINXBUILD     = "$(realpath bin/sphinx-build)"
SPHINXAUTOBUILD = "$(realpath bin/sphinx-autobuild)"
DOCS_DIR        = ./docs/source/
BUILDDIR        = ../_build/
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(SPHINXOPTS) .
VALEFILES       := $(shell find $(DOCS_DIR) -type f -name "*.md" -print)

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
	$(MAKE) -C "./packages/volto/" build

.PHONY: test
test: ## Run unit tests
	$(MAKE) -C "./packages/volto/" test

.PHONY: clean
clean: ## Clean development environment
	rm -rf node_modules
	find ./packages -name node_modules -exec rm -rf {} \;

.PHONY: install
install: ## Set up development environment
	# Setup ESlint for VSCode
	pnpm i
	node packages/scripts/vscodesettings.js
	make build-deps

##### Documentation

bin/python: ## Create a Python virtual environment with the latest pip, and install documentation requirements
	python3 -m venv . || virtualenv --clear --python=python3 .
	bin/python -m pip install --upgrade pip
	@echo "Python environment created."
	bin/pip install -r requirements-docs.txt
	@echo "Requirements installed."

.PHONY: docs-clean
docs-clean:  ## Clean current and legacy docs build directories, and Python virtual environment
	rm -rf bin include lib
	rm -rf docs/_build
	cd $(DOCS_DIR) && rm -rf $(BUILDDIR)/

.PHONY: docs-news
docs-news:  ## Create or update the symlink from docs to volto package
	ln -snf ../../packages/volto/news docs/source/news && echo "Symlink to Volto news created or updated.";

.PHONY: docs-html
docs-html: bin/python docs-news  ## Build html
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

.PHONY: docs-livehtml
docs-livehtml: bin/python docs-news  ## Rebuild Sphinx documentation on changes, with live-reload in the browser
	cd "$(DOCS_DIR)" && ${SPHINXAUTOBUILD} \
		--ignore "*.swp" \
		-b html . "$(BUILDDIR)/html" $(SPHINXOPTS)

.PHONY: docs-linkcheck
docs-linkcheck: bin/python docs-news  ## Run linkcheck
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck
	@echo
	@echo "Link check complete; look for any errors in the above output " \
		"or in $(BUILDDIR)/linkcheck/ ."

.PHONY: docs-linkcheckbroken
docs-linkcheckbroken: bin/python docs-news  ## Run linkcheck and show only broken links
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck | GREP_COLORS='0;31' grep -wi "broken\|redirect" --color=always | GREP_COLORS='0;31' grep -vi "https://github.com/plone/volto/issues/" --color=always && if test $$? -eq 0; then exit 1; fi || test $$? -ne 0

.PHONY: docs-vale
docs-vale: bin/python docs-news  ## Install (once) and run Vale style, grammar, and spell checks
	bin/vale sync
	bin/vale --no-wrap $(VALEFILES)
	@echo
	@echo "Vale is finished; look for any errors in the above output."

.PHONY: docs-rtd-pr-preview
docs-rtd-pr-preview: ## Build previews of pull requests that have documentation changes on Read the Docs via CI
	pip install -r requirements-docs.txt
	cd $(DOCS_DIR) && sphinx-build -b html $(ALLSPHINXOPTS) ${READTHEDOCS_OUTPUT}/html/

.PHONY: docs-test
docs-test: docs-clean docs-linkcheckbroken docs-vale  ## Clean docs build, then run linkcheckbroken, vale

##### Build

.PHONY: cypress-install
cypress-install: ## Install Cypress for acceptance tests
	$(NODEBIN)/cypress install

packages/registry/dist: $(shell find packages/registry/src -type f)
	pnpm build:registry

packages/components/dist: $(shell find packages/components/src -type f)
	pnpm build:components

.PHONY: build-deps
build-deps: packages/registry/dist ## Build dependencies

## Storybook

.PHONY: storybook-start
storybook-start: ## Start Storybook server on port 6006
	$(MAKE) -C "./packages/volto/" storybook-start

.PHONY: storybook-build
storybook-build: ## Build Storybook
	$(MAKE) -C "./packages/volto/" storybook-build

##### Release

.PHONY: release-notes-copy-to-docs
release-notes-copy-to-docs: ## Copy release notes into documentation
	cp CHANGELOG.md docs/source/release-notes/index.md
	git add docs/source/release-notes/index.md

##### Docker containers

.PHONY: backend-docker-start
backend-docker-start: ## Starts a Docker-based backend for development
	$(MAKE) -C "./packages/volto/" backend-docker-start

.PHONY: backend-docker-detached-start
backend-docker-detached-start: ## Starts a Docker-based backend in detached mode (daemon)
	docker run -d --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

.PHONY: backend-docker-detached-stop
backend-docker-detached-stop: ## Stops the Docker-based backend in detached mode (daemon)
	docker kill backend

.PHONY: backend-docker-start-no-cors
backend-docker-start-no-cors: ## Starts the Docker-based backend without CORS in detached mode (daemon)
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' -e CORS_=true $(DOCKER_IMAGE)

.PHONY: frontend-docker-start
frontend-docker-start: ## Starts a Docker-based frontend for development
	$(MAKE) -C "./packages/volto/" frontend-docker-start

##### Acceptance tests (Cypress)
######### Dev mode Acceptance tests

.PHONY: acceptance-frontend-dev-start
acceptance-frontend-dev-start: ## Start acceptance frontend in development mode
	$(MAKE) -C "./packages/volto/" acceptance-frontend-dev-start

######### Core Acceptance tests

.PHONY: acceptance-backend-start
acceptance-backend-start: ## Start backend acceptance server
	$(MAKE) -C "./packages/volto/" acceptance-backend-start

.PHONY: ci-acceptance-backend-start
ci-acceptance-backend-start: ## Start backend acceptance server in headless mode for CI
	$(MAKE) -C "./packages/volto/" ci-acceptance-backend-start

.PHONY: acceptance-frontend-prod-start
acceptance-frontend-prod-start: ## Start acceptance frontend in production mode
	$(MAKE) -C "./packages/volto/" acceptance-frontend-prod-start

.PHONY: acceptance-test
acceptance-test: ## Start Cypress in interactive mode
	$(MAKE) -C "./packages/volto/" acceptance-test

.PHONY: ci-acceptance-test
ci-acceptance-test: ## Run cypress tests in headless mode for CI
	$(MAKE) -C "./packages/volto/" ci-acceptance-test

.PHONY: ci-acceptance-test-run-all
ci-acceptance-test-run-all: ## With a single command, start both the acceptance frontend and backend acceptance server, and run Cypress tests in headless mode
	$(MAKE) -C "./packages/volto/" ci-acceptance-test-run-all

######### Deployment Core Acceptance tests

.PHONY: deployment-acceptance-frontend-prod-start
deployment-acceptance-frontend-prod-start: ## Start acceptance frontend in production mode for deployment
	$(MAKE) -C "./packages/volto/" deployment-acceptance-frontend-prod-start

.PHONY: deployment-acceptance-test
deployment-acceptance-test: ## Start Cypress in interactive mode for tests in deployment
	$(MAKE) -C "./packages/volto/" deployment-acceptance-test

.PHONY: deployment-acceptance-web-server-start
deployment-acceptance-web-server-start: ## Start the reverse proxy (Traefik) in port 80 for deployment
	$(MAKE) -C "./packages/volto/" deployment-acceptance-web-server-start

.PHONY: deployment-ci-acceptance-test-run-all
deployment-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for deployment tests
	$(MAKE) -C "./packages/volto/" deployment-ci-acceptance-test-run-all

######### Project Acceptance tests

.PHONY: project-acceptance-frontend-prod-start
project-acceptance-frontend-prod-start: ## Start acceptance frontend in production mode for project tests
	$(MAKE) -C "./packages/volto/" project-acceptance-frontend-prod-start

######### Core Sandbox Acceptance tests

.PHONY: coresandbox-acceptance-backend-start
coresandbox-acceptance-backend-start: ## Start backend acceptance server for core sandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-acceptance-backend-start

.PHONY: coresandbox-acceptance-frontend-prod-start
coresandbox-acceptance-frontend-prod-start: ## Start acceptance frontend in production mode for core sandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-acceptance-frontend-prod-start

.PHONY: coresandbox-acceptance-frontend-dev-start
coresandbox-acceptance-frontend-dev-start: ## Start acceptance frontend in development mode for core sandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-acceptance-frontend-dev-start

.PHONY: coresandbox-acceptance-test
coresandbox-acceptance-test: ## Start Cypress in interactive mode for core sandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-acceptance-test

.PHONY: coresandbox-ci-acceptance-test
coresandbox-ci-acceptance-test: ## Run Cypress tests in headless mode for CI for core sandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-ci-acceptance-test

.PHONY: coresandbox-ci-acceptance-test-run-all
coresandbox-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for core sandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-ci-acceptance-test-run-all

######### Multilingual Acceptance tests

.PHONY: multilingual-acceptance-backend-start
multilingual-acceptance-backend-start: ## Start backend acceptance server for multilingual tests
	$(MAKE) -C "./packages/volto/" multilingual-acceptance-backend-start

.PHONY: multilingual-acceptance-frontend-prod-start
multilingual-acceptance-frontend-prod-start: ## Start acceptance frontend in production mode for multilingual tests
	$(MAKE) -C "./packages/volto/" multilingual-acceptance-frontend-prod-start

.PHONY: multilingual-acceptance-test
multilingual-acceptance-test: ## Start Cypress in interactive mode for multilingual tests
	$(MAKE) -C "./packages/volto/" multilingual-acceptance-test

.PHONY: multilingual-ci-acceptance-test
multilingual-ci-acceptance-test: ## Run Cypress tests in headless mode for CI for multilingual tests
	$(MAKE) -C "./packages/volto/" multilingual-ci-acceptance-test

.PHONY: multilingual-ci-acceptance-test-run-all
multilingual-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for multilingual tests
	$(MAKE) -C "./packages/volto/" multilingual-ci-acceptance-test-run-all

######### Deployment Multilingual Acceptance tests

.PHONY: deployment-multilingual-acceptance-backend-start
deployment-multilingual-acceptance-backend-start: ## Start backend acceptance server for multilingual tests for deployment
	$(MAKE) -C "./packages/volto/" deployment-multilingual-acceptance-backend-start

.PHONY: deployment-multilingual-acceptance-frontend-prod-start
deployment-multilingual-acceptance-frontend-prod-start: ## Start acceptance frontend in production mode for multilingual tests for deployment
	$(MAKE) -C "./packages/volto/" deployment-multilingual-acceptance-frontend-prod-start

.PHONY: deployment-multilingual-acceptance-test
deployment-multilingual-acceptance-test: ## Start Cypress in interactive mode for multilingual tests for deployment
	$(MAKE) -C "./packages/volto/" deployment-multilingual-acceptance-test

.PHONY: deployment-multilingual-ci-acceptance-test
deployment-multilingual-ci-acceptance-test: ## Run Cypress tests in headless mode for CI for multilingual tests for deployment
	$(MAKE) -C "./packages/volto/" deployment-multilingual-ci-acceptance-test

.PHONY: deployment-multilingual-ci-acceptance-test-run-all
deployment-multilingual-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for multilingual tests for deployment
	$(MAKE) -C "./packages/volto/" deployment-multilingual-ci-acceptance-test-run-all

######### Working Copy Acceptance tests

.PHONY: working-copy-acceptance-backend-start
working-copy-acceptance-backend-start: ## Start backend acceptance server for working copy tests
	$(MAKE) -C "./packages/volto/" working-copy-acceptance-backend-start

.PHONY: working-copy-acceptance-frontend-prod-start
working-copy-acceptance-frontend-prod-start: ## Start acceptance frontend in production mode for working copy tests
	$(MAKE) -C "./packages/volto/" working-copy-acceptance-frontend-prod-start

.PHONY: working-copy-acceptance-test
working-copy-acceptance-test: ## Start Cypress in interactive mode for working copy tests
	$(MAKE) -C "./packages/volto/" working-copy-acceptance-test

.PHONY: working-copy-ci-acceptance-test
working-copy-ci-acceptance-test: ## Run Cypress tests in headless mode for CI for working copy tests
	$(MAKE) -C "./packages/volto/" working-copy-ci-acceptance-test

.PHONY: working-copy-ci-acceptance-test-run-all
working-copy-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for working copy tests
	$(MAKE) -C "./packages/volto/" working-copy-ci-acceptance-test-run-all

######### Guillotina Acceptance tests

.PHONY: guillotina-acceptance-backend-start
guillotina-acceptance-backend-start: ## Start backend acceptance server for Guillotina tests
	docker-compose -f g-api/docker-compose.yml up > /dev/null

.PHONY: guillotina-acceptance-frontend-prod-start
guillotina-acceptance-frontend-prod-start: ## Start acceptance frontend in production mode for Guillotina tests
	$(MAKE) -C "./packages/volto/" guillotina-acceptance-frontend-prod-start

.PHONY: guillotina-acceptance-test
guillotina-acceptance-test: ## Start Cypress in interactive mode for Guillotina tests
	$(MAKE) -C "./packages/volto/" guillotina-acceptance-test

.PHONY: guillotina-ci-acceptance-test
guillotina-ci-acceptance-test: ## Run Cypress tests in headless mode for CI for Guillotina tests
	$(MAKE) -C "./packages/volto/" guillotina-ci-acceptance-test

.PHONY: guillotina-ci-acceptance-test-run-all
guillotina-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for Guillotina tests
	$(MAKE) -C "./packages/volto/" guillotina-ci-acceptance-test-run-all

######### Plone 5 Acceptance tests

.PHONY: plone5-acceptance-backend-start
plone5-acceptance-backend-start: ## Start backend acceptance server for Plone 5 tests
	$(MAKE) -C "./packages/volto/" plone5-acceptance-backend-start

######### @plone/client

.PHONY: acceptance-server-detached-start
acceptance-server-detached-start: ## Starts test acceptance server main fixture in detached mode (daemon)
	docker run -d --name plone-client-acceptance-server -i --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: acceptance-server-detached-stop
acceptance-server-detached-stop: ## Stop test acceptance server main fixture in detached mode (daemon)
	docker kill plone-client-acceptance-server

# include local overrides if present
-include Makefile.local
-include ../../../Makefile.local
