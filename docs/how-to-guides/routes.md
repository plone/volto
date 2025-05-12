---
myst:
  html_meta:
    "description": "How to create a route in Seven"
    "property=og:description": "How to create a route in Seven"
    "property=og:title": "How to create a route in Seven"
    "keywords": "Seven, frontend, Plone, routes"
---


# Create a route in Seven

Seven is built on top of React and React Router 7.
You declare new routes in your add-ons for Seven using the [add-ons configuration loader from `@plone/registry`](https://plone-registry.readthedocs.io/conceptual-guides/add-on-loader.html#add-ons-configuration-loader).

```{important}
If you're used to defining routes either in JSX or manually assembling route trees, then this approach will feel different.
In Seven, you register routes, not hard code them.
```

## Configuration through the registry

Declarative configuration makes Seven modular, extensible, and pluggable.
Add-ons can register routes and other behaviors without touching any central code.
Instead of defining routes in code, such as in {file}`routes.tsx`, you register them dynamically under the `route` type using the `config.registerRoute()` API.


## Types of routes in Seven

Seven supports four types of routes, aligned with [React Router 7’s data route definitions](https://reactrouter.com/start/data/routing).
Routes are registered using the `config.registerRoute()` API from `@plone/registry`.

### Conventions

To promote clarity and modularity, it is recommended that **all route components in add-ons be placed in a {file}`routes/` directory** in your add-on.

The `file` property in each route must be a **fully qualified module path**—for example, `@my-addon/routes/MyView.tsx`—so that the application can resolve and load the component correctly at runtime.

### `route` – standard route

Use the type `route` to define a route for a specific path.

```ts
config.registerRoute({
  type: 'route',
  path: '/login',
  file: '@plone/cmsui/routes/login.tsx',
  options: {
    id: 'login',
    index: true,
  },
});
```

### `layout` – layout with children

Use the type `layout` to define shared page layouts for a set of routes.

```ts
config.registerRoute({
  type: 'layout',
  file: '@my-addon/routes/layouts/DashboardLayout.tsx',
  children: [
    {
      type: 'route',
      path: 'home',
      file: '@my-addon/routes/DashboardHome.tsx',
    },
    {
      type: 'route',
      path: 'settings',
      file: '@my-addon/routes/DashboardSettings.tsx',
    },
  ],
});
```

### `index` – default route in a context

Rendered when no sub-route is matched. Must be placed inside a `layout` or `prefix`.

```ts
config.registerRoute({
  type: 'index',
  file: '@my-addon/routes/HomePage.tsx',
});
```

### `prefix` – structural grouping without layout

Use the type `prefix` to group routes under a common path prefix without introducing a layout component.

```ts
config.registerRoute({
  type: 'prefix',
  path: '/blog',
  children: [
    {
      type: 'route',
      path: ':id',
      file: '@my-addon/routes/BlogPost.tsx',
    },
    {
      type: 'route',
      path: 'archive',
      file: '@my-addon/routes/BlogArchive.tsx',
    },
  ],
});
```

## Define a Seven core add-on route

The following example comes from the `@plone/cmsui` add-on.
Its route registration defines the `/edit` interface in Seven.
It demonstrates how to nest a `prefix` route under a `layout`, and use both `index` and wildcard routes within the same branch.

```ts
config.registerRoute({
  type: 'layout',
  file: '@plone/cmsui/routes/layout.tsx',
  children: [
    {
      type: 'prefix',
      path: 'edit',
      children: [
        {
          type: 'index',
          file: '@plone/cmsui/routes/edit.tsx',
          options: {
            id: 'index-edit',
          },
        },
        {
          type: 'route',
          path: '*',
          file: '@plone/cmsui/routes/edit.tsx',
        },
      ],
    },
  ],
});
```

The above code defines the following.

-   a top-level layout component from {file}`@plone/cmsui/routes/layout.tsx`
-   a `prefix` path `edit` that groups all `/edit/*` routes
-   an `index` route for `/edit`
-   a wildcard route for any `/edit/*` subpath

```{note}
Even though both the `index` and `*` routes use the same file, you could conditionally render different content based on `useParams()` or other context inside the component.
```


### File structure of `@plone/cmsui` edit route

The following diagram illustrates the file structure of the `@plone/cmsui` edit route.

```text
@plone/cmsui/
├── routes/
│   ├── layout.tsx
│   └── edit.tsx
└── index.ts
```

In `@plone/cmsui/`, each of the files shown in the above diagram performs a specific function.

-   {file}`routes/layout.tsx` serves as a shared layout used as a base for CMS UI views.
-   {file}`routes/edit.tsx` is the component used for `/edit` and all its subpaths.
-   {file}`index.ts` is the entry point that calls `config.registerRoute()`.


## Route registration API reference

```ts
export type ReactRouterRouteEntry =
  | {
      type: 'route';
      path: string;
      file: string;
      options?: {
        id?: string;
        index?: boolean;
        caseSensitive?: boolean;
      };
      children?: ReactRouterRouteEntry[];
    }
  | {
      type: 'index';
      file: string;
      options?: {
        id?: string;
        index?: boolean;
        caseSensitive?: boolean;
      };
    }
  | {
      type: 'layout';
      file: string;
      options?: {
        id?: string;
        index?: boolean;
        caseSensitive?: boolean;
      };
      children: ReactRouterRouteEntry[];
    }
  | {
      type: 'prefix';
      path: string;
      children: ReactRouterRouteEntry[];
    };

registerRoute(options: ReactRouterRouteEntry): void;
```

```{note}
All route modules must be resolvable at runtime using fully qualified paths.
```
