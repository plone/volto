*** Variables ***

${GLOBAL}  0

*** Keywords ***

Increment global variable
    Set global variable  ${GLOBAL}  ${GLOBAL + 1}
