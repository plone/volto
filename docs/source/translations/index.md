---
html_meta:
  "description": "A guide to help contributors to translate Volto into their language"
  "property=og:description": "A guide to help contributors to translate Volto into their language"
  "property=og:title": "Translations"
  "keywords": ""
---

# Translations

Most of the interface in Volto is already translated because many of the messages come from the backend, which is already translated.

But there are some Volto-specific messages that need to be translated in Volto itself and this is the guide to do it:


1. Go to https://github.com/plone/volto and clone it into your computer

2. Create a new branch to prepare the translations

- Translate your language po file found at locales/{language_code}/LC_MESSAGES/volto.po
- Alternatively, if your language file does not exist, create a new folder at locales/{language_code}/LC_MESSAGES/, copy over the volto.pot file there as volto.po and start translating.

3. Commit your changes and add a Pull-Request.

The Volto team will review your contribution and will be ready to be published with the next Volto version.
