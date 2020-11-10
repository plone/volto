# Settings reference guide

This is a summary of all the configuration options and what they control.

!!! note
    This list is still incomplete, contributions are welcomed!

# navDepth

Navigation levels depth used in the navigation endpoint calls. Increasing this is useful
for implementing fat navigation menus. Defaults to `1`.

# defaultBlockType

The default block type in Volto is "text", which uses the current DraftJS-based implementation for the rich text editor. Future alternative rich text editors will need to use this setting and replace it with their block type. The block definition should also include the `blockHasValue` function, which is needed to activate the Block Chooser functionality. See this function signature in [Blocks > Settings](../blocks/settings.md).

# sentryOptions

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
