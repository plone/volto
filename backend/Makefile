### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

IMAGE_NAME_PREFIX=ghcr.io/collective/p2
IMAGE_TAG=latest

# Python checks
PYTHON?=python3

# installed?
ifeq (, $(shell which $(PYTHON) ))
  $(error "PYTHON=$(PYTHON) not found in $(PATH)")
endif

# version ok?
PYTHON_VERSION_MIN=3.8
PYTHON_VERSION_OK=$(shell $(PYTHON) -c "import sys; print((int(sys.version_info[0]), int(sys.version_info[1])) >= tuple(map(int, '$(PYTHON_VERSION_MIN)'.split('.'))))")
ifeq ($(PYTHON_VERSION_OK),0)
  $(error "Need python $(PYTHON_VERSION) >= $(PYTHON_VERSION_MIN)")
endif

PLONE_SITE_ID=Plone
BACKEND_FOLDER=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
PLONE_VERSION=$(shell cat $(BACKEND_FOLDER)/version.txt)
EXAMPLE_CONTENT_FOLDER=${BACKEND_FOLDER}/src/collective/addon/setuphandlers/examplecontent

GIT_FOLDER=$(BACKEND_FOLDER)/.git
VENV_FOLDER=$(BACKEND_FOLDER)/.venv
BIN_FOLDER=$(VENV_FOLDER)/bin


all: build

# Add the following 'help' target to your Makefile
# and add help text after each target name starting with ' ##'
# to return a pretty list of targets and their descriptions.
.PHONY: help
help: ## This help message
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"

$(BIN_FOLDER)/pip $(BIN_FOLDER)/tox $(BIN_FOLDER)/pipx $(BIN_FOLDER)/uv $(BIN_FOLDER)/mxdev:
	@echo "$(GREEN)==> Set up Python virtual environment$(RESET)"
	$(PYTHON) -m venv $(VENV_FOLDER)
	$(BIN_FOLDER)/pip install -U "pip" "uv" "wheel" "pipx" "mxdev" "tox" "pre-commit"
	if [ -d $(GIT_FOLDER) ]; then $(BIN_FOLDER)/pre-commit install; else echo "$(RED) Not installing pre-commit$(RESET)";fi

instance/etc/zope.ini: $(BIN_FOLDER)/pip ## Create instance configuration
	@echo "$(GREEN)==> Create instance configuration$(RESET)"
	$(BIN_FOLDER)/pipx run cookiecutter -f --no-input --config-file instance.yaml gh:plone/cookiecutter-zope-instance

.PHONY: config
config: instance/etc/zope.ini

.PHONY: build-dev
build-dev: config ## Install Plone packages
	@echo "$(GREEN)==> Setup Build$(RESET)"
	$(BIN_FOLDER)/mxdev -c mx.ini
	$(BIN_FOLDER)/uv pip install -r requirements-mxdev.txt

.PHONY: install
install: build-dev ## Install Plone

.PHONY: build
build: build-dev ## Install Plone

.PHONY: clean
clean: ## Clean development environment
	@echo "$(RED)==> Cleaning development environment$(RESET)"
	rm -rf $(VENV_FOLDER) pyvenv.cfg .installed.cfg instance .tox .venv .pytest_cache

.PHONY: start
start: ## Start a Plone instance on localhost:8080
	PYTHONWARNINGS=ignore $(BIN_FOLDER)/runwsgi instance/etc/zope.ini

.PHONY: console
console: instance/etc/zope.ini ## Start a console into a Plone instance
	PYTHONWARNINGS=ignore $(BIN_FOLDER)/zconsole debug instance/etc/zope.conf

.PHONY: create-site
create-site: instance/etc/zope.ini ## Create a new site from scratch
	PYTHONWARNINGS=ignore $(BIN_FOLDER)/zconsole run instance/etc/zope.conf ./scripts/create_site.py

# Example Content
.PHONY: update-example-content
update-example-content: $(BIN_FOLDER)/tox ## Export example content inside package
	@echo "$(GREEN)==> Export example content into $(EXAMPLE_CONTENT_FOLDER) $(RESET)"
	if [ -d $(EXAMPLE_CONTENT_FOLDER)/content ]; then rm -r $(EXAMPLE_CONTENT_FOLDER)/* ;fi
	$(BIN_FOLDER)/plone-exporter instance/etc/zope.conf $(PLONE_SITE_ID) $(EXAMPLE_CONTENT_FOLDER)

.PHONY: check
check: $(BIN_FOLDER)/tox ## Check and fix code base according to Plone standards
	@echo "$(GREEN)==> Format codebase$(RESET)"
	$(BIN_FOLDER)/tox -e lint

# i18n
$(BIN_FOLDER)/i18ndude: $(BIN_FOLDER)/pip ## Install translation and internationalization (i18n) tools
	@echo "$(GREEN)==> Install translation tools$(RESET)"
	$(BIN_FOLDER)/uv pip install i18ndude

.PHONY: i18n
i18n: $(BIN_FOLDER)/i18ndude ## Update locales
	@echo "$(GREEN)==> Updating locales$(RESET)"
	$(BIN_FOLDER)/update_locale

# Tests
.PHONY: test
test: $(BIN_FOLDER)/tox ## run tests
	$(BIN_FOLDER)/tox -e test

.PHONY: test-coverage
test-coverage: $(BIN_FOLDER)/tox ## run tests with coverage
	$(BIN_FOLDER)/tox -e coverage

# Build Docker images
.PHONY: build-image
build-image:  ## Build Docker Images
	@DOCKER_BUILDKIT=1 docker build . -t $(IMAGE_NAME_PREFIX)-backend:$(IMAGE_TAG) -f Dockerfile --build-arg PLONE_VERSION=$(PLONE_VERSION)

# Acceptance tests
.PHONY: acceptance-backend-start
acceptance-backend-start: ## Start backend acceptance server
	ZSERVER_HOST=0.0.0.0 ZSERVER_PORT=55001 LISTEN_PORT=55001 APPLY_PROFILES="collective/addon:default" CONFIGURE_PACKAGES="plone.restapi,plone.volto,plone.volto.cors,collective/addon" $(BIN_FOLDER)/robot-server plone.app.robotframework.testing.VOLTO_ROBOT_TESTING

.PHONY: acceptance-image-build
acceptance-image-build:  ## Build Docker Images
	@DOCKER_BUILDKIT=1 docker build . -t $(IMAGE_NAME_PREFIX)-backend-acceptance:$(IMAGE_TAG) -f Dockerfile.acceptance --build-arg PLONE_VERSION=$(PLONE_VERSION)
