> [!IMPORTANT]
> This package is a maintained fork of the original [`babel-preset-razzle`](https://github.com/jaredpalmer/razzle/tree/master/packages/babel-preset-razzle).
> The upstream project is currently unmaintained, so we forked it into the Volto monorepo to keep its dependencies updated and address security issues.
> All upstream attributions are preserved below.

# @plone/babel-preset-razzle

This package includes the [Babel](https://babeljs.io) preset used by [Razzle](https://github.com/jaredpalmer/razzle).

## Usage in Razzle projects

The easiest way to use this configuration is with Razzle, which includes it by default.

## Usage outside of Razzle

If you want to use this Babel preset in a project not built with Razzle, you can install it through the following steps.

First, [install Babel](https://babeljs.io/setup/).

Then create a file named `.babelrc` with the following contents in the root folder of your project:

```js
{
  "presets": ["@plone/razzle"]
}
```

This preset uses the `useBuiltIns` option with [`transform-object-rest-spread`](https://babeljs.io/docs/babel-plugin-transform-object-rest-spread/), which assumes that `Object.assign` is available or polyfilled.
