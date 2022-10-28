---
myst:
  html_meta:
    "description": "This is a summary of all the Volto configuration options and what they control."
    "property=og:description": "This is a summary of all the Volto configuration options and what they control."
    "property=og:title": "Settings reference guide"
    "keywords": "Volto, Plone, frontend, React, configuration, settings, reference"
---

# Settings reference guide

This is a summary of all the configuration options and what they control.

```{note}
This list is still incomplete, contributions are welcomed!
```

## Main settings

They are exposed in `config.settings`:

```{glossary}
:sorted:

navDepth
    Navigation levels depth used in the navigation endpoint calls. Increasing this is useful for implementing fat navigation menus. Defaults to `1`.

defaultBlockType
    The default block type in Volto is "text", which uses the current DraftJS-based implementation for the rich text editor. Future alternative rich text editors will need to use this setting and replace it with their block type. The block definition should also include the `blockHasValue` function, which is needed to activate the Block Chooser functionality. See this function signature in [Blocks > Settings](../blocks/settings.md).

sentryOptions
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
    ```{seealso}
    See more about [Sentry integration](../deploying/sentry.md).
    ```

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

bbb_getContentFetchesFullobjects
    Before Volto 10, the main content-grabbing request, triggered as a result of
    `getContent` action, always used the `fullobjects` flag, which fully serialized
    the immediate children of the context request. If your code depends on this
    behavior, set this flag to `true` in the `settings` object.

    ```{note}
    You should probably refactor your code to avoid depending on this
    behavior. It can cause performance issues when you have large children
    (for example content with lots of text) and you need to batch requests
    anyway, if you want to be sure to display all the children.
    ```

persistentReducers
    A list of reducer names that should use the browser's localstorage to
    persist their data.

maxResponseSize
    The library that we use to get files and images from the backend (superagent)
    has a response size limit of 200 mb, so if you want to get a file bigger than 200 mb
    from Plone, the SSR will throw an error.

    You can edit this limit in the `settings` object setting a new value in bytes
    (for example, to set 500 mb you need to write 5000000000).

initialReducersBlacklist
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

loadables
    A mapping of loadable libraries that can be injected into components using
    the `injectLazyLibs` HOC wrapper. See the [Lazy
    loading](../recipes/lazyload) page for more details.

lazyBundles
    A mapping of bundles to list of lazy library names. Create new bundles (or
    change the already provided `cms` bundle to be able to preload multiple
    lazy libraries (with `preloadLazyLibs`) or quickly load them with
    `injectLazyLibs`.

storeExtenders
    A list of callables with signature `(middlewaresList) => middlewaresList`.
    These callables receive the whole stack of middlewares used in Volto and
    they can add new middleware or tweak this list.

asyncPropsExtenders
    Per-route customizable `asyncConnect` action dispatcher. These enable
    proper server-side rendering of content that depends on additional async
    props coming from backend calls. It is a list of route-like configuration
    objects (they are matched using
    [matchRoutes](https://github.com/remix-run/react-router/blob/ea44618e68f6a112e48404b2ea0da3e207daf4f0/packages/react-router-config/modules/matchRoutes.js).
    Instead of the `component` key you should provide an `extend`
    method with signature `asyncItems => asyncItems`, so it receives a list of
    asyncConnect "prop" objects and returns a similar list. You can add
    new asyncConnected props as well as removing them, so you could, for
    example, have something like this to exclude the breadcrumbs from being
    requested:

    ```js
    config.settings.asyncPropsExtenders = [
      ...config.settings.asyncPropsExtenders,
      {
        path: '/',
        extend: (dispatchActions) => dispatchActions.filter(asyncAction=> asyncAction.key !== 'breadcrumb')
      }
    ]
    ```

externalRoutes
    If another application is published under the same top domain as Volto, you could have a route like `/abc` which should be not rendered by Volto.
    This can be achieved by a rule in the reverse proxy (Apache or nginx for example) but, when navigating client side, you may have references to that route so Volto is
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

contentMetadataTagsImageField
    The OpenGraph image that will represent this content item, will be used in the metadata HEAD tag as og:image for SEO purposes. Defaults to image. See the OpenGraph Protocol for more details.

hasWorkingCopySupport
    This setting will enable working copy support in your site. You need to install the `plone.app.iterate` add-on in your Plone site in order to make it working.

controlpanels
    Register a component as control panel.

    Example configuration in `config.js` of your project or add-on:

    ```
    config.settings.controlpanels = [
      ...config.settings.controlpanels,
      {
        '@id': '/manage-myaddon-subscriptions',
        group: 'Add-on Configuration',
        title: 'Breaking News Manage Subscriptions',
      },
    ];

    config.addonRoutes = [
      ...config.addonRoutes,
      {
        path: '/controlpanel/manage-myaddon-subscriptions',
        component: ManageSubscriptions,
      },
    ];
    ```

    The group can be one of the default groups 'General', 'Content', 'Security', 'Add-on Configuration', 'Users and Groups' or a custom group.

workflowMapping
    It's an object that defines the mapping between workflow states/transitions and the color that should show in the change Workflow dropdown. This is the default:

    ```js
    export const workflowMapping = {
      published: { value: 'published', color: '#007bc1' },
      publish: { value: 'publish', color: '#007bc1' },
      private: { value: 'private', color: '#ed4033' },
      pending: { value: 'pending', color: '#f6a808' },
      send_back: { value: 'private', color: '#ed4033' },
      retract: { value: 'private', color: '#ed4033' },
      reject: { value: 'private', color: '#ed4033' },
      submit: { value: 'review', color: '#f4e037' },
    };
    ```

    It's meant to be extended with your own workflows/transitions.
    It is recommended to assign the same color to the transition as the destination state, so the user can have the visual hint to which state are they transitioning to.

errorHandlers
    A list of error handlers that will be called when there is an unhandled exception. Each error handler is a function that
    receives a single argument, the `error` object.
```

