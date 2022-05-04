SHELL=/bin/bash

DIR=$(shell basename $$(pwd))
ADDON ?= volto-slate:asDefault,asDefaultRichText

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

build-frontend:
	npm install -g yo
	npm install -g @plone/generator-volto
	npm install -g mrs-developer
	yo @plone/volto project --addon ${ADDON} --workspace "src/addons/${DIR}" --no-interactive
	ln -sf $$(pwd) project/src/addons/
	cp .project.eslintrc.js .eslintrc.js
	cd project && yarn
	@echo "-------------------"
	@echo "Project is ready!"
	@echo "Now run: cd project && yarn start"

.PHONY: build-backend
build-backend:  ## Build Plone 5.2
	(cd api && python3 -m venv .)
	(cd api && bin/pip install --upgrade pip)
	(cd api && bin/pip install --upgrade wheel)
	(cd api && bin/pip install -r requirements.txt)
	(cd api && bin/buildout)

.PHONY: build
build:
	make build-backend
	make build-frontend

all: build

.PHONY: start-backend
start-backend: ## Start Plone Backend
	@echo "$(GREEN)==> Start Plone Backend$(RESET)"
	(cd api && PYTHONWARNINGS=ignore bin/instance fg)

.PHONY: start-test-backend
start-test-backend: ## Start Test Plone Backend
	@echo "$(GREEN)==> Start Test Plone Backend$(RESET)"
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.volto,kitconcept.volto.cors,eea.volto.slate APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.volto:default-homepage,eea.volto.slate:default ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: start-docker-backend
start-docker-backend:
	@echo "$(GREEN)==> Start Plone Backend$(RESET)"
	docker pull plone
	docker run -it --rm -e SITE="Plone" -e ADDONS="eea.schema.slate" -e VERSIONS="plone.schema=1.3.0 plone.restapi=8.9.1" -e PROFILES="profile-plone.restapi:blocks" -p 8080:8080 plone fg

.PHONY: help
help:		## Show this help.
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"

.PHONY: test
test:
	docker pull plone/volto-addon-ci
	docker run -it --rm -e GIT_NAME=volto-slate -e RAZZLE_JEST_CONFIG=jest-addon.config.js -v "$$(pwd):/opt/frontend/my-volto-project/src/addons/volto-slate" plone/volto-addon-ci yarn test --watchAll=false

.PHONY: test-update
test-update:
	docker pull plone/volto-addon-ci
	docker run -it --rm -e GIT_NAME=volto-slate -e RAZZLE_JEST_CONFIG=jest-addon.config.js -v "$$(pwd):/opt/frontend/my-volto-project/src/addons/volto-slate" plone/volto-addon-ci yarn test --watchAll=false -u

.PHONY: test-acceptance-server
test-acceptance-server: ## Run test acceptance server
	docker run -i --rm --name=plone -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e SITE=plone -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.volto,kitconcept.volto.cors -e ADDONS='plone.app.robotframework plone.app.contenttypes plone.restapi kitconcept.volto' plone ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

#
# build-frontend:
# 	yarn && RAZZLE_API_PATH=http://localhost:55001/plone yarn build
#
# .PHONY: Build Plone 5.2
# build-backend:  ## Build Plone 5.2
# 	(cd api && python3 -m venv .)
# 	(cd api && bin/pip install --upgrade pip)
# 	(cd api && bin/pip install --upgrade wheel)
# 	(cd api && bin/pip install -r requirements.txt)
# 	(cd api && bin/buildout)
#
# .PHONY: Build Plone 5.2 in specific port
# build-backend-withport:  ## Build Plone 5.2 with port
# 	(cd api && python3 -m venv .)
# 	(cd api && bin/pip install --upgrade pip)
# 	(cd api && bin/pip install --upgrade wheel)
# 	(cd api && bin/pip install -r requirements.txt)
# 	(cd api && bin/buildout instance:http-address=$(INSTANCE_PORT))
#
# dist:
# 	yarn
# 	yarn build
#
# test:
# 	(cd api && bin/test)
#
# docs-serve:
# 	(cd docs && ../bin/mkdocs serve)
#
# docs-build:
# 	# The build in netlify breaks because they have not installed ensurepip
# 	# So we should continue using virtualenv
# 	virtualenv --python=python3 .
# 	./bin/pip install -r requirements-docs.txt
# 	(cd docs && ../bin/mkdocs build)
#
# start-frontend: dist
# 	yarn start:prod
#
# start-backend-docker:
# 	docker run -it --rm --name=plone -p 8080:8080 -e SITE=Plone -e ADDONS="kitconcept.volto" -e ZCML="kitconcept.volto.cors" plone
#
# start-backend-docker-guillotina:
# 	docker-compose -f g-api/docker-compose.yml up -d
#
# stop-backend-docker-guillotina:
# 	docker-compose -f g-api/docker-compose.yml down
#
# test-acceptance-server:
# 	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e SITE=plone -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.volto,kitconcept.volto.cors -e ADDONS='plone.app.robotframework plone.app.contenttypes plone.restapi kitconcept.volto' plone ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING
#
# test-acceptance-server-old:
# 	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.volto,kitconcept.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.volto:default-homepage ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING
#
# test-acceptance-guillotina:
# 	docker-compose -f g-api/docker-compose.yml up > /dev/null
#
# clean:
# 	(cd api && rm -rf bin eggs develop-eggs include lib parts .installed.cfg .mr.developer.cfg)
# 	rm -rf node_modules
#
# .PHONY: start-test-frontend
# start-test-frontend: ## Start Test Volto Frontend
# 	@echo "$(GREEN)==> Start Test Volto Frontend$(RESET)"
# 	RAZZLE_API_PATH=http://localhost:55001/plone yarn build && NODE_ENV=production node build/server.js
#
# .PHONY: start-test
# start-test: ## Start Test
# 	@echo "$(GREEN)==> Start Test$(RESET)"
# 	yarn cypress:open
#
# .PHONY: start-test-all
# start-test-all: ## Start Test
# 	@echo "$(GREEN)==> Start Test$(RESET)"
# 	yarn ci:cypress:run
#
# .PHONY: all start test-acceptance
