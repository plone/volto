---
myst:
  html_meta:
    "description": "We use Vitest for unit testing in Volto. The popular @testing-library/react is also available for writing your tests. For every feature or component, a unit test is mandatory in Volto core."
    "property=og:description": "We use Vitest for unit testing in Volto. The popular @testing-library/react is also available for writing your tests. For every feature or component, a unit test is mandatory in Volto core."
    "property=og:title": "Testing Volto with Vitest"
    "keywords": "Volto, Plone, frontend, React, testing, Vitest"
---

# Testing

This chapter describes how to write and run unit tests in Volto.
It covers how to use {term}`Vitest`, the current unit test tool for Volto core.

The popular `@testing-library/react` is also available for writing your tests.
For every feature or component, a unit test is mandatory in Volto core.

```{versionadded} Volto 18.12.0
Volto core now uses Vitest for its unit tests.
```

```{deprecated} Volto 18.12.0
Volto core has migrated from Jest to Vitest for unit tests.
Jest is now deprecated.
Refer to {doc}`../development/add-ons/test-add-ons-18` for a complete migration guide from Jest to Vitest for your add-ons.
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
You can run Vitest in watch mode, run only failed tests, or run only specific tests.

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






## Acceptance tests

```{seealso}
See the chapter {doc}`acceptance-tests`.
```
