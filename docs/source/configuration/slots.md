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

Slots have a name, and they contain a list of named slot components.

Volto renders slots using the `SlotRenderer` component.
You can add slot insertion points in your code, as shown in the following example.

```ts
<SlotRenderer name="aboveContent" content={content} />
```

Slot components are registered in the {ref}`configuration registry using a specific API for slots <configuration-registry-for-slot-components>`.

The rendering of a slot component is controlled by the presence or absence of a list of conditions called {term}`predicates`.

You can register multiple slot components with the same name under the same slot, as long as they have different predicates or components.

To illustrate how slots are structured and work, let's register a slot component, where the component is `PageHeader`, and the predicate matches a route that begins with `/de/about`.

```ts
config.registerSlotComponent({
  slot: 'aboveContent',
  name: 'header',
  component: PageHeader,
  predicates: [RouteCondition('/de/about')],
});
```

The following tree structure diagram illustrates the resultant registration.

```text
Slot (`name`=`aboveContent`)
└── SlotComponent
    ├── `slot`=`aboveContent`
    ├── `name`=`header`
    ├── `component`=PageHeader
    └── predicate of "only appear under `/de/about`"
```

Next, let's register another slot component in the same slot, with the same name and component, but with a different predicate where the content type matches either `Document` or `News Item`.

```ts
config.registerSlotComponent({
  slot: 'aboveContent',
  name: 'header',
  component: PageHeader,
  predicates: [ContentTypeCondition(['Document', 'News Item'])],
});
```

The following tree structure diagram illustrates the result of the second registration.

```text
Slot (`name`=`aboveContent`)
├── SlotComponent
│   ├── `slot`=`aboveContent`
│   ├── `name`=`header`
│   ├── `component`=PageHeader
│   └── predicate of "only appear under `/de/about`"
└── SlotComponent
    ├── `slot`=`aboveContent`
    ├── `name`=`header`
    ├── `component`=PageHeader
    └── predicate of "only appear when the content type is either a Document or News Item"
```

Finally, let's register another slot component in the same slot, with the same name, but with a different component and without a predicate.

```ts
config.registerSlotComponent({
  slot: 'aboveContent',
  name: 'header',
  component: 'DefaultHeader',
});
```

The following tree structure diagram illustrates the result of the third registration.

```text
Slot (`name`=`aboveContent`)
├── SlotComponent
│   ├── `slot`=`aboveContent`
│   ├── `name`=`header`
│   ├── `component`=PageHeader
│   └── predicate of "only appear under `/de/about`"
├── SlotComponent
│   ├── `slot`=`aboveContent`
│   ├── `name`=`header`
│   ├── `component`=PageHeader
│   └── predicate of "only appear when the content type is either a Document or News Item"
└── SlotComponent
    ├── `slot`=`aboveContent`
    ├── `name`=`header`
    └── `component`=`DefaultHeader`
```

The rendering of slot components follows an algorithm:

-   The last registered slot component is evaluated first.
-   The first evaluated slot component's predicates to return `true` has its component rendered in the slot.
-   A slot component without predicates becomes the fallback for other slot components with predicates.

Working through the above diagram from bottom to top, let's assume a visitor goes to the route `/de/about` and views an Event content type.

1.  The algorithm looks for the third slot component's predicates.
    Because it has no predicates to be evaluated, and therefore cannot return `true`, its component is a fallback to other slot components.

2.  Moving upward, the second slot component's predicates are evaluated.
    If they are `true`, then its component is rendered in the slot, and evaluation stops.
    But in this case, the content type is an Event, thus it returns `false`, and evaluation continues upward.

3.  The first slot component's predicates are evaluated.
    In this case, they are true because the visitor is on the route `/de/about`.
    Evaluation stops, and its component is rendered in the slot.

Within a slot, slot components are grouped by their name.
The order in which the grouped slot components are evaluated is governed by the order in which they are registered.

Extending our previous example, let's register another slot component with a different name.

```ts
config.registerSlotComponent({
  slot: 'aboveContent',
  name: 'subheader',
  component: PageSubHeader,
  predicates: [ContentTypeCondition(['Document', 'News Item'])],
});
```

Thus the order of evaluation of the named slot components would be `header`, `subheader`.
As each group of slot components is evaluated, their predicates will determine what is rendered in their position.

You can change the order of the named slot components for a different slot using the {ref}`slots-reorderSlotComponent-label` API.
In our example, you can reorder the `subheading` before the `heading`, although it would probably look strange.

```ts
config.reorderSlotComponent({
  slot: 'aboveContent',
  name: 'subheader',
  action: 'before',
  target: 'header',
});
```

You can even delete the rendering of a registered slot component using the {ref}`slots-unregisterSlotComponent-label` API.


## Default slots

Volto comes with the following default slots.

-   `aboveContent`
-   `belowContent`


(configuration-registry-for-slot-components)=

## Configuration registry for slot components

You can manage slot components using the configuration registry for slot components and its API.


### `registerSlotComponent`

`registerSlotComponent` registers a slot component as shown.

```ts
config.registerSlotComponent({
  slot: 'aboveContent',
  name: 'header',
  component: PageHeader,
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


#### Predicate helpers

There are two predicate helpers available in the Volto helpers.
You can also create custom predicate helpers.


##### `RouteCondition`

```ts
export function RouteCondition(path: string, exact?: boolean) {
  return ({ location }: { location: Location }) =>
    Boolean(matchPath(location.pathname, { path, exact }));
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


##### `ContentTypeCondition`

```ts
export function ContentTypeCondition(contentType: string[]) {
  return ({ content, location }: { content: Content; location: Location }) => {
    return (
      contentType.includes(content?.['@type']) ||
      contentType.some((type) => {
        return location.search.includes(`type=${encodeURIComponent(type)}`);
      })
    );
  };
}
```

The `ContentTypeCondition` helper predicate allows you to render a slot when the given content type matches the current content type.
It accepts a list of possible content types.
It supports the `Add` form and is able to detect which content type are you adding.

##### Custom predicates

You can create your own predicate helpers to determine whether your slot component should render.
The `SlotRenderer` will pass down the current `content`, the `location` object, and the current `navRoot` object into your custom predicate helper.
You can also tailor your own `SlotRenderer`s, or shadow the original `SlotRenderer`, to satisfy your requirements.


(slots-getSlot-label)=

### `getSlot`

`getSlot` returns the components to be rendered for the given named slot.
You should use this method while building you own slot renderer or customizing the existing `SlotRenderer`.
You can use the implementation of `SlotRenderer` as a template.
This is the signature:

```ts
config.getSlot(name: string, args: GetSlotArgs): GetSlotReturn
```

It has the following parameters.

`name`
:   String.
    Required.
    The name of the slot we want to render.

`args`
:   Object.
    Required.
    An object containing the arguments to pass to the predicates.


(slots-getSlotComponents-label)=

### `getSlotComponents`

`getSlotComponents` returns the list of named slot components registered in a given slot.
This is useful to debug what is registered and in what order, informing you whether you need to change their order.
This is the signature:

```ts
config.getSlotComponents(slot: string): string[]
```

`slot`
:   String.
    Required.
    The name of the slot where the slot components are stored.


(slots-getSlotComponent-label)=

### `getSlotComponent`

`getSlotComponent` returns the registered named component's data for the given slot component name.
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


(slots-reorderSlotComponent-label)=

### `reorderSlotComponent`

`reorderSlotComponent` reorders the list of named slot components registered per slot.

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


(slots-unregisterSlotComponent-label)=

### `unregisterSlotComponent`

`unregisterSlotComponent` removes a registration for a named slot component, given its registration position.
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
