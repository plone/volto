*** Settings ***

Library  DebugLibrary
Library  SeleniumLibrary  timeout=30  implicit_wait=0

*** Variables ***

${FIXTURE}             plone.app.robotframework.testing.PLONE_ROBOT_TESTING
@{APPLY_PROFILES}      plone.app.contenttypes:plone-content
...                    plone.restapi:tiles
${FRONTEND_URL}        http://localhost:4300/
${BROWSER}             chrome

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

Open headless browser
  [arguments]  ${URL}  ${BROWSER}  ${ALIAS}
  ${options}=  Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys, selenium.webdriver
  Call Method  ${options}  add_argument  headless
  Call Method  ${options}  add_argument  disable-gpu
  Call Method  ${options}  add_argument  disable-web-security
  Call Method  ${options}  add_argument  window-size\=1280,1024
  Call Method  ${options}  add_argument  remote-debugging-port\=9223
  Create WebDriver  Chrome  chrome_options=${options}

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

# --- Given ------------------------------------------------------------------
# Given keywords are pre-conditions of the test.
# Given keywords should not contain any Selenium code or actions.
# The first Given keyword should always indicate which user carries out the
# action (e.g. 'A logged in user')
# The second Given keyword (with an 'and') should always indicate where the
# action is carried out (e.g. 'the front page')

A logged in site-administrator
  Go to  ${FRONTEND_URL}
  I log in

the front page
    Go to  ${FRONTEND_URL}

the Plone site root
    Wait until page contains  Home
    Click link  Home


# --- When -------------------------------------------------------------------
# When keywords declare the action under test.
# When keywords should always start with 'I' to indicate the user action that
# is carried out.
# When keywords should be unique and not have an additional 'and' keyword.
# We always want to test a single action.

I log in
    [Arguments]   ${username}=admin  ${password}=secret
    ...           ${selector}=.tools a[href^="/login"]
    ${src}=  Get Source
    Log  ${src}  WARN  html=yes
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


# --- Then -------------------------------------------------------------------
# Then keywords should always be start with 'I should be' to indicate that
# we check that something should have happend in the past
# (in the 'When' keyword or action)

I should be logged out
    Element should not be visible  css=.left.fixed.menu

I should be logged in
    Wait until element is visible  css=.left.fixed.menu
