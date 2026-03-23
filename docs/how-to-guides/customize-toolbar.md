---
myst:
  html_meta:
    "description": "How to customize the toolbar using slots"
    "property=og:description": "How to customize the toolbar using slots"
    "property=og:title": "Customize the toolbar"
    "keywords": "Plone, Volto, Seven, Toolbar, Slots"
---

# Customize the toolbar

The toolbar uses the slot system for extensibility.
It exposes two slots:

`toolbarTop`
:   Rendered at the top of the toolbar. Typically used for action buttons (save, cancel, edit, add).

`toolbarBottom`
:   Rendered at the bottom of the toolbar. Typically used for settings or navigation.

## Register a toolbar button

Use `config.registerSlotComponent()` to add a component to either slot.
Predicates control when the component appears.

```ts
import { RouteCondition, NotRouteCondition } from '@plone/helpers';

// Show only in the edit view (cmsui)
config.registerSlotComponent({
  slot: 'toolbarTop',
  name: 'myEditButton',
  component: MyEditButton,
  predicates: [RouteCondition('@@edit/*')],
});

// Show everywhere except the edit view (publicui)
config.registerSlotComponent({
  slot: 'toolbarTop',
  name: 'myViewButton',
  component: MyViewButton,
  predicates: [NotRouteCondition('@@edit/*')],
});
```

The component receives `content` and `location` as props from the `SlotRenderer`.

## Add a menu to the toolbar

Menus in the toolbar require the `ToolbarMenu` wrapper component from `@plone/layout`.
Use it in place of the standard `Menu` component.
The menu children follow the same API as [React Aria's Menu](https://react-aria.adobe.com/Menu).

### Create the menu component

```tsx
import {
  ToolbarMenu,
  ToolbarMenuItem,
} from '@plone/layout/components/Toolbar/ToolbarMenu';
import { Header, MenuSection, Text } from 'react-aria-components';
import type { Content } from '@plone/types';
import MyIcon from './my-icon.svg?react';

import menuStyles from './MyMenu.css?inline';

interface MyMenuProps {
  content: Content;
}

export const MyMenu = ({ content }: MyMenuProps) => {
  return (
    <ToolbarMenu
      className="menu-my-menu"
      button={<MyIcon />}
      styles={menuStyles}
    >
      <MenuSection>
        <Header>My menu</Header>
        <ToolbarMenuItem id="item-1" href="/some-action">
          <Text slot="label">Item 1</Text>
        </ToolbarMenuItem>
      </MenuSection>
    </ToolbarMenu>
  );
};
```

`ToolbarMenu` accepts the following props:

`button`
:   The trigger element rendered in the toolbar (typically an SVG icon).

`styles`
:   A CSS string imported with `?inline`.
    Injects the styles into the toolbar's shadow root so that your menu styles apply correctly.

`className`
:   CSS classes applied to the menu container for styling.

### Register the menu as a slot component

The process of registering a menu is the same as registering a button.

```ts
import { RouteCondition } from '@plone/helpers';

config.registerSlotComponent({
  slot: 'toolbarTop',
  name: 'myMenu',
  component: MyMenu,
  predicates: [RouteCondition('@@edit/*')],
});
```

## Remove a toolbar button or menu

To remove a button or menu from the toolbar, unregister the corresponding slot in the `config`.

```ts
config.unRegisterSlotComponent('toolbarTop', 'myButton', 0);
```

For a full example, see the `ContentTypesMenu` component in `@plone/publicui`.

See {doc}`register-slots` for the full slot API reference.