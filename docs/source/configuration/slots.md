# Slots

Slots are insertion points in the Volto rendering tree structure.
This concept is inherited from Plone ClassicUI artifact `Viewlets`.

## Anatomy

Slots are named, and they can contain a list of different slot components.
Slots components are also named, and they are registered in the configuration registry using a specific API for slots.
The main trait of a slot component is that its render are controlled by a list of conditions (predicates).
Multiple slot components can be registered under the same name, as long as they have different predicates.

Slot (eg. `toolbar`)
  - SlotComponent (eg. `edit`)
    - predicates (eg. only appear in `/de/about`)
    - predicates (eg. only appear if content type is one of `Document` or `News Item`)
    - no predicates (eg. always appear)
  - SlotComponent (eg. `contents`)
  - SlotComponent (eg. `more`)

The order in which the components should render is governed by the order that they were registered.
You can change the order of the defined slot components for a different slot using the API. (pending)
You can even delete the rendering of a registered slot component using the API (pending)

Slot (eg. `toolbar`)
  - `edit`
  - `contents`
  - `more`

Volto renders the slots using the `SlotRenderer` component.
You can add more insertion points in your code as needed.

```tsx
<SlotRenderer name="toolbar" content={content} />
```

## Registering a slot component

You register a slot component using the configuration registry:

```ts
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });
```

`slot`: The name of the slot, where the slot components are stored
`name`: The name of the slot component that we are registering
`component`: The component that we want to render in the slot
`predicates`: A list of functions that return a function with this signature:

```ts
export type SlotPredicate = (args: any) => boolean;
```

There are two predicate helpers available in the Volto helpers.

### RouteCondition

```ts
export function RouteCondition(path: string, exact?: boolean) {
  return ({ pathname }: { pathname: string }) =>
    Boolean(matchPath(pathname, { path, exact }));
}
```

It allows to make a slot render if a certain route is matched.
It takes the route and if the route match should be exact or not.

### ContentTypeCondition

```ts
export function ContentTypeCondition(contentType: string[]) {
  return ({ content }: { content: Content }) =>
    contentType.includes(content['@type']);
}
```

This helper predicate allows you to make a slot render if the current content type is match.
It takes a list of possible content types.

### Custom predicates

You can provide your own predicate helpers to determine if your slot component has to render or not.
The `SlotRenderer` will pass down the current `content` and the `pathname`.
If that is not enough you could tailor your own `SlotRenderer`s or shadow the original to match your requirements.
