*** Settings ***

Suite setup  Run keyword  Set global integer variable

*** Keywords ***

Set global integer variable
    ${zero} =  Convert to integer  0
    Set global variable  ${GLOBAL}  ${zero}
