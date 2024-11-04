---
myst:
  html_meta:
    "description": "Test add-ons in Volto 18"
    "property=og:description": "Test add-ons in Volto 18"
    "property=og:title": "Test add-ons in Volto 18"
    "keywords": "Volto, Plone, testing, test, CI, add-ons"
---

# Test add-ons in Volto 18

```{warning}
This guide assumes that you've used {term}`Cookieplone` to create your add-on boilerplate.
```

Volto uses {term}`Jest` for unit tests.
You can create unit tests for testing your add-on.

Run the following command:

```shell
make test
```

## Override Jest configuration

In {term}`CI` or for testing add-ons, it's useful to modify Jest's {file}`package.json` configuration file.
You can use the boilerplate provided {file}`jest.config.js` file.
The test command will load it and apply it.

```{warning}
Do not modify the existing keys in there if you don't know what you are doing, since some of them are required for the tests to run properly in the Volto context.
```

Both configurations are merged in a way that the keys of the configuration provided override the initial {file}`package.json` configuration, either in Volto or in your projects.

```{note}
For more background on testing add-ons in Volto 18, see {doc}`../../contributing/testing` since the developer experience has been unified for both add-ons and Volto core.
```

### Acceptance tests

Use {term}`Cypress` to run acceptance tests.

To start the backend server, run the following command.
This will start a docker container with a vanilla Plone backend.

```shell
make acceptance-backend-start
```

To start the frontend acceptance server (in development mode), run the following command.

```shell
make acceptance-frontend-dev-start
```

You run the frontend in development mode, so you can develop while writing tests.
Run the following command to run Cypress tests afterward.

```shell
make acceptance-test
```
