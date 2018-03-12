*** Settings ***

Library  SeleniumLibrary  timeout=10  implicit_wait=0

*** Variables ***

${FIXTURE}    plone.app.robotframework.testing.PLONE_ROBOT_TESTING
${PLONE_URL}  http://localhost:4300/
${BROWSER}    firefox

*** Keywords ***

### Test Setup and Test Teardown are only called when robot tests are run for
### the whole directory (see: ./__init__.robot). These keyword import
### Zope2Server library to make it possible to run individual test case
### files without Zope2Server in PYTHONPATH of pybot test runner.

Test Setup
    Import library  plone.app.robotframework.Zope2Server
    Set Zope layer  ${FIXTURE}
    ZODB Setup

    ${PREV} =  Register keyword to run on failure  Close Browser
    Wait until keyword succeeds  60s  1s
    ...  Open browser  ${PLONE_URL}  browser=${BROWSER}
    Register keyword to run on failure  ${PREV}
    Set window size  1200  900

Test Teardown
    Import library  plone.app.robotframework.Zope2Server
    Close all browsers
    Set Zope layer  ${FIXTURE}
    ZODB TearDown

###

Frontpage
    Go to  ${PLONE_URL}

Logged out
    Element should not be visible  css=.left.fixed.menu

Logged in
    Element should be visible  css=.left.fixed.menu

Log in
    [Arguments]   ${username}=admin  ${password}=secret
    ...           ${selector}=.tools a[href^="/login"]
    Page should contain element  css=${selector}
    Element should be visible  css=${selector}
    Element should contain  css=${selector}  Log in
    Click element  css=${selector}
    Element should be visible  id=login
    Element should be visible  id=password
    Element should be visible  id=login-form-submit
    Input text  id=login  ${username}
    Input text  id=password  ${password}
    Click button  id=login-form-submit
    Wait until page does not contain  id=login-form-submit
