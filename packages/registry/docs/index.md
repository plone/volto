# Add-on and configuration registry

This package provides support for building an add-on registry and infrastructure for JavaScript and TypeScript-based apps.

## Extensibility and pluggability

As a developer when you build an app, regardless of the framework and technologies used, it's a one-off app.
That means you have to build something that has very specific requirements, behavior, and look and feel.

Sometimes you need to build something generic that is pluggable and extensible.
In the JavaScript and TypeScript ecosystem, this is often quite complex, and the existing frameworks do not provide the means to do this.

## Add-on registry

An add-on registry is a facility that allows an app, which was built on an existing framework, to itself be extensible and pluggable.

The add-on registry is a store where you can register a number of add-ons that your app consumes.

The add-on registry can be queried, so it can provide a list of add-ons installed in the registry and their properties.

% More explanation
### What is an add-on

Add-on packages are just CommonJS/ESM packages.
Their main purpose is encapsulate logic, configuration and customizations in a reusable way.
The only requirement is that their primary entry point (`main` key of their `package.json`) points to a module that exports a default function, which acts as a default configuration loader for that package.

Add-ons are applied in the order they are declared in the `addons` key of {file}`package.json` or programatically via a provided configuration file.
Add-ons can override configuration coming from other add-ons, providing a hierarchy of configuration stacks.

An add-on can be published in an npm registry, just as any other package.
However, add-ons are meant to not be transpiled, but built along with your app code.
They can be released as "source" packages or used directly in your app as local code.

Add-ons can define shadowed components.
"Component shadowing" is a technique for overriding modules of other packages at build time.
This technique builds upon the `resolve.aliases` facilities of bundlers, so modules can be replaced when the app is being built.

Add-ons can be chained, where each one can configure the app in some way.
If needed, each add-on in the chain can override or extend the previous configuration that other add-ons set.
Thus, the order in which you register add-ons matters.

% QUESTION: Should this go to "HowTo"s?
## How To's

```{toctree}
:maxdepth: 1
howto/how-to-instantiate-registry
howto/how-to-register-an-addon
howto/how-to-shadow-a-component
```

## Configuration registry

The configuration registry supplements the add-on registry.
They both work together to provide extensibility and pluggability capabilities.
The configuration registry is a facility that stores app configuration to share in the app.
The add-ons save configuration from the registry using their default export function on app bootstrap time.
They retrieve this configuration as needed by the functionality and components they expose.

### Example use case - Pluggable block system

Let's say that your app is the user interface of a content management system (CMS).
This CMS uses blocks as its main fundamental unit of content.
The pages that the CMS builds are made up of these blocks.
The CMS has some basic available blocks, but it's a requirement that integrators are able to register more blocks in a pluggable way.

This app will use the add-on registry to extend the basic CMS capabilities, so an external add-on can supplement their own add-ons to the basic CMS ones.

Let's assume we've defined a key in the registry `config.blocks.blocksConfig`, and defined a way to register the available blocks in the CMS as the keys in that object in the configuration registry:

```js
  config.blocks.blocksConfig.faq_viewer = {
    id: 'faq_viewer',
    title: 'FAQ Viewer',
    edit: FAQBlockEdit,
    view: FAQBlockView,
    icon: chartIcon,
    group: 'common',
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
  };
```

The configuration registry will have other keys already set by default, which will compose the initial set of basic blocks used by the CMS.
Then the CMS will properly populate the available blocks in the user interface.

The add-on is meant to extend the initial configuration.
From the default export function of our add-on, we should provide the configuration of the new block:

```ts
export default function applyConfig(config: ConfigData) {
  config.blocks.blocksConfig.faq_viewer = {
    id: 'faq_viewer',
    title: 'FAQ Viewer',
    edit: FAQBlockEdit,
    view: FAQBlockView,
    icon: chartIcon,
    group: 'common',
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
  };

  return config;
}
```

Once the app starts, the add-on registry will execute, in order, all the registered add-ons' default export functions, configuring the new block.
The add-on will then become available to the CMS when it asks the configuration registry for it.

### Configuration registry artifacts

The configuration registry also stores special elements that can be queried and retrieved in a pluggable way.

- Components
- Slots
- Utilities

Some of the components are particular to the use case of a CMS, such as Slots, but the abstraction can be ported and applied to different scenarios.

## How To's

```{toctree}
:maxdepth: 1
howto/how-to-initialize-registry
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
