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

There are a number of fixtures available covering all the configuration use cases.
These fixtures have both a specific backend and frontend configuration setup and a related set of tests.
The CI infrastructure runs them all automatically on every push to a branch or PR.

The tests can be run in headless mode (same as the CI does), or within the Cypress user interface.
The latter is the one that you run under development.

## How to run acceptance tests locally (during development)

When writing new acceptance tests, you usually want to minimize the time it takes to run the tests, while also being able to debug or inspect what's going on.

Being able to restart individual components also comes in handy.
It's recommended to start three individual terminal sessions, one each for running the Plone backend, the Volto frontend, and the acceptance tests.

1.  Run the backend fixture.

    ```shell
    make start-test-acceptance-server
    ```

2.  Run the frontend fixture.

    ```shell
    make start-test-acceptance-frontend-dev
    ```

3.  Run the Cypress tests for that fixture.

    ```shell
    make test-acceptance
    ```

Available fixtures:

- Core (`core` or not special naming in the test commands)
- Multilingual (`multilingual`)
- Working Copy (`workingCopy`)
- Core Sandbox (`coresandbox`)

There are convenience commands for each of these fixtures. See `Makefile` for more information.

### Writing new acceptance tests

Go to the `cypress/tests` folder to see existing tests.
There is a directory per fixture.
This directory is hot reloaded with your changes as you write the tests.
For more information on how to write Cypress tests:

    https://docs.cypress.io


## Helper commands

There are some artifacts available for the acceptance tests made accessible to Cypress.

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
