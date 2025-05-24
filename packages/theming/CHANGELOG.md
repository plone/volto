# @plone/theming Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

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
