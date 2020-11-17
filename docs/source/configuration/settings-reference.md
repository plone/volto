# Settings reference guide

This is a summary of all the configuration options and what they control.

!!! note
This list is still incomplete, contributions are welcomed!

## navDepth

Navigation levels depth used in the navigation endpoint calls. Increasing this is useful for implementing fat navigation menus. Defaults to `1`.

## defaultBlockType

The default block type in Volto is "text", which uses the current DraftJS-based implementation for the rich text editor. Future alternative rich text editors will need to use this setting and replace it with their block type. The block definition should also include the `blockHasValue` function, which is needed to activate the Block Chooser functionality. See this function signature in [Blocks > Settings](../blocks/settings.md).

## sentryOptions

Sentry configuration:

```js
import {
  settings as defaultSettings,
} from '@plone/volto/config';

const settings = {
  ...defaultSettings,
  sentryOptions: {
    ...defaultSettings.sentryOptions,
    dsn: 'https://key@sentry.io/1',
    environment: 'production',
    release: '1.2.3',
    serverName: 'volto',
    tags: {
      site: 'foo.bar',
      app: 'test_app',
      logger: 'volto',
    },
    extras: {
      key: 'value',
    },
    integrations: [
        ...defaultSettings.sentryOptions.integrations,
        // new MyAwesomeIntegration()
    ]
  }
};
```

See more about [Sentry integration](../deploying/sentry.md).

## contentIcons

!!! block ""

    With this property you can configure Content Types icons.
    Those are visible in Contents view (ex "Folder contents").  The default
    ones are in
    [config/ContentIcons.jsx](https://github.com/plone/volto/tree/master/src/config/ContentIcons.jsx)
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
