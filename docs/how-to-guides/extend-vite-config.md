---
myst:
  html_meta:
    "description": "How to extend Seven Vite configuration from an add-on"
    "property=og:description": "How to extend Seven Vite configuration from an add-on"
    "property=og:title": "Extend Vite config"
    "keywords": "Seven, Vite, add-on, vite.extend, configuration"
---

# Extend Vite config

This guide shows how to extend a Seven app's Vite configuration from an add-on.

## Create a `vite.extend` file in your add-on

Create a file named {file}`vite.extend.js` or {file}`vite.extend.ts` in the root of your add-on package.

For example:

-   {file}`packages/my-addon/vite.extend.js`
-   {file}`packages/my-addon/vite.extend.ts`

## Export a default function

The file must export a default function.
Seven calls this function with the current Vite config and a context object, and expects the function to return a Vite config object.

```ts
export default function extendViteConfig(config, context) {
  return config;
}
```

If your function does not return a config object, Seven raises an error during loader generation.

## Update the Vite config

Return a new config object or mutate the existing one before returning it.

The following example adds an alias and externalizes a package during SSR builds.

```ts
export default function extendViteConfig(config, context) {
  return {
    ...config,
    resolve: {
      ...(config.resolve || {}),
      alias: [
        ...(config.resolve?.alias || []),
        {
          find: '@acme/example',
          replacement: '/absolute/path/to/example',
        },
      ],
    },
    ssr: {
      ...(config.ssr || {}),
      external: [
        ...(config.ssr?.external || []),
        'some-server-only-package',
      ],
    },
  };
}
```

## Use the context object

The second argument contains information about the current Vite run.
Use it when you need different behavior for development, production, or SSR.

```ts
export default function extendViteConfig(config, context) {
  const { command, mode, isSsrBuild } = context;

  if (command === 'build' && isSsrBuild) {
    return {
      ...config,
      define: {
        ...(config.define || {}),
        __SSR_BUILD__: true,
      },
    };
  }

  return config;
}
```

## Register the add-on

Make sure your add-on is registered in the app, for example through {file}`registry.config.ts` or the `addons` key in {file}`package.json`.

Seven discovers `vite.extend.js` and `vite.extend.ts` from registered add-ons only.

## Run the build

Run the app build as usual.
Seven generates a Vite loader from the registered add-ons and applies the extenders in add-on order.

```shell
make build
```

If multiple add-ons provide a `vite.extend` file, they are applied in the same order as the registered add-ons.
