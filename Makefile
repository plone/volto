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
DOCKER_IMAGE=plone/plone-backend:6.0.0
KGS=plone.volto==4.0.3
TESTING_ADDONS=plone.app.robotframework==2.0.0 plone.app.testing==7.0.0
NODEBIN = ./node_modules/.bin
SCRIPTSPACKAGE = ./packages/scripts

# Plone 5 legacy
DOCKER_IMAGE5=plone/plone-backend:5.2.9
KGS5=plone.restapi==8.32.6 plone.volto==4.0.3 plone.rest==2.0.0

# Sphinx variables
# You can set these variables from the command line.
SPHINXOPTS      ?=
# Internal variables.
SPHINXBUILD     = $(realpath bin/sphinx-build)
SPHINXAUTOBUILD = $(realpath bin/sphinx-autobuild)
DOCS_DIR        = ./docs/source/
BUILDDIR        = ../_build/
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(SPHINXOPTS) .
VALEFILES       := $(shell find $(DOCS_DIR) -type f -name "*.md" -print)

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

bin/python:
	python3 -m venv . || virtualenv --clear --python=python3 .
	bin/python -m pip install --upgrade pip
	bin/pip install -r requirements-docs.txt

.PHONY: clean
clean:
	$(MAKE) -C "./api/" clean
	rm -rf node_modules

##### Documentation

.PHONY: docs-clean
docs-clean:  ## Clean current and legacy docs build directories, and Python virtual environment
	cd $(DOCS_DIR) && rm -rf $(BUILDDIR)/
	rm -rf bin include lib
	rm -rf docs/_build

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
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck | GREP_COLORS='0;31' grep -wi "broken\|redirect" --color=always | GREP_COLORS='0;31' grep -vi "https://github.com/plone/volto/issues/" --color=always && if test $$? = 0; then exit 1; fi || test $$? = 1
	@echo
	@echo "Link check complete; look for any errors in the above output " \
		"or in $(BUILDDIR)/linkcheck/ ."

.PHONY: docs-vale
docs-vale:  ## Run Vale style, grammar, and spell checks
	vale sync
	vale --no-wrap $(VALEFILES)
	@echo
	@echo "Vale is finished; look for any errors in the above output."

.PHONY: netlify
netlify:
	pip install -r requirements-docs.txt
	cd $(DOCS_DIR) && sphinx-build -b html $(ALLSPHINXOPTS) ../$(BUILDDIR)/html

.PHONY: docs-test
docs-test: docs-clean docs-linkcheckbroken docs-vale  ## Clean docs build, then run linkcheckbroken, vale

.PHONY: storybook-build
storybook-build:
	yarn build-storybook -o docs/_build/storybook

.PHONY: patches
patches:
	/bin/bash patches/patchit.sh > /dev/null 2>&1 ||true

##### Release

.PHONY: corepackagebump
corepackagebump:
	node $(SCRIPTSPACKAGE)/corepackagebump.js packages/volto-slate $(VERSION)

##### Docker containers

.PHONY: start-backend-docker
start-backend-docker:
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

.PHONY: start-frontend-docker
start-frontend-docker:
	docker run -it --rm --name=volto --link backend -p 3000:3000 -e RAZZLE_INTERNAL_API_PATH=http://backend:8080/Plone -e RAZZLE_DEV_PROXY_API_PATH=http://backend:8080/Plone plone/plone-frontend:latest

.PHONY: start-backend-docker-guillotina
start-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml up -d

##### Acceptance tests (Cypress)

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
start-test-backend: ## Start Test Plone Backend (api folder)
	$(MAKE) -C "./api/" start-test

.PHONY: stop-backend-docker-guillotina
stop-backend-docker-guillotina:
	docker-compose -f g-api/docker-compose.yml down


.PHONY: test-acceptance-server-old
test-acceptance-server-old:
	$(MAKE) -C "./api/" test-acceptance-server-old

