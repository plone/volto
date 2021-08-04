# Locking support

Volto provides support for Plone's locking feature, but you need to enable the `plone.locking` behavior on your Dexterity content types first. You can do that in Plone's control panel or using the Generic Setup facilities.

## Volto configuration

You need to enable locking support in Volto's configuration object:

```js
import config from '@plone/volto/registry'

config.settings.hasLockingSupport = true;
```

## Features

Volto locking support features include:

- Automatically "Lock" any content (except Plone site object) on Edit
- Automatically "Unlock" any content (except Plone site object) on Save / Cancel
- "Unlock" locked content by another user, if needed.
