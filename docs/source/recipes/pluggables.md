---
myst:
  html_meta:
    "description": "The Pluggables framework give you insertion points to push components to other components in an 'out of tree' fashion, like React's Portal component, but with vitamins."
    "property=og:description": "The Pluggables framework give you insertion points to push components to other components in an 'out of tree' fashion, like React's Portal component, but with vitamins."
    "property=og:title": "Pluggables framework"
    "keywords": "Pluggables, framework, React, portal"
---

# Pluggables framework

The Pluggables framework give you insertion points to push components to other
components in an "out of tree" fashion, like React's `<Portal>` component, but with vitamins.

In almost any case, `<Pluggable>` is a better solution than a `<Portal>`. Some benefits include:

- the `<Pluggable>` (the target destination) can pass parameters to the `<Plug>` (the
  inserted)
- any `<Plug>` can be overridden, based on the `id` (you can't do that with `<Portal>`)
- you can plug multiple `Plugs` into a `<Pluggable>` and you can control the order
  they appear

To understand how they work, it's useful to look at the architecture:

- First, we need to wrap all of our React component tree in
  a `<PluggablesProvider>` (this needs to be done only once in Volto, and it's there in place already
  at `App.jsx` component level), so you don't have to do it:

```jsx
<PluggablesProvider>...</PluggablesProvider>
```

This `Provider` acts like a centralized place where "insertion points" and
"plugins to the insertion points" can be registered. It achieves that by
using a dedicated React context.

Now, somewhere inside the children tree of `<PluggablesProvider>`, we can create some
"insertion points":

```jsx
<Pluggable name="left-column" />
```

Then we can plug things as children to the `<Pluggable>` with some `<Plug>`
components:

```jsx
<Plug pluggable="left-column" id="navigation">
  relevant nav stuff
</Plug>
```

Declaring a `<Plug>` with the same `id` twice will make the second one (in
terms of rendering order) replace the first one.

Internally, the `<PluggablesProvider>` keeps a record of `Pluggables` and `Plug` and
this is achieved by having the `<Pluggables>` and `<Plug>` components register
themselves with the Provider via React context.

```{note}
While Pluggables are a powerful framework for enhancing component integration, they are currently not compatible with server-side rendering (SSR).
They excel in providing dynamic visual enhancements for the user interface, such as client components and widgets.
However, when it comes to handling critical data that needs to load quickly, alternative approaches may be more suitable.
```
## Customize the rendering of plugs

You can customize the rendering of pluggables. The `<Pluggable>` component can take a function as a child and use that function to describe the rendering of pluggables.

```jsx
<Pluggable name="block-toolbar">
  {(pluggables) => pluggables.map((p) => <>{p()}</>)}
</Pluggable>
```
## Passing parameters from the Pluggable to the Plugs

You can also pass options to the `Plugs`, to enable inter-component communication:

```jsx
<Pluggable name="block-toolbar" params={...blockProps} />
```

To use the passed params, you can do:

```jsx
<Plug pluggable="block-toolbar" id="style">
  {({ options }) => {
    console.log(options);
    return <Button>Click me</Button>;
  }}
</Plug>
```