######### Dev mode Acceptance tests

.PHONY: start-test-acceptance-frontend-dev
start-test-acceptance-frontend-dev: ## Start the Core Acceptance Frontend Fixture in dev mode
	RAZZLE_API_PATH=http://localhost:55001/plone yarn start

######### Core Acceptance tests

.PHONY: start-test-acceptance-server test-acceptance-server
start-test-acceptance-server test-acceptance-server: ## Start Test Acceptance Server Main Fixture (docker container)
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: start-test-acceptance-frontend
start-test-acceptance-frontend: ## Start the Core Acceptance Frontend Fixture
	RAZZLE_API_PATH=http://localhost:55001/plone yarn build && yarn start:prod

.PHONY: test-acceptance
test-acceptance: ## Start Core Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open

.PHONY: test-acceptance-headless
test-acceptance-headless: ## Start Core Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run

.PHONY: full-test-acceptance
full-test-acceptance: ## Runs Core Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server" http-get://localhost:55001/plone "make start-test-acceptance-frontend" http://localhost:3000 "make test-acceptance-headless"

######### Seamless Core Acceptance tests

.PHONY: start-test-acceptance-frontend-seamless
start-test-acceptance-frontend-seamless: ## Start the Seamless Core Acceptance Frontend Fixture
	yarn build && yarn start:prod

.PHONY: test-acceptance-seamless
test-acceptance-seamless: ## Start Seamless Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config baseUrl='http://localhost'

.PHONY: start-test-acceptance-webserver-seamless
start-test-acceptance-webserver-seamless: ## Start the seamless webserver
	cd cypress/docker && docker-compose -f seamless.yml up

.PHONY: full-test-acceptance-seamless
full-test-acceptance-seamless: ## Runs Seamless Core Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server" http-get://localhost:55001/plone "make start-test-acceptance-frontend-seamless" http://localhost:3000 "make test-acceptance-headless"

######### Project Acceptance tests

.PHONY: start-test-acceptance-frontend-project
start-test-acceptance-frontend-project: ## Start the Project Acceptance Frontend Fixture
	cd my-volto-app && RAZZLE_API_PATH=http://localhost:55001/plone yarn build && yarn start:prod

######### CoreSandbox Acceptance tests

.PHONY: start-test-acceptance-server-coresandbox test-acceptance-server-coresandbox
start-test-acceptance-server-coresandbox test-acceptance-server-coresandbox: ## Start CoreSandbox Test Acceptance Server Fixture (docker container)
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage,plone.volto:coresandbox -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors,plone.volto.coresandbox $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING
	# ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors,plone.volto.coresandbox APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage,plone.volto:coresandbox ./api/bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: start-test-acceptance-frontend-coresandbox
start-test-acceptance-frontend-coresandbox: ## Start the CoreSandbox Acceptance Frontend Fixture
	ADDONS=coresandbox RAZZLE_API_PATH=http://localhost:55001/plone yarn build && yarn start:prod

.PHONY: start-test-acceptance-frontend-coresandbox-dev
start-test-acceptance-frontend-coresandbox-dev: ## Start the CoreSandbox Acceptance Frontend Fixture in dev mode
	ADDONS=coresandbox RAZZLE_API_PATH=http://localhost:55001/plone yarn start

.PHONY: test-acceptance-coresandbox
test-acceptance-coresandbox: ## Start CoreSandbox Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/coresandbox/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-coresandbox-headless
test-acceptance-coresandbox-headless: ## Start CoreSandbox Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/coresandbox/**/*.{js,jsx,ts,tsx}/**/*.{js,jsx,ts,tsx}'

.PHONY: full-test-acceptance-coresandbox
full-test-acceptance-coresandbox: ## Runs CoreSandbox Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server-coresandbox" http-get://localhost:55001/plone "make start-test-acceptance-frontend-coresandbox" http://localhost:3000 "make test-acceptance-coresandbox-headless"

