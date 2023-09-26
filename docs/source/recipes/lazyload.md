---
myst:
  html_meta:
    "description": "A guide to lazy-loading libraries in Volto."
    "property=og:description": "A guide to lazy-loading libraries in Volto."
    "property=og:title": "Lazy loading"
    "keywords": "Volto, Plone, frontend, React, lazy loading, useLazyLibs hook"
---

# Lazy loading

Since Volto 5.0.0 you are able to do splitting and lazy loading safely any app component
using `@loadable/component` library. You can also benefit from it in your own project by
using it.

```{note}
Webpack 4 is already lazy load enabled, using `import()` but @loadable/component makes the process safe since Volto is using {term}`server-side rendering`. The React community is working actively in the React async mode popularly known as Suspense. Suspense will be {term}`SSR` safe but in the meanwhile it's not ready, `@loadable/component` is the community accepted replacement.
```

## Lazy load a component

```js
export const DatetimeWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/DatetimeWidget'),
);
```

Then use `DatetimeWidget` as you'll do normally using a standard `import` statement.

```{tip}
You can find the complete `@loadable/component` documentation here: https://loadable-components.com
```

## Code splitting bundle analyzer

You can check the code splitting state by using the included bundle analyzer:

```shell
yarn analyze
```

A browser will open with the bundle inspector.

## Lazy-loading libraries

Lazy-loading libraries is not as straight-forward as with the React components.
The API offered by `@loadable/component` is not very ergonomic and
importing a library as lazy library introduces a lot of pain points in your
code: you have to alway check if the library is loaded, depending on multiple
lazy libraries further complicates the code, etc. To aleviate this and to
promote the use of lazy libraries everywhere, we have the `injectLazyLibs` HOC
wrapper that can automatically inject lazy-loaded libraries as props to your
components. To use it:

```jsx

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

function MyComponent({toastify}) {
  useEffect(() => {toastify.toast.success('Hello')}};
}

export default injectLazyLibs(['toastify'])(MyComponent);
```

Wrapping a component in `injectLazyLibs` makes sure that the component is only
rendered once all the libraries are loaded, simplifying the internal component
logic.

To define new libraries, use the new `settings.loadables` entry:

```jsx
import loadable from '@loadable/component';

...
settings.loadables['reactDnd'] = loadable.lib(() => import('react-dnd'));
```

Notice that we still use the `@loadable/component` API to load these libraries.
It is not possible to have completely dynamic imports in a webpack-powered
system. According to [webpack documentation](https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import),
**The import() must contain at least some information about where the module is
located**.

### The useLazyLibs hook

In functional components you can use the `useLazyLibs` {term}`hook`, which allows
greater flexibility (the `injectLazyLibs` hook uses `useLazyLibs` internally).
You can call the hook like:

```jsx
import { useLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const loaded = useLazyLibs(['toastify', 'reactDnd'])
// or:
const loaded = useLazyLibs(['toastify', 'reactDnd'], {shouldRerender: false})

const reactDnd = loaded?.reactDnd;

if (reactDnd) {
  // The library is now loaded and can be used.
}
```

Passing the `shouldRerender` as false as options will cause the component to
avoid re-rendering the component once the lazy library has been loaded
successfully.

### Define bundles of lazy libraries and preload them all at once

You can define a "bundle" of multiple lazy libraries in the settings
`lazyBundles` key:

```jsx
settings.lazyBundles = {
  cms: ['prettierStandalone', 'prettierParserHtml', ...]
}
```

You can quickly load these bundles by wrapping your component in the
`preloadLazyLibs` HOC:

```jsx
import { preloadLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const SomeComponent = (props) => <div>Hello</div>;

export default preloadLazyLibs('cms')(SomeComponent);
```

### Testing with lazy loaded libraries integrated

Sometimes you'll find that it's difficult to get the lazy loaded libraries
properly loaded in your jest tests. In that case, add this to the top of your
test:

```
jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);
```

This ensures that all libraries are loaded and injected into a mock before any
test is run.
