---
myst:
  html_meta:
    "description": "Test add-ons in Volto 19"
    "property=og:description": "Test add-ons in Volto 19"
    "property=og:title": "Test add-ons in Volto 19"
    "keywords": "Volto, Plone, testing, test, CI, add-ons, Vitest, Jest"
---

# Test add-ons in Volto 19

```{warning}
This guide assumes that you've used {term}`Cookieplone` to create your add-on boilerplate.
```

In Volto 19, Jest has been completely removed, and add-ons that rely on Jest-based test suites are no longer supported.
It is recommended to migrate your add-on tests to Vitest as soon as possible.

See the migration guide {doc}`test-add-ons-18`.






