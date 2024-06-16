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
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"

.PHONY: start
start: ## Starts Volto, allowing reloading of the add-on during development
	pnpm start

.PHONY: backend-local-start
backend-local-start: ## Start local Plone backend
	$(MAKE) -C "./api/" start

.PHONY: build
build: ## Build a production bundle for distribution
	$(MAKE) -C "./packages/volto/" build

.PHONY: backend-local-build
backend-local-build:  ## Build local Plone backend
	$(MAKE) -C "./api/" build

.PHONY: test
test: ## Run unit tests
	$(MAKE) -C "./packages/volto/" test

.PHONY: clean
clean: ## Clean development environment
	$(MAKE) -C "./api/" clean
	rm -rf node_modules
	find ./packages -name node_modules -exec rm -rf {} \;

.PHONY: install
install: build-deps ## Set up development environment
	# Setup ESlint for VSCode
	node packages/scripts/vscodesettings.js

##### Documentation

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

packages/registry/dist: packages/registry/src
	pnpm build:registry

packages/components/dist: packages/components/src
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
backend-docker-start-no-cors: ## Stops the Docker-based backend in detached mode (daemon)
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
acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode
	$(MAKE) -C "./packages/volto/" acceptance-frontend-prod-start

.PHONY: acceptance-test
acceptance-test: ## Start Cypress in interactive mode
	$(MAKE) -C "./packages/volto/" acceptance-test

.PHONY: ci-acceptance-test
ci-acceptance-test: ## Run cypress tests in headless mode for CI
	$(MAKE) -C "./packages/volto/" ci-acceptance-test

.PHONY: ci-acceptance-test-runall
ci-acceptance-test-runall: ## Run in one command server, frontend and the cypress tests in headless mode for CI
	$(MAKE) -C "./packages/volto/" ci-acceptance-test-runall

######### Seamless Core Acceptance tests

.PHONY: seamless-acceptance-frontend-prod-start
seamless-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for Seamless tests
	$(MAKE) -C "./packages/volto/" seamless-acceptance-frontend-prod-start

.PHONY: seamless-acceptance-test
seamless-acceptance-test: ## Start Cypress in interactive mode for Seamless tests
	$(MAKE) -C "./packages/volto/" seamless-acceptance-test

.PHONY: seamless-acceptance-webserver-start
seamless-acceptance-webserver-start: ## Start the Seamless reverse proxy (traefik) in port 80
	$(MAKE) -C "./packages/volto/" seamless-acceptance-webserver-start

.PHONY: seamless-ci-acceptance-test-runall
seamless-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for Seamless tests
	$(MAKE) -C "./packages/volto/" seamless-ci-acceptance-test-runall

######### Project Acceptance tests

.PHONY: project-acceptance-frontend-prod-start
project-acceptance-frontend-prod-start: ## Start acceptance frontend in production mode for Project tests
	$(MAKE) -C "./packages/volto/" project-acceptance-frontend-prod-start

######### CoreSandbox Acceptance tests

.PHONY: coresandbox-acceptance-backend-start
coresandbox-acceptance-backend-start: ## Start backend acceptance server for CoreSandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-acceptance-backend-start

.PHONY: coresandbox-acceptance-frontend-prod-start
coresandbox-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for Coresandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-acceptance-frontend-prod-start

.PHONY: coresandbox-acceptance-frontend-dev-start
coresandbox-acceptance-frontend-dev-start: build-deps ## Start acceptance frontend in development mode for Coresandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-acceptance-frontend-dev-start

.PHONY: coresandbox-acceptance-test
coresandbox-acceptance-test: ## Start Cypress in interactive mode for CoreSandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-acceptance-test

.PHONY: coresandbox-ci-acceptance-test
coresandbox-ci-acceptance-test: ## Run cypress tests in headless mode for CI for CoreSandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-ci-acceptance-test

.PHONY: coresandbox-ci-acceptance-test-runall
coresandbox-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for CoreSandbox tests
	$(MAKE) -C "./packages/volto/" coresandbox-ci-acceptance-test-runall

######### Multilingual Acceptance tests

.PHONY: multilingual-acceptance-backend-start
multilingual-acceptance-backend-start: ## Start backend acceptance server for Multilingual tests
	$(MAKE) -C "./packages/volto/" multilingual-acceptance-backend-start

.PHONY: multilingual-acceptance-frontend-prod-start
multilingual-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for Multilingual tests
	$(MAKE) -C "./packages/volto/" multilingual-acceptance-frontend-prod-start

