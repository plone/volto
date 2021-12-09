# Volto Plone API development

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

# Recipe snippets for reuse

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

.PHONY: build
build: ./.installed.cfg ## Build Plone 5.2

.PHONY: test
test: build
	bin/test

.PHONY: test-acceptance-server-old
test-acceptance-server-old: build
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: clean
clean:
	rm -rf bin eggs develop-eggs include lib parts .installed.cfg .mr.developer.cfg


.PHONY: start
start: build ## Start Plone Backend
	@echo "$(GREEN)==> Start Plone Backend$(RESET)"
	PYTHONWARNINGS=ignore bin/instance fg

.PHONY: start-test
start-test: build ## Start Test Plone Backend
	@echo "$(GREEN)==> Start Test Plone Backend$(RESET)"
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING


# Real targets

./.installed.cfg: ./bin/buildout ./buildout.cfg ./src/*/setup.py
	"$(<)" instance:http-address=$(INSTANCE_PORT)

./bin/buildout: ./requirements.txt ./bin/pip
	bin/pip install --upgrade pip
	bin/pip install --upgrade wheel
	bin/pip install -r "$(<)"

./bin/pip:
	python3 -m venv .
