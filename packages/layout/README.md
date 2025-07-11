# `@plone/layout`

[![Build Status](https://app.readthedocs.org/projects/plone-layout/badge/?version=latest)](https://plone-layout.readthedocs.io/latest/)

This package provides default structural layout elements for Plone 7 and Plone's frontend modular architecture.

## Layout Layers

### 1. Containers (Query Context)

These elements only provide container query contexts. No visual styles, no constraints.

```css
header,
footer,
main {
  container-type: inline-size;
}
```

### 2. Blocks (Structure + Background)

Blocks create sections within containers and can optionally have backgrounds.

```css
/* Header blocks */
.header-block.breadcrumbs {
  background: var(--secondary-color);
}

/* Footer blocks */
.footer-block.main-footer {
  background: var(--secondary-color);
}

/* Content blocks */
.block {
  background: var(--background);
}
```

### 3. Inner container (Constraints + Layout)

Inner container elements handle spacing constraints and block-specific layouts.

```css
/* Shared constraints */
.block-inner-container {
  display: grid;
  grid-auto-flow: var(--grid-auto-flow, row);
  align-items: var(--align-items, center);
  justify-items: var(--justify-items, start);
  width: 100%;
  max-width: var(--block-width, 100%);
  margin-right: 0 auto;
}

/* Section-specific layouts */
.footer-block.main-footer .block-inner-container {
--justify-items: center;
  grid-auto-flow: row;
  text-align: center;
}
```

> [!WARNING]
> This package or app is experimental.
> The community offers no support whatsoever for it.
> Breaking changes may occur without notice.
