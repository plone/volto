# Volto core add-ons

Volto has the concept of "core add-ons".
They are add-ons that are always installed in Volto.
They are located separately from the main code in the `packages` folder.
If Volto uses them directly, these add-ons must be released as stand-alone add-ons.
You can use these packages released as standalone add-ons installed in your old Volto projects to test them or to have a bleeding edge feature without having to upgrade to the latest Volto version.
You can add them to non-Volto projects to get parts of the Volto feature set outside of the main project.

## Enabling a core add-on

This is a feature that only spans in Volto core itself, so it does not apply to projects or add-ons.
The core add-ons are enabled in Volto's own `package.json`.
It uses the key `coreAddons`:

```json
  "coreAddons": {
    "volto-slate": {
      "package": "@plone/volto-slate"
    }
  },
```

The structure is similar to `mrs-developer.json`.
The key is the name of the folder, then an object with at least the key `package` with its value as the name of the package that is going to be used.
