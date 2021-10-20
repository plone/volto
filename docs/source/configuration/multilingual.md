# Multilingual

Volto provide support for Plone's Multilingual feature. You need to install Multiligual
support in Plone (plone.app.multilingual add-on), that comes available by default since
Plone 5 and can be installed in Plone's control panel.

## Volto configuration

You need to enable multilingual in Volto's configuration object:

```js
import config from '@plone/volto/registry'

config.settings = {
  ...config.settings,
  isMultilingual: true,
  supportedLanguages: ['en', 'de', 'ca', 'pt-br'],
  defaultLanguage: 'en'
}
```

Declare the language you want to support in your site in the `supportedLanguages` array,
and which is the default language of your site.

!!! warning
    The default language and the supported languages must match the one set in the Plone
    side, and those should be set using GenericSetup using your policy package, or
    manually via the Languages control panel, i.e. en for English, or pt-br for Portuguese (Brazil)

## Features

Volto Multilingual features include:

- Language detector that detects the language preference (cookie) and redirects to the related language root folder
- Language switcher that allows user to switch between languages
- Add menu entries that allows to create and link a new content with the original one in one of the supported languages set in the site
- When users use the language switcher to change language from a translated content, they are redirected to the linked content (within the same translation group)
- Manual link two objects (Manage translations link in More menu)
- Manual deletion of a link (unlink) between two objects (Manage translations link in More menu)
