---
myst:
  html_meta:
    "description": "Slots are insertion points in the Volto rendering tree structure."
    "property=og:description": "Slots are insertion points in the Volto rendering tree structure."
    "property=og:title": "Slots"
    "keywords": "Seven, Plone, frontend, React, configuration, slots, viewlets"
---

# Slots

Slots provide a way for Seven add-ons to insert their own components at predefined locations in the rendered page.

```{note}
This concept is inspired by the Plone Classic UI {doc}`plone:classic-ui/viewlets`.
```

In Seven, all structural elements (Header, Content Area, Footer, etc) are slots.
Also significant parts of the website (Logo, tools, sections, etc) are also slots.
You can add, modify, reorder or remove any component assigned to a slot programmatically using the configuration registry API.

## Anatomy

Slots have a name, and they contain a list of named slot components.

Seven renders slots using the `SlotRenderer` component.
You can add additional slot insertion points in your code, as shown in the following example.

```ts
<SlotRenderer name="aboveContent" content={content} />
```

Slot components are registered in the {ref}`configuration registry using a specific API for slots <configuration-registry-for-slot-components>`.

The rendering of a slot component is controlled by the presence or absence of a list of conditions called {term}`predicates`.

You can register multiple slot components with the same name under the same slot, as long as they have different predicates or components.

See {doc}`../how-to-guides/register-slots` for more information about registering slots.