.PHONY: multilingual-acceptance-test
multilingual-acceptance-test: ## Start Cypress in interactive mode for Multilingual tests
	$(MAKE) -C "./packages/volto/" multilingual-acceptance-test

.PHONY: multilingual-ci-acceptance-test
multilingual-ci-acceptance-test: ## Run cypress tests in headless mode for CI for Multilingual tests
	$(MAKE) -C "./packages/volto/" multilingual-ci-acceptance-test

.PHONY: multilingual-ci-acceptance-test-runall
multilingual-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for Multilingual tests
	$(MAKE) -C "./packages/volto/" multilingual-ci-acceptance-test-runall

######### Seamless Multilingual Acceptance tests

.PHONY: seamless-multilingual-acceptance-backend-start
seamless-multilingual-acceptance-backend-start: ## Start backend acceptance server for Seamless Multilingual tests
	$(MAKE) -C "./packages/volto/" seamless-multilingual-acceptance-backend-start

.PHONY: seamless-multilingual-acceptance-frontend-prod-start
seamless-multilingual-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for Seamless Multilingual tests
	$(MAKE) -C "./packages/volto/" seamless-multilingual-acceptance-frontend-prod-start

.PHONY: seamless-multilingual-acceptance-test
seamless-multilingual-acceptance-test: ## Start Cypress in interactive mode for Seamless Multilingual tests
	$(MAKE) -C "./packages/volto/" seamless-multilingual-acceptance-test

.PHONY: seamless-multilingual-ci-acceptance-test
seamless-multilingual-ci-acceptance-test: ## Run cypress tests in headless mode for CI for Seamless Multilingual tests
	$(MAKE) -C "./packages/volto/" seamless-multilingual-ci-acceptance-test

.PHONY: seamless-multilingual-ci-acceptance-test-runall
seamless-multilingual-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for Seamless Multilingual tests
	$(MAKE) -C "./packages/volto/" seamless-multilingual-ci-acceptance-test-runall

######### WorkingCopy Acceptance tests

.PHONY: workingcopy-acceptance-backend-start
workingcopy-acceptance-backend-start: ## Start backend acceptance server for WorkingCopy tests
	$(MAKE) -C "./packages/volto/" workingcopy-acceptance-backend-start

.PHONY: workingcopy-acceptance-frontend-prod-start
workingcopy-acceptance-frontend-prod-start: build-deps ## Start acceptance frontend in production mode for WorkingCopy tests
	$(MAKE) -C "./packages/volto/" workingcopy-acceptance-frontend-prod-start

.PHONY: workingcopy-acceptance-test
workingcopy-acceptance-test: ## Start Cypress in interactive mode for WorkingCopy tests
	$(MAKE) -C "./packages/volto/" workingcopy-acceptance-test

.PHONY: workingcopy-ci-acceptance-test
workingcopy-ci-acceptance-test: ## Run cypress tests in headless mode for CI for WorkingCopy tests
	$(MAKE) -C "./packages/volto/" workingcopy-ci-acceptance-test

.PHONY: workingcopy-ci-acceptance-test-runall
workingcopy-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for WorkingCopy tests
	$(MAKE) -C "./packages/volto/" workingcopy-ci-acceptance-test-runall

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
guillotina-ci-acceptance-test: ## Run cypress tests in headless mode for CI for Guillotina tests
	$(MAKE) -C "./packages/volto/" guillotina-ci-acceptance-test

.PHONY: guillotina-ci-acceptance-test-runall
guillotina-ci-acceptance-test-runall: ## Run in one command the backend, frontend, and the cypress tests in headless mode for CI for Guillotina tests
	$(MAKE) -C "./packages/volto/" guillotina-ci-acceptance-test-runall

######### Plone 5 Acceptance tests

.PHONY: plone5-acceptance-backend-start
plone5-acceptance-backend-start: ## Start backend acceptance server for Plone 5 tests
	$(MAKE) -C "./packages/volto/" plone5-acceptance-backend-start

######### @plone/client

.PHONY: acceptance-server-detached-start
acceptance-server-detached-start: ## Start Test Acceptance Server Main Fixture (docker container) in a detached (daemon) mode
	docker run -d --name plone-client-acceptance-server -i --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: acceptance-server-detached-stop
acceptance-server-detached-stop: ## Stop Test Acceptance Server Main Fixture (docker container) in a detached (daemon) mode
	docker kill plone-client-acceptance-server

# include local overrides if present
-include Makefile.local
-include ../../../Makefile.local
