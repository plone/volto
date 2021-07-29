## Overview

The Pluggables framework give you insertion points to push components to other
components in an "out of tree" fashion, similar to React's `<Portal>` component, but with vitamines.

In almost any case a Pluggable is a better solution than a Portal. Some of the
benefits include:

- the `Pluggable` (the target destination) can pass parameters to the `Plug` (the
  inserted)
- any Plug can be overridden, based on the id (you can't do that with Portal)
- you can plug multiple Plugs into a Pluggable and you can control the order
  they appear.

To understand how they work, it's useful to look at the architecture:

- First, we need to wrap all of our React component tree in
  a `PluggablesProvider` (this needs to be done only once in Volto and it's in place
  at `App.jsx` component level), so you don't have to do it:

```
<PluggablesProvider>
  ...
</PluggablesProvider>
```

This Provider acts like a centralized place where "insertion points" and
"plugins to the insertion points" can be can be registered. It achieves that by
using a dedicated React context.

Now, somewhere inside the children tree of `PluggablesProvider`, we can create some
"insertion points":

```
<Pluggable name="left-column" />
```

Then we can plug things as children to the `<Pluggable>` with some `<Plug>`
components:

```
<Plug pluggable="left-column" id="navigation">relevant nav stuff</Plug>
```

Declaring a `<Plug>` with the same id two times will make the second one (in
terms of rendering order) replace the first one.

Internally, the `<PluggablesProvider>` keeps record of Pluggables and Plug and
this is achieved by having the `<Pluggables>` and `<Plug>` components register
themselves with the Provider via React context.

### Customize how the plugs are rendered

You can customize how the pluggables are rendered. The `Pluggable` component can
take a function as a child, use that function to describe how the pluggables
are rendered.

```js
<Pluggable name="block-toolbar">
{(pluggables) => pluggables.map((p) => (<>{p()}</>))}
</Pluggable>
```

### Passing parameters from the Pluggable to the Plugs

You can also pass options to the Plugs, to enable inter-component communication:

```
<Pluggable name="block-toolbar" params={...blockProps} />
```

To use the passed params, you can do:

```
<Plug pluggable="block-toolbar" id="style">
{({options}) => {
  console.log(options);
  return <Button>Clickme</Button>
}}
</Plug>
```
