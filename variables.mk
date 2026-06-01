### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-eu -o pipefail -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=$(shell tput setaf 1)
GREEN=$(shell tput setaf 2)
RESET=$(shell tput sgr0)
YELLOW=$(shell tput setaf 3)
CYAN=$(shell tput setaf 6)

# Project variables
INSTANCE_PORT=8080
DOCKER_IMAGE=plone/server-dev:6.2.0rc1
DOCKER_IMAGE_ACCEPTANCE=plone/server-acceptance:6.2.0rc1
KGS=
NODEBIN = ./node_modules/.bin
SCRIPTSPACKAGE = ./packages/scripts
