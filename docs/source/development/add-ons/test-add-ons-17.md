---
myst:
  html_meta:
    "description": "Testing add-ons"
    "property=og:description": "Testing add-ons"
    "property=og:title": "Testing add-ons"
    "keywords": "Volto, Plone, Testing, CI, Add-ons"
---

# Test add-ons in Volto 17

We should let jest know about our aliases and make them available to it to resolve them, so in `package.json`:

```{code-block} json
:emphasize-lines: 6

  "jest": {
    "moduleNameMapper": {
      "@plone/volto/(.*)$": "<rootDir>/node_modules/@plone/volto/src/$1",
      "@package/(.*)$": "<rootDir>/src/$1",
      "@plone/some-volto-addon/(.*)$": "<rootDir>/src/addons/@plone/some-volto-addon/src/$1",
      "my-volto-addon/(.*)$": "<rootDir>/src/addons/my-volto-addon/src/$1",
      "~/(.*)$": "<rootDir>/src/$1"
    },
```

You can use `yarn test src/addons/addon-name` to run tests.

## Jest configuration override

In CI or for testing addons, it's interesting to provide an alternate Jest configuration
or slightly modify it.
Volto provide a way to do it using a `jest.config.js` file or pointing the test runner to a file of your choice, using `RAZZLE_JEST_CONFIG` environment variable.

```shell
RAZZLE_JEST_CONFIG=my-custom-jest-config.js yarn test
```

```{note}
Both configurations are merged in a way that the keys of the config provided override the initial (`package.json`) default config, either in Volto or in your projects.
```

This is specially useful in CI while developing add-ons, so you can pass a specific configuration that deals with the add-on config properly.

## Testing add-ons in isolation

Testing an add-on in isolation as you would do when you develop a Plone Python backend add-on can be a bit challenging, since an add-on needs a working project in order to bootstrap itself.
The latest generator has the boilerplate needed in order to bootstrap a dockerized environment where you can run any test to your add-on.

### Setup the environment

Run once

```shell
make dev
```

### Build the containers manually

Run

```shell
make build-backend
make build-addon
```

### Unit tests

Run

```shell
make test
```

### Acceptance tests

Run once

```shell
make install-acceptance
```

For starting the servers

Run

```shell
make start-test-acceptance-server
```

The frontend is run in dev mode, so development while writing tests is possible.

Run

```shell
make test-acceptance
```

To run Cypress tests afterwards.

When finished, don't forget to shutdown the backend server.

```shell
make stop-test-acceptance-server
```
