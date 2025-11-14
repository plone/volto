# @plone/client Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->

## 4.0.0-alpha.3 (2025-11-12)

### Bugfix

- Fixed `Icon` component return type since it was breaking in some builds. @sneridagh 

## 4.0.0-alpha.2 (2025-11-12)

### Feature

- Added ESlint Tailwind plugin for prettifying and wrapping up the classNames in components.
  Amended components classNames by applying the plugin. @sneridagh [#7434](https://github.com/plone/volto/issues/7434)
- Added `Radio` component to basic set of components, proxied from RAC. @sneridagh [#7555](https://github.com/plone/volto/issues/7555)
- Added RSC compatibility. @pnicolli 

### Bugfix

- Review and check CSS for "grouped fields". @sneridagh [#7469](https://github.com/plone/volto/issues/7469)

### Internal

- Fixed unused vars linting rule. Fixed all code that violated this rule. @sneridagh [#7395 copy](https://github.com/plone/volto/issues/7395 copy)
- Remove unused imports present, due to missing rule in ESlint. @sneridagh [#7395](https://github.com/plone/volto/issues/7395)
- Linting for remaining TW classNames under callees due to missconfiguration. @sneridagh [#7467](https://github.com/plone/volto/issues/7467)

## 4.0.0-alpha.1 (2025-09-29)

### Breaking

- Rearrangement of the package structure. @sneridagh

  BREAKING:
  - Renaming imports path from `tailwind` to `quanta`.
  - Rename all the Quanta components to have the `quanta` suffix. [#7185](https://github.com/plone/volto/issues/7185)
- - Unify `Breadcrumbs` component implementations, while removing the custom `BreadcrumbsPrimitive` implementation since it's no longer needed. @sneridagh [#7196](https://github.com/plone/volto/issues/7196)

### Feature

- Add react-aria-components Tree component integration. @deodorhunter [#4352](https://github.com/plone/volto/issues/4352)
- Added sitemap route. @ksuess [#6695](https://github.com/plone/volto/issues/6695)
- Add react-aria-components Tabs component. @ionlizarazu [#7127](https://github.com/plone/volto/issues/7127)
- Create DateTimePicker, DatePicker, TimeField and DateInput components. @rboixaderg [#7131](https://github.com/plone/volto/issues/7131)
- Added react-aria-components RadioGroup and Radio component. @sabrina-bongiovanni [#7142](https://github.com/plone/volto/issues/7142)
- Add react-aria-components Menu Popover and Dialog component. @ionlizarazu [#7144](https://github.com/plone/volto/issues/7144)
- Added SizeWidget, AlignWidget, and WidthWidget to the components library. @rboixaderg [#7150](https://github.com/plone/volto/issues/7150)
- Added quanta GridList and TagGroup, improved quanta styles. @deodorhunter [#7201](https://github.com/plone/volto/issues/7201)
- `Field` and `FieldWrapper` component for widgets that have no field wrapper by default. @sneridagh [#7213](https://github.com/plone/volto/issues/7213)
- Separated publicui and cmsui styles. @pnicolli [#7225](https://github.com/plone/volto/issues/7225)
- Unify `Container` components props. Added `width` prop to basic component. @sneridagh
  (Non-breaking change) [#7236](https://github.com/plone/volto/issues/7236)
- Added Toast manager. @giuliaghisini [#7333](https://github.com/plone/volto/issues/7333)

### Bugfix

- Minor storybook and props fixes. @deodorhunter [#4352](https://github.com/plone/volto/issues/4352)
- Fixed some prettier/lint issues. @sneridagh [#7346](https://github.com/plone/volto/issues/7346)

### Internal

- Rename `@plone/slots` to `@plone/layout`. @sneridagh [#7119](https://github.com/plone/volto/issues/7119)
- Removed `lightningcss` from the Storybook build. @sneridagh [#7220](https://github.com/plone/volto/issues/7220)
- Update to latest versions. @sneridagh [#7298](https://github.com/plone/volto/issues/7298)
- Update RAC to latest.
  Fix Storybook, added basic CSS. @sneridagh [#7320](https://github.com/plone/volto/issues/7320)
- Upgrade to Storybook 9. @sneridagh [#7371](https://github.com/plone/volto/issues/7371)
- Add `@testing-library/react` to the catalog. @sneridagh [#7372](https://github.com/plone/volto/issues/7372)

## 4.0.0-alpha.0 (2025-05-24)

### Breaking

- Rationalize and improve @plone/components icons handling. @sneridagh [#6779](https://github.com/plone/volto/issues/6779)
- Refactored and revamped `Icon` component. @sneridagh [#6946](https://github.com/plone/volto/issues/6946)

### Feature

- Add ArrayWidget with creatable support. @iFlameing [#6646](https://github.com/plone/volto/issues/6646)
- Add own Vite SVGR plugin proxy. @sneridagh [#6779](https://github.com/plone/volto/issues/6779)
- Added Tailwind components support. @sneridagh [#6795](https://github.com/plone/volto/issues/6795)
- Added `Container` Tailwind-based component. @sneridagh [#6899](https://github.com/plone/volto/issues/6899)
- 'Improved `Container` Tailwind component, added `width` variant. @sneridagh [#6927](https://github.com/plone/volto/issues/6927)
- Tailwind `Button` component. @sneridagh [#6946](https://github.com/plone/volto/issues/6946)
- Added Tailwind basic TextField component. @sneridagh [#6977](https://github.com/plone/volto/issues/6977)
- Added `Accordion` Tailwind component. @sneridagh [#7003](https://github.com/plone/volto/issues/7003)
- Improve `Button`, added missing variant and sizes. @sneridagh [#7003](https://github.com/plone/volto/issues/7003)
- Tailwind Link and Breadcrumbs components. @sneridagh [#7042](https://github.com/plone/volto/issues/7042)

### Bugfix

- Tailwind Accordion component icon fix. @sneridagh [#7040](https://github.com/plone/volto/issues/7040)

### Internal

- Use ESlint 9, fix code. @sneridagh [#6775](https://github.com/plone/volto/issues/6775)
- Update vitest packages to match the catalog. @sneridagh [#6777](https://github.com/plone/volto/issues/6777)
- The main CSS for the Tailwind components now is located in the `@plone/theming` package (`../../theming/styles/main.css`) but it does not have a direct dependency on it. Just use it from the monorepo. @sneridagh [#6899](https://github.com/plone/volto/issues/6899)
- Build the Tailwind components in `@plone/components/tailwind`. @sneridagh [#6899](https://github.com/plone/volto/issues/6899)
- Update `vitest` version to catalog. @sneridagh [#6916](https://github.com/plone/volto/issues/6916)
- Build Storybook in readthedocs.io @sneridagh [#6938](https://github.com/plone/volto/issues/6938)

### Documentation

- Added Storybook for `Container` Tailwind component. @sneridagh [#6928](https://github.com/plone/volto/issues/6928)
- Improve Storybook documentation, reorganize components. @sneridagh [#6940](https://github.com/plone/volto/issues/6940)

## 3.0.2 (2025-02-08)

### Internal

- Update Storybook version.
  Update Vite version. @sneridagh [#6640](https://github.com/plone/volto/issues/6640)
- Update internal `peerDependencies` to include React 19. @sneridagh [#6641](https://github.com/plone/volto/issues/6641)
- Test with Plone 6.1.0rc1. @sneridagh [#6682](https://github.com/plone/volto/issues/6682)
- Update dependencies versions. @sneridagh [#6728](https://github.com/plone/volto/issues/6728)

## 3.0.1 (2024-12-17)

### Bugfix

- Fixed precedence of the Quanta layer by adding a base layer for all the basic components. @sneridagh [#6539](https://github.com/plone/volto/issues/6539)

### Internal

- Update `@plone/components`'s URLs in its `package.json`. @stevepiercy [#6542](https://github.com/plone/volto/issues/6542)

## 3.0.0 (2024-12-12)

### Breaking

- All the styles use now the CSS layer `plone-components`. @sneridagh [#6409](https://github.com/plone/volto/issues/6409)
- Moved the `RenderBlocks` component to `@plone/blocks`. @sneridagh [#6409](https://github.com/plone/volto/issues/6409)

## 2.2.1 (2024-12-05)

### Bugfix

- Fix color picker usability. @sneridagh [#6512](https://github.com/plone/volto/issues/6512)

## 2.2.0 (2024-11-21)

### Feature

- Update RAC to 1.5.0 @sneridagh [#6498](https://github.com/plone/volto/issues/6498)

## 2.1.1 (2024-11-05)

### Internal

- Improve packaging and bring back the export for `src` folder. @sneridagh 

## 2.1.0 (2024-11-05)

### Internal

- Replace `parcel` with `tsup`. Better types, better tsconfig. Move to ESM. @sneridagh [#6467](https://github.com/plone/volto/issues/6467)

## 2.0.0 (2024-10-31)

### Internal

- Release 2.0.0 @sneridagh 

## 2.0.0-alpha.16 (2024-10-18)

### Breaking

- Removed the `FlattenToAppURLProvider` since it's no longer needed. @sneridagh
  The components in here need it.
  Refactored the `Link` component to not use it, since `react-aria-components` uses the React Client Routing facilities that can be injected into the React tree.

  Breaking:
    - Use the new providers in `@plone/providers` instead to make the new `Link` work with them. [#6069](https://github.com/plone/volto/issues/6069)

### Internal

- Update typescript and vitest everywhere @sneridagh [#6407](https://github.com/plone/volto/issues/6407)
- Adjust the path to perform a proper `git diff` between the cached and current commits to determine whether to build the Storybook for the components package on Netlify. @stevepiercy [#6410](https://github.com/plone/volto/issues/6410)

## 2.0.0-alpha.15 (2024-10-14)

### Bugfix

- Fix Select component logic to support `items` use case @sneridagh [#6405](https://github.com/plone/volto/issues/6405)

## 2.0.0-alpha.14 (2024-10-10)

### Bugfix

- Add missing export for new components @sneridagh [#6391](https://github.com/plone/volto/issues/6391)

## 2.0.0-alpha.13 (2024-10-08)

### Bugfix

- Fixed flattenToAppURL types @pnicolli @deodorhunter [#6382](https://github.com/plone/volto/issues/6382)

### Internal

- Update Vite and vitest versions @sneridagh [#6373](https://github.com/plone/volto/issues/6373)

## 2.0.0-alpha.12 (2024-10-03)

### Feature

- Update RAC to 1.4.0 - Added new `Disclosure` component and new Color widgets @sneridagh [#6364](https://github.com/plone/volto/issues/6364)

## 2.0.0-alpha.11 (2024-06-06)

### Bugfix

- Fix ignored classname in breadcrumbs RAC @gomez [#6018](https://github.com/plone/volto/issues/6018)
- Make css layer more specific @pnicolli [#6065](https://github.com/plone/volto/issues/6065)

## 2.0.0-alpha.10 (2024-05-30)

### Bugfix

- Fix `align-items: start` to make autoprefixer happy @sneridagh [#6062](https://github.com/plone/volto/issues/6062)

## 2.0.0-alpha.9 (2024-05-23)

### Feature

- Improved several components and styles @pnicolli [#6029](https://github.com/plone/volto/issues/6029)

## 2.0.0-alpha.8 (2024-05-13)

### Bugfix

- Update `vite` to 5.1.5. @davisagli [#5942](https://github.com/plone/volto/issues/5942)

### Internal

- Remove `parcel-optimizer-react-client` plugin @sneridagh [#5887](https://github.com/plone/volto/issues/5887)
- Upgrade Storybook to version 8. @sneridagh [#5912](https://github.com/plone/volto/issues/5912)
- Improvements to the monorepo setup with utilities, especially ESLint. Build cached option to speedup operations. @sneridagh [#5969](https://github.com/plone/volto/issues/5969)
- Saner defaults for building deps, switch default to cached, add `build:force` command @sneridagh [#5980](https://github.com/plone/volto/issues/5980)
- Update to RAC 1.2.0 @sneridagh [#6014](https://github.com/plone/volto/issues/6014)

## 2.0.0-alpha.7 (2024-03-14)

### Bugfix

- Missing CSS in build for `Container` @sneridagh [#5849](https://github.com/plone/volto/issues/5849)

### Internal

- Cleanup deps @sneridagh [#5846](https://github.com/plone/volto/issues/5846)

## 2.0.0-alpha.6 (2024-03-06)

### Breaking

- Refactor the `Container` component.
  The inference for the `as` prop is complete.
  Replace the internal `className` to be `q container` @sneridagh [#5848](https://github.com/plone/volto/issues/5848)

## 2.0.0-alpha.5 (2024-03-05)

### Bugfix

- Fix some case inconsistencies in CSS declarations @sneridagh [#5824](https://github.com/plone/volto/issues/5824)

## 2.0.0-alpha.4 (2024-03-02)

### Bugfix

- Remove `lodash` dependency.
  Several packages upgrades and general cleanup. @sneridagh [#5822](https://github.com/plone/volto/issues/5822)
- Proxy the `PopoverContext` inside the `Select` component, to be able to override it from the outside @sneridagh [#5823](https://github.com/plone/volto/issues/5823)

### Internal

- Update dependencies @sneridagh [#5815](https://github.com/plone/volto/issues/5815)

## 2.0.0-alpha.3 (2024-03-01)

### Breaking

- Use `pathname` instead of the full location as prop in `BlocksRenderer` @sneridagh [#5798](https://github.com/plone/volto/issues/5798)

### Bugfix

- Fix `lodash` imports for bundling @sneridagh [#5798](https://github.com/plone/volto/issues/5798)

## 2.0.0-alpha.2 (2024-02-23)

### Bugfix

- Move basic general CSS rules to StoryBook so we don't spoil the build @sneridagh [#5791](https://github.com/plone/volto/issues/5791)

### Internal

- Improve StoryBook look and feel @sneridagh [#5791](https://github.com/plone/volto/issues/5791)

## 2.0.0-alpha.1 (2024-02-18)

### Bugfix

- Add import path for bundled CSS @sneridagh [#5770](https://github.com/plone/volto/issues/5770)

## 2.0.0-alpha.0 (2024-02-17)

### Breaking

- Move to only CSS-based approach
  Removal of SCSS in favor of the above
  New Basic components, based in React Aria Components

  @sneridagh [#5766](https://github.com/plone/volto/issues/5766)

### Documentation

- Build the `volto/components` Storybook only when its source files change. @stevepiercy [#5601](https://github.com/plone/volto/issues/5601)

## 1.7.0 (2023-12-25)

### Feature

- Introduce support views - Add `RenderBlocks` view @sneridagh [#16](https://github.com/plone/volto/issues/16)
- Transfer `@plone/components` to the Volto monorepo @sneridagh [#5544](https://github.com/plone/volto/issues/5544)

### Bugfix

- Fixed some imports, build was failing @sneridagh [#5545](https://github.com/plone/volto/issues/5545)

### Internal

- ESlint general improvements @sneridagh [#5548](https://github.com/plone/volto/issues/5548)

## 1.6.0 (2023-11-12)

### Internal

- Update Textarea with new FieldError component @sneridagh [#15](https://github.com/plone/components/issues/15)

## 1.5.0 (2023-11-12)

### Feature

- Add Quanta icons as react components ready to use with the Icon component @sneridagh [#12](https://github.com/plone/components/issues/12)
- Basic `Select` component.
  Introduce new FieldError component.
  Other CSS fixes. @sneridagh [#14](https://github.com/plone/components/issues/14)

### Internal

- Update to `react-aria-components` RC. @sneridagh [#14](https://github.com/plone/components/issues/14)

## 1.4.1 (2023-11-01)

### Internal

- Fixed wrong pointer to the new d.ts file @sneridagh [#0](https://github.com/plone/components/issues/0)

## 1.4.0 (2023-11-01)

### Feature

- Add build process to the package, add the resultant build to the npm release @sneridagh [#11](https://github.com/plone/components/issues/11)

### Internal

- Update to latest @types/react @sneridagh [#10](https://github.com/plone/components/issues/10)

## 1.3.0 (2023-10-31)

### Feature

- New component: `Link`
  New provider: `FlattenToAppURLProvider`
  Based on the `react-aria-components` `Link` component
  It uses the new `FlattenToAppURLProvider` helper to flatten all the incoming URLs @sneridagh [#8](https://github.com/plone/components/issues/8)

## 1.2.0 (2023-10-28)

### Feature

- New component: Icon
  Styling for Breadcrumbs component.
  Improve the Breadcrumbs component internally. @sneridagh [#7](https://github.com/plone/components/issues/7)

## 1.1.0 (2023-10-24)

### Feature

- Breadcrumbs styling @sneridagh [#5](https://github.com/plone/components/issues/5)
- Color Palette @sneridagh
  Stories cleanup @sneridagh [#6](https://github.com/plone/components/issues/6)


## 1.0.1 (2023-10-20)

### Bugfix

- Cleanup @sneridagh [#2](https://github.com/plone/components/issues/2)


## 1.0.0 (2023-10-20)

### Feature

- Initial release @sneridagh
  Container component @sneridagh
  Input component @sneridagh [#1](https://github.com/plone/components/issues/1)
