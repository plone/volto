
# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: clean
clean: ## Clean installation
	@echo "Clean installation"
	rm -Rf node_modules .yarn/cache cache omelette build

.PHONY: build
build: install ## Build the frontend
	@echo "Build Frontend"
	yarn build

.PHONY: start
start: ## Start Frontend
	yarn start

.PHONY: format-prettier
format-prettier: ## Format Code with Prettier
	yarn run prettier:fix

.PHONY: format-stylelint
format-stylelint: ## Format Code with Stylelint
	yarn run stylelint:fix

.PHONY: format-lint
format-lint: ## Format Code with Lint
	yarn run lint:fix

.PHONY: format
format: format-prettier format-lint format-stylelint ## Format the codebase according to our standards

.PHONY: install
install: ## Install the frontend
	@echo "Install frontend"
	$(MAKE) preinstall
	yarn -v
	yarn install

.PHONY: preinstall
preinstall: ## Preinstall task, checks if missdev (mrs-developer) is present and runs it
	if [ -f $$(pwd)/mrs.developer.json ]; then make develop; fi

.PHONY: develop
develop: ## Runs missdev in the local project (mrs.developer.json should be present)
	if [ ! -f $$(pwd)/jsconfig.json ]; then npx -p mrs-developer missdev --output=lib --fetch-https; fi
