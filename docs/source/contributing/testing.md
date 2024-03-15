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

## Run Jest tests on Volto core
Volto core is running the jest test using the `CI=true` option which will run all tests and display any errors found.

While that is useful for the CI testing, Jest has several modes to run such as running in watch mode or running only failed tests or running specific tests only.

To get to the test runner modes choice the easiest is to simply run `pnpm test`:
```shell
  pnpm test
```
Then you can follow the Jest promps for keys that you can enter in order to trigger the running of test, here are a few examples:
```shell
Watch Usage
> Press a to run all tests.
> Press f to run only failed tests.
> Press q to quit watch mode.
```

You can also run only specific tests using the following commands:
```shell
  cd packages/volto
  pnpm test src/components/theme/Image
  # will run only the Image components tests
```
If you know you have a certain test that fails running that test only in watch
mode makes it easier to test any code changes made if it fixed the code or not.

## Jest configuration override

In CI or for testing addons, it's interesting to provide an alternate Jest configuration
or slightly modify it. Volto provide a way to do it using a `jest.config.js` file or
pointing the test runner to a file of your choice, using `RAZZLE_JEST_CONFIG`
environment variable.
Because the Volto add-ons and Volto add-ons projects are still using `yarn` you will
run the test command using `yarn` instead of `pnpm` as used by Volto core.

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
