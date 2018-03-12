*** Settings ***

Resource  keywords.robot

*** Test Cases ***

Scenario: Log in Plone
    Given frontpage
    When log in
    Then logged in
