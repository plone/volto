---
html_meta:
  "description": ""
  "property=og:description": ""
  "property=og:title": ""
  "keywords": ""
---

# Locking support

Content edit locking feature is to prevent simultaneous conflicting edits of the same content.
If the editor forgot to press Save or Cancel explicit unlocking must be performed on locked objects if you want to modify them.

Volto provides support for Plone's locking feature, but you need to enable the `plone.locking` behavior on your Dexterity content types first. You can do that in Plone's control panel or using the Generic Setup facilities.

1. Log-in as `Site Administrator` and click `Personal tools` in the left Toolbar
2. Go to `Site Setup` -> `Dexterity Content Types`, select the content type.
3. Go to `Behaviors`
4. Select the `Locking (Locking support for dexterity)` behavior
5. Save

## Features

Volto locking support features include:

- Automatically `Lock` any content (except Plone site object) on `Edit`
- Automatically `Unlock` any content (except Plone site object) on `Save / Cancel`
- Possibility to `Unlock` locked content by another user, if needed.
