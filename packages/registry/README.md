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

Add-on packages are just CommonJS packages.
The only requirement is that they point the `main` key of their `package.json` to a module that exports as a default function, which acts as a configuration loader.

An add-on can be published in an npm registry, just as any other package.
However, add-ons are meant to not be transpiled.
They should be released as source packages.

## Register an add-on

You should declare your add-on in your project.
This is done in your app's `package.json`'s `addons` key:

```json
{
  "name": "my-app-project",
  "addons": [
    "acme-volto-foo-addon",
    "@plone/some-addon",
    "collective-another-volto-addon"
  ]
}
```

The `addons` key ensures the add-on's main default export function is executed, being passed the configuration registry.
In that function, the add-on can customize the registry.
The function needs to return the `config` object (the configuration registry), so that it's passed further along to the other add-ons.

The add-ons are registered in the order they are found in the `addons` key.
The last add-on takes precedence over the others.
This means that if you configure something in `acme-volto-foo-addon`, then the same thing later in `collective-another-volto-addon`, the latter configured thing will win and its configuration will be applied.

The default export of any add-on main `index.js` file should be a function with the signature `config => config`.
That is, it should take the configuration registry object and return it, possibly mutated or changed.

## Configuration registry

The configuration registry supplements the add-on registry.

It is a facility that stores app configuration to be shared in the app.

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

## Accessing the configuration registry

The configuration registry can be accessed by:

```ts
import config from '@plone/registry'

const blocksConfig = config.blocks.blocksConfig
```

## Component registry

The configuration registry also stores a components registry in itself.
The components registry is a mapping of name to component.
You can look up a name, and receive a component that you can reference in your code.
This provides an alternative, and more convenient, way to customize components.
You can override programmatically such registrations from your add-on or projects because it's stored in the configuration registry.
You can customize a component without using shadowing at all, if the code that uses the component retrieves from the component registry, rather then import it directly.
You can even have modifiers to the component registrations through dependencies.
Thus you can adapt the call, given an array of such dependencies.

## Register components by name using `config.registerComponent`

You can register components by name, typically from an add-on or project configuration:

```js
import MyToolbarComponent from './MyToolbarComponent'

config.registerComponent({
  name: 'Toolbar',
  component: MyToolbarComponent,
});
```

## Retrieve a component from the component registry

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

## Adapt the component using the `dependencies` array

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
