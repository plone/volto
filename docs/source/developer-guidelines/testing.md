# Testing

We use Jest for unit testing in Volto. The popular `@testing-library/react` is also
available for writing your tests. For every feature or component, a unit test is
mandatory in Volto core.

## Jest configuration

Jest is configured in `package.json`, under the "jest" key.

## Jest configuration override

In CI or for testing addons, it's interesting to provide an alternate Jest configuration
or slightly modify it. Volto provide a way to do it using a `jest.config.js` file or
pointing the test runner to a file of your choice, using `RAZZLE_JEST_CONFIG`
environment variable.

!!! Note
    Both configurations are merged in a way that the keys of the config provided override  the initial (`package.json`) default config, either in Volto or in your projects.

This is specially useful in CI while developing add-ons, so you can pass an specific configuration that deals with the addon config properly.
