*** Settings ***

Resource  keywords.robot

Suite Setup     Open default browser
Suite Teardown  Close all browsers

*** Test Cases ***

Scenario: A logged in site-administrator
  Given a logged in site-administrator
