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

This chapter describes how to set up your testing environment and to write tests using {term}`Vitest` for your add-on, and how to migrate your add-on's tests from Jest to Vitest, in Volto 18.

Although Volto core now uses Vitest as its unit test runner, projects generated through {term}`Cookieplone` currently use Jest.
Cookieplone will have a support for Vitest in the near future.
Watch the issue [Use Vitest as main test runner in `frontend_addon` and project](https://github.com/plone/cookieplone-templates/issues/207) for its current status.


```{versionadded} Volto 18.12.0
Volto core now uses Vitest for its unit tests.
```

```{deprecated} Volto 18.12.0
Volto core has migrated from Jest to Vitest for unit tests.
Jest is now deprecated.
```


## Set up Vitest

The following steps will guide you through setting up your development environment to migrate your tests from Jest to Vitest.


### Install Vitest

Run the following command to add Vitest and required dependencies to your development environment.

```shell
pnpm add -D vitest @testing-library/react jsdom
```


### Configure your add-on to use Vitest

Create a file {file}`vitest.config.js` or {file}`vitest.config.ts` inside your add-on to configure Vitest.
The following code is configuration boilerplate for Vitest.

{emphasize-lines="8-9" lineno-start=1}
```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // '@plone/volto': path.resolve(__dirname, 'src'), // Add paths accordingly
      // 'promise-file-reader': require.resolve('promise-file-reader') // Add to identify dependency from package
    },
  },
  test: {
    globals: true, // Use global test functions such as `describe`, `it`, and `expect`
    environment: 'jsdom', // Browser-like environment for React testing
    setupFiles: './setupTests.js', // Runs setup before tests
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      ],
      exclude: [
        'node_modules/**',
        '**/dist/**',
        '**/*.config.{js,ts}',
      ],
    },
    css: true,
  },
});
```

If you uncomment the emphasized lines 8 and 9 above, then you'll need to add two aliases.
The first alias resolves the paths of your files that you want to test.
The second alias resolves the `promise-file-reader` dependency.

```{tip}
If your add-on previously relied on Jest's configuration via the `RAZZLE_JEST_CONFIG` environment variable, you can now remove it, as Vitest does not use it.
```


### Create setup file for Vitest

Create a test setup file {file}`setupTests.js` for Vitest.
The following code is boilerplate setup for Vitest.

```javascript
import '@testing-library/jest-dom';

// Stub the global fetch API to prevent actual network requests in tests
vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
));

// Add additional configurations as needed
```


### Update {file}`package.json` to use Vitest

To switch your project from Jest to Vitest, update the file {file}`package.json`.

```json
"scripts": {
  "test": "vitest",
  "test:watch": "vitest --watch",
  "test:coverage": "vitest --coverage"
}
```


##  Convert Jest tests to Vitest

The following guidelines will help you convert your tests from Jest to Vitest.

Vitest shares a similar syntax with Jest, as both use {term}`Mocha` and {term}`Chai`, but there are notable differences in handling mocks and other features.

Similar to Jest, Vitest provides functions such as `it`, `expect`, `describe`, `test`, and `vi`.
These properties are globally declared in the {file}`test-setup-globals.js` file, making them available throughout your project without requiring explicit imports in individual test files.


### Differences in mocks

In Jest, you would write a mock as shown.

```javascript
jest.mock('../../manage/Workflow/Workflow', () =>
  jest.fn(() => <div id="state-select" />),
);
```

The Vitest equivalent is the following example.

```javascript
vi.mock('../../manage/Workflow/Workflow', () => ({
  default: vi.fn(() => <div id="state-select" />),
}));
```

Vitest's `vi.mock()` does not automatically assume a default export like Jest does.
Instead, it treats the module as an object, so the mocked function must be explicitly assigned to the `default` property.
For more details, refer to the [Mocking](https://vitest.dev/guide/mocking.html) guide in the Vitest documentation.


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

### Additional Jest to Vitest migration information

For complete details on migrating from Jest to Vitest, refer to the official [Vitest Migration Guide](https://vitest.dev/guide/migration.html#jest).


## Run tests in Vitest

After completing the foregoing steps, you can use Vitest.
To run your tests, execute the following command.

```shell
make test
```


## `jiti` for add-on testing

[`jiti`](https://www.npmjs.com/package/jiti) is a module loader for JavaScript and TypeScript that allows you to import and execute TypeScript files or ESM modules without requiring a build step.
It is particularly useful in Volto for dynamically loading add-ons and their configurations.

To use `jiti`, see the following code example.

```javascript
import jiti from 'jiti';

const _import = jiti(import.meta.url, { esmResolve: true });
```

In Vitest, `require()` is not supported, and `import()` may sometimes fail.
In such cases, `jiti` provides a reliable alternative for module resolution and execution.
In Volto, `jiti` is used in the test file {file}`packages/volto/__tests__/create-addons-loader.test.js` to handle dynamic imports for add-ons efficiently.


## Additional Vitest information

For using Vitest when contributing to Volto, see {doc}`../../contributing/testing`.


## Jest for Volto add-ons

Volto previously used {term}`Jest` as its unit testing framework.
If your add-on still uses Jest, Volto provides backward compatibility.

While Volto core has migrated to Vitest, it retained its Jest configuration, allowing you to continue running your existing Jest tests in your add-on without issues.

This support lets you migrate your tests from Jest to Vitest at your convenience.


### Jest configuration override

If you use Jest for your add-on testing, you may need to customize the configuration, especially in GitHub workflows or local development.
Volto provides a way to do this by either using a {file}`jest.config.js` file, or specifying a custom configuration file through the {envvar}`RAZZLE_JEST_CONFIG` environment variable.

```shell
RAZZLE_JEST_CONFIG=my-custom-jest-config.js pnpm test
```

```{note}
Both configurations are merged in a way that the keys of the configuration provided override the initial {file}`package.json` default configuration, either in Volto or in your projects.
```

This is especially useful in GitHub workflows while developing add-ons.
You can pass a specific configuration file that properly deals with the add-on configuration.


### Add add-ons via environment variable

Sometimes you need to enable different configurations and enable optional components, such as for testing purposes.
You can use the {envvar}`ADDONS` environment variable to define them.

```bash
ADDONS=test-addon,test-addon2 pnpm start
```

See {doc}`../../configuration/environmentvariables` for more information.


### Override Jest configuration

In {term}`CI` or for testing add-ons, it's useful to modify Jest's {file}`package.json` configuration file.
You can use the file {file}`jest.config.js` provided by the boilerplate.
The test command will load it and apply it.

```{warning}
Do not modify the existing keys in there if you don't know what you're doing.
Some of them are required for the tests to run properly in the Volto context.
```

Both configurations are merged in such a way that the keys of the provided configuration override the initial {file}`package.json` configuration, in either Volto or your projects.

