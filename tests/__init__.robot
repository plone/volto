# Run: PYTHONPATH=$(pwd)/tests api/bin/pybot tests
# See: http://robotframework.org/robotframework/2.8.7/RobotFrameworkUserGuide.html#initialization-files
*** Settings ***

Library         SeleniumLibrary  timeout=10  implicit_wait=0
Library         plone.app.robotframework.Zope2Server
Library         OperatingSystem
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
...                    plone.restapi:default

*** Keywords ***

Suite Setup
    ${PORT}=  Get Environment Variable  ZSERVER_PORT  55001
    Set Environment Variable  API_PATH  http://localhost:${PORT}/plone
    Set Environment Variable  Z3C_AUTOINCLUDE_DEPENDENCIES_DISABLED  1
    Start Zope server  ${FIXTURE}
    Start Webpack  yarn start
    ...            check=Executing script: run_prod_server

Suite Teardown
    Stop Webpack
    Stop Zope server
