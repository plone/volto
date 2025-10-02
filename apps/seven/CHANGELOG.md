# Seven Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.0 (2025-09-29)

### Feature

- Initial push of the package holding the Plone 7 codebase. @sneridagh [#6599](https://github.com/plone/volto/issues/6599)
- Do not use the dotted notation for registry generated files. @sneridagh [#6630](https://github.com/plone/volto/issues/6630)
- Simplify the data fetching, do not expose the API server to the client.
  Use the addons style loader. @sneridagh [#6636](https://github.com/plone/volto/issues/6636)
- Added sitemap route. @ksuess [#6695](https://github.com/plone/volto/issues/6695)
- Add @plone/components Vite SVGR plugin proxy. @sneridagh [#6779](https://github.com/plone/volto/issues/6779)
- Fix some READMEs and release-it setup. @sneridagh [#6797](https://github.com/plone/volto/issues/6797)
- Added i18n support for projects and add-ons @pnicolli [#6866](https://github.com/plone/volto/issues/6866)
- Upgraded react-router to version 7.4.0. @pnicolli [#6888](https://github.com/plone/volto/issues/6888)
- Moved public ui routes to a new add-on to allow for easier customization @pnicolli [#6896](https://github.com/plone/volto/issues/6896)
- Unified the `quanta` app into the `seven` app. @pnicolli [#6902](https://github.com/plone/volto/issues/6902)
- Images and files proxy middleware. @pnicolli @sneridagh [#6908](https://github.com/plone/volto/issues/6908)
- Modify Cypress tests to use a centralized configuration in `@plone/tooling`. @sneridagh [#6944](https://github.com/plone/volto/issues/6944)
- Added React Compiler RC2. @sneridagh [#7107](https://github.com/plone/volto/issues/7107)
- Added a new base route for resetting react router fecthers. @deodorhunter [#7201](https://github.com/plone/volto/issues/7201)
- Add-ons registry style loader support for `cmsui.css` stylesheet in add-ons. @sneridagh [#7221](https://github.com/plone/volto/issues/7221)
- Separated publicui and cmsui styles. @pnicolli [#7225](https://github.com/plone/volto/issues/7225)
- Added language switcher in Seven. @nileshgulia1 [#7352](https://github.com/plone/volto/issues/7352)

### Bugfix

- Fixed the upgrade to 7.2.0 problem introduced in remix-run/react-router#13078 @sneridagh [#6780](https://github.com/plone/volto/issues/6780)
- Fixed unified `flattenToAppURL` in main loader. @sneridagh [#6865](https://github.com/plone/volto/issues/6865)
- Fixed root loader error handling @pnicolli [#6901](https://github.com/plone/volto/issues/6901)
- Fixed 404 error in `/.well-known/appspecific/com.chrome.devtools.json` request. @sneridagh [#7327](https://github.com/plone/volto/issues/7327)
- Fix resource proxy to resources. Fix typings. @sneridagh [#7374](https://github.com/plone/volto/issues/7374)

### Internal

- Update Makefile. @davisagli [#6393](https://github.com/plone/volto/issues/6393)
- Update internal `peerDependencies` to include React 19.
  Update to latest RR7, and use React 19.
  Update TS version. @sneridagh [#6641](https://github.com/plone/volto/issues/6641)
- Test with Plone 6.1.0rc1. @sneridagh [#6682](https://github.com/plone/volto/issues/6682)
- Back to use `react` 18 for now, due to the incompatibilities with Volto `react` @sneridagh [#6728](https://github.com/plone/volto/issues/6728)
- Fix dev in Seven projects. @sneridagh [#6733](https://github.com/plone/volto/issues/6733)
- Move Seven to [its own branch](https://github.com/plone/volto/tree/7). @sneridagh [#6770](https://github.com/plone/volto/issues/6770)
- Adjust existing tests, disable API-first PoC tests, disable Volto related tests. @sneridagh [#6770](https://github.com/plone/volto/issues/6770)
- General packages cleanup, disable Volto related packages from the build. @sneridagh [#6770](https://github.com/plone/volto/issues/6770)
- Move Seven to `apps` folder. @sneridagh [#6770](https://github.com/plone/volto/issues/6770)
- Use ESlint 9. @sneridagh [#6775](https://github.com/plone/volto/issues/6775)
- Update `prettier` and `stylelint` to latest. @sneridagh [#6777](https://github.com/plone/volto/issues/6777)
- Use latest RR and RAC. @sneridagh [#6821](https://github.com/plone/volto/issues/6821)
- Use the new `@plone/client` refactored code. @sneridagh [#6898](https://github.com/plone/volto/issues/6898)
- Upgrade `tailwind-variants` version. @sneridagh [#6899](https://github.com/plone/volto/issues/6899)
- Set the full Seven app with CMSUI as the default app and the Public UI only as opt-in. @pnicolli [#6913](https://github.com/plone/volto/issues/6913)
- Added unit tests configuration and github workflow for Seven. @pnicolli [#6916](https://github.com/plone/volto/issues/6916)
- Improve CI actions. @sneridagh [#6922](https://github.com/plone/volto/issues/6922)
- Update to Plone 6.1.1 and cleanup of Makefile. @sneridagh [#6923](https://github.com/plone/volto/issues/6923)
- Added more root layout tests. @pnicolli [#6936](https://github.com/plone/volto/issues/6936)
- Update to React Router 7.6.0 which fixes
  https://github.com/remix-run/react-router/issues/13078
  @sneridagh [#7060](https://github.com/plone/volto/issues/7060)
- Load catalog versions from catalog.json @sneridagh [#7065](https://github.com/plone/volto/issues/7065)
- Update to pnpm 10.10.0 @sneridagh [#7065](https://github.com/plone/volto/issues/7065)
- Seven does not rely anymore in `@plone/providers`. @sneridagh [#7105](https://github.com/plone/volto/issues/7105)
- Rename `@plone/slots` to `@plone/layout`. @sneridagh [#7119](https://github.com/plone/volto/issues/7119)
- Use @plone/helpers. @giuliaghisini [#7133](https://github.com/plone/volto/issues/7133)
- Update to latest versions. @sneridagh [#7298](https://github.com/plone/volto/issues/7298)
- Added support for `@plone/plate` package. @sneridagh [#7346](https://github.com/plone/volto/issues/7346)
- Adjust peer dependencies and engine. @sneridagh
- Remove providers from the package builds. @sneridagh
- Remove the proxy from Vite config, since we no longer use it. @sneridagh
- Update to RR7.9.1. Middleware is stable now. @sneridagh

### Documentation

- Move docs from `source` to the `docs` root. @sneridagh [#6856](https://github.com/plone/volto/issues/6856)
- Add missing docs for release management. @sneridagh [#6951](https://github.com/plone/volto/issues/6951)
- Updated docs based on feedback provided in #7221. @pnicolli @stevepiercy [#7226](https://github.com/plone/volto/issues/7226)
- Copied and adapted some of the content from existing in `@plone/registry` docs that are fundamental for Seven. @sneridagh [#7360](https://github.com/plone/volto/issues/7360)
- Add conventions and decisions made during this year's sprints. @sneridagh [#7375](https://github.com/plone/volto/issues/7375)
- Added Shadowing documentation. @sneridagh
- Added documentation on how to create a route in Seven. @sneridagh
- Sync core development docs with main, amend `PACKAGES.md` to match Seven packages. @sneridagh

## 1.0.0 (unreleased)
