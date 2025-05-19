---
myst:
  html_meta:
    "description": "How to register new routes in @plone/registry"
    "property=og:description": "How to register new routes in @plone/registry"
    "property=og:title": "How to register new routes in @plone/registry"
    "keywords": "Volto, Plone, frontend, React, configuration, routes, React Router"
---

# Register new routes

The `config.registerRoute` method adds a route to the configuration registry.
It saves the routes in the `config.routes` key in the configuration object.
You should provide one route at a time.
Each route must have the following data shape.

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

```{note}
The routes registered with this method must be compliant with React Router 7 routes.
They are loaded by a helper provided by `@plone/react-router` in an existing React Router 7 app.
Check the official [React Router 7 documentation](https://reactrouter.com/start/framework/routing) for more information on how to define React Router 7 routes.
```

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
