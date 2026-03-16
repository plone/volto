---
myst:
  html_meta:
    "description": "Use the Seven icon system to combine Quanta icons with your own SVGs."
    "property=og:description": "Use the Seven icon system to combine Quanta icons with your own SVGs."
    "property=og:title": "Use the icon system in Seven"
    "keywords": "Seven, @plone/components, icons, Quanta, SVG, SVGR, guide"
---

# Icon system

This guide shows how to import icons, customize them, and decide when to use the pre-built React wrappers.

Seven ships with an icon pipeline via `@plone/components`.
This system is SVG-based, so you can mix its Quanta design system icons with any custom SVGs that you add to your project.

```{tip}
Every icon you import is just a React component.
That means it accepts props, can be composed, and follows the same accessibility rules as any other JSX element.
```

## Add custom SVG icons

Seven uses [SVGR](https://react-svgr.com/) through a custom Vite plugin to transform SVG files into React components at build time.

To add a custom icon, perform the following steps.

1.  Drop an SVG file anywhere inside your add-on, such as {file}`./my-icon.svg`.
1.  Import it as if it were a React component using the `?react` query parameter.
1.  Render it, passing props such as `aria-label`, `size`, or `color`.

The following code example shows the last two steps.

```{code-block} tsx
:caption: {file}`apps/seven/app/components/MyComponent.tsx`

import MyIcon from './my-icon.svg?react';

const MyComponent = () => {
  return <MyIcon aria-label="My Icon" size="sm" color="--color-quanta-daiquiri" />;
};
```

```{note}
Under the hood, the SVGR plugin gets the SVG, optimizes it, and transforms it into a React component.
Please note the `?react` query parameter in the import statement, which tells Vite to apply the SVGR transformation and return a React component.
```

````{tip}
To fix the TypeScript error `Cannot find module './my-icon.svg?react' or its corresponding type declarations`, create a {file}`types.d.ts` file in your add-on with the following content:

```{code-block} ts
:caption: {file}`packages/<add-on-name>/types.d.ts`
import '@plone/components/icons';
```
````

### Icon props

The following code sample shows how to add various props to custom icons.

```ts
export interface IconProps extends DOMProps, AriaLabelingProps {
  /**
   * A screen reader only label for the Icon.
   */
  'aria-label'?: string;
  /**
   * Size of Icon (changes based on scale).
   */
  size?: '2xs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  /**
   * Indicates whether the element is exposed to an accessibility API.
   */
  'aria-hidden'?: boolean | 'false' | 'true';
  /**
   * Color of the Icon. It can be a HEX color or a CSS custom property.
   */
  color?: string;
  /**
   * Custom class name to apply to the icon.
   */
  className?: string;
  style?: React.CSSProperties;
}
```

### Accessibility tips

-   Supply `aria-label` when the icon communicates meaning, for example, an action icon on a button.
-   Add `aria-hidden="true"` when the icon is decorative, so screen readers skip it.
-   Prefer semantic colors tied to CSS custom properties, so icons adapt to theming.

## Import Quanta SVG icons

`@plone/components` bundles the Quanta icon set as raw SVG files under the `@plone/components/icons` import path.
These icons go through the same SVGR transformation as your custom SVGs.

The following code example shows how to import the trash can icon from the Quanta icon set.

```tsx
import TrashSVG from '@plone/components/icons/bin.svg?react';

const MyComponent = () => (
  <TrashSVG aria-label="Delete" size="lg" color="--color-quanta-wine" />
);
```

## Use the pre-built icon components

There's a version of the Quanta icons already wrapped as React components and ready to use.
They have been pre-built and are available under the `@plone/components/Icons` import path.

The following code example shows how to use these pre-built components.

```tsx
import { AddIcon } from '@plone/components/Icons';

const MyComponent = () => {
  return <AddIcon aria-label="Add" size="lg" color="--color-quanta-sapphire" />;
};
```

```{note}
These pre-built components are equivalent to importing the SVGs directly, but they are bundled JavaScript modules.
- Use them when the SVGR Vite plugin is not available, for example in Storybook, Jest, or non-Vite frameworks, such as Next.js.
- When developing `@plone/components` itself, prefer these pre-built modules because the package build pipeline has no awareness of your app's Vite configuration.
```
