---
myst:
  html_meta:
    "description": "Use a pattern called component shadowing to customize Volto components."
    "property=og:description": "Use a pattern called component shadowing to customize Volto components."
    "property=og:title": "Customizing Components"
    "keywords": "Volto, Plone, frontend, React, customizing component"
---

# Customizing Components

You're able to customize the existing Volto components using a pattern called {term}`component shadowing` using the `customizations` folder.
You have to identify and locate the component that you want to customize, let's say the Logo component in [Volto source
code](https://github.com/plone/volto/tree/main/packages/volto/src).

You can override any component that lives inside Volto's {file}`src` folder and adapt it to your needs, without touching the original (source) counterparts.
Components are named in a semantic and approachable way.

To identify them, you can use several approaches.
The main one uses [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).
You can inspect the app and find the name of the component (the name of the tag), then search for it in the Volto source code.

To override the component, use the same folder structure that the original component has in the Volto source code, and place it inside the {file}`customizations` folder.

## Customizing the `Logo` resource

So, for example, if you want to replace the logo which is located in Volto at {file}`components/theme/Logo/Logo.svg`, then the folder structure needs to match the folder structure of Volto in the {file}`customizations` folder.
The final path of the new overridden component will be {file}`<my-volto-addon-or-package/>src/customizations/components/theme/Logo/Logo.svg`.

## Change the `Tags` component

When overriding components, we follow the same approach.
Copy over the original component from the Volto source code, then amend the imports (if any are required) to match the current folder structure.
Point Volto source code to use the `@plone/volto` module, instead of relative paths, and make other required amendments.

Locate the `Tags.jsx` file and override this file so that there is a label in front of the tags with: `Tags:`.

```{code-block} jsx
:emphasize-lines: 26
/**
 * Tags component.
 * @module components/theme/Tags/Tags
 */

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import config from '@plone/registry';

/**
 * Tags component.
 * @function Tags
 * @param {Object} props Component properties.
 * @param {Object} props.content Content object that may contain subjects.
 * @param {Array} [props.content.subjects] Optional array of tags (subjects).
 * @returns {JSX.Element|null} Markup of the component or null if no tags are available.
 */
const Tags = ({ content }) => {
  const tags = content?.subjects || [];

  if (!config.settings.showTags || !tags.length) return null;

  return (
    <Container className="tags">
      Tags:
      {tags.map((tag) => (
        <Link className="ui label" to={`/search?Subject=${tag}`} key={tag}>
          {tag}
        </Link>
      ))}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Tags.propTypes = {
  content: PropTypes.shape({
    subjects: PropTypes.arrayOf(PropTypes.string),
  }),
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Tags.defaultProps = {
  content: {
    subjects: [],
  },
};

export default Tags;
```

The final path of the overridden component will be {file}`customizations/components/theme/Tags/Tags.jsx`.

(advanced-customization-scenarios-label)=

## Advanced customization scenarios

Once you've started developing your Volto project, you might find that you also want to integrate other third-party Volto add-ons, and potentially customize files from those add-ons.
You may even want to write an add-on that customizes Volto or other add-ons on its own.

To customize an add-on, you can follow the pattern described above, but place the add-on customization files in a folder named after the add-on, inside the {file}`src/customizations` folder.
So, for example, to customize the {file}`volto-venue/src/components/OSMMap/OSMMap.jsx` file, you would create a {file}`src/customizations/volto-venue/components/OSMMap/OSMMap.jsx` shadow file.

If you start customizing add-ons, to keep a clean folder structure inside {file}`src/customizations`, you can move the Volto customizations file in a {file}`src/customizations/volto` subfolder.

Add-ons can also customize Volto and other add-ons using the same logic.
The default customization path inside an add-on is {file}`src/customizations`, but the add-on can specify its own customization path with the `customizationPaths` key in {file}`package.json`.
The `customizationPaths` is a list that takes strings with paths relative to the {file}`package.json` file.
All these paths are scanned for customization files.

```{tip}
The `customizationPaths` key is also available in the project, not just the add-ons.
```

In case of conflicts where multiple add-ons customize the same file, the order in which add-ons are declared matters.
The last add-on declared in the `addons` key in the project's {file}`package.json` wins.
Furthermore, the project's customizations are applied last, so they "win" in the conflict resolution.

Add-ons can also customize modules from the Volto project (the root), by creating a `@root` folder in their customizations path.
This is useful, for example, if you prefer a style where the Volto generated project scaffold is thrown away, and you want to override some modules that are imported from the `@root` namespace, such as {file}`src/theme.js`, which is imported as `@root/theme`.
