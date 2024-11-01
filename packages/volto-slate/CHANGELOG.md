# @plone/volto-slate Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 18.0.0 (2024-10-31)

### Internal

- Release 18.0.0 final @sneridagh 

## 18.0.0-alpha.20 (2024-10-30)

### Bugfix

- Fix slight CSS lint violation in volto-slate @sneridagh [#6444](https://github.com/plone/volto/issues/6444)

## 18.0.0-alpha.19 (2024-10-03)

### Feature

- Update Brazilian Portuguese translations. @ericof [#6292](https://github.com/plone/volto/issues/6292)

### Bugfix

- Fetch `user` before pass it to the `restricted` function of the block settings. @wesleybl [#6293](https://github.com/plone/volto/issues/6293)

## 18.0.0-alpha.18 (2024-09-13)

### Feature

- Pass `user`, `navRoot` and `contentType` objects to the `restricted` function of the block settings. @wesleybl [#6264](https://github.com/plone/volto/issues/6264)

## 18.0.0-alpha.17 (2024-07-05)

### Feature

- Use the unused `toggleButton` prop in `PositionedToolbar` to render the toolbar in a different `portal` target falling back to `document.body` if `toggleButton` is not provided. @ichim-david

  When `toggleButton` is provided as a `portal` target, allow negative left positioning except when the target is `document.body` to prevent the toolbar going off-screen and avoid breaking changes. @ichim-david [#6159](https://github.com/plone/volto/issues/6159)

## 18.0.0-alpha.16 (2024-07-03)

### Internal

- Fix dependencies for the package @sneridagh [#6148](https://github.com/plone/volto/issues/6148)

## 18.0.0-alpha.15 (2024-06-28)

### Internal

- Add proper dependencies to `volto-slate`. @sneridagh [#6130](https://github.com/plone/volto/issues/6130)

## 18.0.0-alpha.14 (2024-06-26)

### Feature

- Added `link-form-container` styles for `AddLinkForm` component. @ichim-david [#5607](https://github.com/plone/volto/issues/5607)
- Handle breakList in DetachedTextBlockEditor. @giuliaghisini [#6106](https://github.com/plone/volto/issues/6106)

### Bugfix

- In the Slate text block, the markup shortcuts for heading and blockquote work again. @kHAPPY2004 [#5452](https://github.com/plone/volto/issues/5452)
- When pasting an image into a Slate block, now only an image block is created, instead of both a Slate block and an image block. @aryan7081 [#5818](https://github.com/plone/volto/issues/5818)

### Internal

- Rename files with wrong extension `js->jsx` when they contain JSX. @sneridagh [#6114](https://github.com/plone/volto/issues/6114)

## 18.0.0-alpha.13 (2024-06-13)

### Bugfix

- Fix removal of slate formatting applied to text when toggling the list buttons @robgietema [#6080](https://github.com/plone/volto/issues/6080)

## 18.0.0-alpha.12 (2024-04-23)

### Bugfix

- In the Slate text block, the markup shortcuts for bold, italic and strikethrough work again. @kHAPPY2004 [#5605](https://github.com/plone/volto/issues/5605)

### Internal

- Update imports to work with the new code split components in Volto. @pnicolli [#5295](https://github.com/plone/volto/issues/5295)

## 18.0.0-alpha.11 (2024-04-03)

### Bugfix

- Fix removing an element in slate when cursor is at the end of the element to be removed; Fix losing selection when adding an element. @razvanMiu [#5928](https://github.com/plone/volto/issues/5928)

## 18.0.0-alpha.10 (2024-03-14)

### Breaking

- Remove legacy `text`, `table` and `hero` blocks based in `draftJS` @sneridagh [#5846](https://github.com/plone/volto/issues/5846)

### Bugfix

- Fix other occurrences of mutable (referenced) objects when assigning the default inner `blocksConfig` object for the `grid` block, pass by value instead. sneridagh [#5859](https://github.com/plone/volto/issues/5859)

### Internal

- Fix CSS lint @sneridagh [#5849](https://github.com/plone/volto/issues/5849)

## 18.0.0-alpha.9 (2024-03-02)

### Internal

- Update dependencies @sneridagh [#5815](https://github.com/plone/volto/issues/5815)

## 18.0.0-alpha.8 (2024-03-01)

### Feature

- Upgrade Volto core to use React 18.2.0 @sneridagh [#3221](https://github.com/plone/volto/issues/3221)

## 18.0.0-alpha.7 (2024-02-22)

### Bugfix

- Fix sidebar form update. @robgietema [#5779](https://github.com/plone/volto/issues/5779)

## 18.0.0-alpha.6 (2024-01-25)

### Bugfix

- Fix code button in slate. @pbauer [#5668](https://github.com/plone/volto/issues/5668)

## 18.0.0-alpha.5 (2023-12-13)

### Feature

- Added `navRoot` and `contentType` to `restricted` key in blocks configuration. @sneridagh [#5517](https://github.com/plone/volto/issues/5517)

### Internal

- Add explicit dependency on the correct React (17.0.2) that Volto is using. Update dependency on `react-intersection-observer` @sneridagh [#5490](https://github.com/plone/volto/issues/5490)

### Documentation

- Improved grammar, style, and directly link to configuration in `volto-slate` readme. @stevepiercy [#5487](https://github.com/plone/volto/issues/5487)

## 18.0.0-alpha.4 (2023-12-02)

### Bugfix

- Fix the right order of parameters in normalizeExternalData.js @dobri1408 [#5347](https://github.com/plone/volto/issues/5347)

### Internal

- Prepare @plone/volto-slate for release, add a bit more of docs, and enable ESlint @sneridagh [#5486](https://github.com/plone/volto/issues/5486)
