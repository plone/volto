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

# Using Vitest in your Volto add-on

Volto core now uses [Vitest](https://vitest.dev/guide/) as it's unit test runner.
If you want to migrate your add-on tests to Vitest, follow these guidelines.

## Install vitest to your add-on

Run the following command to add Vitest and required dependencies.

```console
pnpm add -D vitest @testing-library/react jsdom
```

## Configuring Your Addon to Use Vitest

Create a {file}`vitest.config.{js/ts}` file inside your addon to configure Vitest.
Here is boilerplate config file for vitest.

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      //'@plone/volto': path.resolve(__dirname, 'src'), //Add paths accordingly
      //'promise-file-reader': require.resolve('promise-file-reader')  //Add to identify dependency from package
    },
  },
  test: {
    globals: true, // Use global test functions like `describe`, `it`, and `expect`
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

If your addon previously relied on Jest’s configuration via RAZZLE_JEST_CONFIG, you can remove that, as Vitest does not use it.

## Create setup file for Vitest

Create a {file}`setupTests.js` file for Vitest and you can use the following boilerplate. 

```javascript 
import '@testing-library/jest-dom';
import { expect, describe, it, vi } from 'vitest';

// Make Vitest globals available throughout the test suite
global.describe = describe;
global.it = it;
global.expect = expect;
global.vi = vi;

// Stub the global fetch API to prevent actual network requests in tests
vi.stubGlobal('fetch', vi.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
));

// Add additional configurations as needed
```

## Update package.json to use Vitest

To switch your project from Jest to Vitest, update the {file}`package.json` file.

```json
"scripts": {
  "test": "vitest",
  "test:watch": "vitest --watch",
  "test:coverage": "vitest --coverage"
}
```
## Migrating tests to use Vitest

For more background on testing add-ons using vitest and to migrate tests to vitest, see {doc}`../../contributing/testing`.

## Using Jiti in add-on testing

[Jiti](https://www.npmjs.com/package/jiti) is module loader for JavaScript and TypeScript that allows you to import and execute TypeScript files or ESM modules without requiring a build step. 
It is particularly useful in Volto for dynamically loading add-ons and their configurations.

```javascript
import jiti from 'jiti';

const _import = jiti(import.meta.url, { esmResolve: true });
```

In Vitest, `require()` is not supported, and `import()` may sometimes fail. In such cases, Jiti provides a reliable alternative for module resolution and execution.
In Volto, Jiti is used in the test file {file}`packages/volto/__tests__/create-addons-loader.test.js` to handle dynamic imports for add-ons efficiently.


# Using Jest in your Volto add-on 

Volto previously used {term}`Jest` as its unit testing framework. If your add-on is still using Jest, Volto have ensured backward compatibility.

While Volto Core has migrated to Vitest, we have retained the Jest configuration, allowing you to continue running your existing Jest tests without issues. This means:

You can still use Jest for testing your add-ons.

Volto Core runs on Vitest, but Jest support remains available.

You have the option to migrate your tests to Vitest at your convenience.

Run the following command.

```shell
make test
```

## Override Jest configuration

In {term}`CI` or for testing add-ons, it's useful to modify Jest's {file}`package.json` configuration file.
You can use the file {file}`jest.config.js` provided by the boilerplate.
The test command will load it and apply it.

```{warning}
Do not modify the existing keys in there if you don't know what you are doing, since some of them are required for the tests to run properly in the Volto context.
```

Both configurations are merged in a way that the keys of the configuration provided override the initial {file}`package.json` configuration, either in Volto or in your projects.

```{note}
For more background on testing add-ons in Volto 18, see {doc}`../../contributing/testing`, since the developer experience has been unified for both add-ons and Volto core.
```


## Acceptance tests

```{seealso}
See the chapter {doc}`../../contributing/acceptance-tests`.
```