---
myst:
  html_meta:
    "description": "Use a pattern called component shadowing to customize volto components."
    "property=og:description": "Use a pattern called component shadowing to customize volto components."
    "property=og:title": "Customizing Components"
    "keywords": "Volto, Plone, frontend, React, customizing component"
---

# Customizing Components

You are able to customize the existing Volto components using a pattern called
{term}`component shadowing` using the `customizations` folder. You have to identify and locate
the component that you want to customize, let's say the Logo component in [Volto source
code](https://github.com/plone/volto/tree/master/src).

```{tip}
Those familiar with Plone's JBOT customizing add-on will recognize this pattern
since it works the same way, except that here you have to create exactly the same
folder structure hierarchy of the original component instead of using the dotted
notation used in JBOT overrides.
```

You can override any component that lives inside Volto's `src` folder and
adapt it to your needs, without touching the original (source) counterparts.
Components are named in a semantic and approachable way.

In order to identify them, you can use several approaches the main one using
[React Developer
Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
then you can inspect the app and find out the name of the component (the name
of the tag), then search for it in the Volto source code.

To override the component, use the same folder structure that
the original component has in the Volto source code and place it inside the
`customizations` folder.

## Customizing the Logo resource

So, for example, if we want to replace the Logo which is located in
Volto at `components/theme/Logo/Logo.svg`, the folder structure needs
to match the folder structure of Volto in the `customizations` folder.
So the final path of the new overridden component will
be: `customizations/components/theme/Logo/Logo.svg`.

## Change The Tags Component

When overriding components, we follow the same approach. We will
copy over the original component from the Volto source code, then amend the
imports (if any are required) to match the current folder structure. Point Volto
source code using `@plone/volto` module instead of relative paths and other
amendments required.

Locate the `Tags.jsx` file and override this file so that there is a label in front of the tags with: `Tags:`.

```{code-block} jsx
:emphasize-lines: 20
/**
 * Tags component.
 * @module components/theme/Tags/Tags
 */

import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

/**
 * Tags component class.
 * @function Tags
 * @param {array} tags Array of tags.
 * @returns {string} Markup of the component.
 */
const Tags = ({ tags }) =>
  tags && tags.length > 0 ? (
    <Container>
      Tags:
      {tags.map((tag) => (
        <UniversalLink
          className="ui label"
          href={`/search?Subject=${tag}`}
          key={tag}
        >
          {tag}
        </UniversalLink>
      ))}
    </Container>
  ) : (
    <span />
  );

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Tags.defaultProps = {
  tags: null,
};

export default Tags;
```

The final path of the overrided component will be
`customizations/components/theme/Tags/Tags.jsx`.

(advanced-customization-scenarios-label)=

## Advanced customization scenarios

Once you've started developing your Volto project, you'll find that you want
also to integrate other third-party Volto addons and pottentially customize
files from those addons. You may even want to write an addon that customizes
Volto or other addons, on its own.

To customize an addon, you can follow the pattern described above, but place
the addon customization files in a folder named after the addon, inside the
`src/customizations` folder. So, for example, to customize the
`volto-venue/src/components/OSMMap/OSMMap.jsx` file, you would create
a `src/customizations/volto-venue/components/OSMMap/OSMMap.jsx` shadow file.

If you start customizing addons, to keep a clean folder structure inside
`src/customizations`, you can move the Volto customizations file in
a `src/customizations/volto` subfolder

Addons can also customize Volto and other addons using the same logic. The
default customization path inside an addon is `src/customizations`, but the
addon can specify its own customization path with the `customizationsPaths` key
in `package.json`. The `customizationPaths` is a list that takes strings with
paths relative to the `package.json` file. All these paths are looked up for
customization files.

```{tip}
The `customizationPaths` key is also available in the project, not just the
addons
```

In case of conflicts where multiple addons customize the same file, the order
of addon declaration matters: the last addon declared in the `addons` key in
the project's `package.json` wins. Further more, the project's customizations
are applied last, so they "win" in the conflict resolution.

Addons can also customize modules from the Volto project (the root), by
creating a `@root` folder in their customizations path. This is useful, for
example, if you prefer a style where the Volto generated project scaffold is
throw-away and you want to override some modules that are imported from the
`@root` namespace, such as `src/theme.js` (which is imported as `@root/theme`).