######### Multilingual Acceptance tests

.PHONY: start-test-acceptance-server-multilingual test-acceptance-server-multilingual
start-test-acceptance-server-multilingual test-acceptance-server-multilingual: ## Start Multilingual Acceptance Server Multilingual Fixture (docker container)
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:multilingual -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: start-test-acceptance-frontend-multilingual
start-test-acceptance-frontend-multilingual: ## Start the Multilingual Acceptance Frontend Fixture
	ADDONS=coresandbox:multilingualFixture RAZZLE_API_PATH=http://localhost:55001/plone yarn build && yarn start:prod

.PHONY: test-acceptance-multilingual
test-acceptance-multilingual: ## Start Multilingual Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-multilingual-headless
test-acceptance-multilingual-headless: ## Start Multilingual Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: full-test-acceptance-multilingual
full-test-acceptance-multilingual: ## Runs Multilingual Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server-multilingual" http-get://localhost:55001/plone "make start-test-acceptance-frontend-multilingual" http://localhost:3000 "make test-acceptance-multilingual-headless"

######### WorkingCopy Acceptance tests

.PHONY: start-test-acceptance-server-workingcopy test-acceptance-server-workingcopy
start-test-acceptance-server-workingcopy test-acceptance-server-workingcopy : ## Start the WorkingCopy Acceptance Server  Fixture (docker container)
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING
	# ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.app.iterate,plone.volto,plone.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage ./api/bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: start-test-acceptance-frontend-workingcopy
start-test-acceptance-frontend-workingcopy: ## Start the WorkingCopy Acceptance Frontend Fixture
	ADDONS=coresandbox:workingCopyFixture RAZZLE_API_PATH=http://localhost:55001/plone yarn build && yarn start:prod

.PHONY: test-acceptance-workingcopy
test-acceptance-workingcopy: ## Start WorkingCopy Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/workingCopy/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-workingcopy-headless
test-acceptance-workingcopy-headless: ## Start WorkingCopy Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/workingCopy/**/*.{js,jsx,ts,tsx}'

.PHONY: full-test-acceptance-workingcopy
full-test-acceptance-workingcopy: ## Runs WorkingCopy Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server-workingcopy" http-get://localhost:55001/plone "make start-test-acceptance-frontend-workingcopy" http://localhost:3000 "make test-acceptance-workingcopy-headless"

######### Guillotina Acceptance tests

.PHONY: start-test-acceptance-server-guillotina
start-test-acceptance-server-guillotina: ## Start Guillotina Test Acceptance Server (docker container)
	docker-compose -f g-api/docker-compose.yml up > /dev/null

.PHONY: start-test-acceptance-frontend-guillotina
start-test-acceptance-frontend-guillotina: ## Start the Guillotina Acceptance Frontend Fixture
	ADDONS=volto-guillotina RAZZLE_API_PATH=http://localhost:8081/db/web RAZZLE_LEGACY_TRAVERSE=true yarn build && yarn start:prod

.PHONY: test-acceptance-guillotina
test-acceptance-guillotina: ## Start the Guillotina Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=guillotina $(NODEBIN)/cypress open --config specPattern='cypress/tests/guillotina/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-guillotina-headless
test-acceptance-guillotina-headless: ## Start the Guillotina Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=guillotina $(NODEBIN)/cypress run --config specPattern='cypress/tests/guillotina/**/*.{js,jsx,ts,tsx}'

.PHONY: full-test-acceptance-guillotina
full-test-acceptance-guillotina: ## Runs the Guillotina Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server-guillotina" http-get://localhost:8081 "make start-test-acceptance-frontend-guillotina" http://localhost:3000 "make test-acceptance-guillotina-headless"

######### Plone 5 Acceptance tests

.PHONY: start-test-acceptance-server-5
start-test-acceptance-server-5: ## Start Test Acceptance Server Main Fixture Plone 5 (docker container)
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS5) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE5) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING
