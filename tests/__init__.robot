# Run: PYTHONPATH=$(pwd)/tests api/bin/pybot tests
# See: http://robotframework.org/robotframework/2.8.7/RobotFrameworkUserGuide.html#initialization-files
*** Settings ***

Library         SeleniumLibrary  timeout=10  implicit_wait=0
Library         OperatingSystem
Library         Process
Library         WebpackLibrary

Suite Setup     Suite Setup
Suite Teardown  Suite Teardown

Test Setup      Test Setup
Test Teardown   Test Teardown

*** Variables ***

${FIXTURE}             plone.app.robotframework.testing.PLONE_ROBOT_TESTING
@{CONFIGURE_PACKAGES}  plone.app.versioningbehavior
...                    plone.app.contenttypes
...                    plone.restapi
...                    config_module
@{APPLY_PROFILES}      plone.app.contenttypes:plone-content
...                    plone.restapi:tiles


*** Keywords ***

Start Guillotina Backend
    Set Environment Variable  API_PATH  http://localhost:8081/db/container
    Log To Console  Starting Guillotina
    ${result} =  Run Process  docker-compose -f g-api/docker-compose-local.yml up -d  shell=True  stdout=${TEMPDIR}/stdout.txt	stderr=${TEMPDIR}/stderr.txt
    Log To Console  ${result.stderr}

Start Plone Backend
    Import Library  plone.app.robotframework.Zope2Server
    ${PORT}=  Get Environment Variable  ZSERVER_PORT  55001
    Set Environment Variable  API_PATH  http://localhost:${PORT}/plone
    Set Environment Variable  Z3C_AUTOINCLUDE_DEPENDENCIES_DISABLED  1
    Start Zope server  ${FIXTURE}

Stop Plone Backend
    Import Library  plone.app.robotframework.Zope2Server
    Stop Zope server

Start Plone React
    Log To Console  Starting Webpack
    Start Webpack  yarn start:prod
    ...            check=to be executed: NODE_ENV=production node build/server.js

Suite Setup
    Run Keyword If   '${API}' == 'Plone'   Start Plone Backend
    Run Keyword If   '${API}' == 'Guillotina'   Start Guillotina Backend
    Start Plone React


Suite Teardown
    Stop Webpack
    Run Keyword If   '${API}' == 'Plone'  Stop Plone Backend
    Run Keyword If   '${API}' == 'Guillotina'   Run  docker-compose -f g-api/docker-compose-local.yaml stop
