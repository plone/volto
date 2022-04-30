# Yeoman Volto App development

### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# Update the versions depending on your project requirements | Last Updated 2022-04-21
DOCKER_IMAGE=plone/plone-backend:6.0.0a4
KGS=plone.restapi==8.22.0 plone.volto==4.0.0a4 plone.rest==2.0.0a5 plone.app.iterate==4.0.2 plone.app.vocabularies==4.3.0
NODEBIN = ./node_modules/.bin

# Project settings

DIR=$(shell basename $$(pwd))

# Recipe snippets for reuse

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`


# Top-level targets
.PHONY: all
all: project

.PHONY: start-test-backend
start-test-backend: ## Start Test Plone Backend
	@echo "$(GREEN)==> Start Test Plone Backend$(RESET)"
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) plone.app.robotframework==2.0.0a3 plone.app.testing==7.0.0a2 plone.app.contenttypes' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING
	## KGS in case you need a Plone 5.2 series (comment/remove above line):
	# docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) plone.app.robotframework==2.0.0a3 plone.app.contenttypes' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: start-backend-docker
start-backend-docker:		## Starts a Docker-based backend
	@echo "$(GREEN)==> Start Docker-based Plone Backend$(RESET)"
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

.PHONY: help
help:		## Show this help.
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"
