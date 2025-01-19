---
myst:
  html_meta:
    "description": "How to register new routes in @plone/registry"
    "property=og:description": "How to register new routes in @plone/registry"
    "property=og:title": "How to register new routes"
    "keywords": "Volto, Plone, frontend, React, configuration, routes, React Router"
---

# How to register new routes

````{admonition} Warning! This feature is experimental and only applies to register routes for React Router 7 applications. Click to accept the risks and read details.
:class: warning

The `config.registerRoute` method will add a new route to the configuration registry.
This route is intended to be loaded by the `@plone/react-router` helper and loaded in a React Router 7 app.
Under the hood, it saves the routes in the `config.routes` key in the configuration object.
You should provide one route at a time and should have this shape:

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

The `type`, `path` and `file` are mandatory.
The `type` key specify the route type to be created, more specifically, one of `route`, `index`, `layout` or `prefix`.
The type `route` can contain nested routes.
Check the official [React Router 7 documentation](https://reactrouter.com/start/framework/routing) for more information on how to define React Router 7 routes.

You register a route like this:

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

It is required that you set the full module path name for the registered route component in order to make `@plone/registry` to it address correctly when it's going to be used.
````
