---
myst:
  html_meta:
    "description": "Use a pattern called component shadowing to customize volto components."
    "property=og:description": "Use a pattern called component shadowing to customize volto components."
    "property=og:title": "Customizing Components"
    "keywords": "Volto, Plone, frontend, React, customizing component"
---

# Customizing components

You can customize the existing Volto components using a pattern called {term}`component shadowing` using the {file}`customizations` folder.

You can find further detailed information on how to shadow a component in {doc}`./shadowing`.

## Change the `Tags` component

When overriding components, we follow the same approach.
We will copy over the original component from the Volto source code, then amend the imports (if any are required) to match the current folder structure.
Point Volto source code using the `@plone/volto` module without relative paths and other amendments.

Locate the {file}`Tags.jsx` file and override this file so that there is a label in front of the tags with `Tags:`.

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

The final path of the overridden component will be {file}`customizations/components/theme/Tags/Tags.jsx`.

(advanced-customization-scenarios-label)=

## Advanced customization scenarios (`@root`)

You can also make add-ons customize modules from the Volto project (the root) by creating a {file}`@root` folder in the customization path.
This is useful, for example, if you prefer a style where the Volto generated project scaffold is a throw-away, and you want to override some modules that are imported from the `@root` namespace, such as {file}`src/theme.js`, which is imported as `@root/theme`.
