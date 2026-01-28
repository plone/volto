---
myst:
  html_meta:
    "description": "Developer guidelines for acceptance tests."
    "property=og:description": "Developer guidelines for acceptance tests."
    "property=og:title": "Acceptance tests"
    "keywords": "Volto, Plone, frontend, React, helper command, redux, acceptance, tests, Playwright, contributing"
---

# Acceptance tests

Seven uses [Playwright](https://playwright.dev/) for browser-based acceptance tests.

There are a number of tests available covering all the configuration use cases.
These tests have both a specific backend and frontend configuration setup and a related set of tests.
The continuous integration infrastructure runs them all automatically on every push to a branch or a pull request.

The tests can be run in headless mode (same as the CI does), or within the Playwright user interface.
The latter is the one that you run under development.


## How to run acceptance tests locally (during development)

When writing new acceptance tests, you usually want to minimize the time it takes to run the tests, while also being able to debug or inspect what's going on.

Being able to restart individual components also comes in handy.
It's recommended to start three individual terminal sessions, one each for running the Plone backend, the Volto frontend, and the acceptance tests.
All sessions should start from the `packages/volto` directory.

1.  In the first session, start the backend server.

    ```shell
    make acceptance-backend-start
    ```

1.  In the second session, start the frontend server.

    ```shell
    make acceptance-frontend-dev-start
    ```

1.  In the third session, start the Playwright tests runner.

    ```shell
    make acceptance-test
    ```

1.  In the main Playwright runner section, you will see all of the test specs that Volto developers have written to test Volto and its packages.

1.  To run a test, interact with the file based tree that displays all possible tests to run, and click on the test spec you need to run.

We provide the following major test specs:

-   Core (`core` used to test the core functionality of Volto)
-   Multilingual (`multilingual` tests the multilingual support of Volto)
-   Working Copy (`workingCopy` tests the working copy feature of Volto)
-   Core Sandbox (`coresandbox` tests Volto using configuration and elements that are not present in vanilla Volto)

There are convenience commands for each of these specs.
See `Makefile` at the root of the repository for more information.


### Write new acceptance tests

Go to the folder `packages/*/acceptance/tests` to see existing tests.
You can create new test files using the `*.test.ts` naming convention.
All test files are automatically picked up by Playwright.

```{seealso}
[Playwright documentation](https://playwright.dev/docs/intro)
```


## Helper commands

There are some helper commands in {file}`packages/tooling/playwright` written by Volto contributors and made available for the acceptance tests using Playwright.

Seven core makes heavy use of these helpers in the core tests to avoid verbose duplication, and they can make your life easier.
