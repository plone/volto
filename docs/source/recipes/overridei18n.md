# Overriding i18n messages

If you want to override an existing translation, you should declare the original message
again somewhere else in your project, e.g in `src/config.js`, like this:

```js
import { defineMessages } from 'react-intl';

defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
}
```

Then run `yarn i18n` and you'll find the translation ready to override in your `locales`
directory, e.g `locales/de/LC_MESSAGES/volto.po`.

```
#: src/config
msgid "Back"
msgstr "My overriden translation"
```

After setting the override, then run `yarn i18n` again, to create the `de.json`
translation files. Restart Volto to see the changes applied.

!!! note
    Shadowed components do NOT override translations, since 99% of the time, you
    don't want them to do that, so the `customizations` folder is excluded from the
    i18n build.
