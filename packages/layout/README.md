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

### 2. Blocks and Sections (Structure + Background)

Blocks and Sections create sections within containers and can optionally have backgrounds.

```css
/* Header sections */
.section-header .section {
  background: var(--secondary-color);
}

/* Footer section */
.section-footer .section {
  background: var(--secondary-color);
}

/* Content blocks */
.content-area .block {
  background: var(--background);
}
```

### 3. Inner container (Constraints + Layout)

Inner container elements handle spacing constraints and block or section-specific layouts.

```css
/* Shared constraints */
.block-inner-container,
.section-inner-container {
  display: grid;
  grid-auto-flow: var(--grid-auto-flow, row);
  align-items: var(--align-items, center);
  justify-items: var(--justify-items, start);
  width: 100%;
  max-width: var(--block-width, 100%);
  margin-right: 0 auto;
}

/* Section-specific layouts */
.section-footer.main-footer .section-inner-container {
--justify-items: center;
  grid-auto-flow: row;
  text-align: center;
}
```

> [!WARNING]
> This package or app is experimental.
> The community offers no support whatsoever for it.
> Breaking changes may occur without notice.
