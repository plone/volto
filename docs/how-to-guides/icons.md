---
myst:
  html_meta:
    "description": "Use the Seven icon system to combine Quanta icons with your own SVGs."
    "property=og:description": "Use the Seven icon system to combine Quanta icons with your own SVGs."
    "property=og:title": "Use the icon system in Seven"
    "keywords": "Seven, @plone/components, icons, Quanta, SVG, SVGR, guide"
---

# How to use the icon system in Seven

Seven ships an SVG-based icon pipeline so you can mix the Quanta design system icons with any custom SVGs you add to the project. This guide shows how to import icons, customise them, and decide when to use the pre-built React wrappers.

```{tip}
Every icon you import is just a React component. That means it accepts props, can be composed, and follows the same accessibility rules as any other JSX element.
```

## Add your own SVG icons

Seven uses [SVGR](https://react-svgr.com/) through a custom Vite plugin to transform SVG files into React components at build time.

1. Drop an SVG file anywhere inside your app (for example `./my-icon.svg`).
2. Import it as if it were a React component.
3. Render it, passing props such as `aria-label`, `size`, or `color`.

```tsx title="apps/seven/app/components/MyComponent.tsx"
import MyIcon from './my-icon.svg';

const MyComponent = () => {
  return <MyIcon aria-label="My Icon" size="sm" color="--color-quanta-daiquiri" />;
};
```

```{note}
Under the hood, the SVGR plugin gets the SVG, optimizes it, and transforms it into a React component.
```

### Icon props

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

- Supply `aria-label` when the icon communicates meaning (for example, an action icon on a button).
- Add `aria-hidden="true"` when the icon is decorative so screen readers skip it.
- Prefer semantic colours tied to CSS custom properties so icons adapt to theming.

## Import Quanta SVG icons

`@plone/components` bundles the Quanta icon set as raw SVG files under the `@plone/components/icons` import path. These icons go through the same SVGR transformation as your custom SVGs.

```tsx
import TrashSVG from '@plone/components/icons/bin.svg';

const MyComponent = () => (
  <TrashSVG aria-label="Delete" size="lg" color="--color-quanta-wine" />
);
```

## Use the pre-built icon components

There's a version of the Quanta icons already wrapped as React components and ready to use.
They have been pre-built and are available under the `@plone/components/Icons` import path.

```tsx
import { AddIcon } from '@plone/components/Icons';

const MyComponent = () => {
  return <AddIcon aria-label="Add" size="lg" color="--color-quanta-sapphire" />;
};

```

```{note}
These pre-built components are equivalent to importing the SVGs directly, but they are bundled JavaScript modules.
- Use them when the SVGR Vite plugin is not available (for example Storybook, Jest, or non-Vite frameworks like Next.js).
- When developing `@plone/components` itself, prefer these pre-built modules because the package build pipeline has no awareness of your app's Vite configuration.
```
