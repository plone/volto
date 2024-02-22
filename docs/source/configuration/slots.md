---
myst:
  html_meta:
    "description": "Slots are insertion points in the Volto rendering tree structure."
    "property=og:description": "Slots are insertion points in the Volto rendering tree structure."
    "property=og:title": "Slots"
    "keywords": "Volto, Plone, frontend, React, configuration, slots, viewlets"
---

# Slots

Slots are insertion points in the Volto rendering tree structure.
This concept is inherited from the Plone Classic UI {doc}`plone:classic-ui/viewlets`.

## Anatomy

Slots are named, and they can contain a list of different slot components.
Slot components are also named, and they are registered in the configuration registry using a specific API for slots.
The main trait of a slot component is that its renderer is controlled by a list of conditions called {term}`predicates`.
Multiple slot components can be registered under the same name, as long as they have different predicates.

The following tree structure diagram illustrates these concepts.

```text
Slot (`toolbar`)
├── SlotComponent (`edit`)
│   ├── predicates (only appear in `/de/about`)
│   ├── predicates (only appear if the content type is either a `Document` or `News Item`)
│   └── no predicates (default when all predicates return `false`)
├── SlotComponent (`contents`)
└── SlotComponent (`more`)
```

At the root of the tree, there is a slot named `toolbar`.
It contains three slot components, named `edit`, `contents`, and `more`.
`edit` contains two predicates and a default for when all of its predicates return `false`.

Thus, when either the route is `/de/about` or the content type is either a `Document` or `News Item`, then the `edit` slot component would appear in the slot `about`.
It would not display elsewhere.

The order in which the components render is governed by the order in which they were registered.

```{todo}
You can change the order of the defined slot components for a different slot using the API. (pending)
You can even delete the rendering of a registered slot component using the API. (pending)

Slot (eg. `toolbar`)
  - `edit`
  - `contents`
  - `more`
```

Volto renders the slots using the `SlotRenderer` component.
You can add insertion points in your code, as shown in the following example.

```tsx
<SlotRenderer name="toolbar" content={content} />
```

## Register a slot component

You register a slot component using the configuration registry:

```ts
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });
```

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
:   Required. String. The route.

`exact`
:   Optional. Boolean. If `true`, then the match will be exact, else matches "begins with", for the given string from `path`.


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
If that is not enough you could tailor your own `SlotRenderer`s or shadow the original to match your requirements.
