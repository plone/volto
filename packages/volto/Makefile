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

# Project settings (read from repo root)
include ../../variables.mk

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

# TODO: Review release commands for all packages
# Use TurboRepo

.PHONY: build-frontend
build-frontend:
	pnpm i && RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build

.PHONY: clean
clean:
	rm -rf node_modules

##### Build

.PHONY: storybook-build
storybook-build: build-deps
	pnpm build-storybook -o ../../docs/_build/storybook

.PHONY: patches
patches:
	/bin/bash patches/patchit.sh > /dev/null 2>&1 ||true

.PHONY: cypress-install
cypress-install:
	$(NODEBIN)/cypress install

.PHONY: build-deps
build-deps:
	@if [ ! -d $$(pwd)/../registry/dist ] || [ $$(find $$(pwd)/../registry -newer $$(pwd)/../registry/dist -print -quit) ]; then \
		(cd ../../ && pnpm build:deps); \
	fi


##### Release (it runs the one inside)

.PHONY: copyreleasenotestodocs
copyreleasenotestodocs:
	cp CHANGELOG.md ../../docs/source/release-notes/index.md
	git add ../../docs/source/release-notes/index.md

##### Docker containers

.PHONY: start-backend-docker
start-backend-docker:
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

.PHONY: start-frontend-docker
start-frontend-docker:
	docker run -it --rm --name=volto --link backend -p 3000:3000 -e RAZZLE_INTERNAL_API_PATH=http://backend:8080/Plone -e RAZZLE_DEV_PROXY_API_PATH=http://backend:8080/Plone plone/plone-frontend:latest

.PHONY: start-backend-docker-guillotina
start-backend-docker-guillotina:
	docker-compose -f ../../g-api/docker-compose.yml up -d

.PHONY: stop-backend-docker-guillotina
stop-backend-docker-guillotina:
	docker-compose -f ../../g-api/docker-compose.yml down

##### Acceptance tests (Cypress)
######### Dev mode Acceptance tests

.PHONY: start-test-acceptance-frontend-dev
start-test-acceptance-frontend-dev: build-deps ## Start the Core Acceptance Frontend Fixture in dev mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm start

######### Core Acceptance tests

.PHONY: start-test-acceptance-server test-acceptance-server
start-test-acceptance-server test-acceptance-server: ## Start Test Acceptance Server Main Fixture (docker container)
	# Temporarily not using the official acceptance docker image because we wan to use the latest version of plone.restapi
	# docker run -i --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)
	# Uncomment next and comment above to use a custom image with the acceptance server (in case you need to use an specific backend add-on or version)
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: start-test-acceptance-frontend
start-test-acceptance-frontend: build-deps ## Start the Core Acceptance Frontend Fixture
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: test-acceptance
test-acceptance: ## Start Core Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open

.PHONY: test-acceptance-headless
test-acceptance-headless: ## Start Core Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/core/**/*.{js,jsx,ts,tsx}'

.PHONY: full-test-acceptance
full-test-acceptance: ## Runs Core Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server" http-get://127.0.0.1:55001/plone "make start-test-acceptance-frontend" http://127.0.0.1:3000 "make test-acceptance-headless"

######### Seamless Core Acceptance tests

.PHONY: start-test-acceptance-frontend-seamless
start-test-acceptance-frontend-seamless: build-deps ## Start the Seamless Core Acceptance Frontend Fixture
	pnpm build && pnpm start:prod

.PHONY: test-acceptance-seamless
test-acceptance-seamless: ## Start Seamless Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config baseUrl='http://localhost'

.PHONY: start-test-acceptance-webserver-seamless
start-test-acceptance-webserver-seamless: ## Start the seamless webserver
	cd cypress/docker && docker-compose -f seamless.yml up

.PHONY: full-test-acceptance-seamless
full-test-acceptance-seamless: ## Runs Seamless Core Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server" http-get://127.0.0.1:55001/plone "make start-test-acceptance-frontend-seamless" http://127.0.0.1:3000 "make test-acceptance-headless"

######### Project Acceptance tests

