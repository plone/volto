# Lazy loading

Since Volto 5.0.0 you are able to do splitting and lazy loading safely any app component
using `@loadable/component` library. You can also benefit from it in your own project by
using it.

!!! note

    Webpack 4 is already lazy load enabled, using `import()` but @loadable/component makes the process safe since Volto is using Server Side Rendering. The React community is working actively in the React async mode popularly known as Suspense. Suspense will be SSR safe but in the meanwhile it's not ready, `@loadable/component` is the community accepted replacement.

## Lazy load a component

```js
export const DatetimeWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/DatetimeWidget'),
);
```

Then use `DatetimeWidget` as you'll do normally using a standard `import` statement.

!!! tip

    You can find the complete `@loadable/component` documentation here: https://loadable-components.com

## Code splitting bundle analyzer

You can check the code splitting state by using the included bundle analyzer:

```bash
$ yarn analyze
```

A browser will open with the bundle inspector.
