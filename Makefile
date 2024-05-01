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
all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: .SHELLFLAGS:=-eu -o pipefail -O inherit_errexit -c
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: start
# Run both the back-end and the front end
start:
	$(MAKE) -j 2 start-backend start-frontend

.PHONY: start-frontend
start-frontend:
	pnpm start

.PHONY: start-backend
start-backend: ## Start Plone Backend
	$(MAKE) -C "./api/" start

# TODO: Review release commands for all packages
# Use TurboRepo

.PHONY: build
build:
	make build-backend
	make build-frontend

.PHONY: build-frontend
build-frontend:
	$(MAKE) -C "./packages/volto/" build-frontend

.PHONY: build-backend
build-backend:  ## Build Plone 5.2
	$(MAKE) -C "./api/" build

.PHONY: test
test:
	$(MAKE) -C "./api/" test

bin/python:
	python3 -m venv . || virtualenv --clear --python=python3 .
	bin/python -m pip install --upgrade pip
	@echo "Python environment created."
	bin/pip install -r requirements-docs.txt
	@echo "Requirements installed."

.PHONY: clean
clean:
	$(MAKE) -C "./api/" clean
	find ./packages -name node_modules -exec rm -rf {} \;

.PHONY: setup
setup:
	# Setup ESlint for VSCode
	node packages/scripts/vscodesettings.js
	pnpm build:all

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

.PHONY: netlify
netlify:
	pnpm build:registry
	(cd packages/volto && pnpm build-storybook -o ../../_build/html/storybook)
	pwd && pip install -r requirements-docs.txt
	cd $(DOCS_DIR) && pwd && sphinx-build -b html $(ALLSPHINXOPTS) ../$(BUILDDIR)/html

.PHONY: docs-test
docs-test: docs-clean docs-linkcheckbroken docs-vale  ## Clean docs build, then run linkcheckbroken, vale

##### Build

.PHONY: storybook-build
storybook-build:
	pnpm build:registry
	(cd packages/volto && pnpm build-storybook -o ../../docs/_build/html/storybook)

.PHONY: patches
patches:
	(cd packages/volto && /bin/bash patches/patchit.sh > /dev/null 2>&1 ||true)

.PHONY: cypress-install
cypress-install:
	$(NODEBIN)/cypress install

.PHONY: build-deps
build-deps:
	if [ ! -d $$(pwd)/registry/dist ]; then (pnpm build:deps); fi

##### Release

.PHONY: corepackagebump
corepackagebump:
	node $(SCRIPTSPACKAGE)/corepackagebump.js packages/volto-slate $(VERSION)

.PHONY: copyreleasenotestodocs
copyreleasenotestodocs:
	cp CHANGELOG.md docs/source/release-notes/index.md
	git add docs/source/release-notes/index.md

##### Docker containers

.PHONY: start-backend-docker
start-backend-docker:
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

.PHONY: start-backend-docker-detached
start-backend-docker-detached:
	docker run -d --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

.PHONY: stop-backend-docker-detached
stop-backend-docker-detached:
	docker kill backend

.PHONY: start-backend-docker-no-cors
start-backend-docker-no-cors:
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' -e CORS_=true $(DOCKER_IMAGE)

.PHONY: start-frontend-docker
start-frontend-docker:
	docker run -it --rm --name=volto --link backend -p 3000:3000 -e RAZZLE_INTERNAL_API_PATH=http://backend:8080/Plone -e RAZZLE_DEV_PROXY_API_PATH=http://backend:8080/Plone plone/plone-frontend:latest

.PHONY: start-backend-docker-guillotina
start-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml up -d

.PHONY: stop-backend-docker-guillotina
stop-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml down

##### Acceptance tests (Cypress)
######### Dev mode Acceptance tests

.PHONY: start-test-acceptance-frontend-dev
start-test-acceptance-frontend-dev: build-deps ## Start the Core Acceptance Frontend Fixture in dev mode
	$(MAKE) -C "./packages/volto/" start-test-acceptance-frontend-dev

######### Core Acceptance tests

.PHONY: start-test-acceptance-server test-acceptance-server
start-test-acceptance-server test-acceptance-server: ## Start Test Acceptance Server Main Fixture (docker container)
	docker run -it --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: start-test-acceptance-frontend
start-test-acceptance-frontend: build-deps ## Start the Core Acceptance Frontend Fixture
	$(MAKE) -C "./packages/volto/" start-test-acceptance-frontend

.PHONY: test-acceptance
test-acceptance: ## Start Core Cypress Acceptance Tests
	$(MAKE) -C "./packages/volto/" test-acceptance

.PHONY: test-acceptance-headless
test-acceptance-headless: ## Start Core Cypress Acceptance Tests in headless mode
	$(MAKE) -C "./packages/volto/" test-acceptance-headless

