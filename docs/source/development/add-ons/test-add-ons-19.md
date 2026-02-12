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
