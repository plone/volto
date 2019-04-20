*** Settings ***
Library  DebugLibrary
Resource  keywords.robot

Suite Setup     Open default browser
Suite Teardown  Close all browsers

*** Test Cases ***

Scenario: As a site administrator I can add a page
  Skip test on Guillotina
  Given a logged in site-administrator
    and the Plone site root
   When I add a Page with the title 'My Page'
   # Then I should see a notification that 'My Page' has been created
    and I should see 'My Page' in the navigation

Scenario: As a site administrator I can add a News Item
  Skip test on Guillotina
  Given a logged in site-administrator
    and the Plone site root
   When I add a News Item with the title 'My News Item'
   # Then I should see a notification that 'My Page' has been created
    and I should see 'My News Item' in the navigation

# XXX: Event is broken in Volto
# Scenario: As a site administrator I can add an Event
#   Given a logged in site-administrator
#     and the Plone site root
#    When I add an Event with the title 'My Event'
#    # Then I should see a notification that 'My Page' has been created
#     and I should see 'My Event' in the navigation

Scenario: As a site administrator I can add a Folder
  Skip test on Guillotina
  Given a logged in site-administrator
    and the Plone site root
   When I add a Folder with the title 'My Folder'
   # Then I should see a notification that 'My Page' has been created
    and I should see 'My Folder' in the navigation

Scenario: As a site administrator I can add a File
  Skip test on Guillotina
  Given a logged in site-administrator
    and the Plone site root
   When I add a File with the title 'My File'
   # Then I should see a notification that 'My Page' has been created
    and I should see 'My File' in the folder contents

Scenario: As a site administrator I can add an Image
  Skip test on Guillotina
  Given a logged in site-administrator
    and the Plone site root
   When I add an Image with the title 'My Image'
   # Then I should see a notification that 'My Page' has been created
    and I should see 'My Image' in the folder contents

# XXX: Links are not implemented in Volto yet
# Scenario: As a site administrator I can add a Link
#   Given a logged in site-administrator
#     and the Plone site root
#    When I add a Link with the title 'My Link'
#    # Then I should see a notification that 'My Page' has been created
#     and I should see 'My Link' in the navigation

# XXX: Collections are not implemented in Volto yet
# Scenario: As a site administrator I can add a Collection
#   Given a logged in site-administrator
#     and the Plone site root
#    When I add a Collection with the title 'My Collection'
#    # Then I should see a notification that 'My Page' has been created
#     and I should see 'My Collection' in the navigation

Scenario: As a site administrator I can add a text tile to a page
  Given a logged in site-administrator
    and a page
   When I add a text tile with the content 'My text tile' to the page
#  Then I should see a notification that 'My Page' has been created
     and I should see 'My text tile' on the page view

# Scenario: As a site administrator I can add an image tile to a page
#   Given a logged in site-administrator
#     and a page
#    When I add an image tile to the page
# #  Then I should see a notification that 'My Page' has been created
#      and I should see the image on the page view


*** Keywords ***

# --- Given ------------------------------------------------------------------

a page
  Wait until page contains element  css=#toolbar-add
  Click element  css=#toolbar-add
  Wait until page contains element  css=#toolbar-add-document
  Click element  css=#toolbar-add-document
  Wait until page contains element  css=.public-DraftStyleDefault-block
  Input tile  title  My page

I add a News Item with the title '${title}'
  Wait until page contains element  css=#toolbar-add
  Click element  css=#toolbar-add
  Wait until page contains element  css=#toolbar-add-news-item
  Click element  css=#toolbar-add-news-item
  Wait until page contains element  name=title
  Input text  name=title  ${title}
  Click element  css=*[title=Save]

I add an Event with the title '${title}'
  Wait until page contains element  css=#toolbar-add
  Click element  css=#toolbar-add
  Wait until page contains element  css=#toolbar-add-event
  Click element  css=#toolbar-add-event
  Wait until page contains element  name=title
  Input text  name=title  ${title}
  Click element  css=*[title=Save]

I add a Folder with the title '${title}'
  Wait until page contains element  css=#toolbar-add
  Click element  css=#toolbar-add
  Wait until element is visible  css=#toolbar-add-folder
  Click element  css=#toolbar-add-folder
  Wait until page contains element  name=title
  Input text  name=title  ${title}
  Click element  css=*[title=Save]

I add a File with the title '${title}'
  Wait until page contains element  css=#toolbar-add
  Click element  css=#toolbar-add
  Wait until element is visible  css=#toolbar-add-file
  Click element  css=#toolbar-add-file
  Wait until page contains element  name=title
  Input text  name=title  ${title}
  Choose File  name=file  ${PATH_TO_TEST_FILES}/pixel.png
  Click element  css=*[title=Save]

I add an Image with the title '${title}'
  Wait until page contains element  css=#toolbar-add
  Click element  css=#toolbar-add
  Wait until element is visible  css=#toolbar-add-image
  Click element  css=#toolbar-add-image
  Wait until page contains element  name=title
  Input text  name=title  ${title}
  Choose File  name=image  ${PATH_TO_TEST_FILES}/pixel.png
  Click element  css=*[title=Save]

I add a Link with the title '${title}'
  Wait until page contains element  css=#toolbar-add
  Click element  css=#toolbar-add
  Wait until element is visible  css=#toolbar-add-link
  Click element  css=#toolbar-add-link
  Wait until page contains element  name=title
  Input text  name=title  ${title}
  Click element  css=*[title=Save]

I add a Collection with the title '${title}'
  Wait until page contains element  css=#toolbar-add
  Click element  css=#toolbar-add
  Wait until element is visible  css=#toolbar-add-collection
  Click element  css=#toolbar-add-collection
  Wait until page contains element  name=title
  Input text  name=title  ${title}
  Click element  css=*[title=Save]


# --- When -------------------------------------------------------------------

I add a Page with the title '${title}'
  Wait until page contains element  css=#toolbar-add
  Click element  css=#toolbar-add
  Wait until page contains element  css=#toolbar-add-document
  Click element  css=#toolbar-add-document
  Wait until page contains element  css=.public-DraftEditor-content
  Input tile  title  ${title}
  Click element  css=*[title=Save]

I add a text tile with the content '${text}' to the page
  Input tile  text  ${text}
  Click element  css=*[title=Save]

# I add an image tile to the page
#   Debug

# --- Then -------------------------------------------------------------------

I should see '${title}' in the navigation
  Go to  ${FRONTEND_URL}
  Reload Page
  Wait until page contains element  css=.navigation a
  Wait until page contains element  xpath=//*[contains(@class, 'navigation')]//*[contains(text(), '${title}')]
  Page should contain element  xpath=//*[contains(@class, 'navigation')]//*[contains(text(), '${title}')]

I should see '${title}' in the folder contents
  Go to  ${FRONTEND_URL}contents
  Reload Page
  Wait until page contains element  css=.navigation a
  Wait until page contains  ${title}
  Page should contain  ${title}

I should see '${text}' on the page view
  Page should contain  ${text}

# I should see the image on the page view
#   Debug

# --- Helper -----------------------------------------------------------------

Input tile
  [Arguments]  ${selector}  ${text}
  Execute JavaScript  var textarea = document.getElementsByClassName('${selector}')[0].getElementsByClassName('public-DraftEditor-content')[0];
  ...  var textEvent = document.createEvent('TextEvent');
  ...  textEvent.initTextEvent('textInput', true, true, null, '${text}');
  ...  textarea.dispatchEvent(textEvent);
