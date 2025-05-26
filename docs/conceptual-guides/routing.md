---
myst:
  html_meta:
    "description": "Routing in Seven"
    "property=og:description": "Routing in Seven"
    "property=og:title": "Routing in Seven"
    "keywords": "Volto, routing, frontend, Plone, routes, add-ons"
---

# Routing

Seven uses [React Router](https://reactrouter.com/) in framework mode for routing.
Since Seven uses a decentralized modular approach, routing is done in a different way than in a traditional React Router app.
In Seven, routes are registered in the configuration registry via the add-ons.

Seven provides an abstraction layer over the React Router API to isolate the add-ons from the underlying implementation.
This prevents the add-ons from depending directly on React Router development libraries, which is the responsibility of Seven.
Under the hood, Seven uses the `@plone/react-router` package to register routes and load them in the app.
The add-ons only have to rely on the `@plone/registry` package and its API to register routes.
Routes are registered in add-ons using the `config.registerRoute()` API from `@plone/registry`.

## Route types

Seven supports four types of routes, aligned with [React Router 7’s data route definitions](https://reactrouter.com/start/data/routing).

`route`
:   `route` is a standard route type for a specific path.
    It can contain other nested route types.

`layout`
:   The `layout` route type is used to define shared page layouts for a set of routes.

`index`
:   The `index` route type defines a default route as a child of its parent `layout` or `prefix` route type.

`prefix`
:   The `prefix` route type is a set of route definitions that use a prefix for all its child routes.

Combining these route types allows you to create complex routing structures in your application.
See the [React Router documentation](https://reactrouter.com/en/main/start/overview) for more information on route types and how to use them.

## Route definition

The definition of routes in Seven is mapped directly to the React Router API.
The `config.registerRoute` method adds a route to the configuration registry.

```{seealso}
See examples of defined routes in the chapter {doc}`../how-to-guides/routes`.
```
