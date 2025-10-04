---
myst:
  html_meta:
    "description": "How to add Tailwind CSS to your add-on"
    "property=og:description": "How to add Tailwind CSS to your add-on"
    "property=og:title": "How to add Tailwind CSS to your add-on"
    "keywords": "Seven, frontend, Plone, how-to, theming, Tailwind CSS, tailwind"
---

# How to add Tailwind CSS to your add-on

This guide will walk you through the steps to integrate Tailwind CSS into your add-on.

## Install Tailwind CSS in your add-on

```shell
pnpm --filter <addon-name> add tailwindcss
```

## Create `styles/publicui.css` file

Create a `styles` folder in your add-on's directory.

```shell
mkdir packages/<addon-name>/styles
```

Then create a `publicui.css` file inside the `styles` folder.

```shell
touch packages/<addon-name>/styles/publicui.css
```

## Use Tailwind `className` in your React components

You can now use Tailwind CSS classes in your React components. For example:

```tsx
import React from 'react';

const MyComponent = () => {
  return (
    <div className="bg-blue-500 text-white p-4 rounded">
      <h1 className="text-2xl font-bold">Hello, Tailwind CSS!</h1>
      <p className="mt-2">This is a sample component using Tailwind CSS.</p>
    </div>
  );
};

export default MyComponent;
```

You can add new styles to the `publicui.css` file as needed, extend Tailwind's utilities or customize the existing CSS properties to fit your design requirements.
