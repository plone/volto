---
myst:
  html_meta:
    "description": "How to create routes"
    "property=og:description": "How to create routes"
    "property=og:title": "How to create routes"
    "keywords": "Seven, frontend, Plone, routes"
---


# How to create a route in Seven

Seven is built on top of React and React Router 7.
One of its core principles is **declarative configuration**: all core functionality is configured through the centralized configuration registry provided by the [`@plone/registry`](https://plone-registry.readthedocs.io/) package.

```{important}
If you’re used to defining routes in JSX or manually assembling route trees, this approach will feel different. In Seven, routes are registered — not hardcoded.
```

## Configuration through the Registry

In Seven, all behavior — from content type views, to blocks, to application routes — is registered declaratively using the `@plone/registry` system.
This design makes Seven **modular**, **extensible**, and **pluggable**. Add-ons can register routes and other behaviors without touching any central code.

Routing is no exception.
Instead of defining routes in code (like `routes.tsx`), you register them dynamically under the `route` type using `config.registerRoute`.


## Types of routes in Seven

Seven supports four types of routes, aligned with [React Router 7’s data route definitions](https://reactrouter.com/start/data/routing).
Routes are registered using the `config.registerRoute()` API from `@plone/registry`.

### Conventions

To promote clarity and modularity, it is recommended that **all route components in add-ons be placed in a `routes/` directory** in your add-on.

The `file` property in each route must be a **fully qualified module path** (e.g., `@my-addon/routes/MyView.tsx`), so that the application can resolve and load the component correctly at runtime.

### `route` – Standard route

Used to define a route for a specific path.

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

### `layout` – Layout with children

Useful for defining shared page layouts for a set of routes.

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

### `index` – Default route in a context

Rendered when no sub-route is matched. Must be placed inside a `layout` or `prefix`.

```ts
config.registerRoute({
  type: 'index',
  file: '@my-addon/routes/HomePage.tsx',
});
```

### `prefix` – Structural grouping without layout

Groups routes under a common path prefix without introducing a layout component.

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

## Example: Defining a real Seven core add-on route

Let’s look at a real-world example from the `@plone/cmsui` add-on.
The following route registration defines the `/edit` interface in Seven.
This example demonstrates how to nest a `prefix` route under a `layout`, and use both `index` and wildcard routes within the same branch.

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

### What this defines:

- A top-level layout component from `@plone/cmsui/routes/layout.tsx`.
- A `prefix` path `edit` that groups all `/edit/*` routes.
- An `index` route for `/edit`.
- A wildcard route for any `/edit/*` subpath.

```{note}
Even though both the `index` and `*` routes use the same file, you could conditionally render different content based on `useParams()` or other context inside the component.
```

---

### File structure for `@plone/cmsui` edit route

```
@plone/cmsui/
├── routes/
│   ├── layout.tsx       ← Shared layout used as base for CMS UI views
│   └── edit.tsx         ← Component used for /edit and all subpaths
└── index.ts             ← Entry point where `config.registerRoute()` is called
```

---

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
