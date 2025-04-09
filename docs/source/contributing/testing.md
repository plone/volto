---
myst:
  html_meta:
    "description": "We use Vitest for unit testing in Volto. The popular @testing-library/react is also available for writing your tests. For every feature or component, a unit test is mandatory in Volto core."
    "property=og:description": "We use Vitest for unit testing in Volto. The popular @testing-library/react is also available for writing your tests. For every feature or component, a unit test is mandatory in Volto core."
    "property=og:title": "Testing Volto with Vitest"
    "keywords": "Volto, Plone, frontend, React, testing, Vitest, Jest"
---

# Testing

This chapter describes how to write and run unit tests in Volto.
It covers the following topics:

-   How to use [Vitest](https://vitest.dev/guide/), the current unit test tool for Volto core.
-   How to migrate your tests from Jest, which is now deprecated.
-   How to use Jest until you can migrate your tests to Vitest.

The popular `@testing-library/react` is also available for writing your tests.
For every feature or component, a unit test is mandatory in Volto core.

```{versionadded} Volto 18.TBD.TBD, current release at 18.10.1
Volto core now uses Vitest for its unit tests.
```

```{deprecated} Volto 18.TBD.TBD, current release at 18.10.1
Volto core has migrated from Jest to Vitest for unit tests.
Jest is now deprecated.
```


(testing-vitest-configuration-label)=

## Vitest configuration

The configuration file {file}`vitest.config.ts` for Volto core is set up at the root of `packages/volto`.

(run-vitest-tests-on-volto-core-label)=

## Run Vitest tests on Volto core

```{note}
All commands in this documentation run from inside the `packages/volto` directory.
See {ref}`developing-core-run-commands-for-pnpm-workspaces-label` for other options to run tests.
```

Vitest tests must pass locally before you push commits to the remote Volto repository.
Vitest has several modes to run unit tests locally.
You can run Vitest in watch mode, run only failed tests, or run specific tests only.

By default, Vitest runs in watch mode when you execute the following command.

This makes it faster and easier to test code changes.

```shell
pnpm test
```

If you don't want to run tests in watch mode, you can use the following command.
This will execute all tests once without entering watch mode.

```shell
pnpm test -- --watch=false
```
or 

```shell
CI=1 pnpm test
```


Then you can follow the Vitest prompts for keys that you can enter to trigger test execution.

```console
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit.
 › Press Enter to run all tests.
```

You can also run only specific tests using the following command.

```shell
# will run only the Image components tests
pnpm test src/components/theme/Image
```


## Migrate from Jest to Vitest

The following guidelines for writing tests using Vitest will help you migrate your tests from Jest.
Vitest shares a similar syntax with Jest, as both use Mocha/Chai, but there are notable differences in handling mocks and other features.

Similar to Jest, Vitest provides functions such as `it`, `expect`, `describe`, `test`, and `vi`.
These properties are globally declared in the {file}`test-setup-globals.js` file, making them available throughout the Volto core without requiring explicit imports in individual test files.


### Differences in mocks

```javascript
jest.mock('../../manage/Workflow/Workflow', () =>
  jest.fn(() => <div id="state-select" />),
);
```

The Vitest equivalent mock to the above Jest mock is the following.

```javascript
vi.mock('../../manage/Workflow/Workflow', () => ({
  default: vi.fn(() => <div id="state-select" />),
}));
```

Vitest's `vi.mock()` does not automatically assume a default export like Jest does.
Instead, it treats the module as an object, so the mocked function must be explicitly assigned to the `default` property.
For more details, refer to the [Vitest Mocking Guide](https://vitest.dev/guide/mocking.html).


### Testing with lazy loaded libraries

In Jest, you would test lazy loaded libraries as shown.

```javascript
jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);
```

In Vitest the equivalent is the following example.

```javascript
vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  const { __setLoadables } = await import('@plone/volto/helpers/Loadable/Loadable');
  await __setLoadables();
});
```

`require()` is not supported in Vitest.
Instead, use `import()`.


### Complete migration guide from Jest to Vitest

For complete details on migrating from Jest to Vitest, refer to the official [Vitest Migration Guide](https://vitest.dev/guide/migration.html#jest).


## Jest usage

```{deprecated} Volto 18.TBD.TBD, current release at 18.10.1
Volto core has migrated from Jest to Vitest for unit tests.
Jest is now deprecated.
```


### Jest configuration override

If you use Jest for your add-on testing, you may need to customize the configuration, especially in GitHub workflows or local development.
Volto provides a way to do this by either using a {file}`jest.config.js` file, or specifying a custom configuration file through the `RAZZLE_JEST_CONFIG` environment variable.

```shell
RAZZLE_JEST_CONFIG=my-custom-jest-config.js pnpm test
```

```{note}
Both configurations are merged in a way that the keys of the configuration provided override the initial {file}`package.json` default configuration, either in Volto or in your projects.
```

This is especially useful in GitHub workflows while developing add-ons.
You can pass a specific configuration file that properly deals with the add-on configuration.


### Add add-ons via environment variable for testing purposes

Sometimes you need to enable different configurations and enable optional components, for example, testing purposes.
You can use the `ADDONS` environment variable to define them.

```bash
ADDONS=test-addon,test-addon2 pnpm start
```

See {doc}`../configuration/environmentvariables` for more information.
