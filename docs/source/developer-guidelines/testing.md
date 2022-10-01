---
myst:
  html_meta:
    "description": "We use Jest for unit testing in Volto. The popular @testing-library/react is also available for writing your tests. For every feature or component, a unit test is mandatory in Volto core."
    "property=og:description": "We use Jest for unit testing in Volto. The popular @testing-library/react is also available for writing your tests. For every feature or component, a unit test is mandatory in Volto core."
    "property=og:title": "Testing Volto"
    "keywords": "Volto, Plone, frontend, React, testing, Jest"
---

# Testing

We use Jest for unit testing in Volto. The popular `@testing-library/react` is also
available for writing your tests. For every feature or component, a unit test is
mandatory in Volto core.

## Jest configuration

Jest is configured in `package.json`, under the "jest" key.

## Jest configuration override

In CI or for testing addons, it's interesting to provide an alternate Jest configuration
or slightly modify it. Volto provide a way to do it using a `jest.config.js` file or
pointing the test runner to a file of your choice, using `RAZZLE_JEST_CONFIG`
environment variable.

```shell
RAZZLE_JEST_CONFIG=my-custom-jest-config.js yarn test
```

```{note}
Both configurations are merged in a way that the keys of the config provided override  the initial (`package.json`) default config, either in Volto or in your projects.
```

This is specially useful in CI while developing add-ons, so you can pass an specific configuration that deals with the addon config properly.

## Add add-ons via environment variable for testing purposes

Sometimes you need to enable different configurations and enable optional components (for example, testing purposes).
You can use the `ADDONS` environment variable to define them.

```bash
ADDONS=test-addon,test-addon2 yarn start
```

 See {doc}`../configuration/environmentvariables` for more information.

## Developing Cypress tests

Volto uses [Cypress](https://www.cypress.io) to run integration tests. When
developing or debugging Cypress tests, it's useful to be able to replicate the
test environment.

### Start Cypress

You can start Cypress by running:

```shell
make start-test
```

This will open Cypress in a browser, where you can see the available registered
tests and you can start them manually. You can even open the browser's
developer console and inspect network traffic and logging errors.

### Start Plone

Notice that we've started Cypress with a different `API_PATH`. Cypress tests
need to communicate with Plone through XMLRPC, to do rollbacks and cleanups
after each test. To start Zope and Plone, run:

```shell
make test-acceptance-server
```

If your test fails and won't cleanup after itself, you may get errors about
content that already exists, etc. Just restart the test acceptance server, as
it uses a non-persistent database.

### Start Volto

Finally, you can to start Volto with:

```shell
make start-test-frontend
```

If you're developing in parallel the code and the test, you can start Volto in
development mode by running:

```shell
RAZZLE_API_PATH=http://localhost:55001/plone yarn start
```
