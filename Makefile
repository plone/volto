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

# Allow setting the language for backend-docker-start. Default is `en`.
SITE_DEFAULT_LANGUAGE ?=en

# Sphinx variables
# You can set these variables from the command line.
SPHINXOPTS      ?=
VALEOPTS        ?=
# Internal variables.
SPHINXBUILD     = "$(realpath bin/sphinx-build)"
SPHINXAUTOBUILD = "$(realpath bin/sphinx-autobuild)"
DOCS_DIR        = ./docs/
BUILDDIR        = ../_build
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
start: ## Starts Seven in development mode
	pnpm start

.PHONY: start-publicui
start-publicui: ## Starts Seven in development mode (Public UI only)
	pnpm start:publicui

.PHONY: build
build: ## Build a production bundle for distribution
	pnpm build

.PHONY: build-publicui
build-publicui: ## Build a production bundle for distribution (Public UI only)
	pnpm build:publicui

.PHONY: test
test: ## Run Seven unit tests
	pnpm test

.PHONY: clean
clean: ## Clean development environment
	rm -rf node_modules
	find ./packages -name node_modules -not -path "./packages/volto/__tests__/*" -exec rm -rf {} \;

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

.PHONY: docs-distclean
docs-distclean:  ## Clean Python virtual environment
	rm -rf bin include lib
	@echo "Cleaned Python virtual environment."

.PHONY: docs-clean
docs-clean:  ## Clean docs build directory
	cd $(DOCS_DIR) && rm -rf $(BUILDDIR)/
	@echo "Cleaned docs build directory."

.PHONY: docs-news
docs-news:  ## Create or update the symlink from docs to volto package
	if [ -f /tmp/foo.txt ]; then rm docs/news; fi
	ln -snf ../packages/volto/news docs/news
	@echo "Symlink to Seven news created or updated.";

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
	bin/vale --no-wrap $(VALEOPTS) $(VALEFILES)
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

packages/client/dist: $(shell find packages/client/src -type f)
	pnpm build:client

packages/providers/dist: $(shell find packages/providers/src -type f)
	pnpm build:providers

packages/helpers/dist: $(shell find packages/helpers/src -type f)
	pnpm build:helpers

packages/react-router/dist: $(shell find packages/react-router/src -type f)
	pnpm build:react-router

.PHONY: build-deps
build-deps: packages/registry/dist packages/components/dist packages/client/dist packages/providers/dist packages/react-router/dist packages/helpers/dist  ## Build dependencies

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
	cp CHANGELOG.md docs/release-notes/index.md
	git add docs/release-notes/index.md

##### Docker containers

.PHONY: backend-docker-start
backend-docker-start: ## Starts a Docker-based backend for development
	docker run -it --rm --name=backend -p 8080:8080 -v volto-backend-data:/data -e SITE=Plone -e ADDONS='$(KGS)' -e SITE_DEFAULT_LANGUAGE='$(SITE_DEFAULT_LANGUAGE)' $(DOCKER_IMAGE)

.PHONY: backend-docker-start-no-cors
backend-docker-start-no-cors: ## Starts the Docker-based backend without CORS in detached mode (daemon)
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' -e CORS_=true $(DOCKER_IMAGE)

.PHONY: frontend-docker-start
frontend-docker-start: ## Starts a Docker-based frontend for development
	echo "This should start a container with the Seven frontend for demo purposes..."

##### Acceptance tests (Cypress)
######### Dev mode Acceptance tests

.PHONY: acceptance-frontend-dev-start
acceptance-frontend-dev-start: ## Start acceptance frontend in development mode
	$(MAKE) -C "./apps/seven/" acceptance-frontend-dev-start

######### Core Acceptance tests

.PHONY: acceptance-backend-start
acceptance-backend-start: ## Start backend acceptance server
	docker run -it --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default,plone.app.discussion:default $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: ci-acceptance-backend-start
ci-acceptance-backend-start: ## Start backend acceptance server in headless mode for CI
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default,plone.app.discussion:default $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: acceptance-frontend-prod-start
acceptance-frontend-prod-start: ## Start acceptance frontend in production mode
	$(MAKE) -C "./apps/seven/" acceptance-frontend-prod-start

.PHONY: acceptance-test
acceptance-test: ## Start Cypress in interactive mode
	$(MAKE) -C "./apps/seven/" acceptance-test

.PHONY: ci-acceptance-test
ci-acceptance-test: ## Run cypress tests in headless mode for CI
	$(MAKE) -C "./apps/seven/" ci-acceptance-test

.PHONY: ci-acceptance-test-run-all
ci-acceptance-test-run-all: ## With a single command, start both the acceptance frontend and backend acceptance server, and run Cypress tests in headless mode
	$(MAKE) -C "./apps/seven/" ci-acceptance-test-run-all

######### Deployment Core Acceptance tests

.PHONY: deployment-acceptance-frontend-prod-start
deployment-acceptance-frontend-prod-start: ## Start acceptance frontend in production mode for deployment
	$(MAKE) -C "./apps/seven/" deployment-acceptance-frontend-prod-start

.PHONY: deployment-acceptance-test
deployment-acceptance-test: ## Start Cypress in interactive mode for tests in deployment
	$(MAKE) -C "./apps/seven/" deployment-acceptance-test

.PHONY: deployment-acceptance-web-server-start
deployment-acceptance-web-server-start: ## Start the reverse proxy (Traefik) in port 80 for deployment
	$(MAKE) -C "./apps/seven/" deployment-acceptance-web-server-start

.PHONY: deployment-ci-acceptance-test-run-all
deployment-ci-acceptance-test-run-all: ## With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for deployment tests
	$(MAKE) -C "./apps/seven/" deployment-ci-acceptance-test-run-all

######### Cookieplone Acceptance tests

.PHONY: cookieplone-acceptance-frontend-prod-start
cookieplone-acceptance-frontend-prod-start: ## Start acceptance frontend in production mode for project tests
	$(MAKE) -C "./apps/seven/" cookieplone-acceptance-frontend-prod-start

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

# include local overrides if present
-include Makefile.local
-include ../../../Makefile.local
