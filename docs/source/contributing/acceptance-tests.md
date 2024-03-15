---
myst:
  html_meta:
    "description": "Developer guidelines for acceptance tests."
    "property=og:description": "Developer guidelines for acceptance tests."
    "property=og:title": "Acceptance tests"
    "keywords": "Volto, Plone, frontend, React, helper command, redux, acceptance, tests, Cypress"
---

# Acceptance testing

Volto uses [Cypress](https://www.cypress.io/) for browser-based acceptance testing.

There are a number of tests available covering all the configuration use cases.
These tests have both a specific backend and frontend configuration setup and a related set of tests.
The CI infrastructure runs them all automatically on every push to a branch or PR.

The tests can be run in headless mode (same as the CI does), or within the Cypress user interface.
The latter is the one that you run under development.

## How to run acceptance tests locally (during development)

When writing new acceptance tests, you usually want to minimize the time it takes to run the tests, while also being able to debug or inspect what's going on.

Being able to restart individual components also comes in handy.
It's recommended to start three individual terminal sessions, one each for running the Plone backend, the Volto frontend, and the acceptance tests.

1. Change directory to the Volto package

    ```shell
    cd packages/plone
    ```

1.  Start the backend server.

    ```shell
    make start-test-acceptance-server
    ```

1.  Start the frontend server.

    ```shell
    make start-test-acceptance-frontend-dev
    ```

1.  Start the Cypress tests runner.

    ```shell
    make test-acceptance
    ```

1. In the Cypress pop-up test style choose `E2E Testing` since Volto's tests are end to end tests.

1. In the next section select the browser you want Cypress to run in, although the core tests are using by default `headless Electron` you can choose your preferred browser for the tests development.

1. In the main Cypress runner section you will see all of the test specs that Volto developers have written in order to test Volto and it's packages.

1. To run a test simply interact with the file based tree that displays all possible tests to run and click on what test spec you need to run. 

We provide the following major test specs:

- Core (`core` used to test the core functionality of Volto)
- Multilingual (`multilingual` tests the multilingual support of Volto)
- Working Copy (`workingCopy` tests the working copy feature of Volto)
- Core Sandbox (`coresandbox` tests Volto using configuration and elements that are not present in vanilla Volto)

There are convenience commands for each of these specs. See `Makefile` for more information.

### Writing new acceptance tests

Go to the [cypress/tests](https://github.com/plone/volto/tree/main/packages/volto/cypress/tests) folder to see existing tests.
There is a directory per spec.
This directory is hot reloaded with your changes as you write the tests.
For more information on how to write Cypress tests:

    https://docs.cypress.io


## Helper commands

There are some helper [commands](https://github.com/plone/volto/blob/main/packages/volto/cypress/support/commands.js) written by us and made available for the acceptance tests using Cypress.

Volto core makes heavy use of these helpers in the core tests to avoid verbose duplication and they can make your life easier as well if used.
Example of commands made and used in tests:

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
`cy.autologin` and `cy.createContent` are commands created by us that will auto login and will create the entered content before each test will run making it easier to focus on the act and assert actions of the tests that make use of this test hook.

### Access History, Redux Store and Settings

We expose the History, {term}`Redux` Store and Settings from the app (only for Cypress environments) so we can easily access them and execute actions (like navigate using the router), dispatch Redux actions or change app settings "on the fly".

#### Navigate using React Router

You can navigate using the React Router (ie. not reloading the page) with this command:

```js
cy.navigate('/events');
```

#### Redux Store

You can access the Redux store and check for specific states and dispatch actions by:

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

More information about this: https://www.cypress.io/blog/2018/11/14/testing-redux-store/

#### Volto settings

You can modify on the fly the main Volto settings like this:

```js
cy.settings().then(settings => {
  settings.defaultLanguage = 'de';
  settings.isMultilingual = true;
  settings.supportedLanguages = ['de', 'en'];
});
```
