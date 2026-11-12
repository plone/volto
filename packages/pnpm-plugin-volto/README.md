# `@plone/pnpm-plugin-volto`

A [pnpm config dependency](https://pnpm.io/config-dependencies) that applies the pnpm settings shared by every Volto project and add-on.

pnpm reads settings such as `overrides` and `allowBuilds` only from the root of a workspace.
Before this package, every project had to copy them by hand, for example when Volto added a security override.
With this package, a project lists it once, and gets updated settings by bumping its version.

## Usage

Requires pnpm 10.29.3 or later.
Earlier versions of pnpm 10 ignore the plugin's `allowBuilds`.

Your project's `package.json` must not have a `pnpm` field.
While it has one, pnpm 10 ignores the plugin's `overrides` and `allowBuilds`.
Move any settings you need from it to `pnpm-workspace.yaml`.

```shell
pnpm add --config @plone/pnpm-plugin-volto
```

This adds the package to `configDependencies` in your `pnpm-workspace.yaml`.
pnpm 10 pins it to an exact version and integrity hash, so run the same command again to update it.

```yaml
configDependencies:
  '@plone/pnpm-plugin-volto': 19.0.0+sha512-...
```

pnpm 11 and later accept a version range instead, and store the integrity hash in the lockfile.

```yaml
configDependencies:
  '@plone/pnpm-plugin-volto': ^19.0.0
```

pnpm loads the package's `pnpmfile.cjs` automatically, because its name matches `@*/pnpm-plugin-*`.

After adding it, remove the settings that the plugin now provides from your `pnpm-workspace.yaml`, unless you want to keep a different value.

## What it sets

The settings live in [`settings.json`](./settings.json):

- `overrides`: version overrides that Volto needs, including security fixes for transitive dependencies.
- `allowBuilds`: packages whose install scripts must run (`true`) or must not run (`false`).
- `publicHoistPattern`: packages hoisted to the root `node_modules`, so that tools such as ESLint, Prettier and Stylelint find their plugins.

Your project's own settings always win.
To change or remove a shared value, set it in your `pnpm-workspace.yaml`.
For `publicHoistPattern`, your patterns are added to the shared ones.

## Versioning

The major version of this package matches the major version of Volto.
Use the range for the Volto major version your project runs, such as `^19.0.0` for Volto 19.
