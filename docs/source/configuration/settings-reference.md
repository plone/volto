# Settings reference guide

This is a summary of all the configuration options and what they control.

## Main settings

!!! note
    This list is still incomplete, contributions are welcomed!

### navDepth

!!! block ""

    Navigation levels depth used in the navigation endpoint calls. Increasing this is useful for implementing fat navigation menus. Defaults to `1`.

### defaultBlockType

!!! block ""

    The default block type in Volto is "text", which uses the current DraftJS-based implementation for the rich text editor. Future alternative rich text editors will need to use this setting and replace it with their block type. The block definition should also include the `blockHasValue` function, which is needed to activate the Block Chooser functionality. See this function signature in [Blocks > Settings](../blocks/settings.md).

### sentryOptions

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

### contentIcons

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

### `bbb_getContentFetchesFullobjects`

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

### persistentReducers

!!! block ""

    A list of reducer names that should use the browser's localstorage to
    persist their data.

### maxResponseSize

!!! block ""

    The library that we use to get files and images from the backend (superagent)
    has a response size limit of 200 mb, so if you want to get a file bigger than 200 mb
    from Plone, the SSR will throw an error.

    You can edit this limit in the `settings` object setting a new value in bytes
    (for example, to set 500 mb you need to write 5000000000).

### initialReducersBlacklist

!!! block ""

    The initial state passed from server to browser needs to be minimal in order to optimize the resultant html generated. This state gets stored in `window.__data` and received in client.

    You can blacklist a few reducers that you don't want to be part of `window.__data`,thus decreasing the initial html size for performance gains.

    ```js
    import * as config from '@plone/volto/config';

    export const settings = {
      ...config.settings,
      initialReducersBlacklist: [
        ...config.settings.initialReducersBlacklist,
        'yourReducer',
      ]
    };
    ```

### loadables

!!! block ""

    A mapping of loadable libraries that can be injected into components using
    the `injectLazyLibs` HOC wrapper. See the [Lazy
    loading](../recipes/lazyload) page for more details.

### lazyBundles

!!! block ""

    A mapping of bundles to list of lazy library names. Create new bundles (or
    change the already provided `cms` bundle to be able to preload multiple
    lazy libraries (with `preloadLazyLibs`) or quickly load them with
    `injectLazyLibs`.

### storeExtenders

!!! block ""

    A list of callables with signature `(middlewaresList) => middlewaresList`.
    These callables receive the whole stack of middlewares used in Volto and
    they can add new middleware or tweak this list.

### asyncPropsExtenders

!!! block ""

    Per-route customizable `asyncConnect` action dispatcher. These enable
    proper server-side rendering of content that depends on additional async
    props coming from backend calls. It is a list of route-like configuration
    objects (they are matched using
    [matchRoutes](https://github.com/ReactTraining/react-router/blob/ea44618e68f6a112e48404b2ea0da3e207daf4f0/packages/react-router-config/modules/matchRoutes.js).
    Instead of the `component` key you should provide an `extend`
    method with signature `asyncItems => asyncItems`, so it receives a list of
    asyncConnect "prop" objects and returns a similar list. You can add
    new asyncConnected props as well as removing them, so you could, for
    example, have something like this to exclude the breadcrumbs from being
    requested:

```
config.settings.asyncPropsExtenders = [
  ...config.settings.asyncPropsExtenders,
  {
    path: '/',
    extend: (dispatchActions) => dispatchActions.filter(asyncAction=> asyncAction.key !== 'breadcrumb')
  }
]

```

### External routes

If another application is published under the same top domain as Volto, you could have a route like `/abc` which should be not rendered by Volto.
This can be achieved by a rule in the reverse proxy (Apache or Nginx for example) but, when navigating client side, you may have references to that route so Volto is
handling that as an internal URL and fetching the content will break.
You can disable that path in `config.settings.externalRoutes` so it will be handled as an external link.

```js
config.settings.externalRoutes = [
  {
    match: {
      path: '/news',
      exact: false,
      strict: false,
    },
    url(payload) {
      return payload.location.pathname;
    },
  },
];
```

It can also be simplified as:
```js
config.settings.externalRoutes = [
  { match: "/news" },
  { match: "/events" },
];
```

## Server-specific serverConfig

Settings that are relevant to the Express-powered Volto SSR server are stored
in the `config.settings.serverConfig` object.

### expressMiddleware

!!! block ""

    A list of ExpressJs middleware that can extend the built-in functionality of
    Volto's server. See the [Express](../recipes/express) section for more details.

### criticalCssPath

!!! block ""

    A path relative to the project root that points to an optional CSS file. If
    this file exists it is loaded and its content is embedded inline into the
    generated HTML. By default this path is `public/critical.css`. See the
    [Performance](/deploying/performance) section for more details.

### extractScripts

!!! block ""

    An object that allows you to configure the insertion of scripts on the page
    in some particular cases.
    For the moment it admits only one property: `errorPages` whose value is a Boolean.

    If `extractScripts.errorPages` is `true`, the JS will be inserted into the error page.

### contentMetadataTagsImageField

!!! block ""

    The OpenGraph image that will represent this content item, will be used in the metadata HEAD tag as og:image for SEO purposes. Defaults to image. See the OpenGraph Protocol for more details.

### hasWorkingCopySupport

!!! block ""

    This setting will enable working copy support in your site. You need to install the `plone.app.iterate` add-on in your Plone site in order to make it working.

