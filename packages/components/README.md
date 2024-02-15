# @plone/components

[![NPM](https://img.shields.io/npm/v/@plone/components.svg)](https://www.npmjs.com/package/@plone/components)
[![Build Status](https://github.com/plone/components/actions/workflows/code.yml/badge.svg)](https://github.com/plone/components/actions)
[![Build Status](https://github.com/plone/components/actions/workflows/unit.yml/badge.svg)](https://github.com/plone/components/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ff1f19ce-9b19-48f9-94a8-d533b53d4a9a/deploy-status)](https://app.netlify.com/sites/plone-components/deploys)

This package contains ReactJS components for use Plone as a headless CMS.

The purpose of this package is to provide an agnostic set of baseline components to build sites upon.

## Design decissions and assumptions

The package will provide a set of simple, ready to use components:

- Agnostic (not tied to any known design system)
- Composable (they are ready to be the building blocks of other complex components)
- Data-driven-less (they are dumb, presentational components)
- i18n-less (they do not provide i18n machinery or attached to any i18n framework/library)
- Built on a renowned headless CMS components library: React Aria Components (RAC) (https://react-spectrum.adobe.com/react-aria/components.html)

Since we are using RAC as base, the styling of this package components are done via the RAC styling options (https://react-spectrum.adobe.com/react-aria/styling.html)
This package provides a simple and basic set of CSS rules to start build upon.
Alternatively, you can bring your own styles, removing the basic styling or complement it, building on the top of it.
You can even use RAC to use other CSS utility libraries like Tailwind.

## Styling components

This package provide a basic set of CSS rules, we called them BasiQ (the Q for Quanta).
You should add them to your project build in order to make the components to be styled properly.
You can use all the CSS bundled in a single file, or using the specific file for the component you are using.
They are distributed along with the components as a library.

```js
import '@plone/components/basiq.css';
```

or selectively:

```js
import '@plone/components/src/styles/basiq/TextField.css';
```

## Themes

The idea is that you can use these basic styles while building the theme of your site.
You can take advantage of them as they are very thin and basic (almost vanilla CSS for the components).
Using them as a baseline will allow you to quickly build your theme around them.
BasiQ provides a simple, yet powerful set of tokenized custom CSS properties that will help you customize your own styles on the top of BasiQ. You can override them in your classes while maintaining them for others.

An example of these, are the Quanta components. These components use BasiQ as baseline, so they are built upon it and reusing the CSS and custom CSS properties in there. Quanta is built upon the basic styles of BasiQ in an additive way, so the use of the Quanta CSS implies to use it upon BasiQ styling. You could take Quanta as example to build your own layer of styles over BasiQ for your theme.

In order to use a theme built upon BasiQ, you need to import both BasiQ and Quanta CSS:

```js
import '@plone/components/basiq.css';
import '@plone/components/quanta.css';
```

You have the option of doing it selectively too:

```js
import '@plone/components/src/styles/basiq/TextField.css';
import '@plone/components/src/styles/quanta/TextField.css';
```

Take a look at the implementation of the Quanta components, using the BasiQ ones as baseline.

Alternatively, as RAC allows, you can also drop your own basic set of styles.
You can take the BasiQ styles as reference.
You can even bring your own CSS framework and make BasiQ get the styling in there using the utilities of your choice.
It's even possible to use Tailwind for styling the components in this package, using the RAC styling approaches.

## Components list

### BasiQ

- Button
- Checkbox
- CheckboxField
- CheckboxGroup
- Combobox
- Container
- Dialog
- Form
- GridList
- Icon
- Link
- Listbox
- Menu
- Modal
- NumberField
- Popover
- RadioGroup
- Select
- Switch
- Tabs
- TagGroup
- TextField
- TextAreaField
- ToggleButton
- Toolbar
- BlockToolbar
- Tooltip

### Viewlets

- Breadcrumbs

### Views

- DefaultBlockView
- RenderBlocks

### Quanta

- TextField
- TextAreaField

## Quanta icons

This package provides an implementation of the Quanta Icon set in React components.
They can be used directly in your components as:

```tsx
import { ChevronupIcon } from '../Icons/ChevronupIcon';

const MyComponent = (props) => (
  <Button>
    <span aria-hidden="true" style={{ display: 'flex' }}>
      {props.isOpen ? <ChevronupIcon /> : <ChevrondownIcon />}
    </span>
  </Button>
)
```

## Helper providers

### flattenToAppURL

This provider allows you to pass down your components a flattenToAppURL helper.
This helper can be different across platforms or frameworks, since the way to provide configuration can also be different.

```tsx
import { FlattenToAppURLProvider } from '@plone/components';
import {flattenToAppURL} from './utils';

const rootApp = (
  <FlattenToAppURLProvider flattenToAppURL={flattenToAppURL}>
    {children}
  </FlattenToAppURLProvider>
)
```

then from your components:

```tsx
import { useFlattenToAppURL } from '@plone/components';

const Link = (props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { flattenToAppURL } = useFlattenToAppURL();
  const flattenedURL = flattenToAppURL(props.href);

  return (
    <RACLink ref={ref} {...props} href={flattenedURL}>
      {props.children}
    </RACLink>
  );
};
```

## Demo / Storybook

You can find the self-documented Storybook in:

https://plone-components.netlify.app/

## Development

This package follows a style guide (Storybook) driven development.
The components are developed in isolation, given their own Storybook stories.

The components are expected to be data-driven-less. So they won't rely internally in any data retrieval facility or utilities (as in i18n).
They are expected to receive all the necessary data as props from the parent components.
In that regard, they should be "dumb" components that only take care of rendering.

### Headless UI component library

This package has the form of a headless UI component library.
A headless UI component library provide "white label" components that you later can style with your own styles.
It is not tied to any heavy specific styling nor any CSS framework.
The vanilla CSS provided allow you to "drop-in" your own CSS framework, build and existing styling into the components.

This post explains extensively its benefits:

https://medium.com/@nirbenyair/headless-components-in-react-and-why-i-stopped-using-ui-libraries-a8208197c268

### `react-aria-components`

`@plone/components` is based on Adobe's [`react-aria-components` library](https://react-spectrum.adobe.com/react-aria/react-aria-components.html). React Aria Components is a library of unstyled components built on top of the React Aria hooks. It provides a simpler way to build accessible components with custom styles, while offering the flexibility to drop down to hooks for even more customizability where needed.

## Releases

The release policy for this package follows a quick 1.0.0 release, as opposed to have a excessive long lasted alpha/beta road to 1.0.0. This is because the development of this package is expected to happen during the next years.

Breaking changes will be stated properly using semantic versioning, however an upgrade guide won't be supplied until the package is considered "ready for production".
The team will communicate this state properly when the moment comes.

## PLIP #4352

This package is the result of the execution of the [Plone Improvement Proposal #4352](https://github.com/plone/volto/issues/4352).
