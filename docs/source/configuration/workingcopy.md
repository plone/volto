# Working copy support

Volto provide support for Plone's Working Copy feature. You need to install `plone.app.iterate` add-on in your Plone site that comes available by default. You can do that in Plone's control panel or using the Generic Setup facility.

## Volto configuration

You need to enable working copy support in Volto's configuration object:

```js
import config from '@plone/volto/registry'

config.settings.hasWorkingCopySupport = true;
```

## Features

Volto working copy support features include:

- "Checkout" any content (except Plone site object) and create a working copy of that content
- Work on the working copy
- "Checkin" the working copy by applying the changes into the original (baseline) object
- Cancel the working copy if required
