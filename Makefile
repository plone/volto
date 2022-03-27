# Volto development

### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# Project settings

INSTANCE_PORT=8080
DOCKER_IMAGE=plone/plone-backend:5.2.7
KGS=plone.restapi==8.21.2 plone.volto==4.0.0a3 plone.rest==2.0.0a3 plone.app.iterate==4.0.2 plone.app.vocabularies==4.3.0

# Sphinx variables
# You can set these variables from the command line.
SPHINXOPTS      ?=
# Internal variables.
SPHINXBUILD     = $(realpath bin/sphinx-build)
SPHINXAUTOBUILD = $(realpath bin/sphinx-autobuild)
DOCS_DIR        = ./docs/source/
BUILDDIR        = ../_build/
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(SPHINXOPTS) .

# Recipe snippets for reuse

CHECKOUT_BASENAME=$(shell basename $(shell realpath ./))
CHECKOUT_BRANCH=$(shell git branch --show-current)
CHECKOUT_TMP=../$(CHECKOUT_BASENAME).tmp
CHECKOUT_TMP_ABS=$(shell realpath $(CHECKOUT_TMP))

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

.PHONY: release
release:
	./node_modules/.bin/release-it

.PHONY: build
build:
	make build-backend
	make build-frontend

.PHONY: build-frontend
build-frontend:
	yarn && RAZZLE_API_PATH=http://localhost:55001/plone yarn build

.PHONY: build-backend
build-backend:  ## Build Plone 5.2
	$(MAKE) -C "./api/" build

.PHONY: dist
dist:
	yarn
	yarn build

.PHONY: test
test:
	$(MAKE) -C "./api/" test


.PHONY: storybook-build
storybook-build:
	yarn build-storybook -o docs/_build/storybook

bin/python:
	python3 -m venv . || virtualenv --clear --python=python3 .
	bin/python -m pip install --upgrade pip
	bin/pip install -r requirements-docs.txt

.PHONY: docs-clean
docs-clean:  ## Clean current and legacy docs build directories, and Python virtual environment
	cd $(DOCS_DIR) && rm -rf $(BUILDDIR)/
	rm -rf bin include lib
	rm -rf docs/build

.PHONY: docs-html
docs-html: bin/python  ## Build html
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

.PHONY: docs-livehtml
docs-livehtml: bin/python  ## Rebuild Sphinx documentation on changes, with live-reload in the browser
	cd "$(DOCS_DIR)" && ${SPHINXAUTOBUILD} \
		--ignore "*.swp" \
		-b html . "$(BUILDDIR)/html" $(SPHINXOPTS)

.PHONY: docs-linkcheck
docs-linkcheck: bin/python  ## Run linkcheck
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck
	@echo
	@echo "Link check complete; look for any errors in the above output " \
		"or in $(BUILDDIR)/linkcheck/ ."

.PHONY: docs-linkcheckbroken
docs-linkcheckbroken: bin/python  ## Run linkcheck and show only broken links
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck | GREP_COLORS='0;31' grep -wi "broken\|redirect" --color=auto
	@echo
	@echo "Link check complete; look for any errors in the above output " \
		"or in $(BUILDDIR)/linkcheck/ ."

.PHONY: docs-spellcheck
docs-spellcheck: bin/python  ## Run spellcheck
	cd $(DOCS_DIR) && LANGUAGE=$* $(SPHINXBUILD) -b spelling -j 4 $(ALLSPHINXOPTS) $(BUILDDIR)/spellcheck/$*
	@echo
	@echo "Spellcheck is finished; look for any errors in the above output " \
		" or in $(BUILDDIR)/spellcheck/ ."

.PHONY: netlify
netlify:
	pip install -r requirements-docs.txt
	cd $(DOCS_DIR) && sphinx-build -b html $(ALLSPHINXOPTS) ../$(BUILDDIR)/html

.PHONY: docs-test
docs-test: docs-clean docs-linkcheck docs-spellcheck  ## Clean docs build, then run linkcheck, spellcheck

.PHONY: start
# Run both the back-end and the front end
start:
	$(MAKE) -j 2 start-backend start-frontend

.PHONY: start-frontend
start-frontend:
	yarn start

.PHONY: start-backend
start-backend: ## Start Plone Backend
	$(MAKE) -C "./api/" start

.PHONY: start-backend-docker
start-backend-docker:
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

.PHONY: start-frontend-docker
start-frontend-docker:
	docker run -it --rm --name=volto --link backend -p 3000:3000 -e RAZZLE_INTERNAL_API_PATH=http://backend:8080/Plone -e RAZZLE_DEV_PROXY_API_PATH=http://backend:8080/Plone plone/plone-frontend:latest

.PHONY: start-backend-docker-guillotina
start-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml up -d

.PHONY: start-test
start-test: ## Start Test
	@echo "$(GREEN)==> Start Test$(RESET)"
	yarn cypress:open

.PHONY: start-test-all
start-test-all: ## Start Test
	@echo "$(GREEN)==> Start Test$(RESET)"
	yarn ci:cypress:run

.PHONY: start-test-frontend
start-test-frontend: ## Start Test Volto Frontend
	@echo "$(GREEN)==> Start Test Volto Frontend$(RESET)"
	RAZZLE_API_PATH=http://localhost:55001/plone yarn build && NODE_ENV=production node build/server.js

.PHONY: start-test-backend
start-test-backend: ## Start Test Plone Backend
	$(MAKE) -C "./api/" start-test

.PHONY: stop-backend-docker-guillotina
stop-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml down

.PHONY: test-acceptance-server
test-acceptance-server:
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) plone.app.robotframework plone.app.contenttypes' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: test-acceptance-server-multilingual
test-acceptance-server-multilingual:
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) plone.app.robotframework plone.app.contenttypes' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:multilingual -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: test-acceptance-server-workingcopy
test-acceptance-server-workingcopy:
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) plone.app.robotframework plone.app.contenttypes' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING
	# ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.app.iterate,plone.volto,plone.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: test-acceptance-server-coresandbox
test-acceptance-server-coresandbox:
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) plone.app.robotframework plone.app.contenttypes' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage,plone.volto:coresandbox -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors,plone.volto.coresandbox $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING
	# ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors,plone.volto.coresandbox APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage,plone.volto:coresandbox ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: test-acceptance-server-old
test-acceptance-server-old:
	$(MAKE) -C "./api/" test-acceptance-server-old

.PHONY: test-acceptance-guillotina
test-acceptance-guillotina:
	docker-compose -f g-api/docker-compose.yml up > /dev/null

.PHONY: clean
clean:
	$(MAKE) -C "./api/" clean
	rm -rf node_modules
