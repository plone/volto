---
myst:
  html_meta:
    "description": "Routing in Seven
    "property=og:description": "Routing in Seven"
    "property=og:title": "Routing in Seven"
    "keywords": "Volto, routing, frontend, Plone, routes, add-ons"
---

# Routing

Seven uses [React Router](https://reactrouter.com/) in framework mode for routing.
Since Seven uses a decentralized modular approach, routing is done in a different way than in a traditional React Router app.
In Seven, routes are registered in the configuration registry via the add-ons.

Seven provides an abstraction layer over the React Router API to isolate the add-ons from the underlying implementation.
This prevent the add-ons to depend directly on React Router dev libraries which is responsability of Seven.
Under the hood, Seven uses the `@plone/react-router` package to  to register routes and
load them in the app.
The add-ons only have to rely on the `@plone/registry` package and its API to register routes.
Routes are registered in add-ons using the `config.registerRoute()` API from `@plone/registry`.

## Route types

Seven supports four types of routes, aligned with [React Router 7’s data route definitions](https://reactrouter.com/start/data/routing).
These route types are:

- `route`: A standard route for a specific path. It can contain other nested routes.
- `layout`: A layout route is used to define shared page layouts for a set of routes.
- `index`: A route that is used to define a route that is used as the default route for a route when used in a layout or prefix route.
- `prefix`: A set of route definitions that uses a prefix for all its child routes.

Combining these route types allows you to create complex routing structures in your application.
See the [React Router documentation](https://reactrouter.com/en/main/start/overview) for more information on route types and how to use them.

## Route definition

The definition of routes in Seven is mapped directly to the React Router API.
The `config.registerRoute` method adds a route to the configuration registry.
