---
myst:
  html_meta:
    "description": "How to customize the toolbar using pluggables"
    "property=og:description": "How to customize the toolbar using pluggables"
    "property=og:title": "Customize the toolbar"
    "keywords": "Plone, Volto, Seven, Toolbar, Pluggables"
---

# Customize the toolbar

The toolbar uses the pluggable system for extensibility.
It exposes two pluggables:

`toolbar-top`
:   Rendered at the top of the toolbar.
    Typically used for action buttons (save, cancel, edit, add).

`toolbar-bottom`
:   Rendered at the bottom of the toolbar.
    Typically used for settings or navigation.

## Register a toolbar button

Wrap your component in a `<Plug>` and place it inside the existing `<PluggablesProvider>` in your layout.

```tsx
import { Plug } from '@plone/layout/components/Pluggable';
import MyIcon from './my-icon.svg?react';
import { Link } from 'react-aria-components';
import { useLocation } from 'react-router';

// Inside your layout component:
const location = useLocation();

<Plug pluggable="toolbar-top" id="my-button">
  <Link href={`/some-action${location.pathname}`} aria-label="My action">
    <MyIcon />
  </Link>
</Plug>
```

Any data your component needs—including content, location or navigation—must be fetched via hooks inside the component itself or captured in the `<Plug>` closure.
The toolbar does not pass props down to plugged components.

## Add a menu to the toolbar

Menus in the toolbar require the `ToolbarMenu` wrapper component from `@plone/layout`.
Use it in place of the standard `Menu` component.
The menu children follow the same API as [React Aria's Menu](https://react-aria.adobe.com/Menu).

### Create the menu component

First, create the menu component, using the following example code.

```tsx
import { ToolbarMenu } from '@plone/layout/components/Toolbar/ToolbarMenu';
import { MenuItem } from '@plone/components';
import { Header, Menu, MenuSection, Text } from 'react-aria-components';
import type { Content } from '@plone/types';
import MyIcon from './my-icon.svg?react';

import menuStyles from './MyMenu.css?inline';

interface MyMenuProps {
  content: Content;
}

export const MyMenu = ({ content }: MyMenuProps) => {
  return (
    <ToolbarMenu icon={<MyIcon />} styles={menuStyles}>
      <Menu className="menu-my-menu">
        <MenuSection>
          <Header>My menu</Header>
          <MenuItem id="item-1" href="/some-action">
            <Text slot="label">Item 1</Text>
          </MenuItem>
        </MenuSection>
      </Menu>
    </ToolbarMenu>
  );
};
```

`ToolbarMenu` extends `MenuTrigger` and thus `BasicMenuTriggerProps`.
In addition to those props, it accepts the following:

`icon`
:   The trigger element rendered in the toolbar, typically an SVG icon.

`styles`
:   A CSS string imported with `?inline`.
    Injects the styles into the toolbar's shadow root so that your menu styles apply correctly.

### Register the menu as a pluggable

Then, register the menu as a pluggable, using the following code.

```tsx
import { Plug } from '@plone/layout/components/Pluggable';
import { MyMenu } from './MyMenu';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';

// Inside your layout component:
const rootData = useRouteLoaderData<RootLoader>('root');

<Plug pluggable="toolbar-top" id="my-menu">
  <MyMenu content={rootData.content} />
</Plug>
```

Using the same `id` as an existing plug replaces it.

For a full example, see the [`ContentTypesMenu`](https://github.com/plone/volto/blob/seven/packages/publicui/components/Toolbar/ContentTypesMenu.tsx) component in `@plone/publicui`.

See the {doc}`plone:volto/development/pluggables` for the full pluggable API reference.
