---
myst:
  html_meta:
    "description": "How to define TypeScript types for custom Plone content types"
    "property=og:description": "How to define TypeScript types for custom Plone content types"
    "property=og:title": "Custom content types"
    "keywords": "Seven, TypeScript, custom, content types, @plone/types, ContentTypeMap, type narrowing"
---

# Custom content types

In most Plone projects, developers add content types beyond the standard ones that ship with the {term}`CMS`.
These types carry fields that are not present on the base content object, and TypeScript needs to know about them to give you accurate autocompletion and type safety.

`@plone/types` provides an augmentable registry called `ContentTypeMap`.
When you add your type to it, TypeScript automatically narrows the `Content` union when you check the `@type` field, removing the need to cast with `as`.


## Define the content type interface

Create a {file}`.d.ts` file for your type and extend `ContentBase` from `@plone/types`.
Set the `@type` field to the _exact string_ that Plone uses for that content type, which you can verify from the `@type` key in any REST API response for that content type.
This is, for example, `Event` for the event content type or `Document` for the page content type.

```{code-block} ts
:caption: {file}`packages/<add-on-name>/types/content.d.ts`

import type { ContentBase } from '@plone/types';

export interface BlogPostContent extends ContentBase {
  '@type': 'BlogPost';
  text: {
    'content-type': string;
    data: string;
    encoding: string;
  } | null;
  reading_time: number;
}
```

```{note}
Use `ContentBase`, not `Content`, as the base of your interface.
`Content` is a discriminated union of all registered types.
Extending a union type is not valid TypeScript.
`ContentBase` is the plain interface that holds all fields common to every Plone content object.
```


## Register the type in `ContentTypeMap`

In the same {file}`.d.ts` file, add a `declare module` block to merge your interface into the `ContentTypeMap` registry.

```{code-block} ts
:caption: {file}`packages/<add-on-name>/types/content.d.ts`

import type { ContentBase } from '@plone/types';

export interface BlogPostContent extends ContentBase {
  '@type': 'BlogPost';
  text: {
    'content-type': string;
    data: string;
    encoding: string;
  } | null;
  reading_time: number;
}

declare module '@plone/types' {
  interface ContentTypeMap {
    'BlogPost': BlogPostContent;
  }
}
```

Once registered, `BlogPostContent` becomes part of the `Content` union exported by `@plone/types`.
You do not need to import or reference `ContentTypeMap` anywhere else.
TypeScript picks up the augmentation automatically whenever the {file}`.d.ts` file is included in the compilation.


## Use automatic type narrowing

You can now narrow a `Content` value by checking its `@type` field.
TypeScript infers the specific type in the narrowed branch without any cast.

```ts
import type { Content } from '@plone/types';

function renderContent(content: Content) {
  if (content['@type'] === 'BlogPost') {
    // content is now BlogPostContent
    console.log(content.reading_time);  // ✅ number
  }
}
```

This also works in React components.

```{code-block} tsx
:caption: Example component that renders a blog post

import type { Content } from '@plone/types';

interface Props {
  content: Content;
}

export default function BlogPostView({ content }: Props) {
  if (content['@type'] !== 'BlogPost') return null;

  return (
    <article>
      <p>{content.reading_time} min read</p>
    </article>
  );
}
```


## Where to put the type definitions

Place your type definitions in a `.d.ts` file inside your add-on package.
A common convention is to use a `types/` folder.

```text
packages/<add-on-name>/
└── types/
    └── content.d.ts   ← your content type definitions
```

The file must be a _declaration file_ ({file}`.d.ts`), not a plain TypeScript file ({file}`.ts`).
A `declare module` augmentation inside a {file}`.ts` file is treated as a local module augmentation and will not apply globally.

Make sure the file is included in your TypeScript compilation.
If you use a {file}`tsconfig.json` with an explicit `include` list, add `types/**/*.d.ts` to it.

```json
{
  "include": ["src/**/*", "types/**/*.d.ts"]
}
```


## Ship types with an add-on package

If you build an add-on package that others will install, include the type definitions in your published package so that consumers get narrowing automatically.

Export the {file}`.d.ts` file from your package by listing it in your {file}`package.json` `exports` or `types` field, or by placing it in a location covered by your package's `files` list.

```json
{
  "name": "my-seven-addon",
  "types": "dist/index.d.ts",
  "files": ["dist"]
}
```

Consumers of your add-on will get the `ContentTypeMap` augmentation applied as soon as they import anything from your package.

Alternatively, if the augmentation lives in a side-effect-only {file}`.d.ts` file, add a triple-slash reference.

```ts
/// <reference types="my-seven-addon" />
```

This ensures that anyone installing your add-on gets full TypeScript support for its content types without any manual setup.
