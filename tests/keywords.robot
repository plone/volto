*** Settings ***

Library  DebugLibrary
Library  SeleniumLibrary  timeout=30  implicit_wait=0

*** Variables ***

${FIXTURE}    plone.app.robotframework.testing.PLONE_ROBOT_TESTING
${FRONTEND_URL}  http://localhost:4300/
${BROWSER}    chrome

*** Keywords ***

### Test Setup and Test Teardown are only called when robot tests are run for
### the whole directory (see: ./__init__.robot). These keyword import
### Zope2Server library to make it possible to run individual test case
### files without Zope2Server in PYTHONPATH of pybot test runner.

Test Setup
    Import library  plone.app.robotframework.Zope2Server
    Set Zope layer  ${FIXTURE}
    ZODB Setup
    Open default browser

Test Teardown
    Import library  plone.app.robotframework.Zope2Server
    Set Zope layer  ${FIXTURE}
    ZODB TearDown
    Close all browsers

###

Create default browser
    [Documentation]  Opens a new browser window based on configured ${BROWSER}
    ${on_failure}=  Register keyword to run on failure  Close Browser
    Wait until keyword succeeds  60s  1s
    ...  Open browser  ${FRONTEND_URL}  browser=${BROWSER}  alias=default
    Register keyword to run on failure  ${on_failure}
    Set window size  1200  900

Open default browser
    [Documentation]  Opens a new browser window or switches to existing one
    ${status}=  Run Keyword And Ignore Error  Switch browser  default
    Run Keyword If  '${status[0]}' == 'FAIL'  Create default browser

###

Frontpage
    Go to  ${FRONTEND_URL}
    Wait until keyword succeeds  120s  1s
    ...   Page fully loaded

Page fully loaded
    Go to  ${FRONTEND_URL}
    Page should contain  Plone

Logged out
    Element should not be visible  css=.left.fixed.menu

Logged in
    Wait until element is visible  css=.left.fixed.menu

Log in
    [Arguments]   ${username}=admin  ${password}=secret
    ...           ${selector}=.tools a[href^="/login"]
    Wait until page contains element  css=${selector}
    Element should be visible  css=${selector}
    Element should contain  css=${selector}  Log in
    Click element  css=${selector}
    Wait until element is visible  id=login
    Element should be visible  id=password
    Element should be visible  id=login-form-submit
    Input text  id=login  ${username}
    Input text  id=password  ${password}
    Click button  id=login-form-submit
    Wait until page does not contain  id=login-form-submit