.PHONY: start-test-acceptance-frontend-project
start-test-acceptance-frontend-project: ## Start the Project Acceptance Frontend Fixture
	(cd ../../my-volto-app && RAZZLE_API_PATH=http://127.0.0.1:55001/plone yarn build && yarn start:prod)

######### CoreSandbox Acceptance tests

.PHONY: start-test-acceptance-server-coresandbox test-acceptance-server-coresandbox
start-test-acceptance-server-coresandbox test-acceptance-server-coresandbox: ## Start CoreSandbox Test Acceptance Server Fixture (docker container)
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage,plone.volto:coresandbox -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors,plone.volto.coresandbox $(DOCKER_IMAGE_ACCEPTANCE)
	# ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors,plone.volto.coresandbox APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage,plone.volto:coresandbox ./api/bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: start-test-acceptance-frontend-coresandbox
start-test-acceptance-frontend-coresandbox: build-deps ## Start the CoreSandbox Acceptance Frontend Fixture
	ADDONS=@plone/volto-coresandbox RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: start-test-acceptance-frontend-coresandbox-dev
start-test-acceptance-frontend-coresandbox-dev: build-deps ## Start the CoreSandbox Acceptance Frontend Fixture in dev mode
	ADDONS=@plone/volto-coresandbox RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm start

.PHONY: test-acceptance-coresandbox
test-acceptance-coresandbox: ## Start CoreSandbox Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/coresandbox/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-coresandbox-headless
test-acceptance-coresandbox-headless: ## Start CoreSandbox Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/coresandbox/**/*.{js,jsx,ts,tsx}'

.PHONY: full-test-acceptance-coresandbox
full-test-acceptance-coresandbox: ## Runs CoreSandbox Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server-coresandbox" http-get://127.0.0.1:55001/plone "make start-test-acceptance-frontend-coresandbox" http://127.0.0.1:3000 "make test-acceptance-coresandbox-headless"

######### Multilingual Acceptance tests

.PHONY: start-test-acceptance-server-multilingual test-acceptance-server-multilingual
start-test-acceptance-server-multilingual test-acceptance-server-multilingual: ## Start Multilingual Acceptance Server Multilingual Fixture (docker container)
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:multilingual $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: start-test-acceptance-frontend-multilingual
start-test-acceptance-frontend-multilingual: build-deps ## Start the Multilingual Acceptance Frontend Fixture
	ADDONS=@plone/volto-coresandbox:multilingualFixture RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: test-acceptance-multilingual
test-acceptance-multilingual: ## Start Multilingual Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-multilingual-headless
test-acceptance-multilingual-headless: ## Start Multilingual Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: full-test-acceptance-multilingual
full-test-acceptance-multilingual: ## Runs Multilingual Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server-multilingual" http-get://127.0.0.1:55001/plone "make start-test-acceptance-frontend-multilingual" http://127.0.0.1:3000 "make test-acceptance-multilingual-headless"

######### Seamless Multilingual Acceptance tests

.PHONY: start-test-acceptance-server-seamless-multilingual test-acceptance-server-seamless-multilingual
start-test-acceptance-server-seamless-multilingual test-acceptance-server-seamless-multilingual: ## Start Seamless Multilingual Acceptance Server Multilingual Fixture (docker container)
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:multilingual $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: start-test-acceptance-frontend-seamless-multilingual
start-test-acceptance-frontend-seamless-multilingual: build-deps ## Start the Seamless Multilingual Acceptance Frontend Fixture
	ADDONS=@plone/volto-coresandbox:multilingualFixture pnpm build && pnpm start:prod

.PHONY: test-acceptance-seamless-multilingual
test-acceptance-seamless-multilingual: ## Start Seamless Multilingual Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config baseUrl='http://localhost',specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-seamless-multilingual-headless
test-acceptance-seamless-multilingual-headless: ## Start Seamless Multilingual Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/multilingual/**/*.{js,jsx,ts,tsx}'

.PHONY: full-test-acceptance-seamless-multilingual
full-test-acceptance-seamless-multilingual: ## Runs Seamless Multilingual Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server-seamless-multilingual" http-get://127.0.0.1:55001/plone "make start-test-acceptance-frontend-seamless-multilingual" http://127.0.0.1:3000 "make test-acceptance-multilingual-headless"

######### WorkingCopy Acceptance tests

.PHONY: start-test-acceptance-server-workingcopy test-acceptance-server-workingcopy
start-test-acceptance-server-workingcopy test-acceptance-server-workingcopy : ## Start the WorkingCopy Acceptance Server  Fixture (docker container)
	docker run -i --rm -p 55001:55001 -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage $(DOCKER_IMAGE_ACCEPTANCE)
	# ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.app.iterate,plone.volto,plone.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.iterate:default,plone.volto:default-homepage ./api/bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: start-test-acceptance-frontend-workingcopy
start-test-acceptance-frontend-workingcopy: build-deps ## Start the WorkingCopy Acceptance Frontend Fixture
	ADDONS=@plone/volto-coresandbox:workingCopyFixture RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: test-acceptance-workingcopy
test-acceptance-workingcopy: ## Start WorkingCopy Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open --config specPattern='cypress/tests/workingCopy/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-workingcopy-headless
test-acceptance-workingcopy-headless: ## Start WorkingCopy Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run --config specPattern='cypress/tests/workingCopy/**/*.{js,jsx,ts,tsx}'

.PHONY: full-test-acceptance-workingcopy
full-test-acceptance-workingcopy: ## Runs WorkingCopy Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server-workingcopy" http-get://127.0.0.1:55001/plone "make start-test-acceptance-frontend-workingcopy" http://127.0.0.1:3000 "make test-acceptance-workingcopy-headless"

######### Guillotina Acceptance tests

.PHONY: start-test-acceptance-server-guillotina
start-test-acceptance-server-guillotina: ## Start Guillotina Test Acceptance Server (docker container)
	docker-compose -f g-api/docker-compose.yml up > /dev/null

.PHONY: start-test-acceptance-frontend-guillotina
start-test-acceptance-frontend-guillotina: ## Start the Guillotina Acceptance Frontend Fixture
	ADDONS=volto-guillotina RAZZLE_API_PATH=http://127.0.0.1:8081/db/web RAZZLE_LEGACY_TRAVERSE=true pnpm build && pnpm start:prod

.PHONY: test-acceptance-guillotina
test-acceptance-guillotina: ## Start the Guillotina Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=guillotina $(NODEBIN)/cypress open --config specPattern='cypress/tests/guillotina/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-guillotina-headless
test-acceptance-guillotina-headless: ## Start the Guillotina Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=guillotina $(NODEBIN)/cypress run --config specPattern='cypress/tests/guillotina/**/*.{js,jsx,ts,tsx}'

.PHONY: full-test-acceptance-guillotina
full-test-acceptance-guillotina: ## Runs the Guillotina Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server-guillotina" http-get://127.0.0.1:8081 "make start-test-acceptance-frontend-guillotina" http://127.0.0.1:3000 "make test-acceptance-guillotina-headless"

######### Plone 5 Acceptance tests

.PHONY: start-test-acceptance-server-5
start-test-acceptance-server-5: ## Start Test Acceptance Server Main Fixture Plone 5 (docker container)
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS5) $(TESTING_ADDONS)' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE5) ./bin/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING
