# Yeoman Volto App Generator development

### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules


# Top-level targets

.PHONY: all
all: build-backend

.PHONY: Build Plone 5.2
build-backend:  ## Build Plone 5.2
	(cd api && virtualenv --clear --python=python3 .)
	(cd api && bin/pip install --upgrade pip)
	(cd api && bin/pip install -r requirements.txt)
	(cd api && bin/buildout)

.PHONY: test-acceptance-server
test-acceptance-server:
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: test-acceptance-guillotina
test-acceptance-guillotina:
	docker compose -f g-api/docker-compose.yml up > /dev/null
