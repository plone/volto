*** Settings ***

Library  GuillotinaLibrary
Library  DebugLibrary
Library  RequestsLibrary
Library  SeleniumLibrary  timeout=30  implicit_wait=0

Variables  variables.py

*** Variables ***

${FIXTURE}             plone.app.robotframework.testing.PLONE_ROBOT_TESTING
@{APPLY_PROFILES}      plone.app.contenttypes:plone-content
...                    plone.restapi:tiles
${FRONTEND_URL}        http://localhost:3000/
${BROWSER}             chrome


*** Keywords ***

# --- TEST SETUP / TEARDOWN --------------------------------------------------
# Test Setup and Test Teardown are only called when robot tests are run for
# the whole directory (see: ./__init__.robot). These keyword import
# Zope2Server library to make it possible to run individual test case
# files without Zope2Server in PYTHONPATH of pybot test runner.

Test Setup
    Run Keyword If   '${API}' == 'Plone'   Import library  plone.app.robotframework.Zope2Server
    Run Keyword If   '${API}' == 'Plone'   Set Zope layer  ${FIXTURE}
    Run Keyword If   '${API}' == 'Plone'   ZODB Setup
    Run Keyword If   '${API}' == 'Guillotina'   Setup Guillotina  http://localhost:8081/db
    Open default browser

Test Teardown
    Run Keyword If   '${API}' == 'Plone'   Import library  plone.app.robotframework.Zope2Server
    Run Keyword If   '${API}' == 'Plone'   Set Zope layer  ${FIXTURE}
    Run Keyword If   '${API}' == 'Plone'   ZODB TearDown
    Close all browsers

# --- BROWSER ----------------------------------------------------------------

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

Skip test on Guillotina
    Pass execution if  '${API}' == 'Guillotina'  Skipping test on Guillotina

# --- Given ------------------------------------------------------------------
# Given keywords are pre-conditions of the test.
# Given keywords should not contain any Selenium code or actions.
# The first Given keyword should always indicate which user carries out the
# action (e.g. 'A logged in user')
# The second Given keyword (with an 'and') should always indicate where the
# action is carried out (e.g. 'the front page')

A logged in site-administrator
    Autologin as  admin  secret

the front page
    Go to  ${FRONTEND_URL}
    Wait until keyword succeeds  120s  1s
    ...   Page fully loaded

Page fully loaded
    Go to  ${FRONTEND_URL}
    Page should contain  Plone

the Plone site root
    Run Keyword If   '${API}' == 'Plone'   Wait until page contains  Home
    Run Keyword If   '${API}' == 'Plone'   Click link  Home
    Run Keyword If   '${API}' == 'Guillotina'    Wait until page contains  container
    Run Keyword If   '${API}' == 'Guillotina'    Click link  xpath=//a[@title="Site"]

# --- When -------------------------------------------------------------------
# When keywords declare the action under test.
# When keywords should always start with 'I' to indicate the user action that
# is carried out.
# When keywords should be unique and not have an additional 'and' keyword.
# We always want to test a single action.

I log in
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


# --- Then -------------------------------------------------------------------
# Then keywords should always be start with 'I should be' to indicate that
# we check that something should have happend in the past
# (in the 'When' keyword or action)

I should be logged out
    Element should not be visible  css=.left.fixed.menu

I should be logged in
    Wait until element is visible  css=.left.fixed.menu


Autologin as
    [Arguments]  ${username}=admin  ${password}=secret
    ${headers}  Create dictionary  Accept=application/json  Content-Type=application/json
    ${data}=  Create dictionary  login=admin  password=secret
    Run Keyword If   '${API}' == 'Guillotina'   Create Session  plone  http://localhost:8081/db/container
    Run Keyword If   '${API}' == 'Plone'   Create Session  plone  http://localhost:55001/plone
    ${resp}=	Post Request  plone  /@login  headers=${headers}  data=${data}
    Should Be Equal As Strings	${resp.status_code}	 200
    # Log  ${resp.json().get('token')}  WARN
    the front page
    Add Cookie  auth_token  ${resp.json().get('token')}
    Reload page
    Wait until keyword succeeds  120s  1s
    ...   Page fully loaded
    Wait until page contains element  css=#toolbar
    Wait until page contains  Log out
    Page should contain  Log out

