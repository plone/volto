---
myst:
  html_meta:
    "description": "Developer guidelines for acceptance tests."
    "property=og:description": "Developer guidelines for acceptance tests."
    "property=og:title": "Acceptance tests"
    "keywords": "Volto, Plone, frontend, React, helper command, redux, acceptance, tests, Cypress"
---

# Acceptance tests

Volto uses [Cypress](https://www.cypress.io/) for browser-based acceptance tests.

There are a number of tests available covering all the configuration use cases.
These tests have both a specific backend and frontend configuration setup and a related set of tests.
The continuous integration infrastructure runs them all automatically on every push to a branch or a pull request.

The tests can be run in headless mode (same as the CI does), or within the Cypress user interface.
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

1.  In the third session, start the Cypress tests runner.

    ```shell
    make acceptance-test
    ```

1.  In the Cypress pop-up test style, choose `E2E Testing`, since Volto's tests are end-to-end tests.

1.  In the next section, select the browser you want Cypress to run in.
    Although the core tests use `headless Electron` by default, you can choose your preferred browser for the tests development.

1.  In the main Cypress runner section, you will see all of the test specs that Volto developers have written to test Volto and its packages.

1.  To run a test, interact with the file based tree that displays all possible tests to run, and click on the test spec you need to run.

We provide the following major test specs:

-   Core (`core` used to test the core functionality of Volto)
-   Multilingual (`multilingual` tests the multilingual support of Volto)
-   Working Copy (`workingCopy` tests the working copy feature of Volto)
-   Core Sandbox (`coresandbox` tests Volto using configuration and elements that are not present in vanilla Volto)

There are convenience commands for each of these specs.
See `Makefile` at the root of the repository for more information.


### Write new acceptance tests

Go to the folder `packages/volto/cypress/tests` to see existing tests.
There is a directory per spec.
This directory is hot reloaded with your changes as you write the tests.

```{seealso}
[Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress)
```


## Helper commands

There are some helper commands in {file}`packages/volto/cypress/support/commands.js` written by Volto contributors and made available for the acceptance tests using Cypress.

Volto core makes heavy use of these helpers in the core tests to avoid verbose duplication, and they can make your life easier.
The following is an example of commands used in tests:

```js
  beforeEach(() => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-1',
      contentTitle: 'My Page-1',
      allow_discussion: true,
    });
    cy.visit('/contents');
  });
```

`cy.autologin` and `cy.createContent` are commands that will auto login, then create the entered content before each test will run.
This makes it easier to focus on the `act` and `assert` actions of the tests that make use of this test hook.


### Access history, Redux store, and settings

We expose the history, {term}`Redux` store, and settings from the app (only for Cypress environments) so we can easily access them and execute actions (like navigate using the router), dispatch Redux actions, or change app settings "on the fly".


#### Navigate using React router

You can navigate using the React router without reloading the page with the following command:

```js
cy.navigate('/events');
```


#### Redux store

You can access the Redux store and check for specific states and dispatch actions as shown:

```js
import { updateIntl } from 'react-intl-redux';
import deLocales from '../../locales/de.json';

const dispatch = action =>
  cy
    .window()
    .its('store')
    .invoke('dispatch', action);

dispatch(
  updateIntl({
    locale: 'de',
    messages: deLocales,
  }),
);
```

```{seealso}
[Testing Redux Store](https://www.cypress.io/blog/testing-redux-store)
```


#### Volto settings

You can modify the main Volto settings on the fly.

```js
cy.settings().then(settings => {
  settings.defaultLanguage = 'de';
  settings.isMultilingual = true;
  settings.supportedLanguages = ['de', 'en'];
});
```
