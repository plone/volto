---
myst:
  html_meta:
    "description": "How to create a route in Seven"
    "property=og:description": "How to create a route in Seven"
    "property=og:title": "How to create a route in Seven"
    "keywords": "Seven, frontend, Plone, routes"
---


# Create a route in Seven

In Seven, routes are registered in the configuration registry via the add-ons.

### Conventions

To promote clarity and modularity, it is recommended that **all route components in add-ons be placed in a {file}`routes/` directory** in your add-on.

The `file` property in each route must be a **fully qualified module path**—for example, `@my-addon/routes/MyView.tsx`—so that the application can resolve and load the component correctly at runtime.

### Route definition

See the {ref}`route-registration-api-reference` for the complete API reference.

```{glossary}
`type`
    The type of route to create. It can be one of `route`, `index`, `layout`, or `prefix`.

`path`
    The path for the route. It is a string that defines the URL pattern for the route.

`file`
    The fully qualified path to the component file that will be rendered for this route.
    It is a string that specifies the location of the component file.
    It must be a valid module path that can be resolved at runtime.

`options`
    An optional object that can contain additional properties for the route.
    It can include properties like `id`, `index`, and `caseSensitive`.

`children`
    An optional array of child routes.
    It is an array of route definitions that can be nested within the parent route.
```

### `route` – standard route

Use the type `route` to define a route for a specific path.
This will create a `/login` route that renders the component from `@plone/cmsui/routes/login.tsx`.
We are specifying an `id` for the route, which is used to identify the route in the application.
Normally, React Router will assign an `id` based on the path, but you can override it with this option.

```ts
config.registerRoute({
  type: 'route',
  path: '/login',
  file: '@plone/cmsui/routes/login.tsx',
  options: {
    id: 'login',
  },
});
```

### `layout` – layout with children

Use the type `layout` to define shared page layouts for a set of routes.
This will create two routes: `/home` and `/settings`, both of which will be rendered inside the layout component from `@my-addon/routes/layouts/DashboardLayout.tsx`.
They do not add a new segment to the URL.

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

Rendered when no sub-route is matched. Must be placed in a `layout` or `prefix`.
This will create a default route for the `/blog` path, rendering the component from `@my-addon/routes/BlogHomePage.tsx`.
It will be the default route when the user accesses `/blog` without specifying a subpath.

```ts
config.registerRoute({
  type: 'prefix',
  path: '/blog',
  children: [
    {
      type: 'index',
      file: '@my-addon/routes/BlogHomePage.tsx',
    },
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
In this example, both the `index` and `*` routes use the same file, because we want be reused in both scenarios, but this doesn't have to be the case always.
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
-   {file}`index.ts` is where the default configuration loader of the add-on calls `config.registerRoute()`.

(route-registration-api-reference)=

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
