---
html_meta:
  "description": "Customize a base theme such as Volto Light Theme via SCSS."
  "property=og:description": "Customize a base theme such as Volto Light Theme via SCSS."
  "property=og:title": "Theming a base theme such as Volto Light Theme"
  "keywords": "Volto, Plone, frontend, React, themes, Volto Light Theme"
---

# Customize a base theme

You can customize a base theme for your add-on.
The following examples use [Volto Light Theme](https://github.com/kitconcept/volto-light-theme) as a base theme.


## File structure

In your Volto add-on's {file}`src` folder, create a subfolder named {file}`theme`.
Inside {file}`theme` create two empty files named {file}`_main.scss` and {file}`_variables.scss`.
Refer to the following file system diagram.

```text
src/
├── components
├── index.js
└── theme
    ├── _main.scss
    └── _variables.scss
```


## `_variables.scss`

{file}`_variables.scss` is where you can override SCSS variables of the base theme.

```scss
$text-color: #000;
$font-size: 18px;
$line-height: 24px;
```


## `_main.scss`

{file}`_main.scss` is where you should put all custom styles.
You can also include other SCSS or CSS files here.
