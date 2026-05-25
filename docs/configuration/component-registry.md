---
myst:
  html_meta:
    "description": "Volto provides an integrated component registry that stores named references to components, allowing them to be queried programmatically."
    "property=og:description": "Volto provides an integrated component registry that stores named references to components, allowing them to be queried programmatically."
    "property=og:title": "Component registry in Volto"
    "keywords": "Volto, Plone, frontend, React, registry, component"
---

(component-registry)=

# Component registry

The {term}`configuration registry` includes a component registry for managing components globally.
In this registry, you can register components given a unique component name.
Any other add-on can then retrieve and use this component by searching for the component's name.

The key motivation behind the component registry is to simplify the process of customization.
Existing components can be overridden without {term}`shadowing` by registering a new component using the name of an existing component.
Since the component registry is globally available, this means that all code pointing to this component will now use the newly registered component instead.

Additionally, it's possible to modify the component registrations with dependencies.

## Registering components by name using `config.registerComponent`

Typically from an add-on or project configuration:

```js
import MyToolbarComponent from './MyToolbarComponent'

config.registerComponent({
  name: 'Toolbar',
  component: MyToolbarComponent,
});
```

## Retrieving a component from the component registry

You can programmatically retrieve a component from the registry using `config.getComponent`:

```js
const Toolbar = config.getComponent('Toolbar').component
```

or by using the convenience component `Component` if you want to use it in JSX directly

```jsx
<Component componentName="Toolbar" {...props} />
```

Please notice that you are able to pass `props` down to the retrieved component.

## Adapt components with dependencies

Additionally, components can be registered with dependencies.
This allows calling a component by its name and optionally by its dependencies, according to the use case.

To register a component with dependencies, either pass a string or an array of strings.

```js
import MyTeaserNewsItemComponent from './MyTeaserNewsItemComponent'

config.registerComponent({
    name: 'Teaser',
    component: MyTeaserNewsItemComponent,
    dependencies: 'News Item',
  });
```

To retrieve this component, pass the data used to check the dependencies.

```js
config.getComponent({
    name: 'Teaser',
    dependencies: 'News Item',
  }).component
```

This is useful for components that have variations based on the context, such as the content type of the current item.

For example, there might be a `Teaser` component that has a variation for the `News Item` content type.
The component is registered as such:

```js
import MyTeaserDefaultComponent from './MyTeaserDefaultComponent';
import MyTeaserNewsItemComponent from './MyTeaserNewsItemComponent';

config.registerComponent({
    name: 'Teaser',
    component: MyTeaserDefaultComponent,
});

config.registerComponent({
    name: 'Teaser',
    component: MyTeaserNewsItemComponent,
    dependencies: 'News Item',
});
```

The following example shows how to retrieve the `Teaser` component with a given content type value coming from the `content` prop.
If the content type is a `News Item`, then it will retrieve the `Teaser` component registered with this dependency, in this case, `MyTeaserNewsItemComponent`.

```jsx
<Component componentName="Teaser" dependencies={[props.content['@type']]} {...props} />
```

However, if the content type is different from `News Item`, no component is rendered, because the registry does not automatically fall back to the `MyTeaserDefaultComponent` registered without dependencies.
If the `MyTeaserDefaultComponent` should be rendered when the dependency is not `News Item`, a manual fallback mechanism should be registered as a conditional expression:

```{code-block} jsx
:emphasize-lines: 4
const Component = config.getComponent({
    name: 'Teaser',
    dependencies: props.content['@type']
}).component || config.getComponent('Teaser').component;

return <Component {...props} />;
```

This will explicitly use the `Teaser` component if one is registered with the matching content type as a dependency.
Otherwise, the `config.getComponent(...).component` call returns `undefined` and the manual fallback returns the `Teaser` component that was registered without dependencies.
