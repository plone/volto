---
myst:
  html_meta:
    "description": "Creating Volto views"
    "property=og:description": "Creating Volto views"
    "property=og:title": "Creating Volto Views"
    "keywords": "Volto, Plone, frontend, React, views"
---

# Creating Volto Views

## Full View

In this chapter we are going to create a new type of view for displaying
contents in a folder. We will call this view `full view`. In Plone there is a
view called `All content` with the view id `full_view` that we will reuse.
We start by creating a file called: `components/FullView/FullView.jsx`.

```jsx
/**
 * Full view component.
 * @module components/theme/View/FullView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import { Container, Image } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

/**
 * Full view component class.
 * @function FullView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const FullView = ({ content }) => (
  <Container className="view-wrapper">
    <article id="content">
      <header>
        <h1 className="documentFirstHeading">{content.title}</h1>
        {content.description && (
          <p className="documentDescription">{content.description}</p>
        )}
      </header>
      <section id="content-core">
        {content.items.map((item) => (
          <article key={item.url}>
            <h2>
              <UniversalLink href={item.url} title={item['@type']}>
                {item.title}
              </UniversalLink>
            </h2>
            {item.image && (
              <Image
                clearing
                floated="right"
                alt={item.image_caption ? item.image_caption : item.title}
                src={item.image.scales.thumb.download}
              />
            )}
            {item.description && <p>{item.description}</p>}
            {item.text && item.text.data && (
              <p dangerouslySetInnerHTML={{ __html: item.text.data }} />
            )}
          </article>
        ))}
      </section>
    </article>
  </Container>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FullView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Child items of the object
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Title of the item
         */
        title: PropTypes.string,
        /**
         * Description of the item
         */
        description: PropTypes.string,
        /**
         * Url of the item
         */
        url: PropTypes.string,
        /**
         * Image of the item
         */
        image: PropTypes.object,
        /**
         * Image caption of the item
         */
        image_caption: PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default FullView;
```

Next we will add the view to the app components. We can do this by adding the following lines to `components/index.js`.

```jsx
import FullView from './FullView/FullView';

export { FullView };
```

## Registering The View

To register the view we will edit the `config.js` file. The `views`
configuration options contains all the views. This object contains an object
called `layoutViews` which registers all the layout views. We will add the `full_view` to this object.

```js
import { FullView } from './components';

export default function applyConfig(config) {
  const defaultViews = config.views
  // Add here your project's configuration here by modifying `config` accordingly
  config.views = {
    ...defaultViews,
    layoutViews: {
      ...defaultViewslayoutViews,
      full_view: FullView,
    },
  };
  return config;
}
```

## Registering a new view called Album View

Create the `Album View` that shows the images in a grid. You can use the `Card`
class from `semantic-ui`, `components/AlbumView/AlbumView.jsx`:

```jsx
/**
 * Album view component.
 * @module components/theme/View/AlbumView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import { Card, Container, Image } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

/**
 * Album view component class.
 * @function AlbumView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const AlbumView = ({ content }) => (
  <Container className="view-wrapper">
    <article id="content">
      <header>
        <h1 className="documentFirstHeading">{content.title}</h1>
        {content.description && (
          <p className="documentDescription">{content.description}</p>
        )}
      </header>
      <section id="content-core">
        <Card.Group>
          {content.items.map((item) => (
            <Card key={item.url}>
              {item.image && (
                <Image
                  alt={item.image_caption ? item.image_caption : item.title}
                  src={item.image.scales.thumb.download}
                />
              )}
              <Card.Content>
                <Card.Header>
                  <UniversalLink href={item.url} title={item['@type']}>
                    {item.title}
                  </UniversalLink>
                </Card.Header>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </section>
    </article>
  </Container>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
AlbumView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Child items of the object
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Title of the item
         */
        title: PropTypes.string,
        /**
         * Description of the item
         */
        description: PropTypes.string,
        /**
         * Url of the item
         */
        url: PropTypes.string,
        /**
         * Image of the item
         */
        image: PropTypes.object,
        /**
         * Image caption of the item
         */
        image_caption: PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default AlbumView;
```

Then in `components/index.js`:

```js
/**
 * Add your components here.
 * @module components
 * @example
 * import Footer from './Footer/Footer';
 *
 * export {
 *   Footer,
 * };
 */

import AlbumView from './AlbumView/AlbumView';
import FullView from './FullView/FullView';

export { AlbumView, FullView };
```

And in `config.js`:

```js
/**
 * Add your config changes here.
 * @module config
 * @example
 * export default function applyConfig(config) {
 *   config.settings = {
 *     ...config.settings,
 *     port: 4300,
 *     listBlockTypes: {
 *       ...config.settings.listBlockTypes,
 *       'my-list-item',
 *    }
 * }
 */

// All your imports required for the config here BEFORE this line
import '@plone/volto/config';
import { AlbumView, FullView } from './components';

export default function applyConfig(config) {
  const defaultViews = config.views
  // Add here your project's configuration here by modifying `config` accordingly
  config.views = {
    ...defaultViews,
    layoutViews: {
      ...defaultViews.layoutViews,
      album_view: AlbumView,
      full_view: FullView,
    },
  };
  return config;
}

```
