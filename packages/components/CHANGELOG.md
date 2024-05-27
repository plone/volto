# @plone/client Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->

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
