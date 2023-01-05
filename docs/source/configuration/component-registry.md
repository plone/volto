# Component Registry

The {term}`configuration registry` has a component registry integrated on itself.
These registry stores by a given name the components.
Later you can retrieve them by this name, and use them in your code.
The idea behind is to provide an alternative and more convenient way to customize components.
You can override programmatically such registrations from your add-on or projects because it's stored in the configuration registry.
You can customize a component without using {term}`shadowing` at all, if the code that calls the component retrieves the information of the component to use from the component registry.
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

You can programatically retrieve a component from the registry using `config.getComponent`:

```js
const Toolbar = config.getComponent('Toolbar').component
```

or by using the convenience component `Component` if you want to use it in JSX directly

```jsx
<Component componentName="Toolbar" {...props} />
```

Please notice that you are able to pass `props` down to the retrieved component.

## Adapting the component using `dependencies` array

You can register components, and retrieve them afterwards given a list of modifiers `dependencies`.

```js
import MyTeaserNewsItemComponent from './MyTeaserNewsItemComponent'

config.registerComponent({
    name: 'Teaser',
    component: MyTeaserNewsItemComponent,
    dependencies: 'News Item',
  });
```

and then retrieve it:

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

and then retrieve them both, depending on the use case (in the example, given a content type value comming from `content` prop):

```jsx
<Component componentName="Toolbar" dependencies={[props.content['@type']]} {...props} />
```
