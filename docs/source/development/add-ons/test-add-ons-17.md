---
myst:
  html_meta:
    "description": "How to test add-ons in Volto 17"
    "property=og:description": "How to test add-ons in Volto 17"
    "property=og:title": "Test add-ons in Volto 17"
    "keywords": "Volto, Plone, testing, CI, add-ons"
---

# Test add-ons in Volto 17

Volto uses {term}`Jest` for unit tests.
You must configure {file}`package.json` to let Jest know about your aliases and make them available to it to resolve them.

```{code-block} json
:emphasize-lines: 6

"jest": {
  "moduleNameMapper": {
    "@plone/volto/(.*)$": "<rootDir>/node_modules/@plone/volto/src/$1",
    "@package/(.*)$": "<rootDir>/src/$1",
    "@plone/some-volto-addon/(.*)$": "<rootDir>/src/addons/@plone/some-volto-addon/src/$1",
    "my-volto-addon/(.*)$": "<rootDir>/src/addons/my-volto-addon/src/$1",
    "~/(.*)$": "<rootDir>/src/$1"
  }
}
```

You can use `yarn test src/addons/addon-name` to run tests.


## Override Jest configuration

In {term}`CI` or for testing add-ons, it's useful to modify Jest's {file}`package.json` configuration file.
You can use a {file}`jest.config.js` file, or point the test runner to a file of your choice, using the `RAZZLE_JEST_CONFIG` environment variable.

```shell
RAZZLE_JEST_CONFIG=my-custom-jest-config.js yarn test
```

Both configurations are merged in a way that the keys of the configuration provided override the initial {file}`package.json` configuration, either in Volto or in your projects.


## Test add-ons in isolation

Testing an add-on in isolation, as you would when you develop a Plone Python backend add-on, can be a bit challenging, since an add-on needs a working project in order to bootstrap itself.
The latest generator has the boilerplate needed to bootstrap a dockerized environment where you can run any test to your add-on.


### Set up the environment

Run the following command once.

```shell
make dev
```


### Build the containers manually

Run the following commands.

```shell
make build-backend
make build-addon
```


### Unit tests

Run the following command.

```shell
make test
```


### Acceptance tests

Use {term}`Cypress` to run acceptance tests.
Run the following command once.

```shell
make install-acceptance
```

To start the servers, run the following command.

```shell
make start-test-acceptance-server
```

You run the frontend in development mode, so you can develop while writing tests.
Run the following command to run Cypress tests afterward.

```shell
make test-acceptance
```

When finished, shut down the backend server.

```shell
make stop-test-acceptance-server
```
