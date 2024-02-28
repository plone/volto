---
myst:
  html_meta:
    "description": "Slots are insertion points in the Volto rendering tree structure."
    "property=og:description": "Slots are insertion points in the Volto rendering tree structure."
    "property=og:title": "Slots"
    "keywords": "Volto, Plone, frontend, React, configuration, slots, viewlets"
---

# Slots

Slots provide a way for Volto add-ons to insert their own components at predefined locations in the rendered page.

```{note}
This concept is inspired by the Plone Classic UI {doc}`plone:classic-ui/viewlets`.
```


## Anatomy

Slots have a name, and they contain a list of slot components.

Volto renders slots using the `SlotRenderer` component.
You can add slot insertion points in your code, as shown in the following example.

```ts
<SlotRenderer name="toolbar" content={content} />
```

Slot components consist of a data structure with key/value pairs, where the keys are the parent's slot name, the slot component's name, the component to render in the slot, and optional predicates.
They are registered in the {ref}`configuration registry using a specific API for slots <configuration-registry-for-slot-components>`.

The renderer of a slot component is controlled by the presence or absence of a list of conditions called {term}`predicates`.

You can register multiple slot components with the same name under the same slot, as long as they have different predicates or components.

To illustrate how slots are structured and work, let's register a slot component, where the component is `@sneridagh what goes here?`, and the predicate matches a route that begins with `/de/about`.

```ts
config.registerSlotComponent({
  slot: 'toolbar',
  name: 'save',
  component: '@sneridagh what goes here?',
  predicates: [RouteCondition('/de/about')],
});
```

The following tree structure diagram illustrates the resultant registration.

```text
Slot (`name`=`toolbar`)
└── SlotComponent
    ├── `slot`=`toolbar`
    ├── `name`=`save`
    ├── `component`=`@sneridagh what goes here?`
    └── predicate of "only appear under `/de/about`"
```

Next, let's register another slot component in the same slot, with the same name and component, but with a different predicate where the content type matches either `Document` or `News Item`.

```ts
config.registerSlotComponent({
  slot: 'toolbar',
  name: 'save',
  component: '@sneridagh what goes here?',
  predicates: [ContentTypeCondition(['Document', 'News Item'])],
});
```

The following tree structure diagram illustrates the result of the second registration.

```text
Slot (`name`=`toolbar`)
├── SlotComponent
│   ├── `slot`=`toolbar`
│   ├── `name`=`save`
│   ├── `component`=`@sneridagh what goes here?`
│   └── predicate of "only appear under `/de/about`"
└── SlotComponent
    ├── `slot`=`toolbar`
    ├── `name`=`save`
    ├── `component`=`@sneridagh what goes here?`
    └── predicate of "only appear when the content type is either a Document or News Item"
```

Finally, let's register another slot component in the same slot, with the same name, but with a different component and without a predicate.

```ts
config.registerSlotComponent({
  slot: 'toolbar',
  name: 'save',
  component: '@sneridagh what goes here as a different component?',
});
```

The following tree structure diagram illustrates the result of the third registration.

```text
Slot (`name`=`toolbar`)
├── SlotComponent
│   ├── `slot`=`toolbar`
│   ├── `name`=`save`
│   ├── `component`=`@sneridagh what goes here?`
│   └── predicate of "only appear under `/de/about`"
├── SlotComponent
│   ├── `slot`=`toolbar`
│   ├── `name`=`save`
│   ├── `component`=`@sneridagh what goes here?`
│   └── predicate of "only appear when the content type is either a Document or News Item"
└── SlotComponent
    ├── `slot`=`toolbar`
    ├── `name`=`save`
    └── `component`=`@sneridagh what goes here as a different component?`
```

When the slot components with the same name and component under a given slot have all of their predicates return `true`, then that component will render in the slot.
Else, if there are slot components with the same name, but with a different component, and without predicates, then that different component will render.

Thus the example slot renderer will have the following behavior.

-   When both a user visits the route beginning with `/de/about`, and the content type is either a Document or News Item, then the component `@sneridagh what goes here?` will render in the `toolbar` slot.
-   When one or both of the predicates are false, then the component `@sneridagh what goes here as a different component?` will render in the `toolbar` slot.

    ```{tip}
    In our example, if we had not registered the third slot component—the one without predicates—and when either of the first two slot components' predicates return `false`, then no component would render.
    ```

```{todo}
The order in which the slot components render is governed by the order in which they were registered.

You can change the order of the defined slot components for a different slot using the API.
You can even delete the rendering of a registered slot component using the API.

[@sneridagh, this section needs to be explicit.
From our conversation yesterday, I think you said that the last slot component registered *per slot* wins.
Is that correct?
This has further implications, such as whether this rule applies per slot component's name, component, and predicates. --@stevepiercy]
```


## Default slots

Volto comes with the following default slots.

-   `aboveContent`
-   `belowContent`


(configuration-registry-for-slot-components)=

## Configuration registry for slot components

You register a slot component using the configuration registry, as shown.

