---
myst:
  html_meta:
    "description": "We use Jest for unit testing in Volto. The popular @testing-library/react is also available for writing your tests. For every feature or component, a unit test is mandatory in Volto core."
    "property=og:description": "We use Jest for unit testing in Volto. The popular @testing-library/react is also available for writing your tests. For every feature or component, a unit test is mandatory in Volto core."
    "property=og:title": "Testing Volto"
    "keywords": "Volto, Plone, frontend, React, testing, Jest"
---

# Testing

We use {term}`Jest` for unit testing in Volto.
The popular `@testing-library/react` is also available for writing your tests.
For every feature or component, a unit test is mandatory in Volto core.

## Jest configuration

Jest is configured in `package.json` under the `jest` key.


(run-jest-tests-on-volto-core-label)=

## Run Jest tests on Volto core

```{note}
All commands in this documentation run from inside the `packages/volto` directory.
See {ref}`developing-core-run-commands-for-pnpm-workspaces-label` for other options to run tests.
```

Jest tests must pass locally before you push commits to the remote Volto repository.
Jest has several modes to run unit tests locally.
You can run Jest in watch mode, run only failed tests, or run specific tests only.

To get to the test runner modes choices, run the following command.

```shell
pnpm test
```

Then you can follow the Jest prompts for keys that you can enter to trigger test execution.

```console
No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

You can also run only specific tests using the following commands.

```shell
pnpm test src/components/theme/Image
# will run only the Image components tests
```

If a certain test fails, you can run that test only in watch mode.
This makes it faster and easier to test code changes.

## Jest configuration override

In GitHub workflows or for testing add-ons, it's useful to use an alternate Jest configuration.
Volto provides a way to do so using a file {file}`jest.config.js`, or pointing the test runner to a file of your choice, using the `RAZZLE_JEST_CONFIG` environment variable.

```shell
RAZZLE_JEST_CONFIG=my-custom-jest-config.js pnpm test
```

```{note}
Both configurations are merged in a way that the keys of the config provided override  the initial (`package.json`) default config, either in Volto or in your projects.
```

This is especially useful in GitHub workflows while developing add-ons.
You can pass a specific configuration file that properly deals with the add-on configuration.

## Add add-ons via environment variable for testing purposes

Sometimes you need to enable different configurations and enable optional components, for example, testing purposes.
You can use the `ADDONS` environment variable to define them.

```bash
ADDONS=test-addon,test-addon2 pnpm start
```

See {doc}`../configuration/environmentvariables` for more information.
