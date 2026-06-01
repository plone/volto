# Project settings
include ../../variables.mk

CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Recipe snippets for reuse

CHECKOUT_BASENAME="$(shell basename $(shell realpath ./))"
CHECKOUT_BRANCH=$(shell git branch --show-current)
CHECKOUT_TMP=../$(CHECKOUT_BASENAME).tmp
CHECKOUT_TMP_ABS="$(shell realpath $(CHECKOUT_TMP))"

.PHONY: all
all: help

.PHONY: help
help: ## This help message
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/$(CYAN)\1$(RESET):\2/' | column -c2 -t -s :)"

.PHONY: install
install: ## Install dependencies
	pnpm install

.PHONY: build
build: ## Build the package
	pnpm run --if-present build

.PHONY: storybook-start
storybook-start: ## Start Storybook
	pnpm run storybook:main

.PHONY: storybook-build
storybook-build: ## Build Storybook
	pnpm run build-storybook
