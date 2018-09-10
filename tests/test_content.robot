*** Settings ***

Resource  keywords.robot

Suite Setup     Open default browser
Suite Teardown  Close all browsers

*** Test Cases ***

Scenario: As a site administrator I can add a page
  Given a logged in site-administrator
    and the Plone site root
   When I add a Page with the title 'My Page'
   # Then I should see a notification that 'My Page' has been created
    and I should see 'My Page' in the navigation

Scenario: As a site administrator I can add a text tile to a page
  Given a logged in site-administrator
    and a page
#    When I add a text tile with the content 'My text tile' to the page
#    # Then I should see a notification that 'My Page' has been created
#     and I should see 'My Page' in the navigation

*** Keywords ***

# --- Given ------------------------------------------------------------------

a page
  Wait until page contains element  css=#toolbar-add
  Click element  css=#toolbar-add
  Wait until page contains element  css=#toolbar-add-document
  Click element  css=#toolbar-add-document
  Wait until page contains element  css=.public-DraftStyleDefault-block
  Execute JavaScript  var textarea = document.getElementsByClassName('title')[0].getElementsByClassName('public-DraftEditor-content')[0]; var textEvent = document.createEvent('TextEvent'); textEvent.initTextEvent('textInput', true, true, null, 'My Page'); textarea.dispatchEvent(textEvent);


# --- When -------------------------------------------------------------------

I add a Page with the title '${title}'
  Log  I add a Page with the title '${title}'  WARN
  Wait until page contains element  css=#toolbar-add
  Click element  css=#toolbar-add
  Wait until page contains element  css=#toolbar-add-document
  Click element  css=#toolbar-add-document
  Wait until page contains element  css=.public-DraftEditor-content
  Input Tile  title  My Page
  Click element  css=*[title=Save]

# I add a text tile with the content '${text}' to the page
#   Execute JavaScript  var textarea = document.getElementsByClassName('title')[0].getElementsByClassName('public-DraftEditor-content')[0]; var textEvent = document.createEvent('TextEvent'); textEvent.initTextEvent('textInput', true, true, null, 'My Page'); textarea.dispatchEvent(textEvent);
#   Click element  css=*[title=Save]

# --- Then -------------------------------------------------------------------

I should see '${title}' in the navigation
  Wait until page contains element  css=.navigation a
  Wait until page contains element  css=.navigation a[href='/my-page']
  Page should contain element  css=.navigation a[href='/my-page']

Input tile
  [Arguments]  ${selector}  ${text}
  Execute JavaScript  var textarea = document.getElementsByClassName('${selector}')[0].getElementsByClassName('public-DraftEditor-content')[0];
  ...  var textEvent = document.createEvent('TextEvent');
  ...  textEvent.initTextEvent('textInput', true, true, null, '${text}');
  ...  textarea.dispatchEvent(textEvent);
