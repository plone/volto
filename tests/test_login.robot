*** Settings ***

Resource  keywords.robot

Suite Setup     Open default browser
Suite Teardown  Close all browsers

*** Test Cases ***

Scenario: Log in Plone
    Given frontpage
    When log in
    Then logged in
