# Settings reference guide

This is a summary of all the configuration options and what they control.

!!! note
This list is still incomplete, contributions are welcomed!

## navDepth

!!! block ""
Navigation levels depth used in the navigation endpoint calls. Increasing this is useful for implementing fat navigation menus. Defaults to `1`.

## defaultBlockType

!!! block ""
The default block type in Volto is "text", which uses the current DraftJS-based implementation for the rich text editor. Future alternative rich text editors will need to use this setting and replace it with their block type. The block definition should also include the `blockHasValue` function, which is needed to activate the Block Chooser functionality. See this function signature in [Blocks > Settings](../blocks/settings.md).

## sentryOptions

!!! block ""
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

## `bbb_getContentFetchesFullobjects`

!!! block ""

    Before Volto 10, the main content-grabbing request, triggered as a result of
    `getContent` action, always used the `fullobjects` flag, which fully serialized
    the immediate children of the context request. If your code depends on this
    behavior, set this flag to `true` in the `settings` object.

    !!! note
        You should probably refactor your code to avoid depending on this
        behavior. It can cause performance issues when you have large children
        (for example content with lots of text) and you need to batch requests
        anyway, if you want to be sure to display all the children.

## persistentReducers

!!! block ""

    A list of reducer names that should use the browser's localstorage to
    persist their data.

## maxResponseSize

!!! block ""

    The library that we use to get files and images from the backend (superagent)
    has a response size limit of 200 mb, so if you want to get a file bigger than 200 mb
    from Plone, the SSR will throw an error.

    You can edit this limit in the `settings` object setting a new value in bytes
    (for example, to set 500 mb you need to write 5000000000).
