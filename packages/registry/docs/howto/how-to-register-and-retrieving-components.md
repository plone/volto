# How to register and retrieving components from the registry

### Register components by name using `config.registerComponent`

You can register components by name, typically from an add-on or project configuration:

```js
import MyToolbarComponent from './MyToolbarComponent'

config.registerComponent({
  name: 'Toolbar',
  component: MyToolbarComponent,
});
```

### Retrieve a component from the component registry

You can programmatically retrieve a component from the registry using `config.getComponent`:

```js
const Toolbar = config.getComponent('Toolbar').component
```

Or you can retrieve a component by using the convenience component `Component`, if you want to use it in JSX code directly.

```jsx
import Component from '@plone/volto/components/theme/Component/Component';

<Component componentName="Toolbar" {...props} />
```

Note that you can pass `props` down to the retrieved component.

### Adapt the component using the `dependencies` array

You can register components, then retrieve them, given a list of modifiers using `dependencies`.

```js
import MyTeaserNewsItemComponent from './MyTeaserNewsItemComponent'

config.registerComponent({
    name: 'Teaser',
    component: MyTeaserNewsItemComponent,
    dependencies: 'News Item',
  });
```

And then retrieve the component:

```js
config.getComponent({
    name: 'Teaser',
    dependencies: ['News Item'],
  }).component
```

You can have both, either with or without dependencies:

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

Then retrieve them both, depending on the use case.
In the example, given a content type value coming from the `content` prop, you would retrieve them as shown:

```jsx
<Component componentName="Toolbar" dependencies={[props.content['@type']]} {...props} />
```

### Lazy load components
**TODO** Test it properly

You could lazy load the component too in the registry, if you need it.

```js
const MyTeaserDefaultComponent = lazy(()=> import(./MyTeaserDefaultComponent))

config.registerComponent({
    name: 'Teaser',
    component: MyTeaserDefaultComponent,
  });
```
