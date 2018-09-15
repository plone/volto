*** Settings ***

Resource  keywords.robot

Suite Setup     Open default browser
Suite Teardown  Close all browsers

*** Test Cases ***

Scenario: Log into Plone again
  Given the front page
   When I log in
   Then I should be logged in
