---
myst:
  html_meta:
    "description": "Internationalize your add-on and override translations"
    "property=og:description": "Internationalize your add-on and override translations"
    "property=og:title": "Add-on Internationalization"
    "keywords": "Internationalization, i18n, add-on"
---

# Add-on Internationalization

The internationalization workflow is the same as in main Volto: you develop your add-on, then add the translations to your code.
See {ref}`creating-i18n-strings` for how to mark strings and phrases as translatable.

Your add-on has a `locales` folder with a `.pot` file.

1.  Create the following structure in your add-ons `locales` folder for every language you want to support.
    As an example for the language Italian:

    ```text
    it
    └── LC_MESSAGES
        └── volto.po
    ```

1.  Run `yarn i18n` in the context of your add-on.
1.  Go to each `.po` file in your `locales` folder, and write the translations for each translation literal.

In the context of your project, run `yarn i18n` to merge the add-on translations with the ones of your project.


## Override translations

If you have multiple add-ons installed in your project, the translations are loaded in the order your add-ons are listed in `package.json`.
If two add-ons provide different translations for the same message, then the last defined add-on wins.

When running `yarn i18n` in the context of your project, the project's own locales are processed last and can override translations from any add-on.
