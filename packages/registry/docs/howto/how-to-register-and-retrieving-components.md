# How to register and retrieve components from the registry

## Register components by name

You can register components by name, typically from an add-on or project configuration, using `config.registerComponent`.

```js
import MyToolbarComponent from './MyToolbarComponent'

config.registerComponent({
  name: 'Toolbar',
  component: MyToolbarComponent,
});
```

## Retrieve a component from the component registry

You can programmatically retrieve a component from the registry using `config.getComponent`.

```js
const Toolbar = config.getComponent('Toolbar').component
```

Alternatively, you can retrieve a component by using the convenience component `Component`, if you want to use it in JSX code directly.

```jsx
import Component from '@plone/volto/components/theme/Component/Component';

<Component componentName="Toolbar" {...props} />
```

Note that you can pass `props` down to the retrieved component.

## Adapt the component

You can register components, then retrieve them, given a list of modifiers using the `dependencies` array.

```js
import MyTeaserNewsItemComponent from './MyTeaserNewsItemComponent'

config.registerComponent({
    name: 'Teaser',
    component: MyTeaserNewsItemComponent,
    dependencies: ['News Item'],
  });
```

To retrieve the component, use `getComponent`.

```js
config.getComponent({
    name: 'Teaser',
    dependencies: ['News Item'],
  }).component
```

If you have a single dependency, you can use a string instead of an array.

You can have both, either with or without dependencies.

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

After you register them, you can retrieve both or either of them, depending on your use case.
In the next example, given a content type value coming from the `content` prop, you can retrieve them.

```jsx
<Component componentName="Toolbar" dependencies={[props.content['@type']]} {...props} />
```

## Lazy load components

```{todo}
Test it properly.
```

You can lazy load the component in the registry, too, if you need it.

```js
const MyTeaserDefaultComponent = lazy(()=> import(./MyTeaserDefaultComponent))

config.registerComponent({
    name: 'Teaser',
    component: MyTeaserDefaultComponent,
  });
```
