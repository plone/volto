# @plone/cmsui Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.0 (2025-09-29)

### Feature

- Add controlpanel overview and schema driven control panels. @ksuess [#6657](https://github.com/plone/volto/issues/6657)
- Initial implementation of `@plone/cmsui`. @sneridagh [#6797](https://github.com/plone/volto/issues/6797)
- Added i18n support for projects and add-ons @pnicolli [#6866](https://github.com/plone/volto/issues/6866)
- Updated root loader usage and removed the index route since it is now in the `@plone/publicui` add-on @pnicolli [#6896](https://github.com/plone/volto/issues/6896)
- Unified the `quanta` app into the `seven` app. @pnicolli [#6902](https://github.com/plone/volto/issues/6902)
- Added login and a basic edit form @pnicolli [#6906](https://github.com/plone/volto/issues/6906)
- Better route definition, add common layout in @plone/cmsui routes. @sneridagh [#6908](https://github.com/plone/volto/issues/6908)
- Modify Cypress tests to use a centralized configuration in `@plone/tooling`. @sneridagh [#6944](https://github.com/plone/volto/issues/6944)
- Added logout route. @pnicolli [#6972](https://github.com/plone/volto/issues/6972)
- Added Storybook CMSUI. @sneridagh [#6977](https://github.com/plone/volto/issues/6977)
- Added Quanta TextField component. @sneridagh [#6977](https://github.com/plone/volto/issues/6977)
- Added Quanta styling to login route. @sneridagh [#6977](https://github.com/plone/volto/issues/6977)
- Initial implementation of the edit form.
  It uses Tanstack Form as form library.
  Added the `Field` component used when generating forms from schemas.
  Used `jotai` for keeping a global form value and a way to surgically update the global form values. @sneridagh [#6999](https://github.com/plone/volto/issues/6999)
- Use `useFetcher` for sending the full form as JSON. @sneridagh [#7118](https://github.com/plone/volto/issues/7118)
- Add DateTimePicker and DateField to widget configuration. @rboixaderg [#7131](https://github.com/plone/volto/issues/7131)
- Update widget registration and getting widgets from config with new methods. @deodorhunter [#7141](https://github.com/plone/volto/issues/7141)
- Added a @search route as a helper for widgets. @pnicolli [#7143](https://github.com/plone/volto/issues/7143)
- Added SizeWidget to widget configuration. @rboixaderg [#7150](https://github.com/plone/volto/issues/7150)
- Added object browser widget. @deodorhunter [#7201](https://github.com/plone/volto/issues/7201)
- Separated publicui and cmsui styles. @pnicolli [#7225](https://github.com/plone/volto/issues/7225)
- First wireframe implementation of the Block Editor, focusing on performance. @sneridagh [#7228](https://github.com/plone/volto/issues/7228)
- Register widgets using `registerWidget`. @deodorhunter @sneridagh [#7257](https://github.com/plone/volto/issues/7257)
- Updated widget config registration to reflect new API. @deodorhunter [#7334](https://github.com/plone/volto/issues/7334)
- Improved block editor, support for `@plone/plate`. @sneridagh [#7346](https://github.com/plone/volto/issues/7346)

### Bugfix

- Correct size of the button in login form. @sneridagh [#7040](https://github.com/plone/volto/issues/7040)
- unify and fix the sidebar collapse functionality. @ionlizarazu [#7126](https://github.com/plone/volto/issues/7126)
- Bring back missing toolbar-top. @sneridagh [#7298](https://github.com/plone/volto/issues/7298)
- Fixed the load of the default layers ensuring they are on top, using a React 19 managed `<link>`. @sneridagh [#7365](https://github.com/plone/volto/issues/7365)

### Internal

- Unify Tailwind versions. @sneridagh [#6899](https://github.com/plone/volto/issues/6899)
- Added vitest config to not fail if no test is present. @sneridagh [#6916](https://github.com/plone/volto/issues/6916)
- Moved auth helpers to the react-router package. @pnicolli [#7134](https://github.com/plone/volto/issues/7134)
- Adapt import to the rearrangement of the @plone/components package structure. @sneridagh [#7185](https://github.com/plone/volto/issues/7185)
- Upgrade to Storybook 9. @sneridagh [#7371](https://github.com/plone/volto/issues/7371)
- Remove circular dependency on layout<->blocks. @sneridagh [#7372](https://github.com/plone/volto/issues/7372)
- Adjust peer dependencies and engine. @sneridagh 

## 1.0.0 (unreleased)
