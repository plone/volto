---
myst:
  html_meta:
    "description": "The listing block provides an additional extension letting the developer modify the default 'No results found' message using the configuration of the block"
    "property=og:description": "The listing block provides an additional extension letting the developer modify the default 'No results found' message using the configuration of the block"
    "property=og:title": "Listing block extensions mechanism"
    "keywords": "Volto, Plone, frontend, React, Upgrade, Guide, Block extensions, variations, schema enhancers, listing block"
---

(listing-block)=

# Listing block

The listing block is a special block that can be configured to run a catalog query in the backend and show the results of that search.

Apart from the {ref}`standard variation <extensions-block-variations>` and {ref}`schema enchancing extensions <extensions-schema-enhancers>`, the listing block provides a configurable way to handle the "No results" message.

When the listing block configured search returns no results, Volto presents a default "No results found" message.
But sometimes you want to change such a message to offer more meaningful messages, or do some other fancy stuff in that case.
For instance, you may want to show a "There are no future events" or "There are no images in the gallery" message for a given listing block.

To achieve that, you can configure a new `noResultsComponent` when configuring the listing block, and provide a custom component to render such a message.
To do that, you need to reconfigure that option in the configuration of your project:

```jsx
import { FormattedMessage } from 'react-intl';

const MyNoResultsComponent = (props) => {
  return (
    <FormattedMessage
      id="mynoresultsmessage"
      defaultMessage="This is my no results text"
    />
  );
};

const applyConfig = (config) => {
  config.blocks.listing['noResultsComponent'] = MyNoResultsComponent;
  return config;
};
```

In addition to that, each variation configured for the listing block can have a custom no results template.
This way you can provide specific no results messages per-variation.
This can be done, like in the earlier step, stating that in the configuration:

```jsx
import { FormattedMessage } from 'react-intl';

const MyNoResultsComponent = (props) => {
  return (
    <FormattedMessage
      id="myNoResultsComponentForVariation"
      defaultMessage="This is my no results text specific for the default variation "
    />
  );
};

const applyConfig = (config) => {
  config.blocks.listing.variations.default[
    'noResultsComponent'
  ] = MyNoResultsComponent;
  return config;
};
```
