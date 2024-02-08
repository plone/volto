### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

include .env
export

ifndef DEPLOY_ENV
$(error DEPLOY_ENV is not set)
endif

ifndef DEPLOY_USER
$(error DEPLOY_USER is not set)
endif

ifndef DEPLOY_SCALES
	DEPLOY_SCALES=2
endif

ifeq ($(DEPLOY_ENV), dev)
	CONTEXT=dev
	CONTEXT_HOST=ssh://$(DEPLOY_USER)@$(DEPLOY_HOST):$(DEPLOY_PORT)
else ifeq ($(DEPLOY_ENV), prod)
	CONTEXT=prod
	CONTEXT_HOST=ssh://$(DEPLOY_USER)@$(DEPLOY_HOST):$(DEPLOY_PORT)
else
$(error DEPLOY_ENV is not supported)
endif

DOCKER=docker
DOCKER_CMD_CONTEXT=${DOCKER} --context ${CONTEXT}

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: clean
clean: ## remove all build, test, coverage and Python artifacts
	@echo "$(GREEN)==> Clean up the installation$(RESET)"
	rm -Rf bin lib lib64 include pyvenv.cfg .docker

bin/pip:
	@echo "$(GREEN)==> Python: Setup Virtual Env$(RESET)"
	python3 -m venv .
	bin/pip install -U pip pipx

bin/ansible:

.PHONY: setup
setup: bin/pip ## Ansible: Install Ansible and dependencies
	@echo "$(GREEN)==> Ansible: Install Ansible and dependencies $(RESET)"
	bin/pip install -r requirements/requirements.txt --upgrade
	bin/ansible-galaxy install -r requirements/roles.yml --force --no-deps
	bin/ansible-galaxy collection install -r requirements/collections.yml

.PHONY: docker-setup
docker-setup:  ## Docker: Setup remote docker context
	@echo "$(GREEN)==> Docker: Setup remote docker context named ${CONTEXT} $(RESET)"
	${DOCKER} context create ${CONTEXT} --description "Plone Conference Website 2070 deployment" --docker "host=${CONTEXT_HOST}"

.PHONY: docker-login
docker-login:  ## Docker: Login
	@echo "$(GREEN)==> Docker: Login$(RESET)"
	${DOCKER} login

.PHONY: docker-info
docker-info: ## Docker: Information about remote docker context
	@echo "$(GREEN)==> Docker: Information about remote docker context $(RESET)"
	${DOCKER_CMD_CONTEXT} info

.PHONY: server-setup
server-setup: bin/ansible ## Server: Configure a remote server
	@echo "$(GREEN)==> Server: Configure a remote server with Ansible$(RESET)"
	./bin/ansible-playbook playbooks/setup.yml --limit ${CONTEXT}

.PHONY: stack-deploy
stack-deploy: ## Deploy stacks: $(STACK_NAME)
	@echo "$(GREEN)==> Stack $(STACK_NAME): Deploy to context $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CMD_CONTEXT} stack deploy -c stacks/plone-conference-website-2070.example.com.yml $(STACK_NAME)

.PHONY: stack-create-site
stack-create-site: ## Create a new site stacks: $(STACK_NAME)
	@echo "$(GREEN)==> Stack $(STACK_NAME): Create site in context $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CMD_CONTEXT} exec `${DOCKER_CMD_CONTEXT} ps -qf 'name=$(STACK_NAME)_backend'|head -n1` ./docker-entrypoint.sh create-site

.PHONY: stack-status
stack-status: ## Check status of stack
	@echo "$(GREEN)==> Stack $(STACK_NAME): Status in context $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CMD_CONTEXT} stack ps -f "desired-state=running" $(STACK_NAME)

.PHONY: stack-logs-webserver
stack-logs-webserver: ## Display webserver logs
	@echo "$(GREEN)==> Stack $(STACK_NAME): Logs for webserver in context $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CMD_CONTEXT} service logs $(STACK_NAME)_traefik

.PHONY: stack-logs-frontend
stack-logs-frontend: ## Display frontend logs
	@echo "$(GREEN)==> Stack $(STACK_NAME): Logs for frontend in context $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CMD_CONTEXT} service logs $(STACK_NAME)_frontend

.PHONY: stack-logs-backend
stack-logs-backend: ## Display backend logs
	@echo "$(GREEN)==> Stack $(STACK_NAME): Logs for backend in context $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CMD_CONTEXT} service logs $(STACK_NAME)_backend

.PHONY: stack-scale-services
stack-scale-services: ## Scale services
	@echo "$(GREEN)==> Stack $(STACK_NAME): Scaling Frontend and Backend to $(DEPLOY_SCALES) in context $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CMD_CONTEXT} service scale $(STACK_NAME)_frontend=$(DEPLOY_SCALES) $(STACK_NAME)_backend=$(DEPLOY_SCALES)

.PHONY: all
all: ## Create new box, run ansible, deploy stack
	$(MAKE) run-bootstrap
	$(MAKE) deploy
