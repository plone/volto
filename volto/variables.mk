INSTANCE_PORT=8080
DOCKER_IMAGE=plone/server-dev:6.1.0
DOCKER_IMAGE_ACCEPTANCE=plone/server-acceptance:6.1.0
KGS=
NODEBIN = ./node_modules/.bin
SCRIPTSPACKAGE = ./packages/scripts

# Plone 5 legacy
DOCKER_IMAGE5=plone/plone-backend:5.2.12
KGS5=plone.restapi==9.8.0 plone.volto==4.2.0 plone.rest==3.0.1
TESTING_ADDONS=plone.app.robotframework==2.0.0 plone.app.testing==7.0.1
