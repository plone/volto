---
myst:
  html_meta:
    "description": "How to add Tailwind CSS to your add-on"
    "property=og:description": "How to add Tailwind CSS to your add-on"
    "property=og:title": "How to add Tailwind CSS to your add-on"
    "keywords": "Seven, frontend, Plone, how-to, theming, Tailwind CSS, tailwind"
---

# Add Tailwind CSS to your add-on

This guide will walk you through the steps to integrate Tailwind CSS into your add-on.
It assumes you have already set up a basic add-on structure using the {term}`cookieplone` generator.
If you don't have an add-on scaffold, follow {doc}`../get-started/create-package` before you continue.

## Install Tailwind CSS

Install Tailwind CSS in your add-on by running the following command from the root of your project.
```shell
pnpm --filter <add-on-name> add tailwindcss
```

## Create `styles/publicui.css` file

Create a {file}`styles` folder in your add-on's directory.

```shell
mkdir packages/<add-on-name>/styles
```

Then create a {file}`publicui.css` file inside the {file}`styles` folder.

```shell
touch packages/<add-on-name>/styles/publicui.css
```

## Use Tailwind utilities in your React components

You can now use Tailwind CSS class name utilities in your React components, as shown in the following example.

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

You can add new styles to the {file}`publicui.css` file as needed, extend Tailwind's utilities, or customize the existing CSS properties to fit your design requirements.
