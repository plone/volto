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

# Allow setting the language for backend-docker-start. Default is `en`.
LANGUAGE ?=en

# Recipe snippets for reuse

CHECKOUT_BASENAME="$(shell basename $(shell realpath ./))"
CHECKOUT_BRANCH=$(shell git branch --show-current)
CHECKOUT_TMP=../$(CHECKOUT_BASENAME).tmp
CHECKOUT_TMP_ABS="$(shell realpath $(CHECKOUT_TMP))"

CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

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
start: ## Starts Plone 7 in development mode
	pnpm start

.PHONY: build
build: ## Build a production bundle for distribution
	pnpm build

.PHONY: test
test: ## Run unit tests
	pnpm test

.PHONY: clean
clean: ## Clean development environment
	rm -rf node_modules

##### Build

../../packages/registry/dist: $(shell find ../../packages/registry/src -type f)
	(cd ../../ && pnpm build:registry)

../../packages/components/dist: $(shell find .../../packages/components/src -type f)
	(cd ../../ && pnpm build:components)

../../packages/client/dist: $(shell find ../../packages/client/src -type f)
	(cd ../../ && pnpm build:client)

../../packages/helpers/dist: $(shell find ../../packages/helpers/src -type f)
	(cd ../../ && pnpm build:helpers)

../../packages/react-router/dist: $(shell find .../../packages/react-router/src -type f)
	(cd ../../ && pnpm build:react-router)

.PHONY: build-deps
build-deps: ../../packages/registry/dist ../../packages/components/dist ../../packages/client/dist ../../packages/react-router/dist ../../packages/helpers/dist ## Build dependencies

## Storybook

.PHONY: storybook-start
storybook-start: ## Start Storybook server on port 6006
	@echo "$(GREEN)==> Start Storybook$(RESET)"
	pnpm run storybook

.PHONY: storybook-build
storybook-build: build-deps ## Build Storybook
	pnpm build-storybook -o ../../docs/_build/html/storybook

##### Release (it runs the one inside)

.PHONY: release-notes-copy-to-docs
release-notes-copy-to-docs: ## Copy release notes into documentation
	cp CHANGELOG.md ../../docs/source/release-notes/index.md
	git add ../../docs/source/release-notes/index.md
