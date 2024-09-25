---
html_meta:
  "description": "Customize a base theme like `Volto Light Theme` via SCSS."
  "property=og:description": "Customize a base theme like `Volto Light Theme` via SCSS."
  "property=og:title": "Theming a base theme like `Volto Light Theme`"
  "keywords": "Volto, Plone, frontend, React, themes, Volto Light Theme"
---

# Theming a base theme like `Volto Light Theme`

In your Volto addon, create a `theme` folder with the follwing two empty files:

```
src/
├── components
├── index.js
└── theme
    ├── _main.scss
    └── _variables.scss
```

## Variables
`_variables.scss`

This is the place to override SCSS variables of the base theme.

```
$text-color: #000;
$font-size: 18px;
$line-height: 24px;
```

## Main
`_main.scss`

All custom styles should done here. You can also include other SCSS or CSS files here.