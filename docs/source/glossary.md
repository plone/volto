---
myst:
  html_meta:
    "description": "Terms and definitions used in the Volto Documentation."
    "property=og:description": "Terms and definitions used in the Volto Documentation."
    "property=og:title": "Glossary"
    "keywords": "Volto, Plone, documentation, glossary, term, definition"
---

(glossary-label)=

# Glossary

```{glossary}
:sorted: true

contentIcons
    With this property you can configure Content Types icons.
    Those are visible in Contents view (ex "Folder contents").  The default
    ones are in
    [config/ContentIcons.jsx](https://github.com/plone/volto/blob/master/src/config/ContentIcons.jsx)
    and you can extend them in your project's config for custom content types
    using `settings.contentIcons`.

    In Volto projects, you can configure this for custom content types like:

    ```js
    import * as config from '@plone/volto/config';
    import courseSVG from './icons/course.svg';

    export const settings = {
      ...config.settings,
      contentIcons: {
        ...config.settings.contentIcons,
        Course: courseSVG,
    };
    ```
```