.PHONY: full-test-acceptance
full-test-acceptance: ## Runs Core Full Acceptance Testing in headless mode
	$(MAKE) -C "./packages/volto/" full-test-acceptance

######### Seamless Core Acceptance tests

.PHONY: start-test-acceptance-frontend-seamless
start-test-acceptance-frontend-seamless: build-deps ## Start the Seamless Core Acceptance Frontend Fixture
	$(MAKE) -C "./packages/volto/" start-test-acceptance-frontend-seamless

.PHONY: test-acceptance-seamless
test-acceptance-seamless: ## Start Seamless Cypress Acceptance Tests
	$(MAKE) -C "./packages/volto/" test-acceptance-seamless

.PHONY: start-test-acceptance-webserver-seamless
start-test-acceptance-webserver-seamless: ## Start the seamless webserver
	$(MAKE) -C "./packages/volto/" start-test-acceptance-webserver-seamless

.PHONY: full-test-acceptance-seamless
full-test-acceptance-seamless: ## Runs Seamless Core Full Acceptance Testing in headless mode
	$(MAKE) -C "./packages/volto/" full-test-acceptance-seamless

######### Project Acceptance tests

.PHONY: start-test-acceptance-frontend-project
start-test-acceptance-frontend-project: build-deps ## Start the Project Acceptance Frontend Fixture
	$(MAKE) -C "./packages/volto/" start-test-acceptance-frontend-project

######### CoreSandbox Acceptance tests

.PHONY: start-test-acceptance-server-coresandbox test-acceptance-server-coresandbox
start-test-acceptance-server-coresandbox test-acceptance-server-coresandbox: ## Start CoreSandbox Test Acceptance Server Fixture (docker container)
	docker run -it --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage,plone.volto:coresandbox -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors,plone.volto.coresandbox $(DOCKER_IMAGE_ACCEPTANCE)
	# ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors,plone.volto.coresandbox APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage,plone.volto:coresandbox ./api/bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: start-test-acceptance-frontend-coresandbox
start-test-acceptance-frontend-coresandbox: build-deps ## Start the CoreSandbox Acceptance Frontend Fixture
	$(MAKE) -C "./packages/volto/" start-test-acceptance-frontend-coresandbox

.PHONY: start-test-acceptance-frontend-coresandbox-dev
start-test-acceptance-frontend-coresandbox-dev: build-deps ## Start the CoreSandbox Acceptance Frontend Fixture in dev mode
	$(MAKE) -C "./packages/volto/" start-test-acceptance-frontend-coresandbox-dev

.PHONY: test-acceptance-coresandbox
test-acceptance-coresandbox: ## Start CoreSandbox Cypress Acceptance Tests
	$(MAKE) -C "./packages/volto/" test-acceptance-coresandbox

.PHONY: test-acceptance-coresandbox-headless
test-acceptance-coresandbox-headless: ## Start CoreSandbox Cypress Acceptance Tests in headless mode
	$(MAKE) -C "./packages/volto/" test-acceptance-coresandbox-headless

.PHONY: full-test-acceptance-coresandbox
full-test-acceptance-coresandbox: ## Runs CoreSandbox Full Acceptance Testing in headless mode
	$(MAKE) -C "./packages/volto/" full-test-acceptance-coresandbox

######### Multilingual Acceptance tests

.PHONY: start-test-acceptance-server-multilingual test-acceptance-server-multilingual
start-test-acceptance-server-multilingual test-acceptance-server-multilingual: ## Start Multilingual Acceptance Server Multilingual Fixture (docker container)
	docker run -it --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:multilingual $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: start-test-acceptance-frontend-multilingual
start-test-acceptance-frontend-multilingual: build-deps ## Start the Multilingual Acceptance Frontend Fixture
	$(MAKE) -C "./packages/volto/" start-test-acceptance-frontend-multilingual

.PHONY: test-acceptance-multilingual
test-acceptance-multilingual: ## Start Multilingual Cypress Acceptance Tests
	$(MAKE) -C "./packages/volto/" test-acceptance-multilingual

.PHONY: test-acceptance-multilingual-headless
test-acceptance-multilingual-headless: ## Start Multilingual Cypress Acceptance Tests in headless mode
	$(MAKE) -C "./packages/volto/" test-acceptance-multilingual-headless

.PHONY: full-test-acceptance-multilingual
full-test-acceptance-multilingual: ## Runs Multilingual Full Acceptance Testing in headless mode
	$(MAKE) -C "./packages/volto/" full-test-acceptance-multilingual

######### Seamless Multilingual Acceptance tests

