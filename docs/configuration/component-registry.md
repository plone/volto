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
In this registry, components can be registered given a unique component name.
Any other add-on can then retrieve and use this component by searching for the component's name.

The key motivation behind the component registry is to simplify the process of customization.
Existing components can easily be overwritten without {term}`shadowing` by registering a new component using the name of an existing component.
Since the component registry is globally available, this means that all code pointing to this component will now use the newly registered component instead.

You can even have modifiers to the component registrations: dependencies. So you can "adapt" the call given an array of such dependencies.

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

## Adapting the component using `dependencies` array

Components can also be conditionally registered by passing dependencies.
To register a component with dependencies, either pass a string or an array of strings.

```js
import MyTeaserNewsItemComponent from './MyTeaserNewsItemComponent'

config.registerComponent({
    name: 'Teaser',
    component: MyTeaserNewsItemComponent,
    dependencies: 'News Item',
  });
```

To retrieve this component, you must pass the data against which the dependencies are checked.

```js
config.getComponent({
    name: 'Teaser',
    dependencies: ['News Item'],
  }).component
```

The idea is that you can have both with and without dependencies:

```js
import MyTeaserDefaultComponent from './MyTeaserDefaultComponent'
import MyTeaserNewsItemComponent from './MyTeaserNewsItemComponent'

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

and then retrieve them both, depending on the use case (in the example, given a content type value coming from `content` prop):

```jsx
<Component componentName="Toolbar" dependencies={[props.content['@type']]} {...props} />
```
