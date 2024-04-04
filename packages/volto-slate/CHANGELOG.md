# @plone/volto-slate Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

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
