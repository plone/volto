---
myst:
  html_meta:
    "description": "Install multilingual support to use Plone's multilingual feature"
    "property=og:description": "Install multilingual support to use Plone's multilingual feature"
    "property=og:title": "Multilingual"
    "keywords": "Volto, Plone, frontend, React, multilingual"
---

# Multilingual

Volto provides support for Plone's multilingual feature through the Plone core add-on `plone.app.multilingual`.
It is included with Plone 5 and later.
You can enable it through the {guilabel}`Add-ons` control panel in the administrative interface.


## Volto configuration

You need to enable multilingual in Volto's configuration object.

```js
import config from '@plone/volto/registry'

config.settings = {
  ...config.settings,
  isMultilingual: true,
  supportedLanguages: ['en', 'de', 'ca', 'pt-br'],
  defaultLanguage: 'en'
}
```

Declare the language you want to support in your site in the `supportedLanguages` array, and which is the default language of your site.

```{warning}
The default language and the supported languages must match those set in the Plone backend.
Those should be set either using GenericSetup using your policy package or manually via the {guilabel}`Languages` control panel.
Examples include `en` for English, or `pt-br` for Portuguese (Brazil).
```

## Features

Volto multilingual includes the following features.

-   language detector that detects the language preference from a cookie, and redirects to the related language root folder
-   language switcher that allows the user to switch between languages
-   adds menu entries that allows to create and link a new content item with the original one in one of the supported languages set in the site
-   when users use the language switcher to change the language from a translated content, they are redirected to the linked content within the same translation group
-   manually link two objects via the {guilabel}`Manage translations` link under the {guilabel}`More` menu
-   manually delete a link (or unlink) between two objects ({guilabel}`Manage translations` link under the {guilabel}`More` menu)