```ts
config.registerSlotComponent({
  slot: 'toolbar',
  name: 'save',
  component: '@sneridagh this needs a component',
  predicates: [
    RouteCondition('/de/about'),
    ContentTypeCondition(['Document', 'News Item'])
  ],
});
```

A slot component must have the following parameters.

`slot`
:   The name of the slot, where the slot components are stored.

`name`
:   The name of the slot component that we are registering.

`component`
:   The component that we want to render in the slot.

`predicates`
:   A list of functions that return a function with this signature.

    ```ts
    export type SlotPredicate = (args: any) => boolean;
    ```


## Predicate helpers

There are two predicate helpers available in the Volto helpers.


### `RouteCondition`

```ts
export function RouteCondition(path: string, exact?: boolean) {
  return ({ pathname }: { pathname: string }) =>
    Boolean(matchPath(pathname, { path, exact }));
}
```

The `RouteCondition` predicate helper renders a slot if the specified route matches.
It accepts the following parameters.

`path`
:   String.
    Required.
    The route.

`exact`
:   Boolean.
    Optional.
    If `true`, then the match will be exact, else matches "begins with", for the given string from `path`.


### `ContentTypeCondition`

```ts
export function ContentTypeCondition(contentType: string[]) {
  return ({ content }: { content: Content }) =>
    contentType.includes(content['@type']);
}
```

The `ContentTypeCondition` helper predicate allows you to render a slot when the given content type matches the current content type.
It accepts a list of possible content types.


### Custom predicates

You can create your own predicate helpers to determine whether your slot component should render.
The `SlotRenderer` will pass down the current `content` and the `pathname` into your custom predicate helper.
You can also tailor your own `SlotRenderer`s, or shadow the original `SlotRenderer`, to satisfy your requirements.


## Manage registered slots and slot components

You can manage registered slots and slot components through the slots API.


### `getSlotComponents`

`getSlotComponents` returns the list of components registered in a given slot.
This is useful to debug what is registered and in what order, informing you whether you need to change their order.
This is the signature:

```ts
config.getSlotComponents(slot: string): string[]
```

`slot`
:   String.
    Required.
    The name of the slot, where the slot components are stored.


### `reorderSlotComponent`

`reorderSlotComponent` reorders the list of slot components registered per slot.

Given a `slot` and the `name` of a slot component, you must either specify the desired `position` or perform an `action` to reposition the slot component in the given slot, but not both.

The available actions are `"after"`, `"before"`, `"first"`, and `"last"`.
`"first"` and `"last"` do not accept a `target`.

This is the signature:

```ts
config.reorderSlotComponent({ slot, name, position, action, target }: {
  slot: string;
  name: string;
  position?: number | undefined;
  action?: "after" | "before" | "first" | "last" | undefined;
  target?: string | undefined;
}): void
```

`slot`
:   String.
    Required.
    The name of the slot where the slot components are stored.

`name`
:   String.
    Required.
    The name of the slot component to reposition in the list of slot components.

`position`
:   Number.
    Exactly one of `position` or `action` is required.
    The destination position in the registered list of slot components.
    The position is zero-indexed.

`action`
:   Enum: `"after"` | `"before"` | `"first"` | `"last"` | undefined.
    Exactly one of `position` or `action` is required.
    The action to perform on `name`.

    When using either the `"after"` or `"before"` values, a `target` is required.
    The slot component will be repositioned relative to the `target`.

    When using either the `"first"` and `"last"` values, a `target` must not be used.
    The slot component will be repositioned to either the first or last position.

`target`
:   String.
    Required when `action` is either `"after"` or `"before"`, else must not be provided.
    The name of the slot component targeted for the given `action`.


(slots-getSlotComponent-label)=

### `getSlotComponent`

`getSlotComponent` returns the list of registered components under the given slot component name.
This is useful to debug what is registered and in what order, and later remove a component's registration, if needed.
This is the signature:

```ts
config.getSlotComponent(slot: string, name: string): SlotComponent[]
```

`slot`
:   String.
    Required.
    The name of the slot where the slot components are stored.

`name`
:   String.
    Required.
    The name of the slot component to retrieve.


### `unregisterSlotComponent`

It removes a registration for a specific component, given its registration position.
This is the signature:

```ts
config.unRegisterSlotComponent(slot: string, name: string, position: number): void
```

`slot`
:   String.
    Required.
    The name of the slot that contains the slot component to unregister.

`name`
:   String.
    Required.
    The name of the slot component to unregister inside the component.

`position`
:   Number.
    Required.
    The component position to remove in the slot component registration.
    Use {ref}`slots-getSlotComponent-label` to find the zero-indexed position of the registered component to remove.


### `getSlot`

`getSlot` returns the components to be rendered for the given named slot.
You should use this method while building you own slot renderer or customizing the existing `SlotRenderer`.
You can use the implementation of `SlotRenderer` as a template.
This is the signature:

```ts
config.getSlot<T>(name: string, args: T): SlotComponent['component'][] | undefined
```

It has the following parameters.

`name`
:   String.
    Required.
    The name of the slot we want to render.

`options`
:   Object.
    Required.
    An object containing the arguments to pass to the predicates.
