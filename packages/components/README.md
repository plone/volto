# @plone/components

[![NPM](https://img.shields.io/npm/v/@plone/components.svg)](https://www.npmjs.com/package/@plone/components)
[![Build Status](https://github.com/plone/components/actions/workflows/code.yml/badge.svg)](https://github.com/plone/components/actions)
[![Build Status](https://github.com/plone/components/actions/workflows/unit.yml/badge.svg)](https://github.com/plone/components/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ff1f19ce-9b19-48f9-94a8-d533b53d4a9a/deploy-status)](https://app.netlify.com/sites/plone-components/deploys)

This package contains ReactJS components for using Plone as a headless CMS.

The purpose of this package is to provide an agnostic set of baseline components to build sites upon.

## Storybook / Demo

You can find the self-documented Storybook in:

https://plone-components.netlify.app/

`@plone/components` is based on [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html), the documentation there applies also to all the components in this package.

## Design decisions and assumptions

This package provides a set of simple, ready to use components with the following features:

- Agnostic (not tied to any known design system)
- Composable (they are ready to be the building blocks of other complex components)
- Theme-able (they can be themed, using both the provided basic theme as a baseline and custom CSS properties)
- Data-driven-less (they are dumb, presentational components)
- i18n-less (they do not provide i18n machinery or attached to any i18n framework or library)
- Built on a renowned headless CMS components library: [React Aria Components (RAC)](https://react-spectrum.adobe.com/react-aria/components.html)

Since we are using RAC as the base, the styling of this package components are done via the [RAC styling options](https://react-spectrum.adobe.com/react-aria/styling.html).
See the `react-aria-components` section below for more information about RAC.
This package provides a simple and basic set of CSS rules to build upon.
Alternatively, you can bring your own styles, removing the basic styling or complementing it, and build on top of it.
You can even use RAC to use other CSS utility libraries, like TailwindCSS.

## Styling

This package provide a basic set of CSS rules.
You should add them to your project build to make the components properly styled.

You can bring your own styles, but the CSS you provide should replace what the basic stylying does and style the bare components from scratch.

You can use the CSS bundled for all components in a single file, or use the specific files for your components.
They are distributed along with the components code in the `dist` folder of the library.

```js
import '@plone/components/dist/basic.css';
```

or selectively:

```js
import '@plone/components/src/styles/basic/TextField.css';
```

## Theming

You can use the basic styles as a baseline while building the theme of your site.
You can take advantage of them, as they are very thin and basic (almost vanilla CSS for the components).
Using them as a baseline will allow you to quickly build your theme around them.
`@plone/components` basic styles provide a simple, yet powerful, set of tokenized custom CSS properties that will help you customize your own styles on the top of the basic styling.
You can override them in your classes while maintaining them for others.

### CSS layers

This package uses CSS layers to style the components in a more flexible way.
It uses the `plone-components` layer name to scope all the CSS declarations in the package.
The basic styling uses the nested `plone-components.base` named layer.
You can use the `plone-components` layer to override the basic styling, or use the `plone-components.base` layer to override the basic styling in a more specific way.

### Quanta

This package also features the Quanta components.
These components use the basic styling as a baseline, extending them to achieve the Quanta look and feel.
They also extend the basic React components in a composable way.
The Quanta styling is scoped in the `plone-components.quanta` named layer.

Quanta is built upon the basic styles in an additive way.
The use of the Quanta CSS implies using it upon basic styling.
You could take Quanta as example to build your own layer of styles over basic styling for your theme.

To use a theme built upon the basic styling, you need to import both the basic and the theme CSS, in this order:

```js
import '@plone/components/dist/basic.css';
import '@plone/components/dist/quanta.css';
```

You have the option of doing it selectively per component, too:

```js
import '@plone/components/src/styles/basic/TextField.css';
import '@plone/components/src/styles/quanta/TextField.css';
```

Take a look at the implementation of the Quanta components, using the basic ones as baseline in the `quanta` folders.

Alternatively, as RAC allows, you can also drop your own basic set of styles.
You can take the basic styles as reference.
You can even remove the basic styling completely and bring your own CSS framework and push a new styling from scratch in there using the utilities of your choice, targeting the default RAC class names.
It's even possible to use TailwindCSS for styling the components in this package, using the RAC styling approach.

## Components list

### Basic

- BlockToolbar
- Button
- Checkbox
- Container
- Dialog
- GridList
- Icon
- Link
- ListBox
- Menu
- Modal
- Popover
- Slider
- Table
- Tabs
- TagGroup
- ToggleButton
- Toolbar
- Tooltip

### Forms

- CheckboxField
- Form
- Meter
- NumberField
- SearchField
- Select
- TextAreaField
- TextField
- TimeField

### Widgets

- Calendar
- CheckboxField
- CheckboxGroup
- ComboBox
- DateField
- DatePicker
- DateRangePicker
- ProgressBar
- RadioGroup
- RangeCalendar
- Switch

### Viewlets

- Breadcrumbs

### Views

- DefaultBlockView
- RenderBlocks

### Quanta

- TextField
- TextAreaField
- Select

## Icons

### Quanta icons

This package provide the Quanta icons as raw SVG files.

```tsx
import addSVG from '@plone/components/icons/add.svg'

const MyComponent = (props) => (
  <img src={addSVG} alt />
)
```

### Vite SVGR plugin

This package provides a Vite plugin that uses and configures `vite-plugin-sgvr` to use `@plone/components` `Icon` component under the hood.
This plugin converts a raw SVG file into a React component, ready to be used.
It wraps the SVG with the `@plone/components` `Icon` component.
To use it, you have to add it to your `vite.config.ts` app configuration.

```ts
import { PloneSGVRVitePlugin } from '@plone/components/vite-plugin-sgvr';

export default defineConfig({
  plugins: [
    PloneSGVRVitePlugin(),
    // (...other plugins)
  ],
  // (...more Vite config)
})
```

Then, you use it in your code like this:

```tsx
import AddSVG from '@plone/components/icons/add.svg?react'

const MyComponent = (props) => (
  <AddSVG />
)
```

You can pass any prop that the `Icon` component accepts:

```tsx
import AddSVG from '@plone/components/icons/add.svg?react'

const MyComponent = (props) => (
  <AddSVG size='XL' color='informative' />
)
```

### Quanta icons as React Components

This package provides an implementation of the Quanta Icon set in native React components.
Unlike the approach above, these are full fledged components, generated via a script iven the Quanta icons and do not need additional config in the bundler.
They can be used directly in your components as:

```tsx
import { ChevronupIcon, ChevrondownIcon, Button } from '@plone/components/components/Icons';

const MyComponent = (props) => (
  <Button aria-label="Unfold/Collapse">
    {props.isOpen ? <ChevronupIcon /> : <ChevrondownIcon />}
  </Button>
)
```

## Helper providers

### `flattenToAppURL`

This provider allows you to pass down to your components a `flattenToAppURL` helper.
This helper can be different across platforms or frameworks, since the way to provide configuration can also be different.

```tsx
import { FlattenToAppURLProvider } from '@plone/components';
import { flattenToAppURL } from './utils';

const rootApp = (
  <FlattenToAppURLProvider flattenToAppURL={flattenToAppURL}>
    {children}
  </FlattenToAppURLProvider>
)
```

Then from your components:

```tsx
import { useFlattenToAppURL } from '@plone/components';
import { Link as RACLink } from 'react-aria-components';

const Link = (props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { flattenToAppURL } = useFlattenToAppURL();
  const flattenedURL = flattenToAppURL(props.href);

  return (
    <RACLink {...props} href={flattenedURL}>
      {props.children}
    </RACLink>
  );
};
```

## Development

This package follows a style guide (Storybook) driven development.
The components are developed in isolation, given their own Storybook stories.

The components are expected to be data-driven-less.
They won't rely internally on any data retrieval facility or utilities (as in i18n).
They are expected to receive all the necessary data as props from the parent components.
In that regard, they should be "dumb" components that only take care of rendering.

### Headless UI component library

This package has the form of a headless UI component library.
A headless UI component library provides "white label" components that you can later style with your own styles.
It is not tied to any heavy, specific styling, nor to any CSS framework.
The vanilla CSS provided allows you to "drop-in" your own CSS framework, and build existing styling into the components.

This post explains extensively its benefits:

https://medium.com/@nirbenyair/headless-components-in-react-and-why-i-stopped-using-ui-libraries-a8208197c268

### `react-aria-components`

`@plone/components` is based on Adobe's [`react-aria-components` library](https://react-spectrum.adobe.com/react-aria/react-aria-components.html).
React Aria Components is a library of unstyled components built on top of the React Aria library.
It provides a simpler way to build accessible components with custom styles, while offering the flexibility to drop down to hooks for even more customizability where needed.

## Releases

The release policy for this package follows a quick 1.0.0 release, as opposed to have an excessively long-lasting alpha/beta road to 1.0.0.
This is because the development of this package is expected to happen over the next few years.

Breaking changes will be stated properly using semantic versioning.
However, an upgrade guide won't be supplied until the package is considered "ready for production".
The Volto Team will communicate this state properly when the moment comes.

## PLIP #4352

This package is the result of the execution of the [Plone Improvement Proposal #4352](https://github.com/plone/volto/issues/4352).
