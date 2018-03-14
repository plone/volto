# ============================================================================
# LOGIN ROBOT TESTS
# ============================================================================

*** Settings ***

Resource  plone/app/robotframework/selenium.robot
Resource  plone/app/robotframework/keywords.robot

Library  Remote  ${PLONE_URL}/RobotRemote

Test Setup  Test Setup
Test Teardown  Test Teardown


*** Test Cases ***

Scenario: Anonyous user enters invalid credentials
  Given an anonymous user
    and a login form
   When I enter invalid credentials
   Then I should see a notification that I entered invalid credentials

Scenario: Registered user enters valid credentials
  Given a registered user
    and a login form
   When I enter valid credentials
   Then I should be logged in

Scenario: User logs out
  Given a logged-in user
   When I click on logout
   Then I should be logged out

Scenario: User registration
  Given an anonymous user
    and a registration form
   When I enter a name and email
   Then I should see a notification that my registration was successful
    and I should receive an email with instructions how to activate my account


*** Keywords ***

# --- Given ------------------------------------------------------------------

a registration form
  Go to   ${FRONTEND_URL}/register
  Wait until page contains element  css=input[name='fullname']
  Wait until page contains element  css=input[name='email']

# --- When -------------------------------------------------------------------

I enter a username that is not an email address
  Page should contain element  css=#login
  Input text  css=#login  myusername
  Input text  css=#password  mypassword
  Click button  css=#login-form-submit

I enter invalid credentials
  Page should contain element  css=#login
  Input text  css=#login  ${INVALID_USERNAME}
  Input text  css=#password  ${INVALID_USERNAME}
  Click button  css=#login-form-submit

I enter valid credentials
  Page should contain element  css=#login
  Input text  css=#login  ${VALID_USERNAME}
  Input text  css=#password  ${VALID_PASSWORD}
  Click button  css=#login-form-submit

I click on logout
  Click element  css=#toolbar-personal
  Wait until page contains element  css=#toolbar-logout
  Click link  css=#toolbar-logout

I enter a name and email
  Input text  css=input[name='fullname']  John Doe
  Input text  css=input[name='email']  john@doe.com
  Click button  css=button[type='submit']


# --- Then -------------------------------------------------------------------

I should be logged in
  Wait until page is fully loaded
  Page should contain element  css=a[href="/logout"]
  Page should contain element  css=.personal-bar

I should be logged out
  Wait until page is fully loaded
  Wait until page contains element  css=a[href="/login"]
  Page should contain element  css=a[href="/login"]
  Page should not contain element  css=.personal-bar
  ${url}=  Get Location
  Should end with  ${url}  /logout

I should see a notification that I entered invalid credentials
  Wait until page is fully loaded
  Page should contain  Error
  Page should contain  Wrong login and/or password.
  Page should contain element  css=.message

I should see a notification that my registration was successful
  Wait until page is fully loaded
  Wait until page contains  Account Registration Completed
  Page should contain  Account Registration Completed
  Page should contain  The registration process has been successful

I should receive an email with instructions how to activate my account
  ${result}=  Get the last sent email
  Should contain  ${result}  Your user account has been created
