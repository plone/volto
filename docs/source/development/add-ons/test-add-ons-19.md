---
myst:
  html_meta:
    "description": "Test add-ons in Volto 19"
    "property=og:description": "Test add-ons in Volto 19"
    "property=og:title": "Test add-ons in Volto 19"
    "keywords": "Volto, Plone, testing, test, CI, add-ons, Vitest, Jest"
---

# Test add-ons in Volto 19

In Volto 19, Jest has been completely removed, and add-ons that rely on Jest-based test suites are no longer supported.
You must migrate your add-on tests to Vitest.

See the guide {doc}`test-add-ons-18` for how to migrate your add-on tests from Jest to Vitest.


## Vitest version

Starting with Volto 19.8.3, Volto uses Vitest 4.
Your add-on should use the same Vitest version as Volto, because it runs its tests with Volto's shared Vitest configuration and setup files.

Add-ons generated with {term}`Cookieplone` take Vitest from Volto's centralized pnpm catalog.
In the {file}`package.json` of your add-on package, declare Vitest as follows.

```json
"devDependencies": {
  "vitest": "catalog:"
}
```

If your add-on declares a fixed Vitest version, such as `"vitest": "^3.1.2"`, see {ref}`upgrade-guide-vitest-4-label` for how and why to upgrade it.
