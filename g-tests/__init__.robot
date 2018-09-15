# Run: PYTHONPATH=$(pwd)/tests api/bin/pybot tests
# See: http://robotframework.org/robotframework/2.8.7/RobotFrameworkUserGuide.html#initialization-files
*** Settings ***

Library         SeleniumLibrary  timeout=10  implicit_wait=0
Library         guillotina.robot.Robot
Library         OperatingSystem
Library         WebpackLibrary

Suite Setup     Suite Setup
Suite Teardown  Suite Teardown

Test Setup      Test Setup
Test Teardown   Test Teardown

*** Variables ***


*** Keywords ***

Suite Setup
    Start Guillotina server
    ${PORT}=  Get Guillotina Server Port
    Set Environment Variable  API_PATH  http://localhost:${PORT}/db/container
    Start Webpack  yarn start
    ...            check=to be executed: ./node_modules/.bin/babel-node ./src/start-server-prod.js

Suite Teardown
    Stop Webpack
    Stop Guillotina server