## Views settings

They are exposed in `config.views`:

```{glossary}
:sorted:

layoutViewsNamesMapping
    Plone's layout views are identified by a simple string. This object maps this string with a nice literal (in English as default).
    These view names are exposed in the `Display` component in the toolbar's {guilabel}`more` menu.
    The keys are the name of the Plone layout, and the values are the i18n string `id`:

    ```js
    export const layoutViewsNamesMapping = {
      album_view: 'Album view',
      event_listing: 'Event listing',
      full_view: 'All content',
      listing_view: 'Listing view',
      summary_view: 'Summary view',
      tabular_view: 'Tabular view',
      layout_view: 'Mosaic layout',
      document_view: 'Document view',
      folder_listing: 'Folder listing',
      newsitem_view: 'News item view',
      link_redirect_view: 'Link redirect view',
      file_view: 'File view',
      image_view: 'Image view',
      event_view: 'Event view',
      view: 'Default view',
    };
    ```

    You can customize this object to add or modify the existing entries.
    They are i18n aware, so you can add the corresponding i18n message in your project's `src/config.js` or your add-on's `src/index.js`:

    ```js
    import { defineMessages } from 'react-intl';
    defineMessages({
      album_view: {
        id: 'Album view',
        defaultMessage: 'Album view',
      },
    })
    ```
```

## Server-specific serverConfig

Settings that are relevant to the Express-powered Volto SSR server are stored
in the `config.settings.serverConfig` object.

```{glossary}
:sorted:

expressMiddleware
    A list of ExpressJs middleware that can extend the built-in functionality of
    Volto's server. See the [Express](../recipes/express) section for more details.

criticalCssPath
    A path relative to the project root that points to an optional CSS file. If
    this file exists it is loaded and its content is embedded inline into the
    generated HTML. By default this path is `public/critical.css`. See the
    {doc}`../deploying/performance` section for more details.

extractScripts
    An object that allows you to configure the insertion of scripts on the page
    in some particular cases.
    For the moment it admits only one property: `errorPages` whose value is a Boolean.

    If `extractScripts.errorPages` is `true`, the JS will be inserted into the error page.

```
