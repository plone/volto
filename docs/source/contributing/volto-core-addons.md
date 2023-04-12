# Volto Core add-ons

Volto has the concept of "core add-ons".
They are add-ons that are always installed in Volto.
They are located separately from the main code in the `packages` folder.
These add-ons can be released as standalone add-ons, and used in projects that are using versions of Volto that do not have them by default.
Another useful use case is the introduction of new or experimental features that need to be developed side-by-side with core Volto, but not enabled by default.
You can use these packages released as standalone add-ons installed in your old Volto projects to test them or to have a bleeding edge feature without having to upgrade to the latest Volto version.

## Enabling a core add-on

This is a feature that only spans in Volto core itself, so it does not apply to projects or add-ons.
The core add-ons are enabled in Volto's own `package.json`.
It uses the key `packagesFolderAddons`:

```json
  "packagesFolderAddons": {
    "volto-slate": {
      "package": "@plone/volto-slate"
    }
  },
```

The structure is similar to `mrs-developer.json`.
The key is the name of the folder, then an object with at least the key `package` with its value as the name of the package that is going to be used.
