---
myst:
  html_meta:
    "description": "We use Vitest for unit testing in Volto. The popular @testing-library/react is also available for writing your tests. For every feature or component, a unit test is mandatory in Volto core."
    "property=og:description": "We use Vitest for unit testing in Volto. The popular @testing-library/react is also available for writing your tests. For every feature or component, a unit test is mandatory in Volto core."
    "property=og:title": "Testing Volto with Vitest"
    "keywords": "Volto, Plone, frontend, React, testing, Vitest"
---

# Testing with Vitest

We use `Vitest` for unit testing in Volto.
The popular `@testing-library/react` is also available for writing your tests.
For every feature or component, a unit test is mandatory in Volto core.

## Vitest configuration

Vitest is configured in `package.json` under the `vitest` key. 
The configuration file `vitest.config.ts` for Volto core is set up at the root of `packages/volto`.


## Run Vitest tests on Volto core

```{note}
All commands in this documentation run from inside the `packages/volto` directory.
See {ref}`developing-core-run-commands-for-pnpm-workspaces-label` for other options to run tests.
```

Vitest tests must pass locally before you push commits to the remote Volto repository.
Vitest has several modes to run unit tests locally.
You can run Vitest in watch mode, run only failed tests, or run specific tests only.

By default, Vitest runs in watch mode when you execute the following command. 
```shell
pnpm test
```
This command will run all tests in watch mode.
This makes it faster and easier to test code changes.

If you don’t want to run tests in watch mode, you can use the following command.This will execute all tests once without entering watch mode.
```shell
pnpm test -- --watch=false
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
You can also run only specific tests using the following commands.

```shell
pnpm test src/components/theme/Image
# will run only the Image components tests
```
## Migration from Jest to Vitest
Since Volto Core now uses Vitest as its unit test runner instead of Jest, here are some guidelines for writing tests using Vitest.
Vitest shares a similar syntax with Jest as both use Mocha/Chai, but there are notable differences in handling mocks and other features.

### Differences in Mocks
```javascript
jest.mock('../../manage/Workflow/Workflow', () =>
  jest.fn(() => <div id="state-select" />),
);
```
The vitest equivalent mock to above jest mock is 
```javascript
vi.mock('../../manage/Workflow/Workflow', () => ({
  default: vi.fn(() => <div id="state-select" />),
}));
```
Vitest's vi.mock() does not automatically assume a default export like Jest does. Instead, it treats the module as an object, so the mocked function must be explicitly assigned to the `default` property.
 
 ### Testing with lazy loaded libraries
 ```javascript
jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);
```
Vitest equivalent is 
```javascript
vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  const { __setLoadables } = await import('@plone/volto/helpers/Loadable/Loadable');
  await __setLoadables();
});
```
`require()` is not supported in vitest, we use `import()` in vitest.

