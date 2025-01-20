---
myst:
  html_meta:
    "description": "How to register new routes in @plone/registry"
    "property=og:description": "How to register new routes in @plone/registry"
    "property=og:title": "How to register new routes in @plone/registry"
    "keywords": "Volto, Plone, frontend, React, configuration, routes, React Router"
---

# Register new routes

````{admonition} Warning! This feature is experimental and only applies to registering routes for React Router 7 applications. Click to accept the risks and read details.
:class: warning

The `config.registerRoute` method adds a route to the configuration registry.
The `@plone/react-router` helper loads the route and configures it in a React Router 7 app.
It saves the routes in the `config.routes` key in the configuration object.
You should provide one route at a time in the following structure.

```ts
type ReactRouterRouteEntry = {
  type: 'route' | 'index' | 'layout' | 'prefix';
  path: string;
  file: string;
  options?: {
    id?: string;
    index?: boolean;
    caseSensitive?: boolean;
  };
  children?: ReactRouterRouteEntry[];
};
```

The `type`, `path`, and `file` are mandatory.
The `type` key specifies the route type to create, specifically one of `route`, `index`, `layout`, or `prefix`.
The type `route` can contain nested routes.
Check the official [React Router 7 documentation](https://reactrouter.com/start/framework/routing) for more information on how to define React Router 7 routes.

Register a route as shown in the following example.

```ts
config.registerRoute({
  type: 'route',
  path: '/login',
  file: '@plone/cmsui/components/login.tsx',
  options: {
    id: 'login',
    index: true,
  },
});
```

You must set the module's full path name of the registered route component to make `@plone/registry` correctly address it.
````
