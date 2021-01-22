all: build-backend

.PHONY: Build Plone 5.2
build-backend:  ## Build Plone 5.2
	(cd api && virtualenv --clear --python=python3 .)
	(cd api && bin/pip install --upgrade pip)
	(cd api && bin/pip install -r requirements.txt)
	(cd api && bin/buildout)

test-acceptance-server:
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.volto,kitconcept.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.volto:default ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

test-acceptance-guillotina:
	docker-compose -f g-api/docker-compose.yml up > /dev/null

.PHONY: all test-acceptance
