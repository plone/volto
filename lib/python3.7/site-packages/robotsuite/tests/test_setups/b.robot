*** Settings ***

Suite setup  Increment global variable

*** Test Cases ***

Global variable is 1
    ${one} =  Convert to integer  1
    Should be equal  ${GLOBAL}  ${one}

*** Keywords ***

Increment global variable
    Set global variable  ${GLOBAL}  ${GLOBAL + 1}
