# @plone/theming Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.3 (2025-12-23)

### Feature

- Added `--color-brand` since it's used by some libraries (platejs). @sneridagh [#7393](https://github.com/plone/volto/issues/7393)

### Bugfix

- Fixed styles when the main theme is tailwind-based. @pnicolli 

### Internal

- Fixed unused vars linting rule. Fixed all code that violated this rule. @sneridagh [#7395](https://github.com/plone/volto/issues/7395)
- Added `styles/colors.css` to eventually centralize the definition of colors in there. @sneridagh 

## 1.0.0-alpha.2 (2025-09-29)

### Feature

- Add controlpanel overview and schema driven control panels. @ksuess [#6657](https://github.com/plone/volto/issues/6657)
- Added some typography. @ksuess @sneridagh [#7159](https://github.com/plone/volto/issues/7159)
- Added basic CSS layer of `@plone/components` to the theming CSS. @sneridagh [#7220](https://github.com/plone/volto/issues/7220)
- Separated publicui and cmsui styles. @pnicolli [#7225](https://github.com/plone/volto/issues/7225)
- Move the `plone-components` layer one position up, to be after the `utilities` one. @sneridagh [#7236](https://github.com/plone/volto/issues/7236)
- Moved CMSUI utilities out of the `.cmsui` namespace, at least for now. @sneridagh [#7346](https://github.com/plone/volto/issues/7346)

### Internal

- Adjust peer dependencies and engine. @sneridagh

## 1.0.0-alpha.1 (2025-05-24)

### Breaking

- Non-Tailwind CSS approach is now located in `./styles/simple/main.css`. @sneridagh [#6899](https://github.com/plone/volto/issues/6899)

### Feature

- Unifying main CSS for theming Seven in `./styles/main.css`. @sneridagh [#6899](https://github.com/plone/volto/issues/6899)
- Added support for Tailwind. @sneridagh [#6899](https://github.com/plone/volto/issues/6899)
- Added Tailwind utilities for handling sizes for `@plone/components` icons. @sneridagh [#6946](https://github.com/plone/volto/issues/6946)
- Added `tailwindcss-react-aria-components` Tailwind plugin. @sneridagh [#7042](https://github.com/plone/volto/issues/7042)

### Internal

- Remove Storybook. @sneridagh [#6640](https://github.com/plone/volto/issues/6640)
- Update internal `peerDependencies` to include React 19.
  Update TS version. @sneridagh [#6641](https://github.com/plone/volto/issues/6641)
- Use ESlint 9, fix code. @sneridagh [#6775](https://github.com/plone/volto/issues/6775)
- Remove test command. @sneridagh [#6916](https://github.com/plone/volto/issues/6916)

## 1.0.0-alpha.0 (2025-01-24)

### Bugfix

- Added empty main.css.map to avoid RR7 to complain. @sneridagh [#6599](https://github.com/plone/volto/issues/6599)

### Internal

- Initial commit, first steps. @sneridagh [#6409](https://github.com/plone/volto/issues/6409)
- Centralize `tsconfig`. @sneridagh [#6536](https://github.com/plone/volto/issues/6536)

## 1.0.0 (unreleased)
