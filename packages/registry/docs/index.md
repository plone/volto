# `@plone/registry`

`@plone/registry` provides support for building an add-on and configuration registry with infrastructure for JavaScript and TypeScript-based apps.

As a developer when you build an app, regardless of the framework and technologies used, it's a one-off app.
That means you have to build something that has very specific requirements, behavior, and look and feel.

Sometimes you need to build something generic that is pluggable and extensible.
In the JavaScript and TypeScript ecosystem, this is often quite complex, and the existing frameworks do not provide the means to do this.
`@plone/registry` helps developers extend their apps in a pluggable way.


## How To's

```{toctree}
:maxdepth: 1
howto/how-to-instantiate-registry
howto/how-to-register-an-addon
howto/how-to-shadow-a-component
```


## How To's

```{toctree}
:maxdepth: 1
howto/how-to-access-registry
```

## Component registration (Component registry)

The configuration registry stores a components registry in itself.
The components registry is a mapping of name to component.
You can look up a name, and receive a component that you can reference in your code.
This provides an alternative, and more convenient, way to customize components in a pluggable way.
You can override programmatically such registrations from your add-on or projects because it's stored in the configuration registry.
You can customize a component without using shadowing at all, if the code that uses the component retrieves from the component registry, rather then import it directly.
You can even have modifiers to the component registrations through dependencies.
Thus you can adapt the call, given an array of such dependencies.

## How To's

```{toctree}
:maxdepth: 1
howto/how-to-register-and-retrieving-components
```

## Utilities registration (Utility registry)

The configuration registry stores a utilities registry in itself.
The components registry is a mapping of a `name` and a `type` to a method or function.
It works in a similar way as the components registry, but for methods and functions and by adding an additional query argument `type`.

## How To's

```{toctree}
:maxdepth: 1
howto/how-to-register-and-retrieving-utilities
```


```{toctree}
:maxdepth: 2
:caption: Conceptual Guides
conceptual-guides/add-on-registry.md
conceptual-guides/configuration-registry.md
```