.PHONY: start-test-acceptance-server-seamless-multilingual test-acceptance-server-seamless-multilingual
start-test-acceptance-server-seamless-multilingual test-acceptance-server-seamless-multilingual: ## Start Seamless Multilingual Acceptance Server Multilingual Fixture (docker container)
	docker run -it --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:multilingual $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: start-test-acceptance-frontend-seamless-multilingual
start-test-acceptance-frontend-seamless-multilingual: build-deps ## Start the Seamless Multilingual Acceptance Frontend Fixture
	$(MAKE) -C "./packages/volto/" start-test-acceptance-frontend-seamless-multilingual

.PHONY: test-acceptance-seamless-multilingual
test-acceptance-seamless-multilingual: ## Start Seamless Multilingual Cypress Acceptance Tests
	$(MAKE) -C "./packages/volto/" test-acceptance-seamless-multilingual

.PHONY: test-acceptance-seamless-multilingual-headless
test-acceptance-seamless-multilingual-headless: ## Start Seamless Multilingual Cypress Acceptance Tests in headless mode
	$(MAKE) -C "./packages/volto/" test-acceptance-seamless-multilingual-headless

.PHONY: full-test-acceptance-seamless-multilingual
full-test-acceptance-seamless-multilingual: ## Runs Seamless Multilingual Full Acceptance Testing in headless mode
	$(MAKE) -C "./packages/volto/" full-test-acceptance-seamless-multilingual

######### WorkingCopy Acceptance tests

.PHONY: start-test-acceptance-server-workingcopy test-acceptance-server-workingcopy
start-test-acceptance-server-workingcopy test-acceptance-server-workingcopy : ## Start the WorkingCopy Acceptance Server  Fixture (docker container)
	docker run -it --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage $(DOCKER_IMAGE_ACCEPTANCE)
	# ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.app.iterate,plone.volto,plone.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage ./api/bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: start-test-acceptance-frontend-workingcopy
start-test-acceptance-frontend-workingcopy: build-deps ## Start the WorkingCopy Acceptance Frontend Fixture
	$(MAKE) -C "./packages/volto/" start-test-acceptance-frontend-workingcopy

.PHONY: test-acceptance-workingcopy
test-acceptance-workingcopy: ## Start WorkingCopy Cypress Acceptance Tests
	$(MAKE) -C "./packages/volto/" test-acceptance-workingcopy

.PHONY: test-acceptance-workingcopy-headless
test-acceptance-workingcopy-headless: ## Start WorkingCopy Cypress Acceptance Tests in headless mode
	$(MAKE) -C "./packages/volto/" test-acceptance-workingcopy-headless

.PHONY: full-test-acceptance-workingcopy
full-test-acceptance-workingcopy: ## Runs WorkingCopy Full Acceptance Testing in headless mode
	$(MAKE) -C "./packages/volto/" full-test-acceptance-workingcopy

######### Guillotina Acceptance tests

.PHONY: start-test-acceptance-server-guillotina
start-test-acceptance-server-guillotina: ## Start Guillotina Test Acceptance Server (docker container)
	docker-compose -f g-api/docker-compose.yml up > /dev/null

.PHONY: start-test-acceptance-frontend-guillotina
start-test-acceptance-frontend-guillotina: build-deps ## Start the Guillotina Acceptance Frontend Fixture
	$(MAKE) -C "./packages/volto/" start-test-acceptance-frontend-guillotina

.PHONY: test-acceptance-guillotina
test-acceptance-guillotina: ## Start the Guillotina Cypress Acceptance Tests
	$(MAKE) -C "./packages/volto/" test-acceptance-guillotina

.PHONY: test-acceptance-guillotina-headless
test-acceptance-guillotina-headless: ## Start the Guillotina Cypress Acceptance Tests in headless mode
	$(MAKE) -C "./packages/volto/" test-acceptance-guillotina-headless

.PHONY: full-test-acceptance-guillotina
full-test-acceptance-guillotina: ## Runs the Guillotina Full Acceptance Testing in headless mode
	$(MAKE) -C "./packages/volto/" full-test-acceptance-guillotina

######### Plone 5 Acceptance tests

.PHONY: start-test-acceptance-server-5
start-test-acceptance-server-5: ## Start Test Acceptance Server Main Fixture Plone 5 (docker container)
	docker run -it --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS5) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE5) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

######### @plone/client

.PHONY: start-test-acceptance-server-detached
start-test-acceptance-server-detached: ## Start Test Acceptance Server Main Fixture (docker container) in a detached (daemon) mode
	docker run -d --name plone-client-acceptance-server -i --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: stop-test-acceptance-server-detached
stop-test-acceptance-server-detached: ## Stop Test Acceptance Server Main Fixture (docker container) in a detached (daemon) mode
	docker kill plone-client-acceptance-server

# include local overrides if present
-include Makefile.local