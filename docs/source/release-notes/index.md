---
myst:
  html_meta:
    "description": "Volto Release Notes for the Plone content management system"
    "property=og:description": "Volto Release Notes for the Plone content management system"
    "property=og:title": "Volto Release Notes"
    "keywords": "Volto, Plone, frontend, Release Notes, change log, changelog, change history"
---

# Volto Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 18.0.0-alpha.42 (2024-07-30)

### Breaking

- Add foundations for extensible validation in forms. @sneridagh

  Breaking:
  `packages/volto/src/helpers/FormValidation/FormValidation.jsx` has been heavily refactored.
  If you shadowed this component in your project or add-on, you should review it and update it accordingly. [#6161](https://github.com/plone/volto/issues/6161)
- Remove `react-share` library and `SocialSharing` component @sneridagh [#6162](https://github.com/plone/volto/issues/6162)
- In the widget mapping, moved the `SchemaWidget` registration from the `id` object to the `widget` object, and added the `widget` key to the `schema` object in the `properties` object for `makeSchemaList`. @sneridagh [#6189](https://github.com/plone/volto/issues/6189)

### Bugfix

- Fixed UTC problems in `RecurrenceWidget`. @giuliaghisini [#5002](https://github.com/plone/volto/issues/5002)
- Do not send sorting information in the search block if no sort_on setting is configured @erral [#5338](https://github.com/plone/volto/issues/5338)
- Fixed pagination in search results by passing `pageSize` explicitly to all search API calls. @EshaanAgg [#5464](https://github.com/plone/volto/issues/5464)
- Fix the toolbar handler color for the homepage to match its "published" state. @sabrina-bongiovanni [#6126](https://github.com/plone/volto/issues/6126)
- Allow `ImageWidget` value to be an object and use the `@id` to get the value if present. 
  This is useful for fields that were using the `object_browser` widget previously to set values. @ichim-david [#6156](https://github.com/plone/volto/issues/6156)
- Persist data for the `backend-docker-start` Docker container in a Docker volume named `volto-backend-data`.
  This way the data is persisted between runs of the container.
  You can also delete the `data` volume to start fresh.
  @ichim-david [#6157](https://github.com/plone/volto/issues/6157)
- Improve CSS for the `SchemaWidget` widget. @robgietema @sneridagh [#6189](https://github.com/plone/volto/issues/6189)

### Internal

- Debounced searching for users and groups in the `User Group Membership` Control Panel. @pnicolli [#6153](https://github.com/plone/volto/issues/6153)
- Update the link in the PLIP issue template to the new Plone 6 Documentation PLIP page. @stevepiercy [#6175](https://github.com/plone/volto/issues/6175)
- Added Cypress test for field types in example content - @Tishasoumya-02 [#6217](https://github.com/plone/volto/issues/6217)

### Documentation

- Changed a few typos within documentation, README's and comments. @FritzHoing [#6109](https://github.com/plone/volto/issues/6109)
- Use relative links to ensure static files get copied during documentation build. @stevepiercy [#6174](https://github.com/plone/volto/issues/6174)
- Clean up upgrade guide for `react-share` library and `SocialSharing` component. @stevepiercy [#6175](https://github.com/plone/volto/issues/6175)
- Add references for contributing to latest and earlier versions of Volto. @stevepiercy [#6184](https://github.com/plone/volto/issues/6184)
- Improved i18n docs regarding new translated messages not being picked up by the i18n translation mechanism when added in shadowed components. @pnicolli [#6188](https://github.com/plone/volto/issues/6188)
- Add a label and minor grammar fixes to i18n documentation. @stevepiercy [#6192](https://github.com/plone/volto/issues/6192)
- Polish upgrade docs and news items for `SchemaWidget`. @stevepiercy [#6193](https://github.com/plone/volto/issues/6193)

## 18.0.0-alpha.41 (2024-07-05)

### Breaking

- Fixed image widget position and look and feel in sidebar. @ichim-david

  Breaking:
  - Updated the markup of the widget in the sidebar to render the widget on a single column bellow the label.
  - AddLink Pop-up of the widget is now rendered inside `toolbar-inner` instead of the document body, this fixes the positioning of the toolbar when scrolling. [#6159](https://github.com/plone/volto/issues/6159)

### Bugfix

- Revisit login/logout process, better catching of edge cases @sneridagh [#6155](https://github.com/plone/volto/issues/6155)
- Restored browse link in `Slate` `AddLink` Pop-up. @ichim-david
  Fixed recursive error when uploading an image using the `Image` widget. @sneridagh
  Fixed image display when using an external URL. @sneridagh
  Fixed the position of the `Image` widget toolbar when scrolling by changing the position of the toolbar to be within the widget area instead of the body. @ichim-david
  Improved display of `AddLink` Pop-up when using it inside the `Image` widget where we don't have a link picker. @ichim-david [#6159](https://github.com/plone/volto/issues/6159)

## 18.0.0-alpha.40 (2024-07-03)

### Bugfix

- Fix aria-label of items that are `folderish` in ObjectBrowserNav component when performing item search. Previously it said `Select item.title` now `Browse item.title`. This brings it in line with the aria-label when not performing an item search. @sneridagh [#6150](https://github.com/plone/volto/issues/6150)

### Internal

- Automatically add a PLIP issue to the PLIP project board. @stevepiercy [#6134](https://github.com/plone/volto/issues/6134)

### Documentation

- Fix link to renamed `src/constants/Languages.cjs`. @stevepiercy [#6135](https://github.com/plone/volto/issues/6135)

## 18.0.0-alpha.39 (2024-06-28)

### Bugfix

- Cleanup Image widget and pass down onSelectItem prop if any @sneridagh [#6132](https://github.com/plone/volto/issues/6132)
- Whitelist some dynamic imports to suppress vite warnings in storybook @tomschall [#6133](https://github.com/plone/volto/issues/6133)

## 18.0.0-alpha.38 (2024-06-28)

### Internal

- Renamed `constants/Languages.js` to `constants/Languages.cjs` @sneridagh [#6130](https://github.com/plone/volto/issues/6130)

## 18.0.0-alpha.37 (2024-06-27)

### Feature

- (feat): Add loading visual and succes message in controlpanel when deleting users and groups @dobri1408 [#6127](https://github.com/plone/volto/issues/6127)

### Bugfix

- fix reset teaser source button giving undefined error when no target is selected @nileshgulia1 [#6121](https://github.com/plone/volto/issues/6121)
- Added three missing German translations. [@jensens] [#6124](https://github.com/plone/volto/issues/6124)

### Internal

- Improved the existing GitHub workflows by encapsulating a common operation into a reusable action for easier maintenance. @FritzHoing, @ichim-david [#6108](https://github.com/plone/volto/issues/6108)
- Upgrade `react-intl` to maximum 3.x series to fix a bundling issue.
  Rename missing js file that must be jsx. @sneridagh [#6128](https://github.com/plone/volto/issues/6128)

## 18.0.0-alpha.36 (2024-06-26)

### Breaking

- Added `ImageWidget` component with upload, drop, external, and inline capabilities. @sneridagh @ichim-david @dobri1408

  Breaking:

  The user experience of the image upload has changed.
  The input field is now a row of buttons.
  The input field's placeholder text was moved above the buttons.
  Together these changes improve usability both on small screens and in small containers, such as when the widget is in grid block elements.
  If you shadow the image block edit component, make sure it continues to work as you expect, or update it to use the new image upload widget component. [#5607](https://github.com/plone/volto/issues/5607)

### Feature

- Add option for live teasers @steffenri @pbauer @nileshgulia1 @tlotze [#6023](https://github.com/plone/volto/issues/6023)
- Improve shadowing by including the support for js->jsx extensions in old shadows. This allow support for upcoming renaming of files that should be jsx and are js. @sneridagh [#6113](https://github.com/plone/volto/issues/6113)

### Bugfix

- Ensure that sidebar field will not steal focus when metadata is edited  @dobri1408 [#5983](https://github.com/plone/volto/issues/5983)
- Fixed 'diff' path for nonContentRoutes. @giuliaghisini [#6102](https://github.com/plone/volto/issues/6102)
- Prevent duplicated UUIDs in inner blocks when copying container blocks @sneridagh [#6112](https://github.com/plone/volto/issues/6112)

### Internal

- Rename the `Makefile` commands to unify them with the new agreed naming scheme. @sneridagh [#6104](https://github.com/plone/volto/issues/6104)
- Remove `api` folder. Add `backend` folder using latest backend best practices. @sneridagh [#6110](https://github.com/plone/volto/issues/6110)
- Rename files with wrong extension `js->jsx` when they contain JSX. @sneridagh [#6114](https://github.com/plone/volto/issues/6114)
- Automatically set a new issue's label to `03 type: feature (plip)` for PLIPs. @stevepiercy [#6122](https://github.com/plone/volto/issues/6122)

## 18.0.0-alpha.35 (2024-06-13)

### Breaking

- Improve container detection, `config.settings.containerBlockTypes` is no longer needed @sneridagh [#6099](https://github.com/plone/volto/issues/6099)

### Bugfix

- Support nested directories in public folder add-on sync folders both in dev and build mode @sneridagh [#6098](https://github.com/plone/volto/issues/6098)
- export getFieldURL from Url.js in helpers  @dobri1408 [#6100](https://github.com/plone/volto/issues/6100)

## 18.0.0-alpha.34 (2024-06-13)

### Feature

- Added blocks layout navigator @robgietema @sneridagh [#5642](https://github.com/plone/volto/issues/5642)
- Add support for reading the add-ons `tsconfig.json` paths and add them to the build resolve aliases @sneridagh [#6096](https://github.com/plone/volto/issues/6096)

### Bugfix

- Fix internalUrl Widget to Reflect Prop Changes via onChangeBlock @dorbi1408 @ichim-david [#6036](https://github.com/plone/volto/issues/6036)
- Add default 'l' and 'center' values to size and align fields of `Image` block.
  This fixes data not having any value adding proper options to the `Image` block. @ichim-david [#6046](https://github.com/plone/volto/issues/6046)
- Fix public folder in dev mode, now it starts by default with the default Volto core defined public files @sneridagh [#6081](https://github.com/plone/volto/issues/6081)
- Fix link in pop-up in `RelationsMatrix.jsx`. @stevepiercy [#6085](https://github.com/plone/volto/issues/6085)
- Fix Uncaught RangeError: date value is not finite in DateTimeFormat.format.  @mauritsvanrees [#6087](https://github.com/plone/volto/issues/6087)
- relations control panel. Restrict eglible relation targets according relation constraints of fields vocabulary. @ksuess [#6091](https://github.com/plone/volto/issues/6091)
- Better `Icon` component JSDoc typings @sneridagh [#6095](https://github.com/plone/volto/issues/6095)

## 18.0.0-alpha.33 (2024-06-06)

### Breaking

- Fix JavaScript events association on error pages. Also remove settings `config.settings.serverConfig.extractScripts.errorPages`. Now scripts are added to error pages, regardless of whether we are in production mode or not. @wesleybl [#6048](https://github.com/plone/volto/issues/6048)
- Breaking from the original slots implementation:
  Now `config.getSlots` in the configuration registry takes the argument `location` instead of `pathname`.
  This allows to have more expressive conditions, and fulfill the use case of the `Add` form.
  @sneridagh [#6063](https://github.com/plone/volto/issues/6063)

### Feature

- Added object browser icon view @robgietema [#5279](https://github.com/plone/volto/issues/5279)
- Refactor TextWidget. @Tishasoumya-02 [#6020](https://github.com/plone/volto/issues/6020)
- Refactor IdWidget -@Tishasoumya-02 [#6027](https://github.com/plone/volto/issues/6027)
- The `ContentTypeCondition` now supports the `Add` form, and detects when you create a content type that is set in the condition. @sneridagh
  Added a new `BodyClass` helper while adding a new content type of the form `is-adding-contenttype-mycontenttype`. @sneridagh [#6063](https://github.com/plone/volto/issues/6063)
- Add support for configurable `public` directory defined per add-on. @sneridagh [#6072](https://github.com/plone/volto/issues/6072)

### Bugfix

- Fix block chooser search is not focusable when clicked on add button @iRohitSingh [#5866](https://github.com/plone/volto/issues/5866)
- Fixed skiplink links not tracking focus correctly @JeffersonBledsoe [#5959](https://github.com/plone/volto/issues/5959)
- Remove left and right padding from _Event > Edit recurrence > Repeat on_ buttons when repeating for weekly or yearly events for big fonts, preventing overflow. @sabrina-bongiovanni [#6070](https://github.com/plone/volto/issues/6070)

### Internal

- Fix test script in monorepo root @sneridagh [#6051](https://github.com/plone/volto/issues/6051)

## 18.0.0-alpha.32 (2024-05-23)

### Feature

- Removes navigation settings that are not used by Volto. @wesleybl [#5961](https://github.com/plone/volto/issues/5961)
- Add Hindi translation in Volto. @iFlameing [#6015](https://github.com/plone/volto/issues/6015)

### Bugfix

- Return a redirect response from Volto server-side rendering if the API request was redirected. @JeffersonBledsoe @mamico [#4834](https://github.com/plone/volto/issues/4834)
- Fixed separator edit class spilling outside of the block toolbar @JeffersonBledsoe [#6010](https://github.com/plone/volto/issues/6010)
- Fix duplication of execution of the build dependencies script on start @sneridagh [#6022](https://github.com/plone/volto/issues/6022)
- In the EditBlockWrapper, pass the `showRestricted` prop to the BlockChooserButton. @JeffersonBledsoe [#6026](https://github.com/plone/volto/issues/6026)
- Replace relative Import Path with Alias Import in 'Form.jsx' @MAX-786 [#6040](https://github.com/plone/volto/issues/6040)
- Allow X-Robots-Tag header in images/files middleware @sneridagh [#6043](https://github.com/plone/volto/issues/6043)

### Internal

- Use pnpm corepack instead of installing it in CI @sneridagh [#6038](https://github.com/plone/volto/issues/6038)
- Add client and providers to the SSR externals list @sneridagh [#6045](https://github.com/plone/volto/issues/6045)

### Documentation

- Use Plone Sphinx Theme. Migrate from Netlify to Read the Docs for pull request preview builds. @stevepiercy [#6030](https://github.com/plone/volto/issues/6030)
- Build documentation and Storybook only when their files change. @stevepiercy [#6037](https://github.com/plone/volto/issues/6037)

## 18.0.0-alpha.31 (2024-05-15)

### Bugfix

- Replaced the spinner with a progress bar that shows the number of files being uploaded (Uploading x files out of y), and positioned the progress bar properly, while uploading a large number of files. @victorchrollo14 [#5620](https://github.com/plone/volto/issues/5620)
- Disable `jsx-a11y/label-has-associated-control` so that we can use `eslint-plugin-jsx-a11y` version 6.8.0 if it's pulled by other dependencies. @ichim-david [#5785](https://github.com/plone/volto/issues/5785)
- Fix some type definitions in JSDocs @sneridagh [#6014](https://github.com/plone/volto/issues/6014)
- Use `pnpm` 9.1.1 @sneridagh
  Remove `postinstall` script for building dependencies @sneridagh [#6017](https://github.com/plone/volto/issues/6017)

### Internal

- Allow `Makefile` options to be modified by a `Makefile.local` file if present. @ichim-david [#5997](https://github.com/plone/volto/issues/5997)
- Modified `locking` and `block-listing` cypress tests 
  to use more `assertions` instead of wait times in order to improve
  the reliability of the tests. @ichim-david [#5998](https://github.com/plone/volto/issues/5998)

### Documentation

- Add sphinx-examples extension, update examples, align docs requirements with main documentation, and fix JSON example in upgrade guide. @stevepiercy [#6011](https://github.com/plone/volto/issues/6011)

## 18.0.0-alpha.30 (2024-05-02)

### Bugfix

- Fix image disappears after pressing the Enter key on title field in image content-type. @iFlameing [#5973](https://github.com/plone/volto/issues/5973)
- Defines the last 4 parameters of the `asyncConnect` function with optional. @wesleybl [#5985](https://github.com/plone/volto/issues/5985)
- Fix server side sidebar rendering @sneridagh [#5993](https://github.com/plone/volto/issues/5993)

### Internal

- Update to use Plone 6.0.11 @sneridagh [#5989](https://github.com/plone/volto/issues/5989)
- Flexibilize the pins for all ESlint deps, in Volto and generators @sneridagh [#5991](https://github.com/plone/volto/issues/5991)
- Cleaned up useless injectIntl in DefaultView @pnicolli [#5994](https://github.com/plone/volto/issues/5994)

## 18.0.0-alpha.29 (2024-04-26)

### Feature

- Add Vite (client only, no SSR) build. Update Next.js 14.2.2 and Remix to 2.8.0 @sneridagh [#5970](https://github.com/plone/volto/issues/5970)

### Bugfix

- Add possibility to pass down `locale`, `messages` and `defaultLocale` properties inside the `customStore` object to `IntlProvider`. With this change we can control react-intl language provider from inside storybook and switch for example from english to german with storybook args. [#5976](https://github.com/plone/volto/issues/5976)
- Fix no router link in logo @sneridagh [#5981](https://github.com/plone/volto/issues/5981)

## 18.0.0-alpha.28 (2024-04-23)

### Bugfix

- Fix broken user portrait in personal tools menu. @davisagli [#2927](https://github.com/plone/volto/issues/2927)
- Fix pt_BR translation of invalid email message. @wesleybl [#5953](https://github.com/plone/volto/issues/5953)
- Fixed rendering if ConditionalLink has no children @pnicolli [#5963](https://github.com/plone/volto/issues/5963)
- Fix flaky test 'As editor I can add links' by using getSlateEditorAndType. @ksuess [#5965](https://github.com/plone/volto/issues/5965)

### Internal

- Reduced JavaScript bundle size of the production build. Code split several internal modules: Controlpanels, Form, Widgets among other small ones. @pnicolli @deodorhunter [#5295](https://github.com/plone/volto/issues/5295)
- Improvements to the monorepo setup with utilities, especially ESLint. Build cached option to speedup operations. @sneridagh [#5969](https://github.com/plone/volto/issues/5969)

### Documentation

- Put nvm installation section into a separate include file. @animus888 [#5968](https://github.com/plone/volto/issues/5968)

## 18.0.0-alpha.27 (2024-04-05)

### Bugfix

- Enhanced navigation reducer in Volto to keep items extra-data sent from the navigation endpoint @Hrittik20 [#5772](https://github.com/plone/volto/issues/5772)
- Improve `ColorPickerWidget` typings @sneridagh [#5948](https://github.com/plone/volto/issues/5948)

## 18.0.0-alpha.26 (2024-04-03)

### Breaking

- Use `id` instead of `title` for the fieldset's generated value when rendering a `Field` component in a form. @sneridagh [#5921](https://github.com/plone/volto/issues/5921)

### Feature

- Add parameters to `ContentsUploadModal` to be reusable in different scenarios. @erral [#5881](https://github.com/plone/volto/issues/5881)
- Print error message from request in toast, if `clipboardRequest` return an error. @cekk [#5932](https://github.com/plone/volto/issues/5932)

### Bugfix

- Fix edge case in search options mangling when the options are false-ish sneridagh [#5869](https://github.com/plone/volto/issues/5869)
- Does not show borders in addon block inputs. @wesleybl [#5894](https://github.com/plone/volto/issues/5894)
- Fix `error is null` in `FormFieldWrapper.jsx`.  @mauritsvanrees [#5919](https://github.com/plone/volto/issues/5919)
- Updated Italian locales file `volto.po` with translation for "yes" from "si" to "sì". @yurj [#5924](https://github.com/plone/volto/issues/5924)
- Fix self-registration form. @davisagli [#5935](https://github.com/plone/volto/issues/5935)

### Internal

- Changed relative path to absolute in `DefaultView.jsx` for the `RenderBlocks` component to make it easier to customize. @agan-k [#5917](https://github.com/plone/volto/issues/5917)
- Fix cypress test "As editor, I can unlock a locked page". @wesleybl [#5933](https://github.com/plone/volto/issues/5933)
- Fix cypress test "Navigate to different pages on two different listings". @ichim-david [#5934](https://github.com/plone/volto/issues/5934)
- Add a new label `needs: triage` to new bug reports. @stevepiercy [#5940](https://github.com/plone/volto/issues/5940)

### Documentation

- Add missing step in Storybook 6 to 8 migration. @sneridagh [#5913](https://github.com/plone/volto/issues/5913)
- Fix redirect of `https://sustainability.eionet.europa.eu` to `https://www.eea.europa.eu/en/topics/at-a-glance/sustainability/`. @stevepiercy [#5941](https://github.com/plone/volto/issues/5941)
- Cleanup obsolete EEA projects from README and update info about EEA main website. @avoinea [#5943](https://github.com/plone/volto/issues/5943)

## 18.0.0-alpha.25 (2024-03-24)

### Internal

- Remove dangling unused lines in StoryBook config @sneridagh [#5911](https://github.com/plone/volto/issues/5911)
- Upgrade Storybook to version 8. @sneridagh [#5912](https://github.com/plone/volto/issues/5912)

### Documentation

- Update information about Quanta plans. [@jensens] [#5903](https://github.com/plone/volto/issues/5903)

## 18.0.0-alpha.24 (2024-03-23)

### Feature

- Add id attribute to discussions container and individual comments [@ericof] [#5904](https://github.com/plone/volto/issues/5904)

### Internal

- Move `testing-library` Cypress commands import to inner commands, so it can be imported from the outside. @sneridagh [#5906](https://github.com/plone/volto/issues/5906)
- Add new cypress helper for slate `getSlateEditorAndType` @sneridagh [#5909](https://github.com/plone/volto/issues/5909)
- Upgrade @typescript-eslint @sneridagh [#5910](https://github.com/plone/volto/issues/5910)

## 18.0.0-alpha.23 (2024-03-21)

### Feature

- Improve the usage of `RAZZLE_JEST_CONFIG`. @sneridagh [#5901](https://github.com/plone/volto/issues/5901)

### Documentation

- Updated testing and code quality with information on how to contribute to Volto core. @ichim-david [#5341](https://github.com/plone/volto/issues/5341)

## 18.0.0-alpha.22 (2024-03-19)

### Bugfix

- Correctly sort facet values if they are numbers @erral [#5864](https://github.com/plone/volto/issues/5864)
- Cross-package manager Volto path resolver in `webpack-relative-resolver` @sneridagh [#5893](https://github.com/plone/volto/issues/5893)

### Documentation

- `Volto 18.0.0-alpha.21` and `volto-update-deps` documentation @sneridagh [#5892](https://github.com/plone/volto/issues/5892)

## 18.0.0-alpha.21 (2024-03-18)

### Breaking

- Moved `devDependencies` and `dependencies` to where they belong. @sneridagh [#5879](https://github.com/plone/volto/issues/5879)

### Feature

- Match props passed to the BlockView if reused from the BlockEdit @sneridagh [#5876](https://github.com/plone/volto/issues/5876)
- Added download link to filename in file widget @sabrina-bongiovanni [#5880](https://github.com/plone/volto/issues/5880)

### Internal

- Bump all the versions in GitHub workflows. @stevepiercy [#5873](https://github.com/plone/volto/issues/5873)

### Documentation

- Update `volto-slate` configuration documentation to indicate it is now part of Volto core. @MostafaMagdyy [#5342](https://github.com/plone/volto/issues/5342)
- Modified `slate.useLinkedHeadings` documentation to mention feature is disabled for authenticated users after #5225 changes. @ichim-david [#5885](https://github.com/plone/volto/issues/5885)

## 18.0.0-alpha.20 (2024-03-14)

### Bugfix

- Add BBB code for removed WysiwygWidget @sneridagh [#5874](https://github.com/plone/volto/issues/5874)

## 18.0.0-alpha.19 (2024-03-14)

### Breaking

- Remove legacy `text`, `table` and `hero` blocks based in `draftJS` @sneridagh [#5846](https://github.com/plone/volto/issues/5846)

### Feature

- Do not display options for Site Administrator to create, modify, or delete Manager users. @wesleybl [#5244](https://github.com/plone/volto/issues/5244)

### Bugfix

- (fix):  make search block sort and facets work on edit @dobri1408 [#5262](https://github.com/plone/volto/issues/5262)
- Upgrade `@typescript-eslint` version @sneridagh [#5844](https://github.com/plone/volto/issues/5844)
- Fix the introduction of a mutable (referenced) object when assigning the default inner `blocksConfig` object for the `grid` block, pass by value instead. sneridagh [#5850](https://github.com/plone/volto/issues/5850)
- Fix other occurrences of mutable (referenced) objects when assigning the default inner `blocksConfig` object for the `grid` block, pass by value instead. sneridagh [#5859](https://github.com/plone/volto/issues/5859)

### Internal

- Upgrade versions of Cypress @sneridagh [#5845](https://github.com/plone/volto/issues/5845)

### Documentation

- Update link to cssnano documentation. @stevepiercy [#5853](https://github.com/plone/volto/issues/5853)
- Update docs for the `defaultBlockType` setting. @davisagli [#5854](https://github.com/plone/volto/issues/5854)
- The proper name is Semantic UI. @stevepiercy [#5855](https://github.com/plone/volto/issues/5855)
- Add missing nextjs install step. @gomez [#5857](https://github.com/plone/volto/issues/5857)
- Add reference to Docker installation for some Linux distributions. @stevepiercy [#5861](https://github.com/plone/volto/issues/5861)
- Fix broken link to TanStack Query. @stevepiercy [#5871](https://github.com/plone/volto/issues/5871)

## 18.0.0-alpha.18 (2024-03-05)

### Bugfix

- Fix translation error message. @robgietema [#5835](https://github.com/plone/volto/issues/5835)
- Pass down content, pathname and navRoot to the `SlotComponent` for convenience @sneridagh [#5841](https://github.com/plone/volto/issues/5841)
- Fix `setMetadataFocus` so it does not break if the element to be focused is not an `input` @sneridagh [#5843](https://github.com/plone/volto/issues/5843)

### Internal

- Add new readmes to CI. @stevepiercy [#5837](https://github.com/plone/volto/issues/5837)

### Documentation

- Fix linkcheckbroken of `README.md` at the source of the file. @stevepiercy [#5834](https://github.com/plone/volto/issues/5834)

## 18.0.0-alpha.17 (2024-03-05)

### Bugfix

- Show validation error message as string instead of list. @wesleybl [#1868](https://github.com/plone/volto/issues/1868)
- Removed css from `contents.less` that made the Contents table break words in tiny sections due to small table headers such as `ID` or `UID`.  @ichim.david [#5742](https://github.com/plone/volto/issues/5742)
- Fix Link to Item and Aliases view not updating content in multilingual site. @iFlameing [#5820](https://github.com/plone/volto/issues/5820)
- Modified build-deps make command to check if registry files are newer than dist to force rebuild. @ichim-david [#5825](https://github.com/plone/volto/issues/5825)
- Reset global Form state onSubmit and onCancel in Add and Edit forms @sneridagh [#5827](https://github.com/plone/volto/issues/5827)
- Fix HMR problems, upgrade react-refresh and @pmmmwh/react-refresh-webpack-plugin to latest @sneridagh [#5833](https://github.com/plone/volto/issues/5833)

### Internal

- Uses Plone 6.0.10.1 in tests. @wesleybl [#5830](https://github.com/plone/volto/issues/5830)

### Documentation

- Improve wayfinding for various Volto audiences. @stevepiercy [#5730](https://github.com/plone/volto/issues/5730)

## 18.0.0-alpha.16 (2024-03-02)

### Internal

- Update dependencies
  Fix prettier due to new version @sneridagh [#5815](https://github.com/plone/volto/issues/5815)

### Documentation

- Linkcheck thinks `README.md` is `http://README.md`. Bad linkcheck, no more 🍺 for you. @stevepiercy [#5816](https://github.com/plone/volto/issues/5816)

## 18.0.0-alpha.15 (2024-03-01)

### Breaking

- Upgrade Volto core to use React 18.2.0 @sneridagh [#3221](https://github.com/plone/volto/issues/3221)

## 18.0.0-alpha.14 (2024-03-01)

### Breaking

- Improved accessibility of logo component. @Molochem [#5776](https://github.com/plone/volto/issues/5776)

### Feature

- Support for slots @sneridagh [#5775](https://github.com/plone/volto/issues/5775)

### Bugfix

- Fixed toolbar menus not closing when clicking again on the toolbar buttons that show menus. @ichim-david
  Add focus-visible rule to toolbar buttons so that it's visible to the user what button is focused when using tab navigation @ichim-david [#5645](https://github.com/plone/volto/issues/5645)
- Enhance findBlocks to check for blocks also in data for add-ons such as @eeacms/volto-tabs-block. @ichim-david [#5796](https://github.com/plone/volto/issues/5796)
- Fixed ArrayWidget sorting items. @giuliaghisini [#5805](https://github.com/plone/volto/issues/5805)

### Internal

- New types declarations with @types/react@18 - make tsc happy @sneridagh [#5814](https://github.com/plone/volto/issues/5814)

### Documentation

- Added Release Management Notes. @sneridagh @stevepiercy [#5358](https://github.com/plone/volto/issues/5358)
- Delete redundant `developing-a-project.md`. @stevepiercy [#5675](https://github.com/plone/volto/issues/5675)
- Removed Memori and TwinCreator websites from `README.md` no longer made using Volto and giving 404 error. @ichim-david [#5802](https://github.com/plone/volto/issues/5802)

## 18.0.0-alpha.13 (2024-02-22)

### Bugfix

- Fix sidebar form update. @robgietema [#5779](https://github.com/plone/volto/issues/5779)

## 18.0.0-alpha.12 (2024-02-21)

### Feature

- Add accordion to metadata form. @robgietema [#5760](https://github.com/plone/volto/issues/5760)

## 18.0.0-alpha.11 (2024-02-18)

### Breaking

- Remove the isDisabled from all fields in the left side form of the babel view, make them read only instead @sneridagh [#5762](https://github.com/plone/volto/issues/5762)

### Feature

- Added the `ignore` property to allow exceptions to rules that are applied to all routes. @dobri1408 [#5621](https://github.com/plone/volto/issues/5621)
- Add global form state. @robgietema [#5721](https://github.com/plone/volto/issues/5721)

### Bugfix

- Fixed listing SSR rendering by sending `subrequestId` instead of `id` only within `getAsyncData`, similar to calling `getQueryStringResults` directly. @ichim-david [#5688](https://github.com/plone/volto/issues/5688)
- Enhanced Makefile paths to address whitespace compatibility issues. @Vivek-04022001 [#5715](https://github.com/plone/volto/issues/5715)
- Fix console logging in acceptance server Makefile commands. @davisagli [#5748](https://github.com/plone/volto/issues/5748)
- Add extra wait calls to listing block tests to avoid sporadic failures. @ichim-david [#5753](https://github.com/plone/volto/issues/5753)
- Add @plone/components as external library.
  Make the Terser plugin accept ESNext features.
  Fix inline `svg` elements in LESS files. @sneridagh [#5766](https://github.com/plone/volto/issues/5766)

### Documentation

- Overhaul environment variables documentation. @stevepiercy [#4581](https://github.com/plone/volto/issues/4581)
- Reorganize `README.md`, merging content into authoritative locations. Add `awesome_bot` to check links in all READMEs. @stevepiercy [#5437](https://github.com/plone/volto/issues/5437)
- Replace outdated diff with a link to current file. @stevepiercy [#5703](https://github.com/plone/volto/issues/5703)
- Document when the 'links and references' view was added. @davisagli [#5756](https://github.com/plone/volto/issues/5756)
- Update links to Redux and React developer extensions for Chrome. @stevepiercy [#5757](https://github.com/plone/volto/issues/5757)
- Chromewebstore recently changed its URL and has "too many redirects", so it needs to be excluded from linkcheck. @stevepiercy [#5761](https://github.com/plone/volto/issues/5761)
- Add Git as a pre-requisite. @stevepiercy [#5769](https://github.com/plone/volto/issues/5769)

## 18.0.0-alpha.10 (2024-02-02)

### Feature

- Allow editor to edit metadata during bulk upload. @iFlameing [#5549](https://github.com/plone/volto/issues/5549)
- Added `aria-live="polite"` in `Contents.jsx` to improve accessibility for the Contents page. @Hrittik20 [#5617](https://github.com/plone/volto/issues/5617)
- Support for passing whole data object of the initial blocks in local config. Refactor initial block type to its own helpers. @sneridagh [#5718](https://github.com/plone/volto/issues/5718)

### Bugfix

- Fixed wrong conditional proprieties on `ObjectBrowser` for multiple selection. @deodorhunter @Wagner3UB [#4190](https://github.com/plone/volto/issues/4190)
- Remove turbo from monorepo commands until it's really necessary @sneridagh [#5715](https://github.com/plone/volto/issues/5715)

### Documentation

- Block search engines from indexing content on Netlify preview builds. @stevepiercy [#5725](https://github.com/plone/volto/issues/5725)

## 18.0.0-alpha.9 (2024-01-26)

### Feature

- Improve validation of IdWidget @tedw [#3716](https://github.com/plone/volto/issues/3716)

### Bugfix

- Removed unmaintained and unused razzle-plugin-bundle-analyze in favor of webpack-bundle-analyzer. @ichim-david
  Updated extending Razzle from an add-on section to remove code that didn't belong to that recipe. @ichim-david [#5671](https://github.com/plone/volto/issues/5671)

### Internal

- Upgade `semantic-ui-react` to latest version (2.1.5) @sneridagh [#5632](https://github.com/plone/volto/issues/5632)

### Documentation

- Fixed redirect of `https://tanstack.com/query/v4/docs/react/guides/ssr` to `https://tanstack.com/query/v4/docs/framework/react/guides/ssr`. @stevepiercy [#5700](https://github.com/plone/volto/issues/5700)

## 18.0.0-alpha.8 (2024-01-25)

### Feature

- Add image preview in object browser widget. @robgietema [#5658](https://github.com/plone/volto/issues/5658)

### Bugfix

- Fix multilingual redirector where it doesn't take into account the stored cookie in SSR. @robgietema [#5628](https://github.com/plone/volto/issues/5628)
- Fix blocks chooser index and add a bit of breath to the left in the search input @sneridagh [#5647](https://github.com/plone/volto/issues/5647)
- Fix `links-to-item` should be a protected route. @iFlameing [#5666](https://github.com/plone/volto/issues/5666)
- Removed git merge conflicts from french volto.po locale file. @ichim-david [#5681](https://github.com/plone/volto/issues/5681)

### Documentation

- Clarify how to create a Volto project with the frontend only when you have your own existing backend. @stevepiercy [#3723](https://github.com/plone/volto/issues/3723)
- Enabled hyperlinking from narrative documentation to Storybook entries while developing, in Netlify preview builds, and when deployed to the main production Plone documentation. Documented usage and syntax in {ref}`link-to-storybook-entries-from-documentation`. @stevepiercy [#5599](https://github.com/plone/volto/issues/5599)
- Update cross-reference to main documentation from `install-from-packages` to `create-project`. @stevepiercy [#5654](https://github.com/plone/volto/issues/5654)
- Temporarily pin `sphinxcontrib-*help` dependencies so documentation can build. @stevepiercy [#5655](https://github.com/plone/volto/issues/5655)
- Pin Vale to 2.30.0 to allow build of documentation until we can upgrade to v3.x. @stevepiercy [#5656](https://github.com/plone/volto/issues/5656)
- Use correct Pygments lexer for SCSS. @stevepiercy [#5673](https://github.com/plone/volto/issues/5673)
- Fixed a broken reference to create a project in documentation. @stevepiercy [#5692](https://github.com/plone/volto/issues/5692)
- Align the project names in "Create a Volto project without a backend". @stevepiercy [#5694](https://github.com/plone/volto/issues/5694)

## 18.0.0-alpha.7 (2024-01-17)

### Feature

- Enhanced `ColorPickerWidget` with additional color definitions, saving it as an object instead of a string. @sneridagh [#5585](https://github.com/plone/volto/issues/5585)
- Allow to opt out of the nested prefixed name build in the custom CSS properties style name generator if an object is found in the style wrapper object. @sneridagh [#5586](https://github.com/plone/volto/issues/5586)

### Bugfix

- In the recurrence widget, set the vertical alignment of the `edit` button to `middle`. @Ravi-kumar9347 [#5359](https://github.com/plone/volto/issues/5359)
- Improve generation of type declarations. Fixes some key types propagation. @sneridagh [#5624](https://github.com/plone/volto/issues/5624)
- Unify start command, trigger `build:deps` command @sneridagh [#5633](https://github.com/plone/volto/issues/5633)
- Merge the StyleWrapper styles with the draggable props from b-D&D. @sneridagh
  This fixes the D&D bug introduced in https://github.com/plone/volto/pull/5581 [#5652](https://github.com/plone/volto/issues/5652)

### Internal

- Add cypress tests for the "links-to-item" view of content items @jackahl [#5427](https://github.com/plone/volto/issues/5427)
- Polish po file handling @erral [#5542](https://github.com/plone/volto/issues/5542)
- Unify variables in `Makefile`s. @sneridagh [#5637](https://github.com/plone/volto/issues/5637)

### Documentation

- Clarified how CSS properties work. @stevepiercy [#5591](https://github.com/plone/volto/issues/5591)

## 18.0.0-alpha.6 (2024-01-02)

### Feature

- Added support for custom CSS properties in the `StyleWrapper`. @sneridagh [#5581](https://github.com/plone/volto/issues/5581)

### Bugfix

- Use a textarea in the form for editing an existing comment. @Ravi-kumar9347 [#5265](https://github.com/plone/volto/issues/5265)
- The hamburger icon to open the mobile/tablet navigation is now hidden if there are no navigation items. @Aarav238 [#5353](https://github.com/plone/volto/issues/5353)
- Fix preview image component @steffenri [#5379](https://github.com/plone/volto/issues/5379)
- Fix autopopulated value of facet when settings the value for another one. @iFlameing [#5432](https://github.com/plone/volto/issues/5432)
- Fix sitemap for multilingual sites
  [erral] [#5501](https://github.com/plone/volto/issues/5501)
- Replace createRef with useRef in SidebarPopup
  [razvanMiu] [#5519](https://github.com/plone/volto/issues/5519)
- Fixed the project generator's ESLint configuration, added code quality checks to the CI to ensure a generated project can run these checks, and added documentation for how to reconfigure ESLint in projects. @sneridagh [#5530](https://github.com/plone/volto/issues/5530)
- Fixed edge case error in Unauthorised page and Login route behavior @sneridagh [#5536](https://github.com/plone/volto/issues/5536)
- changed typo of pnp to pnpm. @ujjwaleee26 [#5537](https://github.com/plone/volto/issues/5537)

### Internal

- Added Cypress tests to verify that the modal dialog for deleting linked items pops up correctly. @Molochem [#5529](https://github.com/plone/volto/issues/5529)
- Fix stylelint violations @sneridagh [#5544](https://github.com/plone/volto/issues/5544)
- Update Plone to 6.0.9 @sneridagh [#5562](https://github.com/plone/volto/issues/5562)

### Documentation

- Removed outdated acceptance tests docs @sneridagh [#5533](https://github.com/plone/volto/issues/5533)
- Add `how-to-restrict-blocks` to `recipes/index.md`, avoiding Sphinx warning. @stevepiercy [#5546](https://github.com/plone/volto/issues/5546)
- Point developers to correct installation documentation, replaced yarn commands with pnpm, and correct some misspellings. We also now use includes to keep instructions consistent within Volto and in the main Plone 6 documentation. Finally the `NVM_VERSION` substitution now works. @ujjwaleee26 @stevepiercy [#5556](https://github.com/plone/volto/issues/5556)
- Fix redirects. @stevepiercy [#5563](https://github.com/plone/volto/issues/5563)
- Fix redirect for `nvm.fish`. @stevepiercy [#5569](https://github.com/plone/volto/issues/5569)

## 18.0.0-alpha.5 (2023-12-13)

### Feature

- Added conditional variations support. @sneridagh @robgietema [#5424](https://github.com/plone/volto/issues/5424)
- Added `navRoot` and `contentType` to `restricted` key in blocks configuration. @sneridagh [#5517](https://github.com/plone/volto/issues/5517)
- Add support for `preview_image_link` behavior in Volto Image component @sneridagh [#5523](https://github.com/plone/volto/issues/5523)

### Internal

- Add missing dependency on jsdom @sneridagh [#5490](https://github.com/plone/volto/issues/5490)
- Fix cypress artifacts path in acceptance tests. @davisagli [#5498](https://github.com/plone/volto/issues/5498)
- Make sure that the dependencies are built and available on all processes @sneridagh [#5514](https://github.com/plone/volto/issues/5514)

### Documentation

- Less comment blocks must have `*` as the first character on the second and subsequent lines, else the Pygments lexer fails. @stevepiercy [#5500](https://github.com/plone/volto/issues/5500)
- Revert #5500. See #5499 for actual cause of Pygments failure. @stevepiercy [#5504](https://github.com/plone/volto/issues/5504)
- Clarified where to run Make commands for building documentation. @stevepiercy [#5505](https://github.com/plone/volto/issues/5505)
- Changed installation of Vale from manual to automatic via `make docs-vale`. @stevepiercy [#5508](https://github.com/plone/volto/issues/5508)

## 18.0.0-alpha.4 (2023-12-02)

### Feature

- New monorepo @sneridagh [#5409](https://github.com/plone/volto/issues/5409)

### Bugfix

- Fix the right order of parameters in normalizeExternalData.js @dobri1408 [#5347](https://github.com/plone/volto/issues/5347)
- Initialize data in form before the checks for the `blocks` and `blocks_layout` are done This fix an edge case when the data from the server content is empty, then the fields are populated, but the initialized data is snapshot after the check (and amendments) are done. @sneridagh [#5445](https://github.com/plone/volto/issues/5445)
- Replaced `toNumber` with `parseFloat` to avoid an error when validating the `plone.restapi` version. @shibbu264 [#5448](https://github.com/plone/volto/issues/5448)
- Initialize only the development addons present in `compilerOptions.paths` filtered by the add-ons registered @sneridagh [#5463](https://github.com/plone/volto/issues/5463)

### Internal

- Cleaned up Registry and renamed `packagesFolderAddons` to `coreAddons`. @sneridagh [#5464](https://github.com/plone/volto/issues/5464)
- Deleted wrongly placed news items, added a check for them, issue a nice message in CI @sneridagh [#5470](https://github.com/plone/volto/issues/5470)

### Documentation

- Fixed broken links after monorepo merge. @stevepiercy [#5459](https://github.com/plone/volto/issues/5459)
- Added `volto-generator` compatibility with Volto to documentation. @stevepiercy [#5467](https://github.com/plone/volto/issues/5467)
- Updated the symlink from `docs/source/news` to point to `packages/volto/news`. @stevepiercy [#5471](https://github.com/plone/volto/issues/5471)
- Remove outdated note from upgrade guide for 17 related to ipv6 preferred by Node 18 @sneridagh [#5481](https://github.com/plone/volto/issues/5481)

## 18.0.0-alpha.3 (2023-11-27)

### Feature

- Use special breadcrumb in control panel @tiberiuichim [#5292](https://github.com/plone/volto/issues/5292)

### Bugfix

- Refactoring the code for extraction of videoDetails from the video URL, adding code for extracting videoDetails from youtube video URLs with '/live/' in its URL which previously used to throw an error and adding jest tests for same. @IshaanDasgupta [#5416](https://github.com/plone/volto/issues/5416)
- Revert "Improvements and completeness of the ContentMetadataTags component (#5433) @sneridagh [#5449](https://github.com/plone/volto/issues/5449)

### Internal

- Updated yarnhook to 0.6.1 in order to support pnpm 8 @sneridagh [#5444](https://github.com/plone/volto/issues/5444)

## 18.0.0-alpha.2 (2023-11-25)

### Feature

- Plone type definitions in its own package @sneridagh [#5397](https://github.com/plone/volto/issues/5397)
- Use container from component registry in sitemap component and also refactor the class
  to functional component. @iRohitSingh [#5418](https://github.com/plone/volto/issues/5418)
- Improvements and completeness of the ContentMetadataTags component @ericof @sneridagh [#5433](https://github.com/plone/volto/issues/5433)

### Bugfix

- Searchbox and clear button inside blocks-chooser with visible focus and fixed the clear button label - @Wagner3UB [#5335](https://github.com/plone/volto/issues/5335)
- Fix image paths in development mode. @robgietema [#5429](https://github.com/plone/volto/issues/5429)
- Bring back deprecated Yeoman install method used for running yarnInstall @ichim-david [#5436](https://github.com/plone/volto/issues/5436)

### Documentation

- Remove mention of LTS in Volto #4905. @stevepiercy [#4905](https://github.com/plone/volto/issues/4905)
- Added documentation to contributing. @stevepiercy [#5377](https://github.com/plone/volto/issues/5377)
- Remove orphans and move branch, version, and support policies into better locations in documentation. @stevepiercy [#5385](https://github.com/plone/volto/issues/5385)
- Updated Node.js version required for Volto. @Noobham [#5389](https://github.com/plone/volto/issues/5389)
- Fixed reference link to configuration/settings. @stevepiercy [#5410](https://github.com/plone/volto/issues/5410)
- JSX is now an official lexer in Pygments. @stevepiercy [#5412](https://github.com/plone/volto/issues/5412)

## 18.0.0-alpha.1 (2023-11-07)

### Feature

- List plone.app.linkintegrity breaches with links to the pages in the delete confirmation modal.
  @jaroel [#5234](https://github.com/plone/volto/issues/5234)

### Bugfix

- Fix empty link element left hanging when hit enter at end of link. @iFlameing @tiberiuichim [#5291](https://github.com/plone/volto/issues/5291)

### Internal

- Update internal Plone version to 6.0.8 @sneridagh [#5384](https://github.com/plone/volto/issues/5384)

### Documentation

- Improved the Makefil to check for the existence of a symlink from docs to news, and create one only if it exists, else do nothing. @stevepiercy [#5375](https://github.com/plone/volto/issues/5375)
- Improved wording in branch policy. @stevepiercy [#5376](https://github.com/plone/volto/issues/5376)
- Simplify linkcheck configuration with a regex. @stevepiercy [#5378](https://github.com/plone/volto/issues/5378)

## 18.0.0-alpha.0 (2023-11-06)

### Breaking

- Experimental feature flag for new add block button enabled by default. @sneridagh [#4947](https://github.com/plone/volto/issues/4947)
- Moved add-on registry to its own package. @sneridagh [#4949](https://github.com/plone/volto/issues/4949)
- Sidebar formtabs item links are now real buttons with `ui button` class for proper keyboard and screen reader support @ichim-david [#5294](https://github.com/plone/volto/issues/5294)

### Bugfix

- Add build process to registry package and fixes @sneridagh [#5364](https://github.com/plone/volto/issues/5364)
- Fixed import in Storybook configuration, related to the recent registry change. @sneridagh [#5368](https://github.com/plone/volto/issues/5368)
- Improve importing from the new registry from Volto code itself @sneridagh [#5373](https://github.com/plone/volto/issues/5373)

### Internal

- Unused files in root cleanup @sneridagh [#5367](https://github.com/plone/volto/issues/5367)

### Documentation

- Updated branch policy. @sneridagh [#5363](https://github.com/plone/volto/issues/5363)
- Remove "legacy" term, now that we use "no longer supported". @stevepiercy [#5370](https://github.com/plone/volto/issues/5370)
- Reduce the severity level of `Microsoft.Contractions` and `Microsoft.Units` from `error` to `suggestion` when running `make docs-vale` in preparation for requiring Vale passing without errors. @stevepiercy [#5371](https://github.com/plone/volto/issues/5371)
- Improved wording in branching policy. @sneridagh [#5372](https://github.com/plone/volto/issues/5372)

## 17.4.0 (2023-11-04)

### Feature

- add cypress test for search block via url - @ionlizarazu [#5298](https://github.com/plone/volto/issues/5298)
- Add type definitions for Volto Javascript files @sneridagh [#5355](https://github.com/plone/volto/issues/5355)

### Bugfix

- Add support for TS files in add-on registry shadowing system @sneridagh [#5354](https://github.com/plone/volto/issues/5354)

### Documentation

- Fix Sphinx toctree warnings from included `CHANGELOG.md`. @stevepiercy [#5135](https://github.com/plone/volto/issues/5135)
- Remove regular expression from `sphinx-copybutton` configuration, now that `linenos` are excluded by default. @stevepiercy [#5346](https://github.com/plone/volto/issues/5346)

## 17.3.0 (2023-10-27)

### Feature

- Updated aria-label for landmarks @ichim-david
  Added landmark on sidebar @ichim-david
  Added Pluggable section for skiplinks @ichim-david [#5290](https://github.com/plone/volto/issues/5290)

### Bugfix

- (FIX): put padding so the text is not clipped #5305 @dobri1408 [#5305](https://github.com/plone/volto/issues/5305)
- Fix compare translations view @sneridagh [#5327](https://github.com/plone/volto/issues/5327)
- Fix DatetimeWidget on FF, the button default if no type is set is sending the form. @sneridagh
  See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#formmethod [#5343](https://github.com/plone/volto/issues/5343)

### Internal

- For blocks that define their `blockSchema`, call `applyBlockDefaults` when creating the initial data for the blocks form.
  It is now possible to define a block configuration function, `initialValue` that returns the initial value for a block. This is useful in use cases such as container blocks that want to create a complex initial data structure, to avoid the need to call `React.useEffect` on their initial block rendering and thus, avoid complex async "concurent" state mutations.
  The `addBlock`, `mutateBlock`, `insertBlock` now allow passing a `blocksConfig` configuration object

  @tiberiuichim [#5320](https://github.com/plone/volto/issues/5320)
- Add a new set of acceptance tests with the multilingual fixture using seamless mode. @sneridagh [#5332](https://github.com/plone/volto/issues/5332)

### Documentation

- Fix reference link to installation. @stevepiercy [#5328](https://github.com/plone/volto/issues/5328)
- Add upgrade docs for users of `@kitconcept/volto-blocks-grid` addon @sneridagh [#5333](https://github.com/plone/volto/issues/5333)

## 17.2.0 (2023-10-16)

### Feature

- add cypress test for search block via url - @ionlizarazu [#5298](https://github.com/plone/volto/issues/5298)

### Bugfix

- Fix adding multiple path criteria in search and listing blocks. @davisagli [#5317](https://github.com/plone/volto/issues/5317)


## 17.1.1 (2023-10-13)

### Bugfix

- Normalize the shape of the image component item prop if it contains the serialized object after creation to match the one in the catalog. @sneridagh [#5266](https://github.com/plone/volto/issues/5266)
- Added guard in `flattenScales` in edge case image is undefined @sneridagh [#5318](https://github.com/plone/volto/issues/5318)


## 17.1.0 (2023-10-11)

### Feature

- storybook Header-@Tishasoumya [#5085](https://github.com/plone/volto/issues/5085)
- Storybook EventDetails-@Tishasoumya [#5088](https://github.com/plone/volto/issues/5088)
- Storybook CommentEditModal-@Tishasoumya [#5091](https://github.com/plone/volto/issues/5091)
- Storybook SearchWidget-@Tishasoumya [#5092](https://github.com/plone/volto/issues/5092)
- Upgrade to @plone/scripts 3.0.1 @sneridagh [#5282](https://github.com/plone/volto/issues/5282)
- Make LeadImage block sizes configurable through a function @erral [#5289](https://github.com/plone/volto/issues/5289)

### Bugfix

- Remove the default aspect-ratio from Image component. It was redundant and hard to override. @pnicolli [#5096](https://github.com/plone/volto/issues/5096)
- Update translate pt_br to fix merge fail @luxcas [#5217](https://github.com/plone/volto/issues/5217)
- Ensure .gitignore gets copied when running yo @plone/volto-addon @instification [#5258](https://github.com/plone/volto/issues/5258)
- Configure the `prettier` and `prettier:fix` yarn commands to also include the root js files and the `cypress` subfolder @tiberiuichim [#5260](https://github.com/plone/volto/issues/5260)
- Emit a proper URL for the Plone root in a listing, we use the `config.publicURL` for it @tiberiuichim [#5263](https://github.com/plone/volto/issues/5263)
- fixed logo and login storybook @nileshgulia1 [#5264](https://github.com/plone/volto/issues/5264)
- Refactor Logo component to improve the conditional link to the root @sneridagh [#5280](https://github.com/plone/volto/issues/5280)
- Update webpack-bundle-analyzer to 4.9.0. @davisagli [#5283](https://github.com/plone/volto/issues/5283)
- Added support for blocksConfig configuration in the listing block @sneridagh [#5310](https://github.com/plone/volto/issues/5310)

### Documentation

- Added notice in release notes for Volto 17 final to clarify that it's a summary for all changes during the alpha stage. @sneridagh
  Added an omitted change log entry for the Relations Control Panel. @sneridagh [#5281](https://github.com/plone/volto/issues/5281)
- Updated readme and removed outdated install docs. @davisagli [#5287](https://github.com/plone/volto/issues/5287)


## 17.0.1 (2023-10-03)

### Bugfix

- issue #5126 a11y for checkboxes on the sharing page @Wagner3UB [#5201](https://github.com/plone/volto/issues/5201)
- Adjust DNS resolution to prefer IPv4 addresses when both IPv4 and IPv6 are resolved. @davisagli [#5261](https://github.com/plone/volto/issues/5261)

### Documentation

- Fix tests and documentation broken because the renaming master->main @sneridagh [#5251](https://github.com/plone/volto/issues/5251)
- Disable GHA vale checking, it started to fail with a gazillion of violations. @sneridagh [#5253](https://github.com/plone/volto/issues/5253)
- Reenable GHA vale checking, but with configuration from `plone/documentation`. It now runs Vale, but with the flag `--no-exit` which means "Don't return a nonzero exit code on errors." It also eliminates reviewdog as the test runner. @stevepiercy [#5256](https://github.com/plone/volto/issues/5256)


## 17.0.0 (2023-09-30)

**These Release Notes summarize all the changes during the alpha stage of Volto 17.**

### Breaking

- Volto 17 drops support for NodeJS 14, and adds support for Node.js 18.
  Please see the [upgrade guide](https://6.docs.plone.org/volto/upgrade-guide/index.html)
  for more information.

  Volto 17 now uses Webpack 5. [#4086](https://github.com/plone/volto/issues/4086)

- Add custom CSS animation to hamburger menu. Removed `hamburgers` dependency. @danalvrz [#4433](https://github.com/plone/volto/issues/4433)
- Improve i18n script ordering of addons, so that addons can override translations from their dependencies. @davisagli [#4495](https://github.com/plone/volto/issues/4495)
- Use proper heading tag (depending on the headline) in default listing template @sneridagh [#4848](https://github.com/plone/volto/issues/4848)
- Remove useToken & useContent hooks-@Tishasoumya-02 [#4951](https://github.com/plone/volto/issues/4951)
- Added new Image component to render optimized images @pnicolli @davisagli [#3337](https://github.com/plone/volto/issues/3337)
- Update `@plone/scripts` to 3.0.0. @davisagli [#5040](https://github.com/plone/volto/issues/5040)
- Spin off relation stats action. Get relation stats with getRelationStats() instead of with queryRelations(). @ksuess
  Refactor relations actions: slightly change the shape of the redux state for `queryRelations` to follow common signatures. @ksuess [#5041](https://github.com/plone/volto/issues/5041)
- Upgrade to Cypress 13 @sneridagh [#5163](https://github.com/plone/volto/issues/5163)
- Removed support for Node.js 16. It is no longer supported by the Node.js community. @davisagli [#5166](https://github.com/plone/volto/issues/5166)
- Updated Prettier @sneridagh
  Upgrade Stylelint @sneridagh
  Fixed introduced violations due to the upgrades @sneridagh
  Updated HTML block and prettier loadables to match the new async Prettier plugin API @sneridagh [#5216](https://github.com/plone/volto/issues/5216)
- Improve linked headlines after feedback:
  Disable the feature for anonymous users of the website
  Disable it for the page title
  Change the wording of the notification from "Link copied to clipboard" to "Anchor link copied to the clipboard" to make it more obvious that an anchor link has been copied
  Normalize the slug to use only ascii characters
  @sneridagh [#5225](https://github.com/plone/volto/issues/5225)

### Feature

- Added a control panel for relations. @ksuess [#3382](https://github.com/plone/volto/pull/3382)
- Add directive to cache stable resources in browser or intermediate server for 365 days by default directly in the SSR Express server, static resource that could change after a new deployment for 1 minute. @mamico [#2216](https://github.com/plone/volto/issues/2216)
- Use popperjs in BlockChooser, move the markup to the bottom of the body tag. @sneridagh [#4141](https://github.com/plone/volto/issues/4141)
- Improvements to the dev API proxy:
  - Prefer RAZZLE_INTERNAL_API_PATH over RAZZLE_API_PATH as the target of the proxy.
    The target of the API proxy is now always logged on startup, even in production mode.
  - Support proxying to a backend served over https. For this configuration it
    might be necessary to set RAZZLE_DEV_PROXY_INSECURE=1 if the backend
    certificate can't be verified.

  [davisagli] [#4434](https://github.com/plone/volto/issues/4434)
- Add option to hide empty listing blocks @ksuess [#4393](https://github.com/plone/volto/issues/4393)
- Add Vale to CI for spell and style checks. @MAX-786 [#4423](https://github.com/plone/volto/issues/4423)
- DefaultView (view of fields for content types with blocks disabled): Show field name as tip on hover of label. @ksuess [#4598](https://github.com/plone/volto/issues/4598)
- Support RelationList field with named StaticCatalogVocabulary and SelectWidget. @ksuess [#4614](https://github.com/plone/volto/issues/4614)
- Support for declaring a theme in `volto.config.js` or in `package.json`
  Add two entry points to allow extension of a theme from other add-ons. @sneridagh [#4625](https://github.com/plone/volto/issues/4625)
- Set sameSite in I18N_LANGUAGE cookie @sneridagh [#4627](https://github.com/plone/volto/issues/4627)
- Added querystring search get option. @robgietema [#4658](https://github.com/plone/volto/issues/4658)
- Changed control panel list to be fetched server-side not client-side
  @JeffersonBledsoe [#3749](https://github.com/plone/volto/issues/3749)
- Add Finnish translation (contributed by @rioksane) @erral [#4084](https://github.com/plone/volto/issues/4084)
- Search Block: Add support for advanced facets that are only displayed on demand.
  [pbauer, razvanMiu, claudiaifrim] [#4783](https://github.com/plone/volto/issues/4783)
- Display PAS validation errors. [tschorr] [#4801](https://github.com/plone/volto/issues/4801)
- Added a CSS identifier to the Slate style menu options. @razvanMiu [#4846](https://github.com/plone/volto/issues/4846)
- Use a Container from the registry in the Form component and fallback to the Semantic UI one. @sneridagh [#4849](https://github.com/plone/volto/issues/4849)
- Update Brazilian Portuguese translations @ericof [#4853](https://github.com/plone/volto/issues/4853)
- Allow to deselect color in ColorPickerWidget. @ksuess [#4838](https://github.com/plone/volto/issues/4838)
- Configurable Container component from registry for some key route views. @sneridagh [#4871](https://github.com/plone/volto/issues/4871)
- Add and enforce a new config setting, `maxFileUploadSize`. @davisagli [#4868](https://github.com/plone/volto/issues/4868)
- Added slug-based linked headings in `volto-slate`. @tiberiuichim, @nileshgulia1 [#4287](https://github.com/plone/volto/issues/4287)
- Refactored Anontools components. @Tishasoumya-02 [#4845](https://github.com/plone/volto/issues/4845)
- New block: Grid - A container of blocks, arranged in horizontal direction. @sneridagh
  New primitive: Container - A primitive to build blocks containing other blocks. @sneridagh [#3180](https://github.com/plone/volto/issues/3180)
- Use container from component registry in content type views, if defined. @sneridagh [#4962](https://github.com/plone/volto/issues/4962)
- Refactor CommentEdit -@Tishasoumya-02 [#4075](https://github.com/plone/volto/issues/4075)
- Facets should be able to decide themselves if they should show or not. Made defaultShowFacet to be a fallback in case there is no custom function for each facet type. @tedw87 [#4579](https://github.com/plone/volto/issues/4579)
- Add backward compatibility to `slate_richtext` with fields that are plain text @razvanMiu [#4796](https://github.com/plone/volto/issues/4796)
- Refactor-Contact Form @Tishasoumya-02 [#4850](https://github.com/plone/volto/issues/4850)
- Refactor BreadcrumbsComponent @Tishasoumya-02 [#4858](https://github.com/plone/volto/issues/4858)
- Refactor SearchWidget @Tishasoumya-02 [#4864](https://github.com/plone/volto/issues/4864)
- Refactor LinkView -@Tishasoumya-02 [#4866](https://github.com/plone/volto/issues/4866)
- Use container from component registry in content type views, if defined. @sneridagh [#4962](https://github.com/plone/volto/issues/4962)
- Add /ok route as an express middleware @ionlizarazu [#4375](https://github.com/plone/volto/issues/4375)
- Add `Links to item` view (available via object's more menu) @pgrunewald [#4787](https://github.com/plone/volto/issues/4787)
- Tune 'Links to item' view to 'Links and references' view. Show all relation types. @ksuess @stevepiercy [#4842](https://github.com/plone/volto/issues/4842)
- Update browserlist to latest @sneridagh [#4977](https://github.com/plone/volto/issues/4977)
- Use all the apiExpanders in use, so we perform a single request for getting all the required data. @sneridagh [#4946](https://github.com/plone/volto/issues/4946)
- Add getFieldURL helper function used to get the url value of a field based on its structure. @razvanMiu [#2252](https://github.com/plone/volto/issues/2252)
- Refactor Delete -@Tishasoumya [#4890](https://github.com/plone/volto/issues/4890)
- Refactor workflow -@Tishasoumya-02 [#4902](https://github.com/plone/volto/issues/4902)
- Refactor Request Reset Password-@Tishasoumya-02 [#4938](https://github.com/plone/volto/issues/4938)
- Refactor Actions-@Tishasoumya-02 [#4939](https://github.com/plone/volto/issues/4939)
- Refactor Blocks/Maps/Edit component -@Tishasoumya-02 [#4958](https://github.com/plone/volto/issues/4958)
- Updated Italian translations @sabrina-bongiovanni [#4987](https://github.com/plone/volto/issues/4987)
- Made selectedView and className props available in the SearchBlockView.jsx to improve styling development. @danalvrz [#4997](https://github.com/plone/volto/issues/4997)
- Refactor Comment -@Tishasoumya-02 [#4074](https://github.com/plone/volto/issues/4074)
- Refactor Logout component @Tishasoumya-02 [#4860](https://github.com/plone/volto/issues/4860)
- Refactore SearchTags @Tishasoumya-02 [#4873](https://github.com/plone/volto/issues/4873)
- Use the `@navroot` endpoint to build the `title` tag. @erral
  Use the `@site` endpoint to render the logo. @erral
  Register a widget to set the logo in the site control panel. @erral [#3537](https://github.com/plone/volto/issues/3537)
- Refactor Navigation -@Tishasoumya-02 [#4076](https://github.com/plone/volto/issues/4076)
- Added loading spinner and disable search button while data is fetching. @tedw87 [#4551](https://github.com/plone/volto/issues/4551)
- User Control panel improvements. See #4551 @erral [#4572](https://github.com/plone/volto/issues/4572)
- Messages Component Refactor - @Tishasoumya-02 [#4926](https://github.com/plone/volto/issues/4926)
- Refactor Login -@Tishasoumya-02 [#4933](https://github.com/plone/volto/issues/4933)
- Add external className to UniversalLink for external link. @iFlameing [#5109](https://github.com/plone/volto/issues/5109)
- Updated Spanish translation @macagua [#5120](https://github.com/plone/volto/issues/5120)
- (feat): Update toc block entries @dobri1408 [#5146](https://github.com/plone/volto/issues/5146)
- Views cypress test -@Tishasoumya [#5149](https://github.com/plone/volto/issues/5149)
- Added support for Node.js 20. @davisagli [#5166](https://github.com/plone/volto/issues/5166)
- Cypress test to test if 'Search results: number' text is present @ionlizarazu [#5171](https://github.com/plone/volto/issues/5171)
- TypeScript support in core @sneridagh @ninanoleto [#4662](https://github.com/plone/volto/issues/4662)
- Add external className to slate Link view. @iFlameing [#5109](https://github.com/plone/volto/issues/5109)
- Refactor PersonalTools component -@Tishasoumya-02 [#4954](https://github.com/plone/volto/issues/4954)
- Refactor Sidebar component-@Tishasoumya-02 [#4964](https://github.com/plone/volto/issues/4964)
- Refactor ContentsPropertiesModal -@Tishasoumya-02 [#4968](https://github.com/plone/volto/issues/4968)
- Refactor ContentsWorkflowModal -@Tishasoumya-02 [#4969](https://github.com/plone/volto/issues/4969)
- Refactor ContentsRenameModal -@Tishasoumya-02 [#4970](https://github.com/plone/volto/issues/4970)
- Refactor ContentsTagsModal -@Tishasoumya-02 [#4971](https://github.com/plone/volto/issues/4971)
- Updated Spanish translations @macagua [#5200](https://github.com/plone/volto/issues/5200)
- add canonical link @mamico [#5215](https://github.com/plone/volto/issues/5215)

### Bugfix

- fix: newsitem and event views wrapper classNames @nzambello [#4443](https://github.com/plone/volto/issues/4443)
- Fix weird GHA failure on config option not supported @sneridagh [#4466](https://github.com/plone/volto/issues/4466)
- Fix history view dropdown for first entry, showing 'Revert to this version option' always @sneridagh [#4471](https://github.com/plone/volto/issues/4471)
- Fix order of row of long table in edit and view mode @iFlameing [#4473](https://github.com/plone/volto/issues/4473)
- Improve flaky test in autofocus Cypress tests @sneridagh [#4475](https://github.com/plone/volto/issues/4475)
- Update build dependencies (razzle and react-dev-utils) @davisagli [#3997](https://github.com/plone/volto/issues/3997)
- Added block prop to BlockDataForm in the Edit component of ToC. If block is not passed, OnChangeBlock will be called with undefined block id. @tedw87 [#4110](https://github.com/plone/volto/issues/4110)
- Fix focus steal in Form @tedw87 [#4230](https://github.com/plone/volto/issues/4230)
- Fixed paste issue in Table Block and added cypress test for pasting text in Table Block. [#4301](https://github.com/plone/volto/issues/4301)
- Fixed i18n script to avoid overwriting translations with an empty msgstr @danalvrz [#4316](https://github.com/plone/volto/issues/4316)
- bugfix: conditionally render all delete items in confirm widget [#4336](https://github.com/plone/volto/issues/4336)
- Make the Site Setup control panel responsive for small screen devices. @lord2anil [#4484](https://github.com/plone/volto/issues/4484)
- The menu for the contents page was unresponsive on mobile devices. Fixed this by changing the menu overflow to scroll. @sudhanshu1309 [#4492](https://github.com/plone/volto/issues/4492)
- Make Drag and Drop list work with container-type inline-size. @robgietema [#4497](https://github.com/plone/volto/issues/4497)
- (fix): Paste button disappearing while coping from nested blocks @dobri1408 [#4505](https://github.com/plone/volto/issues/4505)
- Patch updates for some dependencies. @davisagli [#4520](https://github.com/plone/volto/issues/4520)
- Fix flaky Cypress test introduced in #4521 @sneridagh [#4522](https://github.com/plone/volto/issues/4522)
- Fix Search is case sensitive in Block chooser @iRohitSingh [#4526](https://github.com/plone/volto/issues/4526)
- InternalURl helper method should incorporate externalRoutes settings into consideration. @iFlameing [#4559](https://github.com/plone/volto/issues/4559)
- Update message add-on control panel: remove 'buildout', update reference. @ksuess [#4574](https://github.com/plone/volto/issues/4574)
- Added current page parameter to route in listing and search block pagination - Fix: #3868 @bipoza [#4159](https://github.com/plone/volto/issues/4159)
- Fix regexp that checks valid URLs and improve tests [cekk] [#4601](https://github.com/plone/volto/issues/4601)
- Fixed wrong localization on password reset page @iRohitSingh [#4656](https://github.com/plone/volto/issues/4656)
- fix sitemap.xml.gz not is not compressed @dobri1408 [#4663](https://github.com/plone/volto/issues/4663)
- Generate a split sitemap @reebalazs [#4638](https://github.com/plone/volto/issues/4638)
- Fix Move to top of folder ordering in folder content view @iFlameing [#4690](https://github.com/plone/volto/issues/4690)
- Revert "Add current page parameter to the route in the listing and search block pagination (#4159)" @sneridagh [#4695](https://github.com/plone/volto/issues/4695)
- Fix search block in edit mode re-queries multiple blocks with an empty search text @reebalazs [#4697](https://github.com/plone/volto/issues/4697)
- Apply suggestion from browser for password field @lord2anil [#3990](https://github.com/plone/volto/issues/3990)
- Open all accordion'd content in InlineForm by default, allow arbitrarily close any number of them. @sneridagh [#4178](https://github.com/plone/volto/issues/4178)
- Fix duplicating listing block by removing block uid from blocks data. @ksuess [#4234](https://github.com/plone/volto/issues/4234)
- The tabs for the add page was unresponsive on mobile devices. Fixed this by changing flex-wrap property. @sudhanshu1309 [#4506](https://github.com/plone/volto/issues/4506)
- (fix):Object.normaliseMail: Cannot read properties of null @dobri1408 [#4558](https://github.com/plone/volto/issues/4558)
- Update add-on control panel tranlsations: install -> activate. @ksuess [#4582](https://github.com/plone/volto/issues/4582)
- Fix robot.txt - the sitemap link should respect x-forwarded headers @reebalazs [#4638](https://github.com/plone/volto/issues/4638)
- Fix Move to top of folder ordering in folder content view by searching also @iFlameing [#4690](https://github.com/plone/volto/issues/4690)
- Fix faulty D&D elements in ObjectBrowserList widget @sneridagh [#4703](https://github.com/plone/volto/issues/4703)
- Fix fetching API paths with urlencoded characters in the querystring. @davisagli [#4718](https://github.com/plone/volto/issues/4718)
- Fix language negotiation for language codes that include a region (e.g. `pt-br`). @davisagli [#4644](https://github.com/plone/volto/issues/4644)
- Fixed the issue "shouldn't use a hook like function name for a variable" @Kaku-g [#4693](https://github.com/plone/volto/issues/4693)
- Fix to not update breadrumbs, navigation, actions, and types when content is fetched as a subrequest and apiExpanders includes these components. @davisagli [#4760](https://github.com/plone/volto/issues/4760)
- Fix bug where editors could not see their own content in the Contents view if it was expired or has a future effective date. @davisagli [#4764](https://github.com/plone/volto/issues/4764)
- Fix bug showing logs at the browsers when richtext widget is use @claytonc [#4780](https://github.com/plone/volto/issues/4780)
- Update relations control panel layout @danalvrz [#4794](https://github.com/plone/volto/issues/4794)
- Fix hot module reloading of changes to `@plone/volto`. @davisagli [#4799](https://github.com/plone/volto/issues/4799)
- Add guard in case of malformed blocks are present (at least id and title should be present) @sneridagh [#4802](https://github.com/plone/volto/issues/4802)
- Fix html tag lang attribute in SSR @sneridagh [#4803](https://github.com/plone/volto/issues/4803)
- Add newest supported languages to `Language` constants list @sneridagh [#4811](https://github.com/plone/volto/issues/4811)
- Fix special characters in request urls @pnicolli @mamico @luca-bellenghi @cekk [#4825](https://github.com/plone/volto/issues/4825)
- Fix block is undefined in StyleWrapper helper when building classnames @sneridagh [#4827](https://github.com/plone/volto/issues/4827)
- Fix navigation sections in 404 pages @sneridagh [#4836](https://github.com/plone/volto/issues/4836)
- Convert header class to function. @gomez [#4767](https://github.com/plone/volto/issues/4767)
- Do not break validation on required number field with value 0 @cekk [#4841](https://github.com/plone/volto/issues/4841)
- Added current page parameter to route in listing and search block pagination - Fix: #3868 @bipoza [#4159](https://github.com/plone/volto/issues/4159)
- Fix regression in horizontal scroll in contents view, add it back @sneridagh [#4872](https://github.com/plone/volto/issues/4872)
- Fix and improve the `addStyling` helper @sneridagh [#4880](https://github.com/plone/volto/issues/4880)
- Update to version 6.0.5 of Plone backend. @davisagli [#4897](https://github.com/plone/volto/issues/4897)
- Remove anonymous function calls. Remove default exports from. @sneridagh [#4917](https://github.com/plone/volto/issues/4917)
- Fix Annontools StoryBook @sneridagh [#4921](https://github.com/plone/volto/issues/4921)
- Fix the experimental add new block button position, compensate the icon width to center it correctly @sneridagh [#4924](https://github.com/plone/volto/issues/4924)
- Fix temporary rendering of folder contents while query results are loading. @davisagli [#4351](https://github.com/plone/volto/issues/4351)
- Fix isBlacklisted method check for volto externalRoutes [#4725](https://github.com/plone/volto/issues/4725)
- Add a marker in the props passed to `RenderBlocks` in the Grid block view @sneridagh [#4932](https://github.com/plone/volto/issues/4932)
- Fix handling of overriden image in Teaser, improve in case that a custom image component is present. @sneridagh [#4964](https://github.com/plone/volto/issues/4964)
- Fix temporary rendering of folder contents while query results are loading. @davisagli [#4351](https://github.com/plone/volto/issues/4351)
- Fix isBlacklisted method check for volto externalRoutes [#4725](https://github.com/plone/volto/issues/4725)
- fix(styleMenu): Highlight selected block styles @nileshgulia1 [#4851](https://github.com/plone/volto/issues/4851)
- Fix tablet main menu. [#4859](https://github.com/plone/volto/issues/4859)
- Fix the table of contents block so that if one or more items get out of the viewport, a dropdown menu appears with all the items that do not fit the viewport and also added an option to make the TOC sticky. @MihaelaCretu11 [#4907](https://github.com/plone/volto/issues/4907)
- Add a marker in the props passed to `RenderBlocks` in the Grid block view @sneridagh [#4932](https://github.com/plone/volto/issues/4932)
- Typo in Italian locales @mamico [#4944](https://github.com/plone/volto/issues/4944)
- Fix handling of overriden image in Teaser, improve in case that a custom image component is present. @sneridagh [#4964](https://github.com/plone/volto/issues/4964)
- Fix slateTable still uses old style of sidebar generation @iFlameing [#4972](https://github.com/plone/volto/issues/4972)
- Fix password autocomplete hint for login form. @davisagli [#4976](https://github.com/plone/volto/issues/4976)
- Handle condition for yearly frequency in recurrence @BhuvaneshPatil [#4498](https://github.com/plone/volto/issues/4498)
- Fix search block input clear button doesn't reset the search @iFlameing [#4828](https://github.com/plone/volto/issues/4828)
- Fix the condition deciding on listing pagination format so it takes into account container blocks as well @sneridagh [#4978](https://github.com/plone/volto/issues/4978)
- Fix delete confirmation to handle empty `breaches`. @davisagli [#4832](https://github.com/plone/volto/issues/4832)
- Fix Volto contents - set properties Exclude from navigation - bad request, set exclude_from_nav to boolean [#4855](https://github.com/plone/volto/issues/4855)
- Add XSendfile headers to files and images middleware @instification [#4984](https://github.com/plone/volto/issues/4984)
- search-block: translate some missing strings to german and fix a typo. @pbauer [#4996](https://github.com/plone/volto/issues/4996)
- Add image block className support (Style wrapper). @sneridagh [#5018](https://github.com/plone/volto/issues/5018)
- Fix for 'no value' entry in table of content field. @satyam4p [#5022](https://github.com/plone/volto/issues/5022)
- Fix updating roles when username contains a period (.). @nileshgulia1 [#5025](https://github.com/plone/volto/issues/5025)
- Fix hover and focused border for block child. @claudiaifrim [#5028](https://github.com/plone/volto/issues/5028)
- Enhance display and repairing of broken relations. @ksuess [#5033](https://github.com/plone/volto/issues/5033)
- Fix selecting grid block when a sub-block is selected. @davisagli [#5036](https://github.com/plone/volto/issues/5036)
- Update versions of semver and release-it. @davisagli [#5053](https://github.com/plone/volto/issues/5053)
- Fix regression from v17a22: It was not possible to select a block in a grid
  column unless the grid was already selected. @davisagli

  Fix regression from v17a22: Block outline was blocking clicks in some cases.
  @davisagli [#5039](https://github.com/plone/volto/issues/5039)
- Fix handling of exceptions in reducers. @davisagli [#5069](https://github.com/plone/volto/issues/5069)
- Add missing i18n for ToC block. @davisagli [#5073](https://github.com/plone/volto/issues/5073)
- Allow a user to register when they use an email address as their username. [#5031](https://github.com/plone/volto/issues/5031) @mehedikhan72 [#5031](https://github.com/plone/volto/issues/5031)
- Fix querystringResults subrequests id, to work properly in duplicate pages where blocks id's are the same. @giuliaghisini [#5070](https://github.com/plone/volto/issues/5070)
- Fix i18n for link settings fieldset in the image block @iRohitSingh [#5075](https://github.com/plone/volto/issues/5075)
- Prevent caching the outdated browser message in a shared cache. @davisagli [#5076](https://github.com/plone/volto/issues/5076)
- Fix accessibility of the content folder buttons. @SaraBianchi [#5101](https://github.com/plone/volto/issues/5101)
- For folders inside navigation roots, properly fetch navigation from the
  navroot, rather then the site root  @tiberiuichim [#5106](https://github.com/plone/volto/issues/5106)
- Fix uncached case when the widget is slate on diff @dobri1408 [#5107](https://github.com/plone/volto/issues/5107)
- Fix load addon translations: last addon translations wins @giuliaghisini [#5113](https://github.com/plone/volto/issues/5113)
- [Visual bugfix] Match the original mockups for PastanagaUI in regards of the error messages in form field elements @sneridagh [#5115](https://github.com/plone/volto/issues/5115)
- Fix default toc renderer for nested entries @pnicolli [#5116](https://github.com/plone/volto/issues/5116)
- Fix inherit checkbox in sharing view @sneridagh [#5514](https://github.com/plone/volto/issues/5514)
- Fix for responsive error in the login page when the width of the screen decreases. @suman9893 [#3250](https://github.com/plone/volto/issues/3250)
- Fix back button in the search block to execute the search by adding two useEffects that update the facets and search data based on the current URL. @MihaelaCretu11 [#4402](https://github.com/plone/volto/issues/4402)
- fix : RecursiveWidget is incorrectly translated. @suman9893 [#4503](https://github.com/plone/volto/issues/4503)
- Fix use of CSS modules in webpack 5. @wesleybl [#5019](https://github.com/plone/volto/issues/5019)
- Fix toc accessibility issue @dobri1408 [#5058](https://github.com/plone/volto/issues/5058)
- Fix storybook config for project generator. Add support for SCSS, upgrade to webpack 5 in there as well. @sneridagh [#5132](https://github.com/plone/volto/issues/5132)
- Don't show ``No value`` option in SelectWidget and ArrayWidget if default value is 0. @wesleybl [#5151](https://github.com/plone/volto/issues/5151)
- Fix SelectWidget throwing error when editing a recently created content. @iFlameing [#5154](https://github.com/plone/volto/issues/5154)
- Fix editing layout for blocks using schema enhancers. @iFlameing, @davisagli [#5158](https://github.com/plone/volto/issues/5158)
- Fix ContentRules add and edit forms for languages other than English. @ericof [#5161](https://github.com/plone/volto/issues/5161)
- Fix search block search results number @ionlizarazu [#5171](https://github.com/plone/volto/issues/5171)
- fix flaky cypress in blocks-listing.js @nileshgulia1 [#5173](https://github.com/plone/volto/issues/5173)
- Fix regression in forms input in toolbar height related to (#5115) @sneridagh [#5176](https://github.com/plone/volto/issues/5176)
- Update delete-content modal to simplify text and improve UX @danlavrz [#4786](https://github.com/plone/volto/issues/4786)
- Improved accessibility by adding an `aria-label` to the search icon on sharing page. @ZubairImtiaz3 [#5124](https://github.com/plone/volto/issues/5124)
- Fixed PreviewImage component to work as Image component when testing image, and added showDefault prop to PreviewImage [#5153](https://github.com/plone/volto/issues/5153)
- Fix empty slate text block in table of contents. @kreafox [#5156](https://github.com/plone/volto/issues/5156)
- Remove integration with volto-style-block, as it's not working anymore @dobri1408 [#5192](https://github.com/plone/volto/issues/5192)
- Fix standalone navigation action call if expander is set @sneridagh [#5197](https://github.com/plone/volto/issues/5197)
- Updated the deprecated Buffer.from package in create-addons-loader.js @Junko-Takeguchi [#5205](https://github.com/plone/volto/issues/5205)
- restrict moment.js locales to supported languages @mamico [#5207](https://github.com/plone/volto/issues/5207)
- Fix links to link integrity in delete modal @sneridagh [#5226](https://github.com/plone/volto/issues/5226)
- Fix dependency problem, 'moment-locales-webpack-plugin' can't be in devDeps, since Razzle needs it in the projects. @sneridagh [#5236](https://github.com/plone/volto/issues/5236)

### Internal

- Add HI-ERN website to "Volto in Production" section in README @steffenri [#4172](https://github.com/plone/volto/issues/4172)
- Trigger CI workflows to run from external pull requests. @davisagli [#4629](https://github.com/plone/volto/issues/4629)
- Update to p.restapi 8.36.0 and Plone 6.0.3 @sneridagh [#4682](https://github.com/plone/volto/issues/4682)
- Change conditional checking to optional chaining for a theme icon @nilootpal [#4567](https://github.com/plone/volto/issues/4567)
- Security upgrade for momentjs [#4715](https://github.com/plone/volto/issues/4715)
- Upgrade to Plone 6.0.4 @sneridagh [#4743](https://github.com/plone/volto/issues/4743)
- Remove max_line_length from .editorconfig @pnicolli [#4776](https://github.com/plone/volto/issues/4776)
- Fix unannounced breaking change in cypress-io/github-action @sneridagh [#4795](https://github.com/plone/volto/issues/4795)
- Add Storybook story for useDetectClickOutside hook with several demos @sneridagh [#4923](https://github.com/plone/volto/issues/4923)
- Upgrade bundlewatch to 0.3.3. @wesleybl [#4967](https://github.com/plone/volto/issues/4967)
- Update to latest plone.restapi and Plone 6.0.6 @sneridagh [#4979](https://github.com/plone/volto/issues/4979)
- Remove dangling out of place Guillotina Cypress tests @sneridagh [#4980](https://github.com/plone/volto/issues/4980)
- Upgrade to Cypress 12.17.1 (latest) @sneridagh [#4981](https://github.com/plone/volto/issues/4981)
- Add https://www.dlr.de/de to "Volto in production" list. @tisto [#5112](https://github.com/plone/volto/pull/5112)
- Improved spellcheck to keep spellings consistent. @chirayu-humar [#1190](https://github.com/plone/volto/issues/1190)
- Redistribute Cypress Basic Core tests into other jobs @sneridagh [#5199](https://github.com/plone/volto/issues/5199)
- Update to latest plone.restapi and Plone 6.0.7 @sneridagh [#5213](https://github.com/plone/volto/issues/5213)

### Documentation

- Add a new Volto site to the README @erral [#4158](https://github.com/plone/volto/issues/4158), [#4170](https://github.com/plone/volto/issues/4170)
- Add new websites Lanku and UEU
  [erral] [#4310](https://github.com/plone/volto/issues/4310)
- Fix English and MyST grammar and syntax from PR #4285 @stevepiercy [#4331](https://github.com/plone/volto/issues/4331)
- Use a universal static path for both documentation and volto repos. @stevepiercy [#4376](https://github.com/plone/volto/issues/4376)
- Complete teaser docs, add new section in `Blocks`: `Core Blocks developers notes` @sneridagh [#4461](https://github.com/plone/volto/issues/4461)
- Change from links to inline literals in `CHANGELOG.md` to fix linkcheckbroken. @stevepiercy [#4470](https://github.com/plone/volto/issues/4470)
- Fix training urls @ksuess [#4502](https://github.com/plone/volto/issues/4502)
- Add upgrade guide for 4504 @sneridagh [#4542](https://github.com/plone/volto/issues/4542)
- Deleted duplicate import and fixed training URLs. @yahya-cloud [#4523](https://github.com/plone/volto/issues/4523)
- Fix grammar in PR #4542. @stevepiercy [#4555](https://github.com/plone/volto/issues/4555)
- Fix broken links at `ReactJS.org`. @stevepiercy [#4569](https://github.com/plone/volto/issues/4569)
- Fix video warnings and link errors. @stevepiercy [#4578](https://github.com/plone/volto/issues/4578)
- Added `JavaScript` and `NodeJS` as accepted spellings, and deviations of them as rejected spellings. @utkkkarshhh [#3092](https://github.com/plone/volto/issues/3092)
- Fix documentation build, add pins @sneridagh [#4626](https://github.com/plone/volto/issues/4626)
- Update Volto contributing to align with and refer to the new Plone core code contributing requirements. @stevepiercy [#4634](https://github.com/plone/volto/issues/4634)
- Improve creating views documentation page. @rboixaderg [#4636](https://github.com/plone/volto/issues/4636)
- Razzle upgrade notice in upgrade guide @sneridagh [#4641](https://github.com/plone/volto/issues/4641)
- Rename "Developer Guidelines" to "Contributing". @stevepiercy [#4666](https://github.com/plone/volto/issues/4666)
- Fix broken link to `ReactJS.org`. @stevepiercy [#4667](https://github.com/plone/volto/issues/4667)
- Update links for 2022 Training archive. @stevepiercy [#4635](https://github.com/plone/volto/issues/4635)
- Added documentation regarding the static middleware. @BhardwajAditya-github [#4518](https://github.com/plone/volto/issues/4518)
- Use new URL `6.docs.plone.org`. @stevepiercy [#4726](https://github.com/plone/volto/issues/4726)
- Synch stuff from `16.x.x` branch that should have been in `master` as well. @stevepiercy [#4728](https://github.com/plone/volto/issues/4728)
- Fix link in Volto, remove from linkcheck ignore in Documentation. @stevepiercy [#4742](https://github.com/plone/volto/issues/4742)
- Fix glossary warning due to lack of empty line before a term. @stevepiercy [#4820](https://github.com/plone/volto/issues/4820)
- Replace broken link for @albertcasado to use GitHub instead of Twitter. @stevepiercy [#4941](https://github.com/plone/volto/issues/4941)
- Added note that Pluggables are not compatible with server-side rendering (SSR). @Akshat2Jain [#4735](https://github.com/plone/volto/issues/4735)
- Replace broken link for @albertcasado to use GitHub instead of Twitter. @stevepiercy [#4941](https://github.com/plone/volto/issues/4941)
- Exclude video markup from `make text` builder. @stevepiercy [#4966](https://github.com/plone/volto/issues/4966)
- Add short comment for easier finding registered components. @ksuess [#5017](https://github.com/plone/volto/issues/5017)
- Fix 302 redirect in changelog. @stevepiercy [#5068](https://github.com/plone/volto/issues/5068)
- Update links to contributing. @stevepiercy [#5084](https://github.com/plone/volto/issues/5084)
- Accept `plone` and `volto` in labels with janky regex. Include Vale styles directory for checking spelling and styles. @stevepiercy [#5095](https://github.com/plone/volto/issues/5095)
- Fix linkcheckbroken 301 redirect to https://www.dlr.de/de @stevepiercy [#5131](https://github.com/plone/volto/issues/5131)
- Update documentation: instruction 'make develop' to fetch add-on from repository. @ksuess [#5195](https://github.com/plone/volto/issues/5195)
- Document the `querystringSearchGet` setting @erral [#5206](https://github.com/plone/volto/issues/5206)
- Add new website IPN [pbauer] [#5241](https://github.com/plone/volto/issues/5241)

## 17.0.0-alpha.30 (2023-09-28)

### Bugfix

- Fix dependency problem, 'moment-locales-webpack-plugin' can't be in devDeps, since Razzle needs it in the projects. @sneridagh [#5236](https://github.com/plone/volto/issues/5236)


## 17.0.0-alpha.28 (2023-09-28)

### Breaking

- Updated Prettier @sneridagh
  Upgrade Stylelint @sneridagh
  Fixed introduced violations due to the upgrades @sneridagh
  Updated HTML block and prettier loadables to match the new async Prettier plugin API @sneridagh [#5216](https://github.com/plone/volto/issues/5216)
- Improve linked headlines after feedback:
  Disable the feature for anonymous users of the website
  Disable it for the page title
  Change the wording of the notification from "Link copied to clipboard" to "Anchor link copied to the clipboard" to make it more obvious that an anchor link has been copied
  Normalize the slug to use only ascii characters
  @sneridagh [#5225](https://github.com/plone/volto/issues/5225)

### Feature

- Refactor PersonalTools component -@Tishasoumya-02 [#4954](https://github.com/plone/volto/issues/4954)
- Refactor Sidebar component-@Tishasoumya-02 [#4964](https://github.com/plone/volto/issues/4964)
- Refactor ContentsPropertiesModal -@Tishasoumya-02 [#4968](https://github.com/plone/volto/issues/4968)
- Refactor ContentsWorkflowModal -@Tishasoumya-02 [#4969](https://github.com/plone/volto/issues/4969)
- Refactor ContentsRenameModal -@Tishasoumya-02 [#4970](https://github.com/plone/volto/issues/4970)
- Refactor ContentsTagsModal -@Tishasoumya-02 [#4971](https://github.com/plone/volto/issues/4971)
- Updated Spanish translations @macagua [#5200](https://github.com/plone/volto/issues/5200)
- add canonical link @mamico [#5215](https://github.com/plone/volto/issues/5215)

### Bugfix

- Improved accessibility by adding an `aria-label` to the search icon on sharing page. @ZubairImtiaz3 [#5124](https://github.com/plone/volto/issues/5124)
- Fixed PreviewImage component to work as Image component when testing image, and added showDefault prop to PreviewImage [#5153](https://github.com/plone/volto/issues/5153)
- Fix empty slate text block in table of contents. @kreafox [#5156](https://github.com/plone/volto/issues/5156)
- Remove integration with volto-style-block, as it's not working anymore @dobri1408 [#5192](https://github.com/plone/volto/issues/5192)
- Fix standalone navigation action call if expander is set @sneridagh [#5197](https://github.com/plone/volto/issues/5197)
- Updated the deprecated Buffer.from package in create-addons-loader.js @Junko-Takeguchi [#5205](https://github.com/plone/volto/issues/5205)
- restrict moment.js locales to supported languages @mamico [#5207](https://github.com/plone/volto/issues/5207)
- Fix links to link integrity in delete modal @sneridagh [#5226](https://github.com/plone/volto/issues/5226)

### Internal

- Redistribute Cypress Basic Core tests into other jobs @sneridagh [#5199](https://github.com/plone/volto/issues/5199)
- Update to latest plone.restapi and Plone 6.0.7 @sneridagh [#5213](https://github.com/plone/volto/issues/5213)

### Documentation

- Update documentation: instruction 'make develop' to fetch add-on from repository. @ksuess [#5195](https://github.com/plone/volto/issues/5195)
- Document the `querystringSearchGet` setting @erral [#5206](https://github.com/plone/volto/issues/5206)


## 17.0.0-alpha.27 (2023-09-18)

### Feature

- TypeScript support in core @sneridagh @ninanoleto [#4662](https://github.com/plone/volto/issues/4662)
- Add external className to slate Link view. @iFlameing [#5109](https://github.com/plone/volto/issues/5109)

### Bugfix

- Update delete-content modal to simplify text and improve UX @danlavrz [#4786](https://github.com/plone/volto/issues/4786)


## 17.0.0-alpha.26 (2023-09-14)

### Breaking

- Upgrade to Cypress 13 @sneridagh [#5163](https://github.com/plone/volto/issues/5163)
- Removed support for Node.js 16. It is no longer supported by the Node.js community. @davisagli [#5166](https://github.com/plone/volto/issues/5166)

### Feature

- Use the `@navroot` endpoint to build the `title` tag. @erral

  Use the `@site` endpoint to render the logo. @erral

  Register a widget to set the logo in the site control panel. @erral [#3537](https://github.com/plone/volto/issues/3537)
- Refactor Navigation -@Tishasoumya-02 [#4076](https://github.com/plone/volto/issues/4076)
- Added loading spinner and disable search button while data is fetching. @tedw87 [#4551](https://github.com/plone/volto/issues/4551)
- User Control panel improvements. See #4551 @erral [#4572](https://github.com/plone/volto/issues/4572)
- Messages Component Refactor - @Tishasoumya-02 [#4926](https://github.com/plone/volto/issues/4926)
- Refactor Login -@Tishasoumya-02 [#4933](https://github.com/plone/volto/issues/4933)
- Add external className to UniversalLink for external link. @iFlameing [#5109](https://github.com/plone/volto/issues/5109)
- Updated Spanish translation @macagua [#5120](https://github.com/plone/volto/issues/5120)
- (feat): Update toc block entries @dobri1408 [#5146](https://github.com/plone/volto/issues/5146)
- Views cypress test -@Tishasoumya [#5149](https://github.com/plone/volto/issues/5149)
- Added support for Node.js 20. @davisagli [#5166](https://github.com/plone/volto/issues/5166)
- Cypress test to test if 'Search results: number' text is present @ionlizarazu [#5171](https://github.com/plone/volto/issues/5171)

### Bugfix

- Fix for responsive error in the login page when the width of the screen decreases. @suman9893 [#3250](https://github.com/plone/volto/issues/3250)
- Fix back button in the search block to execute the search by adding two useEffects that update the facets and search data based on the current URL. @MihaelaCretu11 [#4402](https://github.com/plone/volto/issues/4402)
- fix : RecursiveWidget is incorrectly translated. @suman9893 [#4503](https://github.com/plone/volto/issues/4503)
- Fix use of CSS modules in webpack 5. @wesleybl [#5019](https://github.com/plone/volto/issues/5019)
- Fix toc accessibility issue @dobri1408 [#5058](https://github.com/plone/volto/issues/5058)
- Fix storybook config for project generator. Add support for SCSS, upgrade to webpack 5 in there as well. @sneridagh [#5132](https://github.com/plone/volto/issues/5132)
- Don't show ``No value`` option in SelectWidget and ArrayWidget if default value is 0. @wesleybl [#5151](https://github.com/plone/volto/issues/5151)
- Fix SelectWidget throwing error when editing a recently created content. @iFlameing [#5154](https://github.com/plone/volto/issues/5154)
- Fix editing layout for blocks using schema enhancers. @iFlameing, @davisagli [#5158](https://github.com/plone/volto/issues/5158)
- Fix ContentRules add and edit forms for languages other than English. @ericof [#5161](https://github.com/plone/volto/issues/5161)
- Fix search block search results number @ionlizarazu [#5171](https://github.com/plone/volto/issues/5171)
- fix flaky cypress in blocks-listing.js @nileshgulia1 [#5173](https://github.com/plone/volto/issues/5173)
- Fix regression in forms input in toolbar height related to (#5115) @sneridagh [#5176](https://github.com/plone/volto/issues/5176)

### Documentation

- Fix linkcheckbroken 301 redirect to https://www.dlr.de/de @stevepiercy [#5131](https://github.com/plone/volto/issues/5131)


## 17.0.0-alpha.25 (2023-08-25)

### Breaking

- Spin off relation stats action. Get relation stats with getRelationStats() instead of with queryRelations(). @ksuess
  Refactor relations actions: slightly change the shape of the redux state for `queryRelations` to follow common signatures. @ksuess [#5041](https://github.com/plone/volto/issues/5041)

### Feature

- Refactor Comment -@Tishasoumya-02 [#4074](https://github.com/plone/volto/issues/4074)
- Refactor Logout component @Tishasoumya-02 [#4860](https://github.com/plone/volto/issues/4860)
- Refactore SearchTags @Tishasoumya-02 [#4873](https://github.com/plone/volto/issues/4873)

### Bugfix

- Allow a user to register when they use an email address as their username. [#5031](https://github.com/plone/volto/issues/5031) @mehedikhan72 [#5031](https://github.com/plone/volto/issues/5031)
- Fix querystringResults subrequests id, to work properly in duplicate pages where blocks id's are the same. @giuliaghisini [#5070](https://github.com/plone/volto/issues/5070)
- Fix i18n for link settings fieldset in the image block @iRohitSingh [#5075](https://github.com/plone/volto/issues/5075)
- Prevent caching the outdated browser message in a shared cache. @davisagli [#5076](https://github.com/plone/volto/issues/5076)
- Fix accessibility of the content folder buttons. @SaraBianchi [#5101](https://github.com/plone/volto/issues/5101)
- For folders inside navigation roots, properly fetch navigation from the
  navroot, rather then the site root  @tiberiuichim [#5106](https://github.com/plone/volto/issues/5106)
- Fix uncached case when the widget is slate on diff @dobri1408 [#5107](https://github.com/plone/volto/issues/5107)
- Fix load addon translations: last addon translations wins @giuliaghisini [#5113](https://github.com/plone/volto/issues/5113)
- [Visual bugfix] Match the original mockups for PastanagaUI in regards of the error messages in form field elements @sneridagh [#5115](https://github.com/plone/volto/issues/5115)
- Fix default toc renderer for nested entries @pnicolli [#5116](https://github.com/plone/volto/issues/5116)
- Fix inherit checkbox in sharing view @sneridagh [#5514](https://github.com/plone/volto/issues/5514)

### Internal

- Improved spellcheck to keep spellings consistent. @chirayu-humar [#1190](https://github.com/plone/volto/issues/1190)

### Documentation

- Update links to contributing. @stevepiercy [#5084](https://github.com/plone/volto/issues/5084)
- Accept `plone` and `volto` in labels with janky regex. Include Vale styles directory for checking spelling and styles. @stevepiercy [#5095](https://github.com/plone/volto/issues/5095)


## 17.0.0-alpha.24 (2023-08-09)

### Breaking

- Update `@plone/scripts` to 3.0.0. @davisagli [#5040](https://github.com/plone/volto/issues/5040)

### Bugfix

- Fix handling of exceptions in reducers. @davisagli [#5069](https://github.com/plone/volto/issues/5069)
- Add missing i18n for ToC block. @davisagli [#5073](https://github.com/plone/volto/issues/5073)

### Documentation

- Fix 302 redirect in changelog. @stevepiercy [#5068](https://github.com/plone/volto/issues/5068)

### Internal

- Add https://www.dlr.de/de to "Volto in production" list. @tisto [#5112](https://github.com/plone/volto/pull/5112)

## 17.0.0-alpha.23 (2023-07-28)

### Bugfix

- Fix regression from v17a22: It was not possible to select a block in a grid
  column unless the grid was already selected. @davisagli

  Fix regression from v17a22: Block outline was blocking clicks in some cases.
  @davisagli [#5039](https://github.com/plone/volto/issues/5039)


## 17.0.0-alpha.22 (2023-07-28)

### Feature

- Refactor Delete -@Tishasoumya [#4890](https://github.com/plone/volto/issues/4890)
- Refactor workflow -@Tishasoumya-02 [#4902](https://github.com/plone/volto/issues/4902)
- Refactor Request Reset Password-@Tishasoumya-02 [#4938](https://github.com/plone/volto/issues/4938)
- Refactor Actions-@Tishasoumya-02 [#4939](https://github.com/plone/volto/issues/4939)
- Refactor Blocks/Maps/Edit component -@Tishasoumya-02 [#4958](https://github.com/plone/volto/issues/4958)
- Updated Italian translations @sabrina-bongiovanni [#4987](https://github.com/plone/volto/issues/4987)
- Made selectedView and className props available in the SearchBlockView.jsx to improve styling development. @danalvrz [#4997](https://github.com/plone/volto/issues/4997)

### Bugfix

- Fix Volto contents - set properties Exclude from navigation - bad request, set exclude_from_nav to boolean [#4855](https://github.com/plone/volto/issues/4855)
- Add XSendfile headers to files and images middleware @instification [#4984](https://github.com/plone/volto/issues/4984)
- search-block: translate some missing strings to german and fix a typo. @pbauer [#4996](https://github.com/plone/volto/issues/4996)
- Add image block className support (Style wrapper). @sneridagh [#5018](https://github.com/plone/volto/issues/5018)
- Fix for 'no value' entry in table of content field. @satyam4p [#5022](https://github.com/plone/volto/issues/5022)
- Fix updating roles when username contains a period (.). @nileshgulia1 [#5025](https://github.com/plone/volto/issues/5025)
- Fix hover and focused border for block child. @claudiaifrim [#5028](https://github.com/plone/volto/issues/5028)
- Enhance display and repairing of broken relations. @ksuess [#5033](https://github.com/plone/volto/issues/5033)
- Fix selecting grid block when a sub-block is selected. @davisagli [#5036](https://github.com/plone/volto/issues/5036)
- Update versions of semver and release-it. @davisagli [#5053](https://github.com/plone/volto/issues/5053)

### Documentation

- Add short comment for easier finding registered components. @ksuess [#5017](https://github.com/plone/volto/issues/5017)


## 17.0.0-alpha.21 (2023-07-23)

### Breaking

- Added new Image component to render optimized images @pnicolli @davisagli [#3337](https://github.com/plone/volto/issues/3337)

### Feature

- Add getFieldURL helper function used to get the url value of a field based on its structure. @razvanMiu [#2252](https://github.com/plone/volto/issues/2252)

### Bugfix

- Fix delete confirmation to handle empty `breaches`. @davisagli [#4832](https://github.com/plone/volto/issues/4832)

### Internal

- Upgrade to Cypress 12.17.1 (latest) @sneridagh [#4981](https://github.com/plone/volto/issues/4981)


## 17.0.0-alpha.20 (2023-07-18)

### Feature

- Use all the apiExpanders in use, so we perform a single request for getting all the required data. @sneridagh [#4946](https://github.com/plone/volto/issues/4946)

### Bugfix

- Fix the condition deciding on listing pagination format so it takes into account container blocks as well @sneridagh [#4978](https://github.com/plone/volto/issues/4978)


## 17.0.0-alpha.19 (2023-07-18)

### Feature

- Add /ok route as an express middleware @ionlizarazu [#4375](https://github.com/plone/volto/issues/4375)
- Add `Links to item` view (available via object's more menu) @pgrunewald [#4787](https://github.com/plone/volto/issues/4787)
- Tune 'Links to item' view to 'Links and references' view. Show all relation types. @ksuess @stevepiercy [#4842](https://github.com/plone/volto/issues/4842)
- Update browserlist to latest @sneridagh [#4977](https://github.com/plone/volto/issues/4977)

### Bugfix

- Handle condition for yearly frequency in recurrence @BhuvaneshPatil [#4498](https://github.com/plone/volto/issues/4498)
- Fix search block input clear button doesn't reset the search @iFlameing [#4828](https://github.com/plone/volto/issues/4828)

### Internal

- Update to latest plone.restapi and Plone 6.0.6 @sneridagh [#4979](https://github.com/plone/volto/issues/4979)
- Remove dangling out of place Guillotina Cypress tests @sneridagh [#4980](https://github.com/plone/volto/issues/4980)


## 17.0.0-alpha.18 (2023-07-16)

### Feature

- Refactor CommentEdit -@Tishasoumya-02 [#4075](https://github.com/plone/volto/issues/4075)
- Facets should be able to decide themselves if they should show or not. Made defaultShowFacet to be a fallback in case there is no custom function for each facet type. @tedw87 [#4579](https://github.com/plone/volto/issues/4579)
- Add backward compatibility to `slate_richtext` with fields that are plain text @razvanMiu [#4796](https://github.com/plone/volto/issues/4796)
- Refactor-Contact Form @Tishasoumya-02 [#4850](https://github.com/plone/volto/issues/4850)
- Refactor BreadcrumbsComponent @Tishasoumya-02 [#4858](https://github.com/plone/volto/issues/4858)
- Refactor SearchWidget @Tishasoumya-02 [#4864](https://github.com/plone/volto/issues/4864)
- Refactor LinkView -@Tishasoumya-02 [#4866](https://github.com/plone/volto/issues/4866)
- Use container from component registry in content type views, if defined. @sneridagh [#4962](https://github.com/plone/volto/issues/4962)

### Bugfix

- Fix temporary rendering of folder contents while query results are loading. @davisagli [#4351](https://github.com/plone/volto/issues/4351)
- Fix isBlacklisted method check for volto externalRoutes [#4725](https://github.com/plone/volto/issues/4725)
- fix(styleMenu): Highlight selected block styles @nileshgulia1 [#4851](https://github.com/plone/volto/issues/4851)
- Fix tablet main menu. [#4859](https://github.com/plone/volto/issues/4859)
- Fix the table of contents block so that if one or more items get out of the viewport, a dropdown menu appears with all the items that do not fit the viewport and also added an option to make the TOC sticky. @MihaelaCretu11 [#4907](https://github.com/plone/volto/issues/4907)
- Add a marker in the props passed to `RenderBlocks` in the Grid block view @sneridagh [#4932](https://github.com/plone/volto/issues/4932)
- Typo in Italian locales @mamico [#4944](https://github.com/plone/volto/issues/4944)
- Fix handling of overriden image in Teaser, improve in case that a custom image component is present. @sneridagh [#4964](https://github.com/plone/volto/issues/4964)
- Fix slateTable still uses old style of sidebar generation @iFlameing [#4972](https://github.com/plone/volto/issues/4972)
- Fix password autocomplete hint for login form. @davisagli [#4976](https://github.com/plone/volto/issues/4976)

### Internal

- Upgrade bundlewatch to 0.3.3. @wesleybl [#4967](https://github.com/plone/volto/issues/4967)

### Documentation

- Added note that Pluggables are not compatible with server-side rendering (SSR). @Akshat2Jain [#4735](https://github.com/plone/volto/issues/4735)
- Replace broken link for @albertcasado to use GitHub instead of Twitter. @stevepiercy [#4941](https://github.com/plone/volto/issues/4941)
- Exclude video markup from `make text` builder. @stevepiercy [#4966](https://github.com/plone/volto/issues/4966)


## 17.0.0-alpha.17 (2023-07-11)

### Breaking

- Remove useToken & useContent hooks-@Tishasoumya-02 [#4951](https://github.com/plone/volto/issues/4951)

### Feature

- Use container from component registry in content type views, if defined. @sneridagh [#4962](https://github.com/plone/volto/issues/4962)

### Bugfix

- Fix temporary rendering of folder contents while query results are loading. @davisagli [#4351](https://github.com/plone/volto/issues/4351)
- Fix isBlacklisted method check for volto externalRoutes [#4725](https://github.com/plone/volto/issues/4725)
- Add a marker in the props passed to `RenderBlocks` in the Grid block view @sneridagh [#4932](https://github.com/plone/volto/issues/4932)
- Fix handling of overriden image in Teaser, improve in case that a custom image component is present. @sneridagh [#4964](https://github.com/plone/volto/issues/4964)

### Documentation

- Replace broken link for @albertcasado to use GitHub instead of Twitter. @stevepiercy [#4941](https://github.com/plone/volto/issues/4941)


## 17.0.0-alpha.16 (2023-06-28)

### Feature

- New block: Grid - A container of blocks, arranged in horizontal direction. @sneridagh
  New primitive: Container - A primitive to build blocks containing other blocks. @sneridagh [#3180](https://github.com/plone/volto/issues/3180)


## 17.0.0-alpha.15 (2023-06-28)

### Breaking

- Use proper heading tag (depending on the headline) in default listing template @sneridagh [#4848](https://github.com/plone/volto/issues/4848)

### Bugfix

- Remove anonymous function calls. Remove default exports from. @sneridagh [#4917](https://github.com/plone/volto/issues/4917)
- Fix Annontools StoryBook @sneridagh [#4921](https://github.com/plone/volto/issues/4921)
- Fix the experimental add new block button position, compensate the icon width to center it correctly @sneridagh [#4924](https://github.com/plone/volto/issues/4924)

### Internal

- Add Storybook story for useDetectClickOutside hook with several demos @sneridagh [#4923](https://github.com/plone/volto/issues/4923)


## 17.0.0-alpha.14 (2023-06-23)

### Feature

- Added slug-based linked headings in `volto-slate`. @tiberiuichim, @nileshgulia1 [#4287](https://github.com/plone/volto/issues/4287)
- Refactored Anontools components. @Tishasoumya-02 [#4845](https://github.com/plone/volto/issues/4845)

### Bugfix

- Update to version 6.0.5 of Plone backend. @davisagli [#4897](https://github.com/plone/volto/issues/4897)


## 17.0.0-alpha.13 (2023-06-15)

### Feature

- Add and enforce a new config setting, `maxFileUploadSize`. @davisagli [#4868](https://github.com/plone/volto/issues/4868)

### Bugfix

- Fix and improve the `addStyling` helper @sneridagh [#4880](https://github.com/plone/volto/issues/4880)


## 17.0.0-alpha.12 (2023-06-14)

### Feature

- Allow to deselect color in ColorPickerWidget. @ksuess [#4838](https://github.com/plone/volto/issues/4838)
- Configurable Container component from registry for some key route views. @sneridagh [#4871](https://github.com/plone/volto/issues/4871)

### Bugfix

- Fix regression in horizontal scroll in contents view, add it back @sneridagh [#4872](https://github.com/plone/volto/issues/4872)


## 17.0.0-alpha.11 (2023-06-09)

### Bugfix

- Added current page parameter to route in listing and search block pagination - Fix: #3868 @bipoza [#4159](https://github.com/plone/volto/issues/4159)


## 17.0.0-alpha.10 (2023-06-09)

### Feature

- Search Block: Add support for advanced facets that are only displayed on demand.
  [pbauer, razvanMiu, claudiaifrim] [#4783](https://github.com/plone/volto/issues/4783)
- Display PAS validation errors. [tschorr] [#4801](https://github.com/plone/volto/issues/4801)
- Added a CSS identifier to the Slate style menu options. @razvanMiu [#4846](https://github.com/plone/volto/issues/4846)
- Use a Container from the registry in the Form component and fallback to the Semantic UI one. @sneridagh [#4849](https://github.com/plone/volto/issues/4849)
- Update Brazilian Portuguese translations @ericof [#4853](https://github.com/plone/volto/issues/4853)

### Bugfix

- Convert header class to function. @gomez [#4767](https://github.com/plone/volto/issues/4767)
- Do not break validation on required number field with value 0 @cekk [#4841](https://github.com/plone/volto/issues/4841)


## 17.0.0-alpha.9 (2023-06-01)

### Bugfix

- Fix special characters in request urls @pnicolli @mamico @luca-bellenghi @cekk [#4825](https://github.com/plone/volto/issues/4825)
- Fix block is undefined in StyleWrapper helper when building classnames @sneridagh [#4827](https://github.com/plone/volto/issues/4827)
- Fix navigation sections in 404 pages @sneridagh [#4836](https://github.com/plone/volto/issues/4836)

### Documentation

- Fix glossary warning due to lack of empty line before a term. @stevepiercy [#4820](https://github.com/plone/volto/issues/4820)


## 17.0.0-alpha.8 (2023-05-24)

### Feature

- Add Finnish translation (contributed by @rioksane) @erral [#4084](https://github.com/plone/volto/issues/4084)

### Bugfix

- Fixed the issue "shouldn't use a hook like function name for a variable" @Kaku-g [#4693](https://github.com/plone/volto/issues/4693)
- Fix to not update breadrumbs, navigation, actions, and types when content is fetched as a subrequest and apiExpanders includes these components. @davisagli [#4760](https://github.com/plone/volto/issues/4760)
- Fix bug where editors could not see their own content in the Contents view if it was expired or has a future effective date. @davisagli [#4764](https://github.com/plone/volto/issues/4764)
- Fix bug showing logs at the browsers when richtext widget is use @claytonc [#4780](https://github.com/plone/volto/issues/4780)
- Update relations control panel layout @danalvrz [#4794](https://github.com/plone/volto/issues/4794)
- Fix hot module reloading of changes to `@plone/volto`. @davisagli [#4799](https://github.com/plone/volto/issues/4799)
- Add guard in case of malformed blocks are present (at least id and title should be present) @sneridagh [#4802](https://github.com/plone/volto/issues/4802)
- Fix html tag lang attribute in SSR @sneridagh [#4803](https://github.com/plone/volto/issues/4803)
- Add newest supported languages to `Language` constants list @sneridagh [#4811](https://github.com/plone/volto/issues/4811)

### Internal

- Remove max_line_length from .editorconfig @pnicolli [#4776](https://github.com/plone/volto/issues/4776)
- Fix unannounced breaking change in cypress-io/github-action @sneridagh [#4795](https://github.com/plone/volto/issues/4795)


## 17.0.0-alpha.7 (2023-05-11)

### Bugfix

- Fix language negotiation for language codes that include a region (e.g. `pt-br`). @davisagli [#4644](https://github.com/plone/volto/issues/4644)


## 17.0.0-alpha.6 (2023-05-11)

### Feature

- Changed control panel list to be fetched server-side not client-side
  @JeffersonBledsoe [#3749](https://github.com/plone/volto/issues/3749)

### Bugfix

- Apply suggestion from browser for password field @lord2anil [#3990](https://github.com/plone/volto/issues/3990)
- Open all accordion'd content in InlineForm by default, allow arbitrarily close any number of them. @sneridagh [#4178](https://github.com/plone/volto/issues/4178)
- Fix duplicating listing block by removing block uid from blocks data. @ksuess [#4234](https://github.com/plone/volto/issues/4234)
- The tabs for the add page was unresponsive on mobile devices. Fixed this by changing flex-wrap property. @sudhanshu1309 [#4506](https://github.com/plone/volto/issues/4506)
- (fix):Object.normaliseMail: Cannot read properties of null @dobri1408 [#4558](https://github.com/plone/volto/issues/4558)
- Update add-on control panel tranlsations: install -> activate. @ksuess [#4582](https://github.com/plone/volto/issues/4582)
- Fix robot.txt - the sitemap link should respect x-forwarded headers @reebalazs [#4638](https://github.com/plone/volto/issues/4638)
- Fix Move to top of folder ordering in folder content view by searching also @iFlameing [#4690](https://github.com/plone/volto/issues/4690)
- Fix faulty D&D elements in ObjectBrowserList widget @sneridagh [#4703](https://github.com/plone/volto/issues/4703)
- Fix fetching API paths with urlencoded characters in the querystring. @davisagli [#4718](https://github.com/plone/volto/issues/4718)

### Internal

- Change conditional checking to optional chaining for a theme icon @nilootpal [#4567](https://github.com/plone/volto/issues/4567)
- Security upgrade for momentjs [#4715](https://github.com/plone/volto/issues/4715)
- Upgrade to Plone 6.0.4 @sneridagh [#4743](https://github.com/plone/volto/issues/4743)

### Documentation

- Added documentation regarding the static middleware. @BhardwajAditya-github [#4518](https://github.com/plone/volto/issues/4518)
- Use new URL `6.docs.plone.org`. @stevepiercy [#4726](https://github.com/plone/volto/issues/4726)
- Synch stuff from `16.x.x` branch that should have been in `master` as well. @stevepiercy [#4728](https://github.com/plone/volto/issues/4728)
- Fix link in Volto, remove from linkcheck ignore in Documentation. @stevepiercy [#4742](https://github.com/plone/volto/issues/4742)


## 17.0.0-alpha.5 (2023-04-14)

### Bugfix

- Generate a split sitemap @reebalazs [#4638](https://github.com/plone/volto/issues/4638)
- Fix Move to top of folder ordering in folder content view @iFlameing [#4690](https://github.com/plone/volto/issues/4690)
- Revert "Add current page parameter to the route in the listing and search block pagination (#4159)" @sneridagh [#4695](https://github.com/plone/volto/issues/4695)
- Fix search block in edit mode re-queries multiple blocks with an empty search text @reebalazs [#4697](https://github.com/plone/volto/issues/4697)

### Documentation

- Update links for 2022 Training archive. @stevepiercy [#4635](https://github.com/plone/volto/issues/4635)


## 17.0.0-alpha.4 (2023-04-12)

### Feature

- DefaultView (view of fields for content types with blocks disabled): Show field name as tip on hover of label. @ksuess [#4598](https://github.com/plone/volto/issues/4598)
- Support RelationList field with named StaticCatalogVocabulary and SelectWidget. @ksuess [#4614](https://github.com/plone/volto/issues/4614)
- Support for declaring a theme in `volto.config.js` or in `package.json`
  Add two entry points to allow extension of a theme from other add-ons. @sneridagh [#4625](https://github.com/plone/volto/issues/4625)
- Set sameSite in I18N_LANGUAGE cookie @sneridagh [#4627](https://github.com/plone/volto/issues/4627)
- Added querystring search get option. @robgietema [#4658](https://github.com/plone/volto/issues/4658)

### Bugfix

- Added current page parameter to route in listing and search block pagination - Fix: #3868 @bipoza [#4159](https://github.com/plone/volto/issues/4159)
- Fix regexp that checks valid URLs and improve tests [cekk] [#4601](https://github.com/plone/volto/issues/4601)
- Fixed wrong localization on password reset page @iRohitSingh [#4656](https://github.com/plone/volto/issues/4656)
- fix sitemap.xml.gz not is not compressed @dobri1408 [#4663](https://github.com/plone/volto/issues/4663)

### Internal

- Trigger CI workflows to run from external pull requests. @davisagli [#4629](https://github.com/plone/volto/issues/4629)
- Update to p.restapi 8.36.0 and Plone 6.0.3 @sneridagh [#4682](https://github.com/plone/volto/issues/4682)

### Documentation

- Added `JavaScript` and `NodeJS` as accepted spellings, and deviations of them as rejected spellings. @utkkkarshhh [#3092](https://github.com/plone/volto/issues/3092)
- Fix documentation build, add pins @sneridagh [#4626](https://github.com/plone/volto/issues/4626)
- Update Volto contributing to align with and refer to the new Plone core code contributing requirements. @stevepiercy [#4634](https://github.com/plone/volto/issues/4634)
- Improve creating views documentation page. @rboixaderg [#4636](https://github.com/plone/volto/issues/4636)
- Razzle upgrade notice in upgrade guide @sneridagh [#4641](https://github.com/plone/volto/issues/4641)
- Rename "Developer Guidelines" to "Contributing". @stevepiercy [#4666](https://github.com/plone/volto/issues/4666)
- Fix broken link to `ReactJS.org`. @stevepiercy [#4667](https://github.com/plone/volto/issues/4667)


## 17.0.0-alpha.3 (2023-03-22)

### Feature

- Add Vale to CI for spell and style checks. @MAX-786 [#4423](https://github.com/plone/volto/issues/4423)

### Bugfix

- Fix Search is case sensitive in Block chooser @iRohitSingh [#4526](https://github.com/plone/volto/issues/4526)
- InternalURl helper method should incorporate externalRoutes settings into consideration. @iFlameing [#4559](https://github.com/plone/volto/issues/4559)
- Update message add-on control panel: remove 'buildout', update reference. @ksuess [#4574](https://github.com/plone/volto/issues/4574)

### Documentation

- Deleted duplicate import and fixed training URLs. @yahya-cloud [#4523](https://github.com/plone/volto/issues/4523)
- Fix grammar in PR #4542. @stevepiercy [#4555](https://github.com/plone/volto/issues/4555)
- Fix broken links at `ReactJS.org`. @stevepiercy [#4569](https://github.com/plone/volto/issues/4569)
- Fix video warnings and link errors. @stevepiercy [#4578](https://github.com/plone/volto/issues/4578)


## 17.0.0-alpha.2 (2023-03-15)

### Breaking

- Add custom CSS animation to hamburger menu. Removed `hamburgers` dependency. @danalvrz [#4433](https://github.com/plone/volto/issues/4433)
- Improve i18n script ordering of addons, so that addons can override translations from their dependencies. @davisagli [#4495](https://github.com/plone/volto/issues/4495)

### Feature

- Add option to hide empty listing blocks @ksuess [#4393](https://github.com/plone/volto/issues/4393)

### Bugfix

- Update build dependencies (razzle and react-dev-utils) @davisagli [#3997](https://github.com/plone/volto/issues/3997)
- Added block prop to BlockDataForm in the Edit component of ToC. If block is not passed, OnChangeBlock will be called with undefined block id. @tedw87 [#4110](https://github.com/plone/volto/issues/4110)
- Fix focus steal in Form @tedw87 [#4230](https://github.com/plone/volto/issues/4230)
- Fixed paste issue in Table Block and added cypress test for pasting text in Table Block. [#4301](https://github.com/plone/volto/issues/4301)
- Fixed i18n script to avoid overwriting translations with an empty msgstr @danalvrz [#4316](https://github.com/plone/volto/issues/4316)
- bugfix: conditionally render all delete items in confirm widget [#4336](https://github.com/plone/volto/issues/4336)
- Make the Site Setup control panel responsive for small screen devices. @lord2anil [#4484](https://github.com/plone/volto/issues/4484)
- The menu for the contents page was unresponsive on mobile devices. Fixed this by changing the menu overflow to scroll. @sudhanshu1309 [#4492](https://github.com/plone/volto/issues/4492)
- Make Drag and Drop list work with container-type inline-size. @robgietema [#4497](https://github.com/plone/volto/issues/4497)
- (fix): Paste button disappearing while coping from nested blocks @dobri1408 [#4505](https://github.com/plone/volto/issues/4505)
- Patch updates for some dependencies. @davisagli [#4520](https://github.com/plone/volto/issues/4520)
- Fix flaky Cypress test introduced in #4521 @sneridagh [#4522](https://github.com/plone/volto/issues/4522)

### Documentation

- Fix training urls @ksuess [#4502](https://github.com/plone/volto/issues/4502)
- Add upgrade guide for 4504 @sneridagh [#4542](https://github.com/plone/volto/issues/4542)


## 17.0.0-alpha.1 (2023-03-09)

### Feature

- - Add directive to cache stable resources in browser or intermediate server for 365 days by default directly in the SSR Express server, static resource that could change after a new deployment for 1 minute. @mamico [#2216](https://github.com/plone/volto/issues/2216)
- Use popperjs in BlockChooser, move the markup to the bottom of the body tag. @sneridagh [#4141](https://github.com/plone/volto/issues/4141)
- Improvements to the dev API proxy:
  - Prefer RAZZLE_INTERNAL_API_PATH over RAZZLE_API_PATH as the target of the proxy.
    The target of the API proxy is now always logged on startup, even in production mode.
  - Support proxying to a backend served over https. For this configuration it
    might be necessary to set RAZZLE_DEV_PROXY_INSECURE=1 if the backend
    certificate can't be verified.

  [davisagli] [#4434](https://github.com/plone/volto/issues/4434)

### Bugfix

- fix: newsitem and event views wrapper classNames @nzambello [#4443](https://github.com/plone/volto/issues/4443)
- Fix weird GHA failure on config option not supported @sneridagh [#4466](https://github.com/plone/volto/issues/4466)
- Fix history view dropdown for first entry, showing 'Revert to this version option' always @sneridagh [#4471](https://github.com/plone/volto/issues/4471)
- Fix order of row of long table in edit and view mode @iFlameing [#4473](https://github.com/plone/volto/issues/4473)
- Improve flaky test in autofocus Cypress tests @sneridagh [#4475](https://github.com/plone/volto/issues/4475)

### Documentation

- Complete teaser docs, add new section in `Blocks`: `Core Blocks developers notes` @sneridagh [#4461](https://github.com/plone/volto/issues/4461)
- Change from links to inline literals in `CHANGELOG.md` to fix linkcheckbroken. @stevepiercy [#4470](https://github.com/plone/volto/issues/4470)


## 17.0.0-alpha.0 (2023-03-04)

### Breaking

- Volto 17 drops support for NodeJS 14, and adds support for Node.js 18.
  Please see the [upgrade guide](https://6.docs.plone.org/volto/upgrade-guide/index.html)
  for more information.

  Volto 17 now uses Webpack 5. [#4086](https://github.com/plone/volto/issues/4086)

### Internal

- Add HI-ERN website to "Volto in Production" section in README @steffenri [#4172](https://github.com/plone/volto/issues/4172)

### Documentation

- Add a new Volto site to the README @erral [#4158](https://github.com/plone/volto/issues/4158), [#4170](https://github.com/plone/volto/issues/4170)
- Add new websites Lanku and UEU
  [erral] [#4310](https://github.com/plone/volto/issues/4310)
- Fix English and MyST grammar and syntax from PR #4285 @stevepiercy [#4331](https://github.com/plone/volto/issues/4331)
- Use a universal static path for both documentation and volto repos. @stevepiercy [#4376](https://github.com/plone/volto/issues/4376)


## 16.21.1 (2023-06-23)

### Bugfix

- Added current page parameter to route in listing and search block pagination - Fix: #3868 @bipoza [#4159](https://github.com/plone/volto/issues/4159)


## 16.21.0 (2023-06-16)

### Feature

- Display PAS validation errors. [tschorr] [#4801](https://github.com/plone/volto/issues/4801)
- Allow to deselect color in ColorPickerWidget. @ksuess [#4838](https://github.com/plone/volto/issues/4838)
- Added a CSS identifier to the Slate style menu options. @razvanMiu [#4846](https://github.com/plone/volto/issues/4846)
- Use a Container from the registry in the Form component and fallback to the Semantic UI one. @sneridagh [#4849](https://github.com/plone/volto/issues/4849)
- Add and enforce a new config setting, `maxFileUploadSize`. @davisagli [#4868](https://github.com/plone/volto/issues/4868)
- Configurable Container component from registry for some key route views. @sneridagh [#4871](https://github.com/plone/volto/issues/4871)

### Bugfix

- Do not break validation on required number field with value 0 @cekk [#4841](https://github.com/plone/volto/issues/4841)
- Fix regression in horizontal scroll in contents view, add it back @sneridagh [#4872](https://github.com/plone/volto/issues/4872)
- Fix and improve the `addStyling` helper @sneridagh [#4880](https://github.com/plone/volto/issues/4880)


## 16.20.8 (2023-06-01)

### Bugfix

- Fix special characters in request urls @pnicolli @mamico @luca-bellenghi @cekk [#4826](https://github.com/plone/volto/issues/4826)
- Fix block is undefined in StyleWrapper helper when building classnames @sneridagh [#4827](https://github.com/plone/volto/issues/4827)
- Fix navigation sections in 404 pages @sneridagh [#4836](https://github.com/plone/volto/issues/4836)

### Documentation

- Fix glossary warning due to lack of empty line before a term. @stevepiercy [#4820](https://github.com/plone/volto/issues/4820)


## 16.20.7 (2023-05-24)

### Bugfix

- Fixed the issue "shouldn't use a hook like function name for a variable" @Kaku-g [#4693](https://github.com/plone/volto/issues/4693)
- Fix to not update breadrumbs, navigation, actions, and types when content is fetched as a subrequest and apiExpanders includes these components. @davisagli [#4760](https://github.com/plone/volto/issues/4760)
- Fix bug where editors could not see their own content in the Contents view if it was expired or has a future effective date. @davisagli [#4764](https://github.com/plone/volto/issues/4764)
- Fix bug showing logs at the browsers when richtext widget is use @claytonc [#4780](https://github.com/plone/volto/issues/4780)
- Add guard in case of malformed blocks are present (at least id and title should be present) @sneridagh [#4802](https://github.com/plone/volto/issues/4802)
- Fix html tag lang attribute in SSR @sneridagh [#4803](https://github.com/plone/volto/issues/4803)
- Add newest supported languages to `Language` constants list @sneridagh [#4811](https://github.com/plone/volto/issues/4811)

### Internal

- Remove max_line_length from .editorconfig @pnicolli [#4776](https://github.com/plone/volto/issues/4776)
- Fix unannounced breaking change in cypress-io/github-action @sneridagh [#4795](https://github.com/plone/volto/issues/4795)


## 16.20.6 (2023-05-12)

### Bugfix

- Fix language negotiation for language codes that include a region (e.g. `pt-br`). @davisagli [#4644](https://github.com/plone/volto/issues/4644)


## 16.20.5 (2023-05-12)

### Bugfix

- Apply suggestion from browser for password field @lord2anil [#3990](https://github.com/plone/volto/issues/3990)
- The tabs for the add page was unresponsive on mobile devices. Fixed this by changing flex-wrap property. @sudhanshu1309 [#4506](https://github.com/plone/volto/issues/4506)
- (fix):Object.normaliseMail: Cannot read properties of null @dobri1408 [#4558](https://github.com/plone/volto/issues/4558)

### Internal

- Upgrade to Plone 6.0.4 @sneridagh [#4743](https://github.com/plone/volto/issues/4743)

### Documentation

- Added documentation regarding the static middleware. @BhardwajAditya-github [#4518](https://github.com/plone/volto/issues/4518)
- Backport most documentation differences from `master` to `16.x.x`. @stevepiercy [#4727](https://github.com/plone/volto/issues/4727)
- Fix link in Volto, remove from linkcheck ignore in Documentation. @stevepiercy [#4742](https://github.com/plone/volto/issues/4742)


## 16.20.4 (2023-04-20)

### Bugfix

- Fix fetching API paths with urlencoded characters in the querystring. @davisagli [#4718](https://github.com/plone/volto/issues/4718)

### Internal

- Security upgrade for momentjs [#4716](https://github.com/plone/volto/issues/4716)


## 16.20.3 (2023-04-18)

### Bugfix

- Revert inadvertently included files from another PR in #4710 @sneridagh [#4713](https://github.com/plone/volto/issues/4713)


## 16.20.2 (2023-04-18)

### Bugfix

- Fix robot.txt - the sitemap link should respect x-forwarded headers @reebalazs [#4638](https://github.com/plone/volto/issues/4638)
- Fix Move to top of folder ordering in folder content view by searching also @iFlameing [#4690](https://github.com/plone/volto/issues/4690)
- Fix faulty D&D elements in ObjectBrowserList widget @sneridagh [#4703](https://github.com/plone/volto/issues/4703)


## 16.20.1 (2023-04-14)

### Bugfix

- Generate a split sitemap @reebalazs [#4638](https://github.com/plone/volto/issues/4638)
- Fix Move to top of folder ordering in folder content view @iFlameing [#4690](https://github.com/plone/volto/issues/4690)
- Revert "Add current page parameter to the route in the listing and search block pagination (#4159)" @sneridagh [#4695](https://github.com/plone/volto/issues/4695)
- Fix search block in edit mode re-queries multiple blocks with an empty search text @reebalazs [#4697](https://github.com/plone/volto/issues/4697)


## 16.20.0 (2023-04-12)

### Feature

- Support RelationList field with named StaticCatalogVocabulary and SelectWidget. @ksuess [#4614](https://github.com/plone/volto/issues/4614)
- Support for declaring a theme in `volto.config.js` or in `package.json`
  Add two entry points to allow extension of a theme from other add-ons. @sneridagh [#4625](https://github.com/plone/volto/issues/4625)
- Added querystring search get option. @robgietema [#4658](https://github.com/plone/volto/issues/4658)

### Bugfix

- Added current page parameter to route in listing and search block pagination - Fix: #3868 @bipoza [#4159](https://github.com/plone/volto/issues/4159)
- Fixed wrong localization on password reset page @iRohitSingh [#4656](https://github.com/plone/volto/issues/4656)
- fix sitemap.xml.gz not is not compressed @dobri1408 [#4663](https://github.com/plone/volto/issues/4663)

### Internal

- Update to p.restapi 8.36.0 and Plone 6.0.3 @sneridagh [#4682](https://github.com/plone/volto/issues/4682)

### Documentation

- Update Volto contributing to align with and refer to the new Plone core code contributing requirements. @stevepiercy [#4634](https://github.com/plone/volto/issues/4634)
- Improve creating views documentation page. @rboixaderg [#4636](https://github.com/plone/volto/issues/4636)
- Rename "Developer Guidelines" to "Contributing". @stevepiercy [#4666](https://github.com/plone/volto/issues/4666)
- Fix broken link to `ReactJS.org`. @stevepiercy [#4667](https://github.com/plone/volto/issues/4667)


## 16.19.0 (2023-04-04)

### Feature

- DefaultView (view of fields for content types with blocks disabled): Show field name as tip on hover of label. @ksuess [#4598](https://github.com/plone/volto/issues/4598)
- Set sameSite in I18N_LANGUAGE cookie @sneridagh [#4627](https://github.com/plone/volto/issues/4627)

### Bugfix

- Fix regexp that checks valid URLs and improve tests [cekk] [#4601](https://github.com/plone/volto/issues/4601)

### Documentation

- Added `JavaScript` and `NodeJS` as accepted spellings, and deviations of them as rejected spellings. @utkkkarshhh [#3092](https://github.com/plone/volto/issues/3092)
- Fix documentation build, add pins @sneridagh [#4626](https://github.com/plone/volto/issues/4626)


## 16.18.0 (2023-03-22)

### Feature

- Add Vale to CI for spell and style checks. @MAX-786 [#4423](https://github.com/plone/volto/issues/4423)

### Bugfix

- Patch updates for some dependencies. @davisagli [#4520](https://github.com/plone/volto/issues/4520)
- InternalURl helper method should incorporate externalRoutes settings into consideration. @iFlameing [#4559](https://github.com/plone/volto/issues/4559)
- Update message add-on control panel: remove 'buildout', update reference. @ksuess [#4574](https://github.com/plone/volto/issues/4574)

### Documentation

- Fix broken links at `ReactJS.org`. @stevepiercy [#4569](https://github.com/plone/volto/issues/4569)
- Fix video warnings and link errors. @stevepiercy [#4578](https://github.com/plone/volto/issues/4578)


## 16.17.1 (2023-03-16)

 ### Bugfix

 - Fix Search is case sensitive in Block chooser @iRohitSingh [#4526](https://github.com/plone/volto/issues/4526)

 ### Documentation

 - Deleted duplicate import and fixed training URLs. @yahya-cloud [#4523](https://github.com/plone/volto/issues/4523)


## 16.17.0 (2023-03-15)

### Feature

- Add option to hide empty listing blocks @ksuess [#4393](https://github.com/plone/volto/issues/4393)

### Bugfix

- Added block prop to BlockDataForm in the Edit component of ToC. If block is not passed, OnChangeBlock will be called with undefined block id. @tedw87 [#4110](https://github.com/plone/volto/issues/4110)
- Fix focus steal in Form @tedw87 [#4230](https://github.com/plone/volto/issues/4230)
- Fixed paste issue in Table Block and added cypress test for pasting text in Table Block. [#4301](https://github.com/plone/volto/issues/4301)
- Fixed i18n script to avoid overwriting translations with an empty msgstr @danalvrz [#4316](https://github.com/plone/volto/issues/4316)
- bugfix: conditionally render all delete items in confirm widget [#4336](https://github.com/plone/volto/issues/4336)
- Make the Site Setup control panel responsive for small screen devices. @lord2anil [#4484](https://github.com/plone/volto/issues/4484)
- The menu for the contents page was unresponsive on mobile devices. Fixed this by changing the menu overflow to scroll. @sudhanshu1309 [#4492](https://github.com/plone/volto/issues/4492)
- (fix): Paste button disappearing while coping from nested blocks @dobri1408 [#4505](https://github.com/plone/volto/issues/4505)
- Fix flaky Cypress test introduced in #4521 @sneridagh [#4522](https://github.com/plone/volto/issues/4522)

### Documentation

- Fix training urls @ksuess [#4502](https://github.com/plone/volto/issues/4502)


## 16.16.0 (2023-03-09)

### Feature

- Add directive to cache stable resources in browser or intermediate server for 365 days by default directly in the SSR Express server, static resource that could change after a new deployment for 1 minute. @mamico [#2216](https://github.com/plone/volto/issues/2216)


## 16.15.0 (2023-03-08)

### Feature

- Improvements to the dev API proxy:
  - Prefer RAZZLE_INTERNAL_API_PATH over RAZZLE_API_PATH as the target of the proxy.
    The target of the API proxy is now always logged on startup, even in production mode.
  - Support proxying to a backend served over https. For this configuration it
    might be necessary to set RAZZLE_DEV_PROXY_INSECURE=1 if the backend
    certificate can't be verified.

  [davisagli] [#4434](https://github.com/plone/volto/issues/4434)

### Bugfix

- fix: newsitem and event views wrapper classNames @nzambello [#4443](https://github.com/plone/volto/issues/4443)
- Fix weird GHA failure on config option not supported @sneridagh [#4466](https://github.com/plone/volto/issues/4466)
- Fix history view dropdown for first entry, showing 'Revert to this version option' always @sneridagh [#4471](https://github.com/plone/volto/issues/4471)
- Fix order of row of long table in edit and view mode @iFlameing [#4473](https://github.com/plone/volto/issues/4473)

### Documentation

- Complete teaser docs, add new section in `Blocks`: `Core Blocks developers notes` @sneridagh [#4461](https://github.com/plone/volto/pull/4461)


## 16.14.0 (2023-03-03)

### Feature

- Add `Teaser` block @sneridagh [#3706](https://github.com/plone/volto/issues/3706)


## 16.13.0 (2023-03-02)

### Feature

- Added a default Component to show when the Listing block has no results, and another only for the ImageGallery variation. Both of them registered in the block registration config. @ionlizarazu [#3602](https://github.com/plone/volto/issues/3602)
- Add GHA Towncrier syntax checker @sneridagh [#4450](https://github.com/plone/volto/issues/4450)

### Bugfix

- On SSR-generated error pages, don't change the user's language to the default site language @tiberiuichim [#4425](https://github.com/plone/volto/issues/4425)

### Internal

- Expose a named export for the App component, separate its default wrappers as a separate `connectAppComponent` function. @tiberiuichim [#4413](https://github.com/plone/volto/issues/4413)
- Use latest plone/server breed images @sneridagh [#4454](https://github.com/plone/volto/issues/4454)

### Documentation

- Fix links, convert features to definition list, add link to issue for TODO. @stevepiercy [#4431](https://github.com/plone/volto/issues/4431)
- Update link to Yarn 3 Workspaces to avoid redirect to Yarn Classic 1.x. @stevepiercy [#4441](https://github.com/plone/volto/issues/4441)


## 16.12.0 (2023-02-21)

### Feature

- Provide disabled props to all widgets, and pass disabled props in to babel views. @iFlameing [#4396](https://github.com/plone/volto/issues/4396)

### Bugfix

- fix : Restrictive propTypes for widgets . @suman9893 [#4150](https://github.com/plone/volto/issues/4150)
- Add the intl string 'Uploading image' to the image block @bipoza [#4180](https://github.com/plone/volto/issues/4180)
- Fix link integrity overlay is too narrowed @iFlameing [#4399](https://github.com/plone/volto/issues/4399)
- Fix External link Icon shows up in Grid-text block @iRohitSingh [#4400](https://github.com/plone/volto/issues/4400)
- Fix broken links: `babeljs.io/…` @ksuess [#4414](https://github.com/plone/volto/issues/4414)

### Documentation

- Remove inclusion of `CHANGELOG.md` for volto repo only. Fixes https://github.com/plone/documentation/issues/1431. @stevepiercy [#4404](https://github.com/plone/volto/issues/4404)


## 16.11.0 (2023-02-13)

### Feature

- Add open external link in a new tab config option. @robgietema [#4379](https://github.com/plone/volto/issues/4379)
- Add scss support in core @sneridagh [#4383](https://github.com/plone/volto/issues/4383)
- Use open in new tab setting for link types. @robgietema [#4384](https://github.com/plone/volto/issues/4384)

### Bugfix

- Fix Cannot read properties of undefined (reading 'translations') @avoinea [#4377](https://github.com/plone/volto/issues/4377)


## 16.10.0 (2023-02-06)

### Feature

- Option for opening /edit with the same vertical offset like the page in view mode before. @ksuess [#3662](https://github.com/plone/volto/issues/3662)
- Add option to add an action button to the top of the toolbar and to add a menu button to the bottom of the toolbar. @ksuess [#4333](https://github.com/plone/volto/issues/4333)
- Update to latest versions in the backend for testing and the convenience api folder @sneridagh [#4361](https://github.com/plone/volto/issues/4361)
- Content Rules: Support server-provided schema for condition and action @ericof [#4368](https://github.com/plone/volto/issues/4368)

### Bugfix

- Fix react-error-overlay resolution @sneridagh [#4360](https://github.com/plone/volto/issues/4360)

### Documentation

- Add documentation for copy, cut, and paste blocks in Volto. @MAX-786 [#3827](https://github.com/plone/volto/issues/3827)
- Fixed Grammar error @SaiRev0 [#4272](https://github.com/plone/volto/issues/4272)


## 16.9.0 (2023-01-27)

### Feature

- Enable scrolling to ids via hashes in internal links @jackahl [#4165](https://github.com/plone/volto/issues/4165)
- Read listing block schema from configuration registry @pnicolli [#4231](https://github.com/plone/volto/issues/4231)
- Add displayName when registering a component @sneridagh [#4282](https://github.com/plone/volto/issues/4282)
- Support for all default expanders (breadcrumbs, navigation, actions, types) in actions/reducers. Conditional loading of actions if the expanders are present. @sneridagh [#4285](https://github.com/plone/volto/issues/4285)
- Add `addNewBlock` Cypress support command @sneridagh [#4313](https://github.com/plone/volto/issues/4313)

### Bugfix

- Fixed maxLength validation for string type fields @pnicolli [#4189](https://github.com/plone/volto/issues/4189)
- bugfix : add pathname as required proptype in Blocks/Edit @akshatgarg12 [#4194](https://github.com/plone/volto/issues/4194)
- (Fix) Select Widgets scrolls the page when the options are not visible @dobri1408 [#4223](https://github.com/plone/volto/issues/4223)
- Updated volto-slate to check for slateSettings before falling back to config @danalvrz [#4311](https://github.com/plone/volto/issues/4311)
- Fix bug where label of search facet wasn't translated when the content object is being translated @robgietema [#4306](https://github.com/plone/volto/issues/4306)

### Internal

- Updated 4 Dependencies @SaiRev0 [#4104](https://github.com/plone/volto/issues/4104)


## 16.8.1 (2023-01-18)

### Bugfix

- Fix StyleWrapper extenders, the classNames were not being re-fed into the pipe @sneridagh [#4275](https://github.com/plone/volto/issues/4275)


## 16.8.0 (2023-01-18)

### Feature

- Autocomplete widget support for QueryStringWidget @sneridagh [#4177](https://github.com/plone/volto/issues/4177)
- Enhance the StyleWrapper classNames generator by adding look around classNames depending on the sorounding previous/next blocks. @sneridagh [#4260](https://github.com/plone/volto/issues/4260)

### Bugfix

- Fix typo in 4260 @sneridagh [#4268](https://github.com/plone/volto/issues/4268)

### Documentation

- Update links to docs to use correct versions. [stevepiercy] [#4256](https://github.com/plone/volto/issues/4256)


## 16.7.0 (2023-01-11)

### Feature

- Show project name and version in control panel @sneridagh [#4176](https://github.com/plone/volto/issues/4176)
- Enhance Cypress content creation command @sneridagh [#4210](https://github.com/plone/volto/issues/4210)

### Bugfix

- Use Grid instead of Table in Diffview @erral
- Improve matching in keyboard slash menu. [davisagli] [#4187](https://github.com/plone/volto/issues/4187)
- (fix): sidebar is not displaying correctly when clicking on a lead image field. @dobri1408 [#4191](https://github.com/plone/volto/issues/4191)
- Cleanup `package.json` scripts section @sneridagh [#4193](https://github.com/plone/volto/issues/4193)
- Fixed condition to select without vocabulary @SaraBianchi [#4200](https://github.com/plone/volto/issues/4200)
- fix iframe covering the page due to a react-error-overlay bug @reebalazs [#4242](https://github.com/plone/volto/issues/4242)

### Documentation

- Add description for different types of blocks. @MAX-786 [#3827](https://github.com/plone/volto/issues/3827)
- Update makefile to use Vale for spell, grammar, and style checking. Fix linkcheckbroken to return the correct exit code for broken links. Fix broken links. [stevepiercy] [#4181](https://github.com/plone/volto/issues/4181)
- Add todo regarding management of Plone's backend. Update versions. [stevepiercy] [#4198](https://github.com/plone/volto/issues/4198)
- Pin Sphinx<5,>=3 due to sphinx-book-theme 0.3.3 requirement. [stevepiercy] [#4199](https://github.com/plone/volto/issues/4199)
- Add message about the status of Volto and Plone 6 Installation docs, directing the reader to the main Plone 6 docs. [stevepiercy] [#4209](https://github.com/plone/volto/issues/4209)
- Clean up Glossary and integrate with main docs. See https://github.com/plone/documentation/issues/1415. [stevepiercy] [#4211](https://github.com/plone/volto/issues/4211)
- Add some instructions for dealing with untranspiled add-ons and a lazy loading example for functional components. [cguardia] [#4233](https://github.com/plone/volto/issues/4233)


## 16.6.0 (2022-12-23)

### Feature

- Allow passing the `step` prop to NumberWidget @tiberiuichim [#4152](https://github.com/plone/volto/issues/4152)

### Bugfix

- Fix categorization list is not readable when there are longer values or filtering @iFlameing [#4113](https://github.com/plone/volto/issues/4113)
- Add scroll into view settings @robgietema [#4140](https://github.com/plone/volto/issues/4140)
- Remove searching capabilities of SortOn component of Search Block @iFlameing [#4162](https://github.com/plone/volto/issues/4162)
- Fixed externalRoutes short version @pnicolli [#4182](https://github.com/plone/volto/issues/4182)

### Documentation

- Fix URLs to Plone 6 docs. @stevepiercy [#4143](https://github.com/plone/volto/issues/4143)
- Fix Sphinx warning Document headings start at H2, not H1 [myst.header]. @stevepiercy [#4145](https://github.com/plone/volto/issues/4145)


## 16.5.0 (2022-12-16)

### Feature

- Update pt_BR translation @rafahela [#4121](https://github.com/plone/volto/issues/4121)

### Bugfix

- Update SlashMenu to include block title in shortcut search; and prevent default on keydown for Arrows and Enter @danalvrz [#4116](https://github.com/plone/volto/issues/4116)
- Fix removing of toast notification of logout when user login once again. @iFlameing [#4125](https://github.com/plone/volto/issues/4125)

### Internal

- Upgrade testbed and convenience api folder to Plone 6 final @sneridagh [#4105](https://github.com/plone/volto/issues/4105)


## 16.4.1 (2022-12-13)

### Bugfix

- For hot reloading purposes when developing code, the Volto package is no longer excluded @tiberiuichim [#4108](https://github.com/plone/volto/issues/4108)
- Remove clean-css from the CSS minimizing step, use css-minimizer-webpack-plugin one instead @sneridagh [#4115](https://github.com/plone/volto/issues/4115)


## 16.4.0 (2022-12-12)

### Feature

- Update Traefik version and make volume mount (docker-compose) read-only [#4067](https://github.com/plone/volto/issues/4067)
- Allow addons to provide an `eslint.extend.js` file that customizez eslint configuration @tiberiuichim [#4072](https://github.com/plone/volto/issues/4072)

### Bugfix

- Update Chinese translation @adam139 [#4009](https://github.com/plone/volto/issues/4009)
- Reset value of search field after submit. [@MAX-786] [#4028](https://github.com/plone/volto/issues/4028)
- Don't crash the view page when dealing with unknown blocks @tiberiuichim [#4070](https://github.com/plone/volto/issues/4070)
- Bump version for plone-backend version used in Makefile @tiberiuichim [#4071](https://github.com/plone/volto/issues/4071)
- Properly handle whitespace in HTML (richtext) slate-based widget @tiberiuichim [#4082](https://github.com/plone/volto/issues/4082)
- Add Finnish translation (contributed by @rioksane)
  [erral] [#4084](https://github.com/plone/volto/issues/4084)
- Fix typo in english translation and add missing french translation
  [mpeeters, jchandelle] [#4085](https://github.com/plone/volto/issues/4085)

### Internal

- Make Volto compatible with pnpm as package manager [#4023](https://github.com/plone/volto/issues/4023)

### Documentation

- Add content for user-manual of Volto, Plone 6 frontend. [@MAX-786] [#3827](https://github.com/plone/volto/issues/3827)
- Remove duplicate `H1`-level page title, and inherit from Volto's `CHANGELOG.md`. @stevepiercy [#4048](https://github.com/plone/volto/issues/4048)


## 16.3.0 (2022-12-05)

### Feature

- Add towncrier support. Create `RELEASING.md` and move and update Releasing section from `README.md` into it. @sneridagh @stevepiercy [#3985](https://github.com/plone/volto/issues/3985)
- Translation of roles in user and group control panel. Fix https://github.com/plone/volto/issues/4002 @wesleybl [#4002](https://github.com/plone/volto/issues/4002)
- Use the component registry for `Container` component in DefaultView @sneridagh [#4032](https://github.com/plone/volto/issues/4032)
- Update missing german translations @steffenri

### Bugfix

- Fix GitHub release notes in new Towncrier release config @sneridagh [#3989](https://github.com/plone/volto/issues/3989)
- Clear error message when canceling user add. Fix https://github.com/plone/volto/issues/4006 @wesleybl [#4006](https://github.com/plone/volto/issues/4006)
- Fix subscript and supscript active at same time. @iFlameing [#4011](https://github.com/plone/volto/issues/4011)
- Complete eu translation
  [erral] [#4015](https://github.com/plone/volto/issues/4015)
- Complete es translation
  [erral] [#4016](https://github.com/plone/volto/issues/4016)
- Add `cypress.config.js` to generator templates @sneridagh [#4021](https://github.com/plone/volto/issues/4021)
- Bump Volto core packages with the current Volto version on Volto release @sneridagh [#4025](https://github.com/plone/volto/issues/4025)

### Internal

- Remove unused dangling root appExtras from configuration registry @sneridagh [#4024](https://github.com/plone/volto/issues/4024)

### Documentation

- Rewrite "Upgraded core to use Cypress 11" section. @stevepiercy [#3979](https://github.com/plone/volto/issues/3979)
- Include `CHANGELOG.md` at the correct path, depending on context of entire Plone 6 documentation or only Volto documentation. @stevepiercy [#3992](https://github.com/plone/volto/issues/3992)
- Close the open Glossary list. @stevepiercy [#3995](https://github.com/plone/volto/issues/3995)
- Added docs for proper usage of draftjs for richtext widgets. @pnicolli [#4001](https://github.com/plone/volto/issues/4001)
- Document how to change the base font and the font for headings. Describe how to host the font. @ksuess [#4013](https://github.com/plone/volto/issues/4013)


## 16.2.0 (2022-11-25)

### Feature

- Internationalization of descriptions of user add form fields. @wesleybl
- Add tooltip to multivalue labels in select facet @reebalazs
- Provide a default View/Edit component for blocks @avoinea, @tiberiuichim

### Bugfix

- Improve collapsing of whitespace when pasting to slate text block @tiberiuichim
- Avoid warning for missing value in NumberWidget @tiberiuichim
- Fix crash in Slate link editing in a dexterity field @tiberiuichim
- Fix select widget loosing focus when the value has changed @reebalazs

## 16.1.0 (2022-11-23)

### Feature

- Support for drilled down current state and updater function from schema in `ObjectListWidget`. This allows to sync the current object selected from the UI and the block settings and viceversa @sneridagh
- Allow custom style wrapper classnames via fieldname suffixes. Added `config.settings.styleClassNameConverters` to register new suffix converters @tiberiuichim

### Bugfix

- Fix jest moduleNameMapper for `@plone/volto/babel` @tiberiuichim
- Fix addons loader test @tiberiuichim
- Pass down `onChangeBlock` prop to all stock blocks in core @sneridagh
- Fix user search by full name in users control panel @reebalazs

## 16.0.0 (2022-11-22)

### Breaking

- Deprecate NodeJS 12 since it's out of LTS since April 30, 2022 @sneridagh
- Move all cypress actions to the main `Makefile`, providing better meaningful names. Remove them from `package.json` script section. @sneridagh
- Remove `div` as default if `as` prop from `RenderBlocks`. Now the default is a `React.Fragment` instead. This could lead to CSS inconsistencies if taken this div into account, specially if used in custom add-ons without. In order to avoid them, set the `as` property always in your add-ons. @sneridagh
- Removed `date-fns` from dependencies, this was in the build because `Cypress` depended on it. After the `Cypress` upgrade it no longer depends on it. If your project still depends on it, add it as a dependency of your project. @sneridagh
- Removed all usage of `date-fns` from core. @sneridagh
- Rename `src/components/manage/Widgets/ColorPicker.jsx` component to `src/components/manage/Widgets/ColorPickerWidget.jsx` @sneridagh
- Remove the style wrapper around the `<Block />` component in Edit mode, moved to the main edit wrapper @sneridagh
- New `cloneDeepSchema` helper @sneridagh
- Action `listUsers`to be called with Object. Distinguish between search for id or search for fullname, email, username @ksuess
- Integrate volto-state add-on. @tiberiuichim @razvanmiu @eea
- Staticize Poppins font to be compliant with EU privacy. Import from GoogleFont is disabled in site.variables. @giuliaghisini
- Remove the `callout` button (the one with the megaphone icon) from the slate toolbar since it has the same styling as `blockquote`. If you need it anyway, you can bring it back in your addon. @sneridagh
- Using volto-slate Headline / Subheadline buttons strips all elements in the selection @tiberiuichim
- Use `Cypress` 10.3.0 (migrate from 9.x.x). Cypress 10 has some interesting goodies, being the native support of Apple Silicon Computers the main of it. See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information. @sneridagh
- The complete configuration registry is passed to the add-ons and the project configuration pipeline @sneridagh
- Refactor the component registry API in the configuration registry @sneridagh @tiberiuichim
- change password-reset url to be consistent with Plone configuration @erral
- Simplify over the existing Component Registry API. The `component` key has been flattened for simplification and now it's mapped directly to the `component` argument of `registerComponent`. @sneridagh
- This is an UI/UX breaking change. It changes the back button in folder contents from using a cross icon to using a back icon. The rationale behind is because the cross evoque "cancel" when what happens is a change of view. It's also consistent with both PastanagaUI and QuantaUI style guide. @robgietema
- Main workflow change menu changed from Pastanaga UI simplification to classic Plone implementation. @sneridagh
- Move Layout constants to `config.views.layoutViewsNamesMapping`. Complete the list. i18n the list. Improve Display component. @sneridagh
- `react-window` no longer a Volto dependency @sneridagh
- Upgrade to Razzle 4 @davisagli
- Jest downgraded from 27 to 26 @davisagli
- Sentry integration is now lazy-loaded. The `sentryOptions` key from the `settings` registry becomes a callable that passes resolved sentry libraries. @tiberiuichim
- Change history route name to `historyview` (same as classic) in order to allow content to have 'history' as `id` @danielamormocea
- The listing block icon has been improved to avoid confusions with the normal text list @sneridagh
- Remove the means to enable the StyleWrapper in favor of defining it through the block schema. @sneridagh
- Moved all sentry-related code from Volto to the `@plone-collective/volto-sentry` package. @tiberiuichim
- The listing block icon has been improved to avoid confusion with the normal text list. @sneridagh
- Restrict css selector for error message (volto-slate) #3838 @mamico
- Upgrade `husky` to latest version @sneridagh
- Enable the use of yarn 3 in the build by default @sneridagh
- The `ContentsBreadcrumbs` component now renders the whole language name of the language root folder (if any) instead of just the `id` (before: `de`, now: `Deutsch`) @sneridagh

See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

### Feature

- added default placeholder for videos to embed them more lightly @giuliaghisini
- Added new Block Style Wrapper. This implementation is marked as **experimental** during Volto 16 alpha period. The components, API and the styling are subject to change **without issuing a breaking change**. You can start using it in your projects and add-ons, but taking this into account. See documentation for more information. @sneridagh
- Add default widget views for all type of fields and improve the DefaultView @ionlizarazu
- added configurable identifier field for password reset in config.js. @giuliaghisini
- Add `expandToBackendURL` helper @sneridagh
- added 'show total results' option in Search block configuration. @giuliaghisini
- Added viewableInBrowserObjects setting to use in alternative to downloadableObjects, if you want to view file in browser intstead downloading. @giuliaghisini
- Disable already chosen criteria in querystring widget @kreafox
- Added X-Forwarded-\* headers to superagent requests. @mamico
- Updated Brazilian Portuguese translation @ericof
- Forward `HTTP Range` headers to the backend. @mamico
- Add default value to color picker, if `default` is present in the widget schema. @sneridagh
- Inject the classnames of the StyleWrapper into the main edit wrapper (it was wrapping directly the Edit component before). This way, the flexibility is bigger and you can act upon the whole edit container and artifacts (handlers, etc) @sneridagh
- Refactor image block: make it schema extensible @nileshgulia1 @sneridagh
- Add control panel via config.settings @ksuess https://github.com/plone/volto/issues/3426
- Add noindex metadata tag @steffenri
- Adding Schema for Maps Block in Sidebar @iRohitSingh
- Add a Pluggable to the sharing page @JeffersonBledsoe #3372
- Add listing variation schemaEnhancer to the search block schema @ionlizarazu
- Use the local blocksConfig for extensions, fallback to the config object one. This allows to override local blocks config in nested blocks (blocks in a block, eg. accordion, grid, row) @sneridagh
- Use type info instead of id type as icon title in the folder contents. @mamico
- Remove transifex configuration for Volto translations @erral
- Add missing support for inner `blocksConfig` in block extensions resolutions @sneridagh
- Add schema to video block sidebar @iRohitSingh @danielamormocea
- Add user group membership control panel @ksuess
- Action `listUsers`: Support search for fullname, email, username. @ksuess
- Added the `Undo controlpanel` to the controlpanels which can be used to undo transactions. @MdSahil-oss
- Send extra data coming from listing block schemaEnhancer from searchBlock to the listing variation @ionlizarazu
- support for many_users and many_groups flag in user controlpanel and group controlpanel @nileshgulia1
- Show the content type of the content object you are adding/editing in the sidebar @robgietema
- Remove soft hyphens from the title tag @davisagli
- handle 'no connection' available error (408 error). @giuliaghisini
- Add support for OpenStreet Maps in Maps block @sneridagh
- Make `internalApiPath` client aware, since there are some corner cases when the client needs to know it to properly handle API server URLs @sneridagh
- Add initialPath support to ObjectBrowser widget @robgietema
- Added placeholder param to widget, to change default placeholder @giuliaghisini
- Add clear formatting button to slate @robgietema
- Support for getting `selectableTypes` and `maximumSelectionSize` from `widgetProps` @sneridagh
- Added placeholder param to widget, to change default placeholder @giuliaghisini
- Add a headline (`headline` field) to the listing block schema by default @sneridagh
- Add scroll into view setting to slate @robgietema
- Use absolute dates instead of "x hours ago" in History view @steffenri
- Complete eu translation @erral
- Complete es translation. @erral
- Added new components `Aliases` for aliases control in Volto. Alias management in both controlpanel and object view. @andreiggr @avoinea
- Added resetOnCancel functionality in Form component @MdSahil-oss
- volto-slate: introduce style-menu @nileshgulia1
- Show result of the addon install/uninstall/upgrade actions @erral
- Working copy actions now render errors if they fail @pnicolli
- lazyloading of rrule lib. @giuliaghisini
- Complete eu translation. @erral
- Complete spanish translation @erral
- Added an option for users to set their own password through a confirmation email in the Add Users modal within the Users control panel. @JeffersonBledsoe #3710
- Accept a `querystring` object in `apiExpanders` config object settings @sneridagh
- Add a dynamic user form based in @userschema endpoint @erral @nileshgulia1
- Send missing variation data to the listing variation @ionlizarazu
- Logout action in personal tools points to the same pathname, now it logout in place, not in the root. @sneridagh
- Object browser: image search should only show images @reebalazs
- Updated spanish translation @macagua
- Add Dutch translation @spereverde
- Added link integrity potential breakage warning message when deleting a referenced page @danielamormocea
- Added new components & interfaces for content-rules `Rules` control in Volto. Rules management in both controlpanel and object view. @andreiggr
- Updated Spanish translation @macagua
- Introduce `TextLineEdit` component @sneridagh
- Add a popup tooltip for tokenized options in Select widget values @sneridagh
- Add `image-narrow` svg icon useful for align widget actions @ichim-david
- Use `View comments` and `Reply to item` permissions in `Comments` component. @razvanMiu
- Added portrait middleware adapter. @instification
- Allow dumping the addon dependency graph to a .dot file. Start Volto with `DEBUG_ADDONS_LOADER=true yarn start`, `addon-dependency-graph.dot` will be created in your project folder. @tiberiuichim
- Add clear button in search field of Folder content view @iFlameing
- consume site_actions from restapi @nileshgulia1
- Updated Spanish translation @macagua
- Japanese translation updated @terapyon
- Improve the `AlignWidget`, add `narrow` fix default support @sneridagh
- Add support for loading core add-ons from the `packages` folder defined in Volto's `package.json` @sneridagh
- Implement the Upgrade Control Panel @ericof
- Allow addons to customize modules from the project root, via the `@root` namespace and folder @tiberiuichim
- Brazilian Portuguese translation updated @ericof
- Improvement of the `ContentsBreadcrumbs` component, add child `ContentsBreadcrumbsRootItem` and `ContentsBreadcrumbsHomeItem` for easy customization of these single elements in projects @sneridagh
- Add german translation for group membership panel. @ksuess
- Fix general german translations: Address user polite. Correct 'listing template' to 'listing variant'. Add missing translations. @ksuess
- Allow passing ariaHidden, id and style to an Icon's SVG @JeffersonBledsoe #3908
- All Fields now understand the `default` prop as a fallback value in case their data value is missing. As a convenience, the `defaultValue` is also used as a fallback, but this shouldn't proliferate. @tiberiuichim
- There is an experimental setting to move the button for adding a new block to show below any selected block, instead of only on the left of empty text blocks. Set `config.experimental.addBlockButton.enabled = true` to enable it. @davisagli
- Allow custom style wrapper classnames via fieldname suffixes. Added `config.settings.styleClassNameConverters` to register new suffix converters @tiberiuichim
- Support for drilled down current state and updater function from schema in `ObjectListWidget`. This allows to sync the current object selected from the UI and the block settings and viceversa @sneridagh

### Bugfix

- Fix Search page visit crashes /contents view @dobri1408
- Fix sidebar full size bottom opacity on edit page when sidebar is collapsed @ichim-david
- Fix toolbar bottom opacity on edit page when toolbar is collapsed @ichim-david
- Fix content view regression, height issue @danielamormocea
- Fixed secure cookie option. @giuliaghisini
- Changed addon order in addon controlpanel to mimic Classic UI @erral
- Fixed error when loading content in a language for which a Volto translation is not available. @davisagli
- Fix for clipped dropdown menus when the table has few or no records in Contents view @mihaislobozeanu
- fixed view video list from youtube in Video block. @giuliaghisini
- Fixed ICS URL in event view in seamless mode @sneridagh
- Fix `withStylingSchemaEnhancer` enhancer mechanism @sneridagh
- Add correct query parameters to the redirect @robgietema
- Fix RenderBlocks: path @ksuess
- Fix field id creation in dexterity control panel to have slugified id @erral
- Changed to get intl.locale always from state @ionlizarazu
- Fix regression, compound lang names (eg. `pt-BR`) no longer working @sneridagh
- fix TokenWidget choices when editing a recently created content. @giuliaghisini
- Fix color picker defaults implementation #2 @sneridagh
- Enable default color in `backgroundColor` default StyleWrapper field which wasn't sync with the default value setting @sneridagh
- Fix Block style wrapper: Cannot read properties of undefined (reading 'toString') @avoinea #3410
- fix schema when content contains lock informations. @giuliaghisini
- Don't render junk when no facets are added to the search block @tiberiuichim
- Fix visibility of toolbar workflow dropdown for more states as fitting in .toolbar-content. @ksuess
- Fix the video block for anonymous user @iFlameing
- Use `cloneDeepSchema` helper for schema cloning operations, this fixes the error thrown in the use case of having JSX in the schema while cloning schema operations @sneridagh
- Fix CSS bundling in production mode to be consistent with the current policy in the client bundle. Right now the order of the CSS resources matches this chain: Loading of `import my-less.less` in add-ons (following the add-on order) -> Loading of the Semantic UI defaults -> Loading of the local theme (either project or add-on based). We are forcing now the bundling of all the CSS in one chunk, so it behaves the same than in dev mode (using the style-loader). @sneridagh
- Fixed the description field not being included in the navigation action/ reducer @JeffersonBledsoe #3454
- Fixed a11y of Maps block (#3467) @iRohitSingh
- Prevent the `defaultView` to show anything if the content is not loaded yet. This fixes showing the non-blocks enabled view for a fraction of a second before showing the blocks-enabled one once the content is loaded. @sneridagh
- Fix typo in de locale @wolbernd
- Add some more messages to be able to translate them @erral
- Fix typo in de locale @wolbernd
- [generator] Improvements to the addon generator: Now it wires up the addon automatically for immediate local development @sneridagh
- complete eu translation @erral
- complete es translation @erral
- [generator] Add .editorconfig and .prettierignore to generated projects and addons. @ericof
- Make `crypto-random-string` a direct dep, fixing a hidden error since some updated dependency was requiring it directly but not anymore. @sneridagh
- Fix edge cases in Cypress flaky tests when the Edit component was loaded without loading the type schema. @sneridagh & @davisagli
- Fix edge cases in Cypress flaky tests when the Edit component was loaded for the wrong content path. @davisagli
- complete pt_BR translation @ericof
- Fix action `listUsers`. Provide default. @ksuess
- Provide the correct id to the blocks wrapped by StyleWrapper. @razvanMiu
- Remove console deprecation notice for 'host' property usage coming from Express @sneridagh
- Make Search page title translatable @erral
- Changed storeProtectLoadUtils location from src/storeProtectLoadUtils to src/middleware/storeProtectLoadUtils @MdSahil-oss
- Fix ArrayWidget choices when editing a recently created content item. @davisagli
- Fix content loading in `DefaultView` infinite loop if a listing block with no query is present. @sneridagh
- Fix login form redirect when it was loaded with a trailing slash @davisagli
- Better de translation for Site Setup @davisagli
- Fix overlapping for long words in Control Panel titles (added word-wrapping) @sneridagh
- Fix sitemap.xml.gz @robgietema
- Fix Image gallery listing block variation only gets 25 if no query is set @sneridagh
- Fix array widget translation @robgietema
- Fix: TTW DX Layout disables IBlocks behavior and with it all the indexers and transformers @avoinea
- Fix: Slate Editor: can not delete bullet point after adding it by typing "- " #3597 @dobri1408
- Fix literal for the listing block edit mode message telling if the results are contained items (no query) or query results ones (query present) @sneridagh
- Fix grouping of the "users and groups" control panels (plone-users category) @sneridagh
- Improve `Display` and `Workflow` widgets in `More` menu. Fix alignments. @sneridagh
- Fixed searching in the sharing page not showing any results @JeffersonBledsoe #3579
- Fix types menu on mobile for many types. Specific menuStyle for 'more' menu. @ksuess
- Fix types menu on desktop when menu overflows the viewport, adding scroll to it @sneridagh
- Fix "cannot have two html5 backends at the same time" error @davisagli
- Reset filter in folder contents when navigating @robgietema
- Fix bug showing incorrect history after a revert action @robgietema
- Fix and edge case, in case a `RelationList` has no default, on empty fields, after the object has been created, it saves an empty (None/null) value. Make sure that internally, if that's the case, it's an empty array always. @sneridagh
- Fix workflow and display select in toolbar in case that the option spans several lines @sneridagh
- Fix Press Enter in some blocks does not focus on the text block below #3647 @dobri1408
- Add `matchAllRoutes` to AsyncConnect so that it matches all configured `asyncPropsExtenders` @tiberiuichim
- Fix acceptence test groups controlpanel @ksuess
- Fix the typo in change workflow status dialog in "de" @iRohitSingh
- Fix selection error when pressing backspace @robgietema
- Fix sidebarTab in Toc Block @iRohitSingh
- Fix virtualization (windowing) when displaying options with long titles for select widgets. (The virtualization happen when the number of options is greater than 25). Add dynamic height aware options using `react-virtualized`. @sneridagh
- Fix email validation to ensure all addresses are correctly validated @instification
- Fix number widget when the value is 0 @iRohitSingh
- Fix the typo in change workflow status dialog in "de" @iRohitSingh
- Show unauthorized message when accessing the diff view without permission @robgietema
- Fix i18n in title of Aliases control panel @sneridagh
- The styling schema is now applied before the block variations schema enhancers, to allow those enhancers a chance to tweak the styling schema @tiberiuichim
- Fix avatar URL in `PersonalTools`. Now works with the new `portrait` endpoint @sneridagh
- Fix `listing` block in SSR, now that it is fully variations aware and the configuration is passed to the SSR `querystring` action. @sneridagh
- Remove wrapping ul or ol when deselecting list style @robgietema
- Fix call to `@plone/scripts/i18n` (now a commonJS module) @sneridagh
- Concatenate multilingualRoutes and externalRoutes (if available) to defaultRoutes @erral #3653
- Fixed the `description` field not appearing in control panel fieldsets @JeffersonBledsoe #3696
- Fixed "more" always show root contents @MdSahil-oss #3365
- Add missing `--noninteractive` in the `build` script in package.json @sneridagh
- Fix replace `<a>` anchor element with the `UniversalLink` component in `DefaultTemplate.jsx` @Dnouv
- Extend Id widget validation rules to accept a dot "." @reebalazs
- Fix history page error for unauthenticated @reebalazs
- Fix unlock after changing the id and saving a page @reebalazs
- Group routes so React does not see them as a different Route and triggers a full remount. This is specially important in `Contents` @sneridagh
- Add default to `null` for `token` prop in `Navigation` component. This prevents the component to shoot an extra call when the logout happens @sneridagh
- Fix a double slash present in the `PersonalTools` component @sneridagh
- Fix UniversalLink storybook @tiberiuichim
- Fix logout to stay on the same page where the user was @reebalazs
- Change sentry chunk name to avoid ad blockers. Only load sentry if env vars exist @tiberiuichim
- SearchTags uses invalid vocabulary API @silviubogan
- Fix autocomplete widget with an empty search result @reebalazs
- Make sure that the store is reset on history reducer `PENDING` state @sneridagh
- Prefer views assigned explicitly with `layout` over views based on the `@type` @iRohitSingh
- Fix `schemaEnhancer` not being applied if nested `blocksConfig` is present @sneridagh
- Ensure the view component is always replaced after navigating to a different page. @davisagli
- Be more robust towards invalid block configuration @reebalazs
- Remove slate's builtin undo support, as it conflicts with Volto's undo manager. This fixes crashes when undoing in text blocks and slate's undo stack is empty and "crosses" into Volto's undo stack. This is a temporary workaround, ideally the two undo managers would be delimited so they each work together. @tiberiuichim
- Fix highlighting of selection when the Slate editor is not DOM-focused. @tiberiuichim
- Improve the algorithm that calculates the position of the Slate Toolbar @tiberiuichim
- The `_unwrapElement` of the volto-slate `ElementEditor` will return an updated range (selection) of the unwrapped element. @tiberiuichim
- Replace the main client entry point in `start-client.jsx` anonymous function for a named one. @sneridagh
- Fix `currentPath` option for `openObjectBrowser`. @iFlameing
- Fix updating the listing block when the variation is changed while editing @tiberiuichim
- fix(warning): StyleMenu dropdown item to use data-attr instead of custom @nileshgulia1
- Added --canary flag in plone/install.sh. @MdSahil-oss
- Fix condition in `applySchemaDefaults` @tiberiuichim @sneridagh
- Load core add-ons configuration as any other add-on. @sneridagh
- Fix `FormValidation` error object, use field `id` instead of field `title` @sneridagh
- Revert #2828 PR change of the default `showSearchButton` Search block behavior (see [#3883](https://github.com/plone/volto/issues/3883)) @sneridagh
- Fix `package.json` `postinstall` in core @sneridagh
- Hide control panel settings that are not relevant to Volto @danalvrz
- Hide not relevant for Volto control panels from site setup, further refine not used inner settings for site control panel @sneridagh
- Fix ObjectWidget handling of `default` values coming from schemas. @tiberiuichim
- Overhaul how block defaults are computed. See https://github.com/plone/volto/pull/3925 for more details @tiberiuichim
- Fix image tag for Plone 5.2.x, use 5.2.9 for now @sneridagh
- Cover an additional edge case for defaults @tiberiuichim
- Fix issue when using list markdown when list is already active (volto-slate) @robgietema
- Fix translation spelling of toggle @iFlameing
- Fix keyboard accessibility issue of Clear button in Folder content view @iFlameing

### Internal

- Improve Cypress integration, using Cypress official Github Action. Improve some flaky tests that showed up, and were known as problematic. Refactor and rename all the Github actions giving them meaningful names, and group them by type. Enable Cypress Dashboard for Volto. @sneridagh
- Stop using `xmlrpc` library for issuing the setup/teardown in core, use a `cy.request` instead. @sneridagh
- Added Cypress environment variables for adjusting the backend URL of commands @JeffersonBledsoe #3271
- Reintroduce Plone 6 acceptance tests using the latests `plone.app.robotframework` 2.0.0a6 specific Volto fixture. @datakurre @ericof @sneridagh
- Upgrade all tests to use `plone.app.robotframework` 2.0.0a6 @sneridagh
- Upgrade Sentry to latest version because of [#3346](https://github.com/plone/volto/issues/3346) @sneridagh
- Update `Cypress` to version 9.6.1 @sneridagh
- Missing change from the last breaking change (Remove the style wrapper around the `<Block />` component in Edit mode, moved to the main edit wrapper). Now, really move it to the main edit wrapper @sneridagh
- Fix warning because missing key in `VersionOverview` component @sneridagh
- Mock all loadable libraries. @mamico
- Update json-schema including transitive dependencies @davisagli
- Update release-it @davisagli
- Deduplicate dependencies using yarn-deduplicate @davisagli
- Fix `defaultBlockType` entry in default config, set it to slate. @sneridagh
- Allow passing `allowedChildren` option to the BlockButton, to strip elements in headlines @tiberiuichim
- Upgrade to latest `@plone/scripts` @sneridagh
- Update browserlist definitions @sneridagh
- Fix propTypes for Pagination component @davisagli
- Test against Plone 5.2.9 and 6.0.0b1 @davisagli
- Use latest 1.6.0 `@plone/scripts` @sneridagh
- Add classname of variation in edit mode @iFlameing
- Use component registry for default image, fallback to the local import @sneridagh
- Remove Razzle as direct dependency from @plone/scripts @sneridagh
- Fix storybook build for Razzle 4 @sneridagh
- Update `@plone/scripts` to 2.1.1 @sneridagh
- Run yarn deduplicate on dependencies. @davisagli
- Comment out flaky test for now regarding many users/groups @sneridagh
- Add reverse proxy conf with `traefik` to demo compose file @sneridagh
- More disable flaky test regarding many users/groups @sneridagh
- Remove no longer present option in cypress github action, by default, headless is true @sneridagh
- Add proper webserver with reverse proxy with seamless mode @sneridagh
- Update to Plone 6 beta3 @sneridagh
- Upgrade Cypress to latest @sneridagh
- Upgrade dependency rrule (optional dependency luxon removed) @ksuess
- Set `.nvmrc` to not use `lts/*` but a specific one `lts/gallium`
- Update to @plone/scripts 2.1.2 @sneridagh
- Remove all the useless security bits from blocks configuration definitions @sneridagh
- Add translation for `pending` state @iFlameing
- Add `composeSchema`, a helper to compose multiple schemaEnhancers @tiberiuichim
- Upgrade to `plone.voltoa14` @sneridagh
- Upgrade dependencies to latest released slate libraries. Make sure to pass down `ref` to rendered slate elements, as ref is now a function @tiberiuichim
- Add `editableProps` prop to the `SlateEditor` component, to pass down props to the base Slate `Editable` component. @tiberiuichim
- Clean, re-enable block-slate-format-link Cypress tests @tiberiuichim
- Rewrite some anonymous functions as named functions, to remove warning about Hot Reloading. @tiberiuichim
- Add translation for objectlist `Add` text @iFlameing
- Add translations for facet widget value @iFlameing
- Ignore `.tool-versions` file
- Minor updates to dependencies
- Update Cypress 11 @sneridagh
- Update to Plone 6 RC1 @sneridagh

### Documentation

- Move Cypress documentation from `README.md` to the docs. Improve the docs with the new `Makefile` commands.
- Improve English grammar and syntax in backend docs. @stevepiercy
- Fix JSX syntax highlighting. Remove duplicate heading. @stevepiercy
- fix make task `docs-linkcheckbroken` if grep has exit code 1 (no lines found)
- Updated `simple.md` @MdSahil-oss
- Fix indentation in nginx configuration in `simple.md` @stevepiercy
- Remove sphinx_sitemap configuration because Volto's docs are now imported into the main docs, making this setting unnecessary. @stevepiercy
- Set the ogp_site_url to main docs, instead of training. @stevepiercy
- `aria-*` attributes are now parsed correctly by jsx-lexer 2.0. @stevepiercy
- volto-slate documentation @nileshgulia1
- Fix redirect on YouTube, broken link after merge and deleted branch. @stevepiercy
- Add upgrade guide documentation for dealing with `volto-slate` upgrades for Volto 16 alpha 15 onwards. @sneridagh
- Minor clean up of volto-slate upgrade guide. @stevepiercy
- Rework documentation on how to write a Slate plugin @ksuess
- Documentation of the new component registry API @sneridagh
- Fix copy / paste text in list @robgietema
- Make links relative to `_static` so that `plone/documentation` can pull them in, and fix broken link. @stevepiercy
- Align `html_static_path` with `plone/documentation` and image path so that images render when docs build in both repos. @stevepiercy
- Undo html_static_path configuration in `plone/documentation`, and restore image and its referenced path in `plone/volto`. @stevepiercy
- Clean up "design principles" and "contributing"
- Bring back "Guidelines for Contributing"
- Fix Sphinx warning `WARNING: glossary terms must not be separated by empty lines` by closing unclosed glossary directive's triple backticks. @stevepiercy
- Fix broken links to nvm releases. @stevepiercy
- Ignore redirect that requires login to GitHub. @stevepiercy
- Added controls for the `actions` property of the `AlignWidget` storybook @JeffersonBledsoe #3671
- Generic Setup -> `GenericSetup`. @stevepiercy
- Upgrade to Plone 6 beta 2 @sneridagh
- Flip testing matrix for acceptance tests, make Plone 6 principal subject, Plone 5 as secondary @sneridagh
- Update README with latest versions, point to Plone 6 as recommended default @sneridagh
- Trigger a new deploy core Plone documentation when Volto documentation is updated @esteele
- Update supported Python versions. @stevepiercy
- Add Node.js 18 (LTS) usage notice @sneridagh
- Fix Netlify build @sneridagh
- Fix grammar in Theming Strategy. Fixes #954. @stevepiercy
- Fix wording in About Semantic UI. Fixes #953. @stevepiercy
- Add missing pieces of the upgrade to use yarn 3 for projects @sneridagh
- Complete docs about the yarn 3 upgrade @sneridagh
- Add additional components to storybook @danalvrz
- Add `@plone/scripts` as a mandatory devDependency for projects to the upgrade guide @sneridagh
- Document `Sentry` integration move from Volto core to add-on `@plone-collective/volto-sentry` in configuration, upgrade and deployment. @ksuess
- Remove `sentryOptions` from settings reference. Clean up `deploying/sentry.md`. @stevepiercy
- Tidy up `upgrade-guide/index.md`. @stevepiercy
- Fix some MyST syntax and English grammar. @stevepiercy

## 16.0.0-rc.3 (2022-11-22)

### Bugfix

- Fix keyboard accessibility issue of Clear button in Folder content view @iFlameing
- Fix issue when using list markdown when list is already active (volto-slate) @robgietema
- Fix translation spelling of toggle @iFlameing

### Documentation

- Document experimental features @davisagli

## 16.0.0-rc.2 (2022-11-20)

### Bugfix

- Overhaul how block defaults are computed. See https://github.com/plone/volto/pull/3925 for more details @tiberiuichim
- Cover an additional edge case for defaults @tiberiuichim

### Internal

- Update to Plone 6 RC1 @sneridagh

### Documentation

- Document `Sentry` integration move from Volto core to add-on `@plone-collective/volto-sentry` in configuration, upgrade and deployment. @ksuess
- Remove `sentryOptions` from settings reference. Clean up `deploying/sentry.md`. @stevepiercy
- Tidy up `upgrade-guide/index.md`. @stevepiercy
- Fix some MyST syntax and English grammar. @stevepiercy
- Add contributing branch policy information @sneridagh @stevepiercy
- Add component to storybook @danalvrz

## 16.0.0-rc.1 (2022-11-18)

### Feature

- Releasing RC1 @sneridagh

## 16.0.0-alpha.53 (2022-11-18)

### Feature

- There is an experimental setting to move the button for adding a new block to show below any selected block, instead of only on the left of empty text blocks. Set `config.experimental.addBlockButton.enabled = true` to enable it. @davisagli

## 16.0.0-alpha.52 (2022-11-18)

### Bugfix

- Revert "Configure Jest's moduleNameMapper with AddonConfigurationRegistry" (#3913) due to a regression in projects @sneridagh

## 16.0.0-alpha.51 (2022-11-18)

### Breaking

- The `ContentsBreadcrumbs` component now renders the whole language name of the language root folder (if any) instead of just the `id` (before: `de`, now: `Deutsch`) @sneridagh

### Feature

- Improvement of the `ContentsBreadcrumbs` component, add child `ContentsBreadcrumbsRootItem` and `ContentsBreadcrumbsHomeItem` for easy customization of these single elements in projects @sneridagh
- Add german translation for group membership panel. @ksuess
- Fix general german translations: Address user polite. Correct 'listing template' to 'listing variant'. Add missing translations. @ksuess
- Allow passing ariaHidden, id and style to an Icon's SVG @JeffersonBledsoe #3908
- All Fields now understand the `default` prop as a fallback value in case their data value is missing. As a convenience, the `defaultValue` is also used as a fallback, but this shouldn't proliferate. @tiberiuichim

### Bugfix

- Hide control panel settings that are not relevant to Volto @danalvrz
- Hide not relevant for Volto control panels from site setup, further refine not used inner settings for site control panel @sneridagh
- Fix ObjectWidget handling of `default` values coming from schemas. @tiberiuichim

### Internal

- Ignore `.tool-versions` file
- Minor updates to dependencies
- Update Cypress 11 @sneridagh

### Documentation

- Add `@plone/scripts` as a mandatory devDependency for projects to the upgrade guide @sneridagh

## 16.0.0-alpha.50 (2022-11-15)

### Feature

- Brazilian Portuguese translation updated @ericof

### Bugfix

- Fix condition in `applySchemaDefaults` @tiberiuichim @sneridagh
- Load core add-ons configuration as any other add-on. @sneridagh
- Fix `FormValidation` error object, use field `id` instead of field `title` @sneridagh
- Revert #2828 PR change of the default `showSearchButton` Search block behavior (see [#3883](https://github.com/plone/volto/issues/3883)) @sneridagh
- Fix `package.json` `postinstall` in core @sneridagh

### Documentation

- Add missing pieces of the upgrade to use yarn 3 for projects @sneridagh
- Complete docs about the yarn 3 upgrade @sneridagh
- Add additional components to storybook @danalvrz

## 16.0.0-alpha.49 (2022-11-11)

### Breaking

- Restrict css selector for error message (volto-slate) #3838 @mamico
- Upgrade `husky` to latest version @sneridagh
- Enable the use of yarn 3 in the build by default @sneridagh

### Feature

- Japanese translation updated @terapyon
- Improve the `AlignWidget`, add `narrow` fix default support @sneridagh
- Add support for loading core add-ons from the `packages` folder defined in Volto's `package.json` @sneridagh
- Implement the Upgrade Control Panel @ericof
- Allow addons to customize modules from the project root, via the `@root` namespace and folder @tiberiuichim
- Updated Spanish translation @macagua

### Bugfix

- Be more robust towards invalid block configuration @reebalazs
- Remove slate's builtin undo support, as it conflicts with Volto's undo manager. This fixes crashes when undoing in text blocks and slate's undo stack is empty and "crosses" into Volto's undo stack. This is a temporary workaround, ideally the two undo managers would be delimited so they each work together. @tiberiuichim
- Fix highlighting of selection when the Slate editor is not DOM-focused. @tiberiuichim
- Improve the algorithm that calculates the position of the Slate Toolbar @tiberiuichim
- The `_unwrapElement` of the volto-slate `ElementEditor` will return an updated range (selection) of the unwrapped element. @tiberiuichim
- Replace the main client entry point in `start-client.jsx` anonymous function for a named one. @sneridagh
- Fix `currentPath` option for `openObjectBrowser`. @iFlameing
- Fix updating the listing block when the variation is changed while editing @tiberiuichim
- fix(warning): StyleMenu dropdown item to use data-attr instead of custom @nileshgulia1
- Added --canary flag in plone/install.sh. @MdSahil-oss

### Internal

- Upgrade dependencies to latest released slate libraries. Make sure to pass down `ref` to rendered slate elements, as ref is now a function @tiberiuichim
- Add `editableProps` prop to the `SlateEditor` component, to pass down props to the base Slate `Editable` component. @tiberiuichim
- Clean, re-enable block-slate-format-link Cypress tests @tiberiuichim
- Rewrite some anonymous functions as named functions, to remove warning about Hot Reloading. @tiberiuichim
- Add translation for objectlist `Add` text @iFlameing
- Add translations for facet widget value @iFlameing

### Documentation

## 16.0.0-alpha.48 (2022-11-03)

### Bugfix

- Ensure the view component is always replaced after navigating to a different page. @davisagli

## 16.0.0-alpha.47 (2022-11-02)

### Feature

- Add clear button in search field of Folder content view @iFlameing
- consume site_actions from restapi @nileshgulia1
- Updated Spanish translation @macagua

### Bugfix

- Fix `schemaEnhancer` not being applied if nested `blocksConfig` is present @sneridagh

### Internal

- Add translation for `pending` state @iFlameing
- Add `composeSchema`, a helper to compose multiple schemaEnhancers @tiberiuichim
- Upgrade to `plone.voltoa14` @sneridagh

### Documentation

- Fix grammar in Theming Strategy. Fixes #954. @stevepiercy
- Fix wording in About Semantic UI. Fixes #953. @stevepiercy

## 16.0.0-alpha.46 (2022-10-28)

### Breaking

- Remove the means to enable the StyleWrapper in favor of defining it through the block schema. @sneridagh
- Moved all sentry-related code from Volto to the `@plone-collective/volto-sentry` package. @tiberiuichim
- The listing block icon has been improved to avoid confusion with the normal text list. @sneridagh

See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

### Feature

- Add `image-narrow` svg icon useful for align widget actions @ichim-david
- Use `View comments` and `Reply to item` permissions in `Comments` component. @razvanMiu
- Added portrait middleware adapter. @instification
- Allow dumping the addon dependency graph to a .dot file. Start Volto with `DEBUG_ADDONS_LOADER=true yarn start`, `addon-dependency-graph.dot` will be created in your project folder. @tiberiuichim

### Bugfix

- Prefer views assigned explicitly with `layout` over views based on the `@type` @iRohitSingh
- Improve collapsing of whitespace when pasting to slate text block @tiberiuichim

### Internal

- Set `.nvmrc` to not use `lts/*` but a specific one `lts/gallium`
- Update to @plone/scripts 2.1.2 @sneridagh
- Remove all the useless security bits from blocks configuration definitions @sneridagh

### Documentation

- Add Node.js 18 (LTS) usage notice @sneridagh
- Fix Netlify build @sneridagh

## 16.0.0-alpha.45 (2022-10-24)

### Feature

- Added link integrity potential breakage warning message when deleting a referenced page @danielamormocea
- Added new components & interfaces for content-rules `Rules` control in Volto. Rules management in both controlpanel and object view. @andreiggr
- Updated Spanish translation @macagua
- Introduce `TextLineEdit` component @sneridagh
- Add a popup tooltip for tokenized options in Select widget values @sneridagh

### Bugfix

- Make sure that the store is reset on history reducer `PENDING` state @sneridagh

### Documentation

- Update supported Python versions. @stevepiercy

## 16.0.0-alpha.44 (2022-10-20)

### Breaking

- The listing block icon has been improved to avoid confusions with the normal text list @sneridagh

### Bugfix

- SearchTags uses invalid vocabulary API @silviubogan
- Fix autocomplete widget with an empty search result @reebalazs

## 16.0.0-alpha.43 (2022-10-17)

### Feature

- Object browser: image search should only show images @reebalazs
- Updated spanish translation @macagua
- Add Dutch translation @spereverde
- Add control panel for relations. @ksuess

### Bugfix

- Sort control panels alphabetically within each group @JeffersonBledsoe #3737
- Fix UniversalLink storybook @tiberiuichim
- Fix logout to stay on the same page where the user was @reebalazs
- Change sentry chunk name to avoid ad blockers. Only load sentry if env vars exist @tiberiuichim

### Internal

- Upgrade dependency rrule (optional dependency luxon removed) @ksuess

### Documentation

- Trigger a new deploy core Plone documentation when Volto documentation is updated @esteele

## 16.0.0-alpha.42 (2022-10-06)

### Breaking

- Change history route name to `historyview` (same as classic) in order to allow content to have 'history' as `id` @danielamormocea

### Feature

- Add a dynamic user form based in @userschema endpoint @erral @nileshgulia1
- Send missing variation data to the listing variation @ionlizarazu
- Logout action in personal tools points to the same pathname, now it logout in place, not in the root. @sneridagh

### Bugfix

- Fix history page error for unauthenticated @reebalazs
- Fix unlock after changing the id and saving a page @reebalazs
- Group routes so React does not see them as a different Route and triggers a full remount. This is specially important in `Contents` @sneridagh
- Add default to `null` for `token` prop in `Navigation` component. This prevents the component to shoot an extra call when the logout happens @sneridagh
- Fix a double slash present in the `PersonalTools` component @sneridagh

### Internal

- Update to Plone 6 beta3 @sneridagh
- Upgrade Cypress to latest @sneridagh

### Documentation

- Update README with latest versions, point to Plone 6 as recommended default @sneridagh

## 16.0.0-alpha.41 (2022-10-05)

### Breaking

- Sentry integration is now lazy-loaded. The `sentryOptions` key from the `settings` registry becomes a callable that passes resolved sentry libraries. @tiberiuichim

  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

### Feature

- Complete eu translation. @erral
- Complete spanish translation @erral
- Added an option for users to set their own password through a confirmation email in the Add Users modal within the Users control panel. @JeffersonBledsoe #3710
- Accept a `querystring` object in `apiExpanders` config object settings @sneridagh

### Bugfix

- Extend Id widget validation rules to accept a dot "." @reebalazs

### Internal

- Comment out flaky test for now regarding many users/groups @sneridagh
- Add reverse proxy conf with `traefik` to demo compose file @sneridagh
- More disable flaky test regarding many users/groups @sneridagh
- Remove no longer present option in cypress github action, by default, headless is true @sneridagh
- Add proper webserver with reverse proxy with seamless mode @sneridagh

## 16.0.0-alpha.40 (2022-10-01)

### Feature

- Show result of the addon install/uninstall/upgrade actions @erral
- Working copy actions now render errors if they fail @pnicolli
- lazyloading of rrule lib. @giuliaghisini

### Bugfix

- Concatenate multilingualRoutes and externalRoutes (if available) to defaultRoutes @erral #3653
- Fixed the `description` field not appearing in control panel fieldsets @JeffersonBledsoe #3696
- Fixed "more" always show root contents @MdSahil-oss #3365
- Add missing `--noninteractive` in the `build` script in package.json @sneridagh
- Fix replace `<a>` anchor element with the `UniversalLink` component in `DefaultTemplate.jsx` @Dnouv

### Internal

- Run yarn deduplicate on dependencies. @davisagli

### Documentation

- Upgrade to Plone 6 beta 2 @sneridagh
- Flip testing matrix for acceptance tests, make Plone 6 principal subject, Plone 5 as secondary @sneridagh

## 16.0.0-alpha.39 (2022-09-28)

### Bugfix

- Fix call to `@plone/scripts/i18n` (now a commonJS module) @sneridagh

### Internal

- Fix storybook build for Razzle 4 @sneridagh
- Update `@plone/scripts` to 2.1.1 @sneridagh

## 16.0.0-alpha.38 (2022-09-27)

### Breaking

- Upgrade to Razzle 4 @davisagli
- Jest downgraded from 27 to 26 @davisagli

See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

### Internal

- Remove Razzle as direct dependency from @plone/scripts @sneridagh

## 16.0.0-alpha.37 (2022-09-27)

### Feature

- Added resetOnCancel functionality in Form component @MdSahil-oss
- volto-slate: introduce style-menu @nileshgulia1

### Bugfix

- Fix avatar URL in `PersonalTools`. Now works with the new `portrait` endpoint @sneridagh

- Fix `listing` block in SSR, now that it is fully variations aware and the configuration is passed to the SSR `querystring` action. @sneridagh
- Remove wrapping ul or ol when deselecting list style @robgietema

## 16.0.0-alpha.36 (2022-09-26)

### Bugfix

- Fix number widget when the value is 0 @iRohitSingh
- Fix the typo in change workflow status dialog in "de" @iRohitSingh
- Show unauthorized message when accessing the diff view without permission @robgietema
- Fix i18n in title of Aliases control panel @sneridagh
- The styling schema is now applied before the block variations schema enhancers, to allow those enhancers a chance to tweak the styling schema @tiberiuichim

### Documentation

- Added controls for the `actions` property of the `AlignWidget` storybook @JeffersonBledsoe #3671
- Generic Setup -> `GenericSetup`. @stevepiercy

## 16.0.0-alpha.35 (2022-09-21)

### Breaking

- `react-window` no longer a Volto dependency @sneridagh
  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

### Bugfix

- Fix the typo in change workflow status dialog in "de" @iRohitSingh
- Fix selection error when pressing backspace @robgietema
- Fix sidebarTab in Toc Block @iRohitSingh
- Fix virtualization (windowing) when displaying options with long titles for select widgets. (The virtualization happen when the number of options is greater than 25). Add dynamic height aware options using `react-virtualized`. @sneridagh
- Fix email validation to ensure all addresses are correctly validated @instification

### Documentation

- Fix Sphinx warning `WARNING: glossary terms must not be separated by empty lines` by closing unclosed glossary directive's triple backticks. @stevepiercy
- Fix broken links to nvm releases. @stevepiercy
- Ignore redirect that requires login to GitHub. @stevepiercy

## 16.0.0-alpha.34 (2022-09-17)

### Feature

- Added new components `Aliases` for aliases control in Volto. Alias management in both controlpanel and object view. @andreiggr @avoinea

### Bugfix

- Fix Press Enter in some blocks does not focus on the text block below #3647 @dobri1408
- Add `matchAllRoutes` to AsyncConnect so that it matches all configured `asyncPropsExtenders` @tiberiuichim
- Fix acceptence test groups controlpanel @ksuess

### Internal

### Documentation

- Bring back "Guidelines for Contributing"

## 16.0.0-alpha.33 (2022-09-15)

### Breaking

- Move Layout constants to `config.views.layoutViewsNamesMapping`. Complete the list. i18n the list. Improve Display component. @sneridagh
  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

### Feature

- Complete eu translation @erral
- Complete es translation. @erral

### Bugfix

- Fix and edge case, in case a `RelationList` has no default, on empty fields, after the object has been created, it saves an empty (None/null) value. Make sure that internally, if that's the case, it's an empty array always. @sneridagh
- Fix workflow and display select in toolbar in case that the option spans several lines @sneridagh

### Documentation

- Clean up "design principles" and "contributing"

## 16.0.0-alpha.32 (2022-09-14)

### Bugfix

- Fix "cannot have two html5 backends at the same time" error @davisagli
- Reset filter in folder contents when navigating @robgietema
- Fix bug showing incorrect history after a revert action @robgietema

### Internal

### Documentation

Undo html_static_path configuration in `plone/documentation`, and restore image and its referenced path in `plone/volto`. @stevepiercy

## 16.0.0-alpha.31 (2022-09-12)

### Bugfix

- Fix types menu on mobile for many types. Specific menuStyle for 'more' menu. @ksuess
- Fix types menu on desktop when menu overflows the viewport, adding scroll to it @sneridagh

### Documentation

- Align `html_static_path` with `plone/documentation` and image path so that images render when docs build in both repos. @stevepiercy

## 16.0.0-alpha.30 (2022-09-07)

### Breaking

- Main workflow change menu changed from Pastanaga UI simplification to classic Plone implementation. @sneridagh
  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

### Feature

- Added placeholder param to widget, to change default placeholder @giuliaghisini
- Add a headline (`headline` field) to the listing block schema by default @sneridagh
- Add scroll into view setting to slate @robgietema
- Use absolute dates instead of "x hours ago" in History view @steffenri

### Bugfix

- Fix: Slate Editor: can not delete bullet point after adding it by typing "- " #3597 @dobri1408
- Fix literal for the listing block edit mode message telling if the results are contained items (no query) or query results ones (query present) @sneridagh
- Fix grouping of the "users and groups" control panels (plone-users category) @sneridagh
- Improve `Display` and `Workflow` widgets in `More` menu. Fix alignments. @sneridagh
- Fixed searching in the sharing page not showing any results @JeffersonBledsoe #3579

### Documentation

- Make links relative to `_static` so that `plone/documentation` can pull them in, and fix broken link. @stevepiercy

## 16.0.0-alpha.29 (2022-09-02)

### Feature

- Support for getting `selectableTypes` and `maximumSelectionSize` from `widgetProps` @sneridagh

## 16.0.0-alpha.28 (2022-08-31)

### Feature

- Add clear formatting button to slate @robgietema

### Bugfix

- Fix array widget translation @robgietema
- Fix: TTW DX Layout disables IBlocks behavior and with it all the indexers and transformers @avoinea

### Internal

### Documentation

- Fix copy / paste text in list @robgietema

## 16.0.0-alpha.27 (2022-08-29)

### Feature

- Added placeholder param to widget, to change default placeholder @giuliaghisini

### Bugfix

- Fix Image gallery listing block variation only gets 25 if no query is set @sneridagh

## 16.0.0-alpha.26 (2022-08-24)

### Breaking

- This is an UI/UX breaking change. It changes the back button in folder contents from using a cross icon to using a back icon. The rationale behind is because the cross evoque "cancel" when what happens is a change of view. It's also consistent with both PastanagaUI and QuantaUI style guide. @robgietema

### Feature

- Add initialPath support to ObjectBrowser widget @robgietema

## 16.0.0-alpha.25 (2022-08-24)

### Feature

- Add support for OpenStreet Maps in Maps block @sneridagh
- Make `internalApiPath` client aware, since there are some corner cases when the client needs to know it to properly handle API server URLs @sneridagh

### Bugfix

- Fix sitemap.xml.gz @robgietema

### Internal

- Use component registry for default image, fallback to the local import @sneridagh

## 16.0.0-alpha.24 (2022-08-22)

### Feature

- handle 'no connection' available error (408 error). @giuliaghisini

### Bugfix

- Fix overlapping for long words in Control Panel titles (added word-wrapping) @sneridagh

## 16.0.0-alpha.23 (2022-08-18)

### Breaking

- change password-reset url to be consistent with Plone configuration @erral
- Simplify over the existing Component Registry API. The `component` key has been flattened for simplification and now it's mapped directly to the `component` argument of `registerComponent`. @sneridagh

See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

### Feature

- support for many_users and many_groups flag in user controlpanel and group controlpanel @nileshgulia1
- Show the content type of the content object you are adding/editing in the sidebar @robgietema
- Remove soft hyphens from the title tag @davisagli

### Bugfix

- Fix login form redirect when it was loaded with a trailing slash @davisagli
- Better de translation for Site Setup @davisagli

### Internal

- Test against Plone 5.2.9 and 6.0.0b1 @davisagli
- Use latest 1.6.0 `@plone/scripts` @sneridagh
- Add classname of variation in edit mode @iFlameing

## 16.0.0-alpha.22 (2022-08-05)

### Breaking

- The complete configuration registry is passed to the add-ons and the project configuration pipeline
  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information. @sneridagh
- Refactor the component registry API in the configuration registry @sneridagh @tiberiuichim

### Bugfix

- Fix content loading in `DefaultView` infinite loop if a listing block with no query is present. @sneridagh

### Documentation

- Documentation of the new component registry API @sneridagh

## 16.0.0-alpha.21 (2022-08-03)

### Bugfix

- Fix ArrayWidget choices when editing a recently created content item. @davisagli

### Internal

- Fix propTypes for Pagination component @davisagli

## 16.0.0-alpha.20 (2022-08-01)

### Breaking

- Use `Cypress` 10.3.0 (migrate from 9.x.x). Cypress 10 has some interesting goodies, being the native support of Apple Silicon Computers the main of it. See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information. @sneridagh

### Bugfix

- Make Search page title translatable @erral
- Changed storeProtectLoadUtils location from src/storeProtectLoadUtils to src/middleware/storeProtectLoadUtils @MdSahil-oss

### Documentation

- Minor clean up of volto-slate upgrade guide. @stevepiercy

- Rework documentation on how to write a Slate plugin @ksuess

## 16.0.0-alpha.19 (2022-07-28)

### Breaking

- Using volto-slate Headline / Subheadline buttons strips all elements in the selection @tiberiuichim

### Feature

- Send extra data coming from listing block schemaEnhancer from searchBlock to the listing variation @ionlizarazu

### Bugfix

- complete pt_BR translation @ericof
- Fix action `listUsers`. Provide default. @ksuess
- Provide the correct id to the blocks wrapped by StyleWrapper. @razvanMiu
- Remove console deprecation notice for 'host' property usage coming from Express @sneridagh

### Internal

- Allow passing `allowedChildren` option to the BlockButton, to strip elements in headlines @tiberiuichim
- Upgrade to latest `@plone/scripts` @sneridagh
- Update browserlist definitions @sneridagh

### Documentation

- Add upgrade guide documentation for dealing with `volto-slate` upgrades for Volto 16 alpha 15 onwards. @sneridagh

## 16.0.0-alpha.18 (2022-07-26)

### Breaking

- Remove the `callout` button (the one with the megaphone icon) from the slate toolbar since it has the same styling as `blockquote`. If you need it anyway, you can bring it back in your addon. @sneridagh

### Bugfix

- Fix edge cases in Cypress flaky tests when the Edit component was loaded without loading the type schema. @sneridagh & @davisagli
- Fix edge cases in Cypress flaky tests when the Edit component was loaded for the wrong content path. @davisagli

### Internal

- Fix `defaultBlockType` entry in default config, set it to slate. @sneridagh

## 16.0.0-alpha.17 (2022-07-25)

### Feature

- Added the `Undo controlpanel` to the controlpanels which can be used to undo transactions. @MdSahil-oss

### Bugfix

- Make `crypto-random-string` a direct dep, fixing a hidden error since some updated dependency was requiring it directly but not anymore. @sneridagh

## 16.0.0-alpha.16 (2022-07-25)

### Do not use, this is a brown bag release

See: https://github.com/plone/volto/pull/3505
Use next release instead: https://github.com/plone/volto/releases/tag/16.0.0-alpha.17

### Breaking

- Staticize Poppins font to be compliant with EU privacy. Import from GoogleFont is disabled in site.variables. @giuliaghisini

### Bugfix

- Add some more messages to be able to translate them @erral
- Fix typo in de locale @wolbernd
- [generator] Improvements to the addon generator: Now it wires up the addon automatically for immediate local development @sneridagh
- complete eu translation @erral
- complete es translation @erral
- [generator] Add .editorconfig and .prettierignore to generated projects and addons. @ericof

### Internal

- Update json-schema including transitive dependencies @davisagli
- Update release-it @davisagli
- Deduplicate dependencies using yarn-deduplicate @davisagli

### Documentation

- Fix redirect on YouTube, broken link after merge and deleted branch. @stevepiercy

## 16.0.0-alpha.15 (2022-07-21)

### Breaking

- Integrate volto-state add-on. @tiberiuichim @razvanmiu @eea

### Documentation

- volto-slate documentation @nileshgulia1

## 16.0.0-alpha.14 (2022-07-20)

### Breaking

- Action `listUsers`to be called with Object. Distinguish between search for id or search for fullname, email, username @ksuess

### Feature

- Add user group membership control panel @ksuess
- Action `listUsers`: Support search for fullname, email, username. @ksuess

### Bugfix

- Fix typo in de locale @wolbernd

## 16.0.0-alpha.13 (2022-07-18)

### Feature

- Add schema to video block sidebar @iRohitSingh @danielamormocea

### Bugfix

- Prevent the `defaultView` to show anything if the content is not loaded yet. This fixes showing the non-blocks enabled view for a fraction of a second before showing the blocks-enabled one once the content is loaded. @sneridagh

### Documentation

- `aria-*` attributes are now parsed correctly by jsx-lexer 2.0. @stevepiercy

## 16.0.0-alpha.12 (2022-07-13)

### Feature

- Use type info instead of id type as icon title in the folder contents. @mamico
- Remove transifex configuration for Volto translations @erral
- Add missing support for inner `blocksConfig` in block extensions resolutions @sneridagh

### Bugfix

- Fixed the description field not being included in the navigation action/ reducer @JeffersonBledsoe #3454
- Fixed a11y of Maps block (#3467) @iRohitSingh

### Internal

- Mock all loadable libraries. @mamico

### Documentation

- Remove sphinx_sitemap configuration because Volto's docs are now imported into the main docs, making this setting unnecessary. @stevepiercy
- Set the ogp_site_url to main docs, instead of training. @stevepiercy

## 16.0.0-alpha.11 (2022-06-21)

### Feature

- Add listing variation schemaEnhancer to the search block schema @ionlizarazu
- Use the local blocksConfig for extensions, fallback to the config object one. This allows to override local blocks config in nested blocks (blocks in a block, eg. accordion, grid, row) @sneridagh

### Internal

- Fix warning because missing key in `VersionOverview` component @sneridagh

## 16.0.0-alpha.10 (2022-06-17)

### Bugfix

- Fix CSS bundling in production mode to be consistent with the current policy in the client bundle. Right now the order of the CSS resources matches this chain: Loading of `import my-less.less` in add-ons (following the add-on order) -> Loading of the Semantic UI defaults -> Loading of the local theme (either project or add-on based). We are forcing now the bundling of all the CSS in one chunk, so it behaves the same than in dev mode (using the style-loader). @sneridagh

## 16.0.0-alpha.9 (2022-06-17)

### Feature

- New `cloneDeepSchema` helper @sneridagh

### Bugfix

- Use `cloneDeepSchema` helper for schema cloning operations, this fixes the error thrown in the use case of having JSX in the schema while cloning schema operations @sneridagh

## 16.0.0-alpha.8 (2022-06-17)

### Feature

- Refactor image block: make it schema extensible @nileshgulia1 @sneridagh
- Add control panel via config.settings @ksuess https://github.com/plone/volto/issues/3426
- Add noindex metadata tag @steffenri
- Adding Schema for Maps Block in Sidebar @iRohitSingh
- Add a Pluggable to the sharing page @JeffersonBledsoe #3372

### Bugfix

- Don't render junk when no facets are added to the search block @tiberiuichim
- Fix visibility of toolbar workflow dropdown for more states as fitting in .toolbar-content. @ksuess
- Fix the video block for anonymous user @iFlameing

## 16.0.0-alpha.7 (2022-06-01)

### Bugfix

- fix schema when content contains lock informations. @giuliaghisini

### Internal

- Missing change from the last breaking change (Remove the style wrapper around the `<Block />` component in Edit mode, moved to the main edit wrapper). Now, really move it to the main edit wrapper @sneridagh

## 16.0.0-alpha.6 (2022-05-31)

### Breaking

- Rename `src/components/manage/Widgets/ColorPicker.jsx` component to `src/components/manage/Widgets/ColorPickerWidget.jsx` @sneridagh
- Remove the style wrapper around the `<Block />` component in Edit mode, moved to the main edit wrapper @sneridagh

### Feature

- Updated Brazilian Portuguese translation @ericof
- Forward `HTTP Range` headers to the backend. @mamico
- Add default value to color picker, if `default` is present in the widget schema. @sneridagh
- Inject the classnames of the StyleWrapper into the main edit wrapper (it was wrapping directly the Edit component before). This way, the flexibility is bigger and you can act upon the whole edit container and artifacts (handlers, etc) @sneridagh

### Bugfix

- fix TokenWidget choices when editing a recently created content. @giuliaghisini
- Fix color picker defaults implementation #2 @sneridagh
- Enable default color in `backgroundColor` default StyleWrapper field which wasn't sync with the default value setting @sneridagh
- Fix Block style wrapper: Cannot read properties of undefined (reading 'toString') @avoinea #3410

## 16.0.0-alpha.5 (2022-05-25)

### Bugfix

- Fix regression, compound lang names (eg. `pt-BR`) no longer working @sneridagh

## 16.0.0-alpha.4 (2022-05-22)

### Breaking

- Removed `date-fns` from dependencies, this was in the build because `Cypress` depended on it. After the `Cypress` upgrade it no longer depends on it. If your project still depends on it, add it as a dependency of your project. @sneridagh
- Removed all usage of `date-fns` from core. @sneridagh

### Feature

- added 'show total results' option in Search block configuration. @giuliaghisini
- Added viewableInBrowserObjects setting to use in alternative to downloadableObjects, if you want to view file in browser intstead downloading. @giuliaghisini
- Disable already chosen criteria in querystring widget @kreafox
- Added X-Forwarded-\* headers to superagent requests. @mamico

### Bugfix

- Fix `withStylingSchemaEnhancer` enhancer mechanism @sneridagh
- Add correct query parameters to the redirect @robgietema
- Fix RenderBlocks: path @ksuess
- Fix field id creation in dexterity control panel to have slugified id @erral
- Changed to get intl.locale always from state @ionlizarazu

### Internal

- Update `Cypress` to version 9.6.1 @sneridagh

### Documentation

- Updated `simple.md` @MdSahil-oss
- Fix indentation in nginx configuration in `simple.md` @stevepiercy

## 16.0.0-alpha.3 (2022-05-16)

### Breaking

- Remove `div` as default if `as` prop from `RenderBlocks`. Now the default is a `React.Fragment` instead. This could lead to CSS inconsistencies if taken this div into account, specially if used in custom add-ons without. In order to avoid them, set the `as` property always in your add-ons. @sneridagh

## 16.0.0-alpha.2 (2022-05-16)

### Feature

- Add default widget views for all type of fields and improve the DefaultView @ionlizarazu
- added configurable identifier field for password reset in config.js. @giuliaghisini
- Add `expandToBackendURL` helper @sneridagh

### Bugfix

- fixed view video list from youtube in Video block. @giuliaghisini
- Fixed ICS URL in event view in seamless mode @sneridagh

### Internal

- Reintroduce Plone 6 acceptance tests using the latests `plone.app.robotframework` 2.0.0a6 specific Volto fixture. @datakurre @ericof @sneridagh
- Upgrade all tests to use `plone.app.robotframework` 2.0.0a6 @sneridagh
- Upgrade Sentry to latest version because of [#3346](https://github.com/plone/volto/issues/3346) @sneridagh

### Documentation

- fix make task `docs-linkcheckbroken` if grep has exit code 1 (no lines found)

## 16.0.0-alpha.1 (2022-05-09)

### Feature

- Added new Block Style Wrapper. This implementation is marked as **experimental** during Volto 16 alpha period. The components, API and the styling are subject to change **without issuing a breaking change**. You can start using it in your projects and add-ons, but taking this into account. See documentation for more information. @sneridagh

## 16.0.0-alpha.0 (2022-05-06)

### Breaking

- Deprecate NodeJS 12 since it's out of LTS since April 30, 2022 @sneridagh
- Move all cypress actions to the main `Makefile`, providing better meaningful names. Remove them from `package.json` script section. @sneridagh

### Feature

- Allow final users to switch between available views in the search block. A "view" is any of available listing block variations. In the search block configuration you can pick the available views for that block. @tiberiuichim

### Bugfix

- Fixes in search block. Disable default live search. Added clear button for search input. Fixed facet dropdown clear button. Removed sort on label customization option. Layout improvements, CSS polishments. @kreafox @tiberiuichim
- added default placeholder for videos to embed them more lightly @giuliaghisini
- Added default placeholder for videos to embed them more lightly @giuliaghisini
- Completed Romanian translation @sboghy

### Bugfix

- Fix Search page visit crashes /contents view @dobri1408
- Fix sidebar full size bottom opacity on edit page when sidebar is collapsed @ichim-david
- Fix toolbar bottom opacity on edit page when toolbar is collapsed @ichim-david
- Fix missing criteria in QueryWidget. @giuliaghisini
- Fix content view regression, height issue @danielamormocea
- Fixed secure cookie option. @giuliaghisini
- Changed addon order in addon controlpanel to mimic Classic UI @erral
- Fixed error when loading content in a language for which a Volto translation is not available. @davisagli
- Fix different querystring filters in the querystring widget @kreafox
- Fix for clipped dropdown menus when the table has few or no records in Contents view @mihaislobozeanu

### Internal

- Improve Cypress integration, using Cypress official Github Action. Improve some flaky tests that showed up, and were known as problematic. Refactor and rename all the Github actions giving them meaningful names, and group them by type. Enable Cypress Dashboard for Volto. @sneridagh
- Stop using `xmlrpc` library for issuing the setup/teardown in core, use a `cy.request` instead. @sneridagh
- Added Cypress environment variables for adjusting the backend URL of commands @JeffersonBledsoe #3271
- Fixed Storybook configuration for add-ons @pnicolli

### Documentation

- Move Cypress documentation from `README.md` to the docs. Improve the docs with the new `Makefile` commands.
- Improve English grammar and syntax in backend docs. @stevepiercy
- Fix JSX syntax highlighting. Remove duplicate heading. @stevepiercy
- Proper case HAProxy, nginx, and Docker Compose. @stevepiercy

## 15.8.0 (2022-04-30)

### Feature

- Handle @@display-file api endpoint like @@download @cekk
- Add calendar link to @ics_view @iFlameing

## 15.7.0 (2022-04-29)

### Feature

- added 'secure' cookie option if site is in https. @giuliaghisini

## 15.6.1 (2022-04-29)

### Bugfix

- Overwrite isValidNewOption of ArrayWidget to allow variants @ksuess

## 15.6.0 (2022-04-29)

### Feature

- Added 'checkAndNormalizeUrl' function in URLUtils. @giuliaghisini

### Bugfix

- Used UniversalLink and PreviewImage components where needed, to right handle link and images. @giuliaghisini

## 15.5.0 (2022-04-25)

### Feature

- More Italian translations @giuliaghisini

### Bugfix

- Fixed edit internal link and image url in this blocks: image block, leadimage block, video block, objectBrowser. In objectBrowser, if pasted url was internal, it wasn't flatted and wass handled from Plone as an external. @giuliaghisini
- Fix folder content layout @SaraBianchi

### Documentation

- Added a `selectableTypes` example to the `ObjectBrowserWidget` storybook @JeffersonBledsoe #3255
- Add labels for Intersphinx. @stevepiercy

## 15.4.1 (2022-04-11)

### Bugfix

- Fix handling of single reference field in `ObjectBrowser` @robgietema
- Make the parseDateTime function to handle only date as well @iFlameing
- Fix ContextNavigation component with Link type objects @UnaiEtxaburu #3232

### Internal

- Upgrade react-image-gallery to latest to fix a11y problem @sneridagh
- Fixed bug in HTML block edit @giuliaghisini
- Fix cannot read properties of undefined in Content.jsx @iFlameing
- Fix fixed `ObjectBrowserBody` to handle data fields based on `ObjectBrowser` mode @giuliaghisini

## 15.4.0 (2022-04-08)

### Feature

- Add package.json scripts documentation @ksuess

### Bugfix

- Fix/Improve the console logging when the server starts. @sneridagh

### Documentation

- Added html_meta values to remaining pages. @stevepiercy
- Remove duplicate toctrees and set maxdepth to appropriate values. @stevepiercy

## 15.3.0 (2022-04-04)

### Feature

- Improve the fix for the "user swap" vulnerability @sneridagh @plone/volto-team
  Thanks to @ericof and @cekk for their help and efforts at pinpointing the latests culprits!

### Documentation

- Added meta-html values in most of the pages. @ktsrivastava29

## 15.2.3 (2022-04-01)

### Bugfix

- Change which api calls can set specific api errors @robgietema
- Fix helper import. @robgietema
- Move `customStyleMap` to `richtextEditorSettings`
- Pass placeholder and isDisabled properties to EmailWidget and UrlWidget @mihaislobozeanu
- Pass placeholder property to PasswordWidget and NumberWidget @mihaislobozeanu
- Fix getVocabName when vocabNameOrURL is false @avoinea #2955, #2919

### Internal

- Remove offending `Makefile` command that broke on MacOS due to lack of compatibility of the MacOS `make` utility. @tisto
- Upgraded use-deep-compare-effect to version 1.8.1. @pnicolli
- chore(icons): add missing pastanaga icons @nileshgulia1

### Documentation

- Switch from `docs-linkcheckbroken` to `docs-linkcheck` in GitHub Actions because the former is broken. @stevepiercy
- Set the output for storybook to the correct directory. @stevepiercy
- Fix typo in Makefile: docs/\_build @ksuess
- Added language to code-blocks in md files @ktsrivastava29

## 15.2.2 (2022-03-23)

### Bugfix

- Fix external url append issue of @@download/file @iRohitSingh
- Fix headers in sitemap middleware when errors occur in the sitemap generation @mamico

## 15.2.1 (2022-03-21)

### Bugfix

- `Manage translations` view error on seamless mode, `flattenToAppURL` missing. @sneridagh

### Documentation

- Reenable `make docs-linkcheckbroken`. @stevepiercy
- Add html_meta values to add-on best practices, s/addon/add-on. @stevepiercy
- Netlify now only builds on changes to the `./docs/` directory. @stevepiercy
- Replace deprecated `egrep` with `grep` in `make docs-linkcheckbroken`. @stevepiercy

## 15.2.0 (2022-03-18)

### Feature

- Add helper utilities to be used by addons @robgietema

### Bugfix

- Fix addon registry regression @sneridagh
- Fix `Bosnian` language @avoinea
- Fix use `settings.internalApiPath` in sitemap genaration @mamico

### Documentation

- Reduced build minutes on Netlify by building only on changes to the `docs/**` path on pull requests. See https://github.com/plone/volto/pull/3171. @stevepiercy
- Add "Documentation" heading to the automatic change log updater file `changelogupdater.js`. @stevepiercy

## 15.1.2 (2022-03-17)

### Bugfix

- Fix the alt prop in `PreviewImage` component @sneridagh

## 15.1.1 (2022-03-16)

### Bugfix

- Add optional alt tag to `PreviewImage` props @kindermann
- Remove non add-on names from `addonNames` list in Addons Registry. Update the list in the `addonsInfo` for the addons loader as well. @sneridagh

## 15.1.0 (2022-03-15)

### Feature

- Added a new component, PreviewImage. It renders a preview image for a catalog brain (based on the `image_field` prop). @tiberiuichim

### Bugfix

- Clear search results before new query is done. @robgietema

### Documentation

- Updated `README.md` @ktsrivastava29
- Added language to code-blocks in md files @ktsrivastava29
- Added html_meta values and labels for Intersphinx cross-references from Trainings. @stevepiercy
- Replaced `docs.voltocms.com` with MyST references. @stevepiercy

## 15.0.0 (2022-03-14)

### Breaking

- Upgrade `react-cookie` to the latest version. @sneridagh @robgietema
  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.
- Language Switcher no longer takes care of the change of the language on the Redux Store. This responsibility has been unified in the API Redux middleware @sneridagh
- Markup change in `LinkView` component.
- Rename `core-sandbox` to `coresandbox` for sake of consistency @sneridagh
- Extend the original intent and rename `RAZZLE_TESTING_ADDONS` to `ADDONS`. @sneridagh
  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.
- Lazyload Draft.js library. See the upgrade guide on how that impacts you, in case you have extended the rich text editor configuration @tiberiuichim @kreafox
  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.
- Deprecating `lang` cookie in favor of Plone official one `I18N_LANGUAGE` @sneridagh

### Feature

- Add `cookiesExpire` value to config to control the cookie expiration @giuliaghisini
- DatetimeWidget 'noPastDates' option: Take widgetOptions?.pattern_options?.noPastDates of backend schema into account. @ksuess
- Add a new type of filter facet for the Search block. Heavily refactor some searchblock internals. @tiberiuichim
- Add date range facet to the search block @robgietema
- Introduce the new `BUILD_DIR` runtime environment variable to direct the build to run in a specific location, different than `build` folder. @sneridagh
- Handle redirect permanent calls from the backend in the frontend (e.g. when changing the short name) @robgietema
- Added id widget to manage short name @robgietema
- Refactor language synchronizer. Remove it from the React tree, integrate it into the Api Redux middleware @sneridagh
- Add blocks rendering in Event and NewsItem views (rel plone.volto#32) @nzambello @ksuess
- Add internal volto ids to invalid ids @robgietema
- Complete Basque translation @erral
- Complete Spanish translation @erral
- Sort the choices in Facets in the search block @iFlameing

### Bugfix

- Fix the `null` error in SelectAutoComplete Widget @iFlameing
- Prevent the `MultilingualRedirector` to force content load when switching the language @reebalazs
- Fix the upload image in contents view @iFlameing
- add "view" id to contact-form container for main content skiplink @ThomasKindermann
- Fix loading indicator positioning on Login form submit @sneridagh
- Fix redirect bug with URLs containing querystrings @robgietema
- Fixed id widget translations @robgietema
- Contents Rename Modal, use `id` Widget type @sneridagh
- Fix overflow of very long file name in `FileWidget` @sneridagh
- Fix overflowing issue in the toolbar @kreafox
- Overwrite current block on insert new block. @robgietema
- Fix hot reload on updates related to the config object because of `VersionOverview` component @sneridagh
- Fix error when lock data is gone after an invariant error. @robgietema
- Protect against ghost content loading and scroll to top @reebalazs

### Internal

- Change prop `name` -> `componentName` in component `Component` @sneridagh
- Add new RawMaterial Volto websites in production @nzambello
- House cleanup, remove some unused files in the root @sneridagh
- Move Webpack related files to `webpack-plugins` folder @sneridagh
- Remove unused Dockerfiles @sneridagh
- Update Docker compose to latest images and best practices @sneridagh
- Improve flaky test in coresandbox search Cypress tests @sneridagh
- Better implementation of the add-on load coming from the environment variable `ADDONS` @sneridagh
- Turn `lazyLibraries` action into a thunk. Added a conditional if the library is loaded or in process to be loaded, do not try to load it again. This fixes the lag on load `draftjs` when having a lot of draftjs blocks. @sneridagh
- Use `@root` alias instead of `~` in several module references. Most of the Volto project code no longer needs the root alias, so it makes sense to phase it out at some point @tiberiuichim
- Alias `lodash` to `lodash-es`, as this will include only one copy of lodash in the bundle @tiberiuichim
- Better Readme, updated to 2022 @sneridagh
- Update to latest versions for Python packages @sneridagh
- Add `id` as widget type as well @sneridagh

### Documentation

- Upgrade Guide i18n: Make clear what's project, what add-on. @ksuess
- (Experimental) Prepare documentation for MyST and importing into `plone/documentation@6-dev`. @stevepiercy
- Fix broken links and redirects in documentation to be compatible with MyST. @stevepiercy
- Update add-on internationalization. @ksuess
- Add MyST and Sphinx basic configuration for rapid build and comparison against MkDocs builds. @stevepiercy
- Fix many MyST and Sphinx warnings. @stevepiercy
- Remove MkDocs configuration. See https://github.com/plone/volto/issues/3042 @stevepiercy
- Add Plone docs to Intersphinx and fix broken link. @stevepiercy
- Get version from `package.json` @sneridagh
- Remove legacy folder in docs @sneridagh
- Backport docs of RAZZLE_TESTING_ADDONS environment variables. See https://github.com/plone/volto/pull/3067/files#diff-00609ed769cd40cf3bc3d6fcc4431b714cb37c73cedaaea18fe9fc4c1c589597 @stevepiercy
- Add missing developer-guidelines/typescript to toctree @stevepiercy
- Add Netlify for preview of Sphinx builds for pull requests against `master` and `plone6-docs`. @stevepiercy
- Clean up toctree errors by removing obsolete files, adding `:orphan:` field list, and reorganizing some files. @sneridagh and @stevepiercy
- Switch to using netlify.toml to configure Netlify Python environment. @stevepiercy
- Convert admonition syntax from Markdown to MyST. @sneridagh
- Make links build both in Volto and Plone documentation. See https://github.com/plone/volto/pull/3094 @stevepiercy
- Fix broken links. @stevepiercy
- Update Sphinx configuration to check anchors in links and exclude problematic URLs. @sneridagh and @stevepiercy
- Fix StoryBook links @sneridagh
- Clean up `linkcheck_ignore` values. @stevepiercy

## 15.0.0-alpha.14 (2022-03-10)

### Bugfix

- Contents Rename Modal, use `id` Widget type @sneridagh

### Internal

- Better Readme, updated to 2022 @sneridagh
- Update to latest versions for Python packages @sneridagh
- Add `id` as widget type as well @sneridagh

### Documentation

- Fix broken links. @stevepiercy

## 15.0.0-alpha.13 (2022-03-09)

### Feature

- Sort the choices in Facets in the search block @iFlameing

### Bugfix

- Fix overflow of very long file name in `FileWidget` @sneridagh
- Fix overflowing issue in the toolbar @kreafox

## 15.0.0-alpha.12 (2022-03-07)

### Feature

- Add internal volto ids to invalid ids @robgietema
- Complete basque translation @erral
- Complete spanish translation @erral

### Internal

- Change prop `name` -> `componentName` in component `Component` @sneridagh

## 15.0.0-alpha.11 (2022-03-02)

### Bugfix

- Fix redirect bug with URLs containing querystrings @robgietema
- Fixed id widget translations @robgietema

### Internal

- Use `@root` alias instead of `~` in several module references. Most of the Volto project code no longer needs the root alias, so it makes sense to phase it out at some point @tiberiuichim
- Alias `lodash` to `lodash-es`, as this will include only one copy of lodash in the bundle @tiberiuichim

## 15.0.0-alpha.10 (2022-02-28)

### Bugfix

- Turn `lazyLibraries` action into a thunk. Added a conditional if the library is loaded or in process to be loaded, do not try to load it again. This fixes the lag on load `draftjs` when having a lot of draftjs blocks. @sneridagh

## 15.0.0-alpha.9 (2022-02-28)

### Breaking

- Deprecating `lang` cookie in favor of Plone official one `I18N_LANGUAGE` @sneridagh

### Feature

- Added id widget to manage short name @robgietema
- Refactor language syncronizer. Remove it from the React tree, integrate it into the Api Redux middleware @sneridagh
- Add blocks rendering in Event and NewsItem views (rel plone.volto#32) @nzambello @ksuess

### Bugfix

- Fix redirect bug with URLs containing querystrings @robgietema

## 15.0.0-alpha.8 (2022-02-22)

### Internal

- Better implementation of the add-on load coming from the environment variable `ADDONS` @sneridagh

## 15.0.0-alpha.7 (2022-02-22)

### Feature

- Introduce the new `BUILD_DIR` runtime environment variable to direct the build to run in an especific location, different than `build` folder. @sneridagh
- Handle redirect permanent calls from the backend in the frontend (e.g. when changing the short name) @robgietema

## 15.0.0-alpha.6 (2022-02-21)

### Feature

- DatetimeWidget 'noPastDates' option: Take widgetOptions?.pattern_options?.noPastDates of backend schema into account. @ksuess
- Add a new type of filter facet for the Search block. Heavily refactor some searchblock internals. @tiberiuichim
- Add date range facet to the search block @robgietema

### Internal

- Improve flaky test in coresandbox search Cypress tests @sneridagh

### Documentation

- (Experimental) Prepare documentation for MyST and importing into `plone/documentation@6-dev`. @stevepiercy
- Fix broken links and redirects in documentation to be compatible with MyST. @stevepiercy
- Update add-on internationalization. @ksuess
- Add MyST and Sphinx basic configuration for rapid build and comparison against MkDocs builds. @stevepiercy
- Fix many MyST and Sphinx warnings. @stevepiercy
- Remove MkDocs configuration. See https://github.com/plone/volto/issues/3042 @stevepiercy
- Add Plone docs to Intersphinx and fix broken link. @stevepiercy
- Get version from `package.json` @sneridagh
- Remove legacy folder in docs @sneridagh
- Backport docs of RAZZLE_TESTING_ADDONS environment variables. See https://github.com/plone/volto/pull/3067/files#diff-00609ed769cd40cf3bc3d6fcc4431b714cb37c73cedaaea18fe9fc4c1c589597 @stevepiercy
- Add missing developer-guidelines/typescript to toctree @stevepiercy
- Add Netlify for preview of Sphinx builds for pull requests against `master` and `plone6-docs`. @stevepiercy
- Clean up toctree errors by removing obsolete files, adding `:orphan:` field list, and reorganizing some files. @sneridagh and @stevepiercy
- Switch to using netlify.toml to configure Netlify Python environment. @stevepiercy
- Convert admonition syntax from Markdown to MyST. @sneridagh
- Make links build both in Volto and Plone documentation. See https://github.com/plone/volto/pull/3094 @stevepiercy

## 15.0.0-alpha.5 (2022-02-16)

### Breaking

- Lazyload draftjs library. See the upgrade guide on how that impacts you, in case you have extended the rich text editor configuration @tiberiuichim @kreafox
  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

### Feature

- Add `cookiesExpire` value to config to control the cookie expiration @giuliaghisini

## 15.0.0-alpha.4 (2022-02-16)

### Breaking

- Markup change in `LinkView` component.
- Rename `core-sandbox` to `coresandbox` for sake of consistency @sneridagh
- Extend the original intent and rename `RAZZLE_TESTING_ADDONS` to `ADDONS`. @sneridagh
  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

### Internal

- House cleanup, remove some unused files in the root @sneridagh
- Move Webpack related files to `webpack-plugins` folder @sneridagh
- Remove unused Dockerfiles @sneridagh
- Update Docker compose to latest images and best practices @sneridagh

## 15.0.0-alpha.3 (2022-02-11)

### Bugfix

- Fix the upload image in contents view @iFlameing
- add "view" id to contact-form container for main content skiplink @ThomasKindermann
- Fix loading indicator positioning on Login form submit @sneridagh

### Internal

- Add new RawMaterial Volto websites in production @nzambello

## 15.0.0-alpha.2 (2022-02-10)

### Breaking

- Language Switcher no longer takes care of the change of the language on the Redux Store. This responsability has been unified in the `MultilingualRedirector` @sneridagh

### Bugfix

- Prevent the MultilingualRedirector to force 4 content load when switching the language @reebalazs

### Documentation

- Upgrade Guide i18n: Make clear what's project, what add-on. @ksuess

## 15.0.0-alpha.1 (2022-02-09)

### Bugfix

- Fix the `null` error in SelectAutoComplete Widget @iFlameing

## 15.0.0-alpha.0 (2022-02-09)

### Breaking

- Upgrade `react-cookie` to latest version. @sneridagh @robgietema
  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

## 14.10.0 (2022-02-08)

### Feature

- Add Pluggable to toolbar user menu. @ksuess

## 14.9.0 (2022-02-08)

### Feature

- Show addons installed in control panel @sneridagh
- Added a search input in the block chooser @bipoza

### Bugfix

- Fix italian translations in ObjectBrowser @giuliaghisini

## 14.8.1 (2022-02-04)

### Bugfix

- Fix wrong CSS in language independent class selector @sneridagh

### Internal

- Cleanup redundant buildout install run.

## 14.8.0 (2022-02-03)

### Feature

- Enable `components` property in Volto's config registry. Does not expose any direct feature but this will open the door to be able to override registered components using the config registry and avoid using shadowing explicitly. @sneridagh
- Add `resolve` and `register` helper methods for the Volto config. They retrieve and register new components in the registry. @tiberiuichim @sneridagh
- Add `Component` component, given a `name` of a component registered in the registry, it renders it, passing down the props. @tiberiuichim
- Syncronize the content language with the UI language in multilingual sites. So when you are accessing a content in a given language the rest of the interface literals follow along (it updates the language cookie). So the UI remains consistent. @sneridagh

### Bugfix

- Fix the a11y violation of UrlWidget @iRohitSingh

### Internal

- Update volta pins in package.json @fredvd

## 14.7.1 (2022-02-02)

### Internal

- Add CSS body class in Babel view. Improve marker for language independent fields in Babel view too. @sneridagh

### Docs

Update documentation for internal proxy & other smaller reorganisation for quicker onboarding of
new users/evaluators. @fredvd

## 14.7.0 (2022-01-28)

### Feature

- Add `<FormattedDate>` and `<FormattedRelativeDate>` components. Check their Storybook stories for details. This is part of ongoing work to minimize the use of 'deprecated' momentjs. @sneridagh @tiberiuichim

### Internal

- Upgrade jest to latest release, 27 major. @tiberiuichim
- Lazyload momentjs. `parseDateTime` helper now requires passing the momentjs library @tiberiuichim

## 14.6.0 (2022-01-27)

### Feature

- Use `volto.config.js` as dynamic configuration for addons. It adds up to the `package.json` `addons` key, allowing dynamic load of addons (eg. via environment variables) @sneridagh

### Internal

- Fix ObjectListWidget story bug caused by lazyloading dnd libraries
  @tiberiuichim

## 14.5.0 (2022-01-26)

### Feature

- VocabularyTermsWidget: Token is now on creation of term editable, but stays ineditable afterwards. @ksuess

### Bugfix

- Fix A11Y violations in Navigation @iRohitSingh
- Fix `language-independent-field` CSS class styling @sneridagh

### Internal

- Lazyload react-beautiful-dnd @tiberiuichim
- Lazyload react-dnd @tiberiuichim
- Improve docs on environment variables, add recipes @sneridagh
- Update p.restapi to 8.20.0 and plone.volto to 4.0.0a1 and plone.rest to 2.0.0a2 @sneridagh

## 14.4.0 (2022-01-21)

### Feature

- Language independent fields support in Volto forms @sneridagh

## 14.3.0 (2022-01-20)

### Feature

- Bump semantic-ui-react to v2.0.3 @nileshgulia1

## 14.2.3 (2022-01-20)

### Bugfix

- Fix ListingBlock to add "No results" message when there are no messages @erral
- Fix overflow table in Content view @giuliaghisini
- Fixed url validation in FormValidation to admit ip addresses. @giuliaghisini
- Upgrade to plone.restapi 8.19.0 (to support the language independent fields serialization) @sneridagh

## 14.2.2 (2022-01-13)

### Bugfix

- Fix home URL item in Navigation, which was evaluating as non-internal @sneridagh
- Improve the request handling in `getAPIResourceWithAuth` and in `Api` helper. This fixes the "Cannot set headers once the content has being sent" @sneridagh
- Fix when you remove the time from DatetimeWidget @iRohitSingh

### Internal

- Fix URL for Climate-Energy, a Volto website @tiberiuichim
- Fix quirky Cypress test in "DX control panel schema" @sneridagh

## 14.2.1 (2022-01-12)

### Bugfix

- Fix home URL item in Navigation, which was evaluating as non-internal

### Internal

- Use plone-backend docker images for Cypress tests @sneridagh
- Upgrade `query-string` library so it supports Plone `:list` qs marker @sneridagh

## 14.2.0 (2022-01-04)

### Feature

- Allow `creatable` prop to be passed to `ArrayWidgets`, in case they don't have a vocabulary @giuliaghisini
- Added initialBlocksFocus to blocks config, to set default focus on non-first block. @giuliaghisini

## 14.1.1 (2022-01-03)

### Internal

- Update to plone.restapi 8.18.0, remove some defensive code in vocabularies action now that it's fixed in the backend @sneridagh

## 14.1.0 (2021-12-31)

### Feature

- Added custom option to SelectWidget to render custom optionss (for example with icons) @giuliaghisini
- Added form undo support in the form of two buttons in the main toolbar and ctrl+z, ctrl+y as hotkeys for undo/redo. The undo capabilities are provided by a new helper hook, `useUndoManager`. @tiberiuichim

### Bugfix

- Fix query data in listing blocks ssr async call @cekk
- In the contact form, only display the "back" button in the toolbar @tiberiuichim
- Fixed selected widget to use isMulti prop @giuliaghisini

### Internal

- Allow the draftjs Text block edit to update the editor content when incoming block data is mutated outside the block (to support form undo) @tiberiuichim
- Remove use of internal component state for ArrayWidget, SelectWidget and TokenWidget, (to support form undo) @tiberiuichim
- Use lazy loading of react-dates and momentjs for the DatetimeWidget @tiberiuichim
- Improve widget stories, add a common `WidgetStory` class, show undo capabilities in widget stories @tiberiuichim
- Better SelectAutocompleteWidget and SelectUtils @giuliaghisini @sneridagh @tiberiuichim

## 14.0.2 (2021-12-22)

### Internal

- Better favicon definitions, 2021 bullet proof @sneridagh

## 14.0.1 (2021-12-21)

### Bugfix

- Construct request with list parameters as separate querystring key value pairs according Zope convention @ksuess
- Fix spelling in error message when backend is unreachable @instification

## 14.0.0 (2021-12-20)

### Breaking

- Remove compatibility for old configuration (based on imports) system. Migrate your configuration to the new configuration system for your project before upgrading to Volto 14. See https://6.docs.plone.org/volto/upgrade-guide/index.html#volto-configuration-registry @sneridagh
- Content locking is not a breaking change, but it's worth noting that Volto 14 comes with locking support enabled by default. Latest `plone.restapi` version is required. @avoinea
- Revisited, rethought and refactored Seamless mode @sneridagh
  For more information, please read the deploying guide
  https://6.docs.plone.org/volto/deploying/seamless-mode.html
- Listing block no longer use `fullobjects` to retrieve backend data. It uses the catalog data instead. This improves the performance of the listing block. @plone/volto-team
- Removed pagination in vocabularies widgets (SelectWidget, ArrayWidget, TokenWidget) and introduced subrequest to vocabulary action. @giuliaghisini
- Use the block's title as the source of the translation instead of using the id of the block. See upgrade guide for more information @sneridagh
- New i18n infrastructure in the new `@plone/scripts` package @sneridagh
- Removed `src/i18n.js` in favor of the above change @sneridagh
- Adjusted main `Logo.jsx` default component styling @sneridagh
- Fix logout action using the backend @logout endpoint, effectively removing the `__ac` cookie. It is recommended to upgrade to the latest p.restapi version to take full advantage of this feature @sneridagh
- Improve mobile navigation menu with a nicer interaction and a fixed overlay with a drawer (customizable via CSSTransitionGroup) animation @sneridagh
- Use title instead of id as a source of translation in "Variation" field in block enhancers @sneridagh
- Move `theme.js` import to top of the client code, so it take precedence over any other inline imported CSS. This is not an strict breaking change, but it's worth to mention it as might be important and kept in mind. @sneridagh

See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information about all the breaking changes.

### Feature

- Support Node 16 @timo
- Content locking support for Plone (`plone.locking`) @avoinea
- Add the new search block @tiberiuichim @kreafox @sneridagh
- Provide server-side rendering capabilities for blocks with async-based content (such as the listing block). A block needs to provide its own `getAsyncData` implementation, which is similar to an `asyncConnect` wrapper promise. @tiberiuichim @sneridagh
- Defaults are observed in block data if `InlineForm` or `BlockDataForm` are used. @sneridagh @tiberiuichim
- Apply form defaults from RenderBlocks and block Edit using a new helper, `applyBlockDefaults` @tiberiuichim
- Now each block config object can declare a schema factory (a function that can produce a schema) and this will be used to derive the default data for the block @tiberiuichim
- Add `volto-guillotina` addon to core @sneridagh
- Make `VocabularyTermsWidget` orderable @ksuess
- Get widget by tagged values utility function in the `Field` decider @ksuess
- Use Plone logo @ericof
- Update favicon and related tags with best practices @sneridagh
- Enable to be able to use the internal proxy in production as well @sneridagh
- Add runtime configuration for `@babel/plugin-transform-react-jsx` set to `automatic`. This enables the new JSX runtime: https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html So no longer `import React from 'react'` is needed anymore. @sneridagh
- Add `autocomplete` Widget component - It holds off the vocabulary endpoint pull until you search (more than 2 chars). Useful when dealing with huge vocabularies @sneridagh @reebalazs
- Add new listing block option "fullobjects" per variation @ksuess
- `FormFieldWrapper` accepts now strings and elements for description @nzambello
- Image block:
  - When uploading an image or selecting that from the object browser, Image block will set an empty string as alternative text @nzambello
  - Adds a description to the alt-tag with w3c explaination @nzambello
- Support TypeScript usage in Volto projects @pnicolli
- Added `LinkMore` component and link more in `HeroImageLeft` block. @giuliaghisini
- In the search block, allow editors to specify the sort on criteria.
  @tiberiuichim
- Added `.storybook` setup in the Volto `app` generator. Volto projects generated from this scafolding are now ready to run Storybook for the project and develop addons (in `src/addons` folder).
- Style checkboxes @nileshgulia1
- Allow loading .less files also from a Volto project's `src` folder. @tiberiuichim
- Add catalan translation @bloodbare @sneridagh
- Updated Volto production sites list @giuliaghisini
- Japanese translation updated @terapyon
- German translations updated @tisto
- Updated italian translation @pnicolli
- Updated Brazilian Portuguese translations @ericof

### Bugfix

- Fix `SelectWidget` vocabulary load on second component mount @avoinea #2655
- Fix `/edit` and `/add` `nonContentRoutes` to fix `isCmsUi` fn @giuliaghisini
- Register the dev api proxy after the express middleware @tiberiuichim
- Fix on form errors in block editor, not changing to metadata tab @sneridagh
- Fix SSR on `/edit` with dev proxy @tiberiuichim
- Fix logout action, removing the `__ac` cookie as well, if present. @sneridagh
- Do not show lead image block when the content type does not have the behavior enabled @sneridagh
- Missing default messages from JSON EN language file @sneridagh
- Show correct fieldname and not internal field id in Toast error messages on Add/Edit forms @jackahl
- `sitemap.xml.gz` obeys Plone Search settings @erral
- Get `blocks` and `blocks_layout` defaults from existing behavior when enabling TTW editable DX Layout @avoinea
- Yet another attempt at fixing devproxy. Split the devproxy into a separate devproxy verbose @tiberiuichim
- Add spinner on sharing View Button @iRohitSingh
- Fixed `SelectWidget`: when there was a selected value, the selection was lost when the tab was changed. @giuliaghisini
- Bugfixes to search block. By default search block, when empty, makes a simple
  query to the nav root, to list all content. Fix reading search text from URL.
  Implement a simple compression of URL. Don't count searched text as filter.
  Fix an edge case with showSearchInput in schema. Rename title to Section
  Title in facet column settings. Avoid double calls to querystring endpoint.
  @tiberiuichim
- Use correct shade of black in Plone logo @sneridagh
- Fix loading of cookie on SSR for certain requests, revert slight change in how they are loaded introduced in alpha 16 @sneridagh
- Prevent `ua-parser-js` security breach. See: https://github.com/advisories/GHSA-pjwm-rvh2-c87w @thet
- Fix storybook errors in the connected components, api is undefined. Using now a mock of the store instead of the whole thing @sneridagh
- CSS fix on `QueryWidget` to prevent line jumping for clear button when the multi selection widget has multiple items @kreafox
- Fix disable mode of `QuerystringWidget` when all criteria are deleted @kreafox
- Fix reset pagination in searchblock when changing facet filters @tiberiuichim
- Fix the selection of Maps Block @iRohitSingh
- `UniversalLink`: handle direct download for content-type File if user is not logged. @giuliaghisini
- Fixed `ObjectBrowserWidget` when is multiple or `maximumSelectionSize` is not set @giuliaghisini
- Fix full-width image overlaps the drag handle @iRohitSingh
- Fix move item to top of the folder when clicking on move to top action button @iRohitSingh
- Fix `downloadableObjects` default value @giuliaghisini
- Folder contents table header and breadcrumbs dropdown now appear only from the bottom, fixing an issue where the breadcrumb dropdown content was clipped by the header area @ichim-david
- Folder contents sort dropdown is now also simple as the other dropdowns
  ensuring we have the same behavior between adjecent dropdown @ichim-david
- Fix documention on block extensions, replace `render` with `template` to match Listing block @tiberiuichim
- Fix `isInternalURL` when `settings.internalApiPath` is empty @tiberiuichim
- Fix external link not supported by Navigation component #2853. @ericof
- Get Add/Edit schema contextually #2852 @ericof
- Fix regression in actions vocabularies calls because the change to use contextual schemas @sneridagh
- Include block schema enhancers (main block schema enhancer + variation schema enhancer) when calculating block default data @tiberiuichim
- Fixed object browser selected items number. @giuliaghisini
- Fix action vocabularies call avoiding regex look behind @nzambello
- Use subrequest in hero block to not lost locking token. @cekk
- Always add lang attr in html @nzambello
- Fix time widget position on 24h format @nzambello
- QuerystringWidget more resilient on old schemas @nzambello
- In search block, read SearchableText search param, to use it as search text input @tiberiuichim
- Fix missing translation in link content type @iRohitSingh
- Fixed drag-and-drop list placeholder issues @reebalazs
- Update demo address @ksuess
- Update list of trainings documentation @ksuess
- Scroll to window top only when the location pathname changes, no longer take the window location search parameters into account. The search page and the listing block already use custom logic for their "scroll into view" behaviors. @tiberiuichim
- Add missing layout view for `document_view` @MarcoCouto
- Add missing `App.jsx` full paths @jimbiscuit
- Fix z-index value of hamburger-wrapper on mobile resolutions overlapping the sidebar @ichim-david
- Fix UniversalLink handling of remote URLs from Link @nzambello

### Internal

- Upgrade to react 17.0.2 @nzambello
- Update to latest `plone.restapi` (8.16.2) @sneridagh
- Upgrade to `@plone/scripts` 1.0.3 @sneridagh
- Upgrade caniuse-lite 1.0.30001286 @tiberiuichim
- fix:correctly checkout plone.volto in buildout @nileshgulia1
- Add line in upgrade guide about `getVocabulary` API change @tiberiuichim
- Add new Volto websites in production @nzambello
- Remove Pastanaga logos from Toolbar @sneridagh
- Add `omelette` to the local Plone backend build @sneridagh
- Optimize npm package by adding `docs/` `cypress/` and `tests/` to .npmignore @avoinea
- Use released `@plone/scripts`, since the builds are broken if it's a local package @sneridagh
- Use `plone.volto` instead of `kitconcept.volto` @tisto
- Silence customization errors, they are now behind a `debug` library namespace @sneridagh
- Add development dependency on `use-trace-update`, useful for performance debugging @tiberiuichim
- Improved developer documentation. Proof read several chapters, most importantly the upgrade guide @ichim-david
- Footer: Point to `plone.org` instead of `plone.com` @ericof
- Fix `make start-frontend` @tisto
- Update all the tests infrastructure for the new `volto-guillotina` addon @sneridagh
- Add locales to existing block variations @sneridagh
- Add RawMaterial website in Volto production sites @nzambello
- Removing the hardcoded default block type from text block @iRohitSingh
- updated Volto sites list @giuliaghisini
- Cleanup dangling virtualenv files that should not be committed @pnicolli
- Remove bundlesize @tisto
- Upgrade stylelint to v14 (vscode-stylelint requires it now) @sneridagh
- Add several more stories for Storybook @tiberiuichim
- Add 2 new Volto websites by Eau de web for EEA @tiberiuichim
- Fix references to old configuration style in apiExpanders documentation @tiberiuichim
- Add `applySchemaDefaults`, in addition to `applyBlockDefaults`, to allow reuse in object widgets and other advanced scenarios @tiberiuichim
- Fix select family widgets stories in storybook @sneridagh
- Remove getNavigation from `Login.jsx` @iRohitSingh
- Allow listing block to be used in non-content pages (when used in a slot it
  shouldn't crash on add/edit pages) @tiberiuichim
- Fix typo "toolbalWidth" @iRohitSingh
- Update all requirements and the reasoning behind them in builds @sneridagh
- Update Plone version in api backend to 5.2.6. Update README and cleanup @fredvd
- Document CI changelog verifier failure details that mislead contributors @rpatterson

## 14.0.0-alpha.43 (2021-12-20)

### Breaking

- Move `theme.js` import to top of the client code, so it take precedence over any other inline imported CSS. This is not an strict breaking change, but it's worth to mention it as might be important and kept in mind. @sneridagh

### Feature

- Add runtime configuration for `@babel/plugin-transform-react-jsx` set to `automatic`. This enables the new JSX runtime: https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html So no longer `import React from 'react'` is needed anymore.
- Update favicon and related tags with best practices @sneridagh

### Bugfix

- Fix z-index value of hamburger-wrapper on mobile resolutions overlapping the sidebar @ichim-david
- Fix UniversalLink handling of remote URLs from Link @nzambello
- Add missing `App.jsx` full paths @jimbiscuit

### Internal

- Upgrade to react 17.0.2 @nzambello
- Upgrade caniuse-lite 1.0.30001286 @tiberiuichim
- fix:correctly checkout plone.volto in buildout @nileshgulia1
- Add line in upgrade guide about `getVocabulary` API change @tiberiuichim
- Add new Volto websites in production @nzambello
- Remove Pastanaga logos from Toolbar @sneridagh

## 14.0.0-alpha.42 (2021-12-13)

### Breaking

- Removed pagination in vocabularies widgets (SelectWidget, ArrayWidget, TokenWidget) and introduced subrequest to vocabulary action. @giuliaghisini

### Feature

- Add autocomplete Widget component - It holds off the vocabulary endpoint pull until you search (more than 2 chars). Useful when dealing with huge vocabularies @sneridagh @reebalazs

### Bugfix

- Add missing layout view for document_view @MarcoCouto

## 14.0.0-alpha.41 (2021-12-13)

### Feature

- Add catalan translation @bloodbare @sneridagh
- Added `.storybook` setup in the Volto `app` generator. Volto projects
  generated from this scafolding are now ready to run Storybook for the project
  and develop addons (in `src/addons` folder).
- Add new listing block option "fullobjects" per variation @ksuess
- Style checkboxes @nileshgulia1
- Allow loading .less files also from a Volto project's `src` folder. @tiberiuichim
- Allow loading .less files also from a Volto project's `src` folder. @tiberiuichim

### Bugfix

- Udate demo address @ksuess
- Update list of trainings documentation @ksuess
- Scroll to window top only when the location pathname changes, no longer take the window location search parameters into account. The search page and the listing block already use custom logic for their "scroll into view" behaviors. @tiberiuichim

### Internal

- Update to plone.restapi 8.16.2 (revert missing_value PR) @sneridagh
- Update all requirements and the reasoning behind them in builds @sneridagh
- Update Plone version in api backend to 5.2.6. Update README and cleanup @fredvd
- Various local development build improvements @rpatterson
- Document CI changelog verifier failure details that mislead contributors
- Document CI changelog verifier failure details that mislead contributors @rpatterson
- Updated italian translation @pnicolli

## 14.0.0-alpha.40 (2021-12-01)

### Bugfix

- In search block, read SearchableText search param, to use it as search text input
  @tiberiuichim
- Fix missing translation in link content type @iRohitSingh
- Fixed drag-and-drop list placeholder issues @reebalazs

## 14.0.0-alpha.39 (2021-11-30)

### Bugfix

- QuerystringWidget more resilient on old schemas @nzambello

## 14.0.0-alpha.38 (2021-11-30)

### Bugfix

- Use subrequest in hero block to not lost locking token. @cekk
- Always add lang attr in html @nzambello
- Fix time widget position on 24h format @nzambello

### Internal

- Remove getNavigation from Login.jsx @iRohitSingh
- Allow listing block to be used in non-content pages (when used in a slot it
  shouldn't crash on add/edit pages) @tiberiuichim
- Fix typo "toolbalWidth" @iRohitSingh

## 14.0.0-alpha.37 (2021-11-26)

### Bugfix

- Fixed object browser selected items number. @giuliaghisini
- Fix action vocabularies call avoiding regex look behind @nzambello

### Internal

- Fix select family widgets stories in storybook @sneridagh

## 14.0.0-alpha.36 (2021-11-25)

### Bugfix

- Fix regression in actions vocabularies calls because the change to use contextual schemas @sneridagh
- Include block schema enhancers (main block schema enhancer + variation schema enhancer) when calculating block default data @tiberiuichim

### Internal

- Fix references to old configuration style in apiExpanders documentation @tiberiuichim
- Add `applySchemaDefaults`, in addition to `applyBlockDefaults`, to allow reuse in object widgets and other advanced scenarios @tiberiuichim

## 14.0.0-alpha.35 (2021-11-24)

### Bugfix

- Fix `isInternalURL` when `settings.internalApiPath` is empty @tiberiuichim
- Fix external link not supported by Navigation component #2853. @ericof
- Get Add/Edit schema contextually #2852 @ericof

### Internal

- Upgrade p.restapi to 8.15.2 @sneridagh

## 14.0.0-alpha.34 (2021-11-20)

### Feature

- Apply form defaults from RenderBlocks and block Edit using a new helper, `applyBlockDefaults` @tiberiuichim
- Now each block config object can declare a schema factory (a function that can produce a schema) and this will be used to derive the default data for the block @tiberiuichim

## 14.0.0-alpha.33 (2021-11-20)

### Bugfix

- Fix downloadableObjects default value @giuliaghisini
- Folder contents table header and breadcrumbs dropdown now appear only from the
  bottom, fixing an issue where the breadcrumb dropdown content was clipped
  by the header area @ichim-david
- Folder contents sort dropdown is now also simple as the other dropdowns
  ensuring we have the same behavior between adjecent dropdown @ichim-david
- Fix documention on block extensions, replace `render` with `template` to match Listing block @tiberiuichim

### Internal

- Upgrade stylelint to v14 (vscode-stylelint requires it now) @sneridagh
- Add several more stories for Storybook @tiberiuichim
- Add 2 new Volto websites by Eau de web for EEA @tiberiuichim

## 14.0.0-alpha.32 (2021-11-09)

### Breaking

- Listing block no longer use `fullobjects` to retrieve backend data. It uses the catalog data instead. @plone/volto-team

### Internal

- Updated i18n link into the README file @macagua
- Updated Spanish translations @macagua
- Remove bundlesize @tisto
- Upgrade plone.restapi from 8.12.1 -> 8.13.0 @tisto

## 14.0.0-alpha.31 (2021-11-07)

### Feature

- Added LinkMore component and link more in HeroImageLeft block. @giuliaghisini

### Bugfix

- Fix the selection of Maps Block @iRohitSingh
- UniversalLink: handle direct download for content-type File if user is not logged. @giuliaghisini
- Fixed ObjectBrowserWidget when is multiple or maximumSelectionSize is not set @giuliaghisini
- Fix full-width image overlaps the drag handle @iRohitSingh
- Fix move item to top of the folder when clicking on move to top action button @iRohitSingh

### Internal

- Removing the hardcoded default block type from text block @iRohitSingh
- updated Volto sites list @giuliaghisini
- Cleanup dangling virtualenv files that should not be committed @pnicolli
- Improve italian translation @pnicolli

## 14.0.0-alpha.30 (2021-11-07)

### Feature

- Support typescript usage in Volto sites @pnicolli

## 14.0.0-alpha.29 (2021-11-06)

### Bugfix

- Fix reset pagination in searchblock when changing facet filters @tiberiuichim

## 14.0.0-alpha.28 (2021-11-03)

### Feature

- Defaults are observed in block data if `InlineForm` or `BlockDataForm` are used. @sneridagh @tiberiuichim

## 14.0.0-alpha.27 (2021-11-02)

### Breaking

- Use title instead of id as a source of translation in "Variation" field in block enhancers @sneridagh

## 14.0.0-alpha.26 (2021-11-01)

### Feature

- Provide server-side rendering capabilities for blocks with async-based content (such as the listing block). A block needs to provide its own `getAsyncData` implementation, which is similar to an `asyncConnect` wrapper promise. @tiberiuichim @sneridagh

## 14.0.0-alpha.25 (2021-11-01)

### Feature

- FormFieldWrapper accepts now strings and elements for description @nzambello
- Image block:
  - When uploading an image or selecting that from the object browser, Image block will set an empty string as alternative text @nzambello
  - Adds a description to the alt-tag with w3c explaination @nzambello

### Bugfix

- Fix disable mode of `QuerystringWidget` when all criteria are deleted @kreafox

### Internal

- Add RawMaterial website in Volto production sites @nzambello

## 14.0.0-alpha.24 (2021-10-29)

### Feature

- Support Node 16 @timo

### Bugfix

- Prevent ua-parser-js security breach. See: https://github.com/advisories/GHSA-pjwm-rvh2-c87w @thet
- Fix storybook errors in the connected components, api is undefined. Using now a mock of the store instead of the whole thing @sneridagh
- CSS fix on `QueryWidget` to prevent line jumping for clear button when the multi selection widget has multiple items @kreafox

## 14.0.0-alpha.23 (2021-10-21)

### Feature

- Enable to be able to use the internal proxy in production as well @sneridagh

### Bugfix

- Fix loading of cookie on SSR for certain requests, revert slight change in how they are loaded introduced in alpha 16 @sneridagh

## 14.0.0-alpha.22 (2021-10-20)

### Breaking

- Improve mobile navigation menu with a nicer interaction and a fixed overlay with a drawer (customizable via CSSTransitionGroup) animation @sneridagh

### Internal

- Add locales to existing block variations @sneridagh

## 14.0.0-alpha.21 (2021-10-17)

### Feature

- In the search block, allow editors to specify the sort on criteria.
  @tiberiuichim
- Updated Volto production sites list @giuliaghisini

### Bugfix

- Bugfixes to search block. By default search block, when empty, makes a simple
  query to the nav root, to list all content. Fix reading search text from URL.
  Implement a simple compression of URL. Don't count searched text as filter.
  Fix an edge case with showSearchInput in schema. Rename title to Section
  Title in facet column settings. Avoid double calls to querystring endpoint.
  @tiberiuichim
- Use correct shade of black in Plone logo @sneridagh

## 14.0.0-alpha.20 (2021-10-15)

### Breaking

- Revisited, rethought and refactored Seamless mode @sneridagh
  For more information, please read the deploying guide
  https://6.docs.plone.org/volto/deploying/seamless-mode.html

  and the upgrade guide
  https://6.docs.plone.org/volto/upgrade-guide/index.html

### Bugfix

- Fixed SelectWidget: when there was a selected value, the selection was lost when the tab was changed. @giuliaghisini

## 14.0.0-alpha.19 (2021-10-15)

### Feature

- Make VocabularyTermsWidget orderable @ksuess
- Get widget by tagged values @ksuess

## 14.0.0-alpha.18 (2021-10-11)

### Internal

- Re-release last release, since it does not show on NPM @sneridagh

## 14.0.0-alpha.17 (2021-10-11)

### Breaking

- Fix logout action using the backend @logout endpoint, effectively removing the `__ac` cookie. It is recommended to upgrade to the latest p.restapi version to take full advantage of this feature @sneridagh

### Bugfix

- Add spinner on sharing View Button @iRohitSingh

## 14.0.0-alpha.16 (2021-10-10)

### Bugfix

- Yet another attempt at fixing devproxy. Split the devproxy into a separate
  express middleware. Introduce the `DEBUG_HPM` env var to make the devproxy
  verbose @tiberiuichim

## 14.0.0-alpha.15 (2021-10-10)

### Breaking

- Adjusted main `Logo` component styling @sneridagh

For more information, please read the upgrade guide
https://6.docs.plone.org/volto/upgrade-guide/index.html

### Feature

- Add `volto-guillotina` addon to core @sneridagh

### Internal

- Improved developer documentation. Proof read several chapters, most importantly the upgrade guide @ichim-david
- Use Plone logo (Closes #2632) @ericof
- Updated Brazilian Portuguese translations @ericof
- Footer: Point to `plone.org` instead of `plone.com` @ericof
- Fix "make start-frontend" @tisto
- Update all the tests infrastructure for the new `volto-guillotina` addon @sneridagh

## 14.0.0-alpha.14 (2021-10-01)

### Bugfix

- Get `blocks` and `blocks_layout` defaults from existing behavior when enabling TTW editable DX Layout @avoinea

### Internal

- Add development dependency on use-trace-update, useful for performance debugging @tiberiuichim
- Upgrade to `@plone/scripts` 1.0.3 @sneridagh

## 14.0.0-alpha.13 (2021-09-30)

### Feature

- Add the new search block @tiberiuichim @kreafox @sneridagh

## 14.0.0-alpha.12 (2021-09-29)

### Bugfix

- Show correct fieldname and not internal field id in Toast error messages on Add/Edit forms @jackahl
- sitemap.xml.gz obeys Plone Search settings @erral

### Internal

- Use plone.volto instead of kitconcept.volto @tisto
- Silence customization errors, they are now behind a `debug` library namespace @sneridagh
- Remove recently introduced `RAZZLE_I18NDEBUGMODE` in favor of a `debug` library namespace @sneridagh

## 14.0.0-alpha.11 (2021-09-25)

### Internal

- Use released @plone/scripts, since the builds are broken if it's a local package @sneridagh

## 14.0.0-alpha.10 (2021-09-25)

### Breaking

- New i18n infrastructure in the new `@plone/scripts` package @sneridagh
- Removed `src/i18n.js` in favor of the above change @sneridagh

### Feature

- Add RAZZLE_I18NDEBUGMODE env var and corresponding i18nDebugMode config setting to enable/disable react-intl error messages. @sneridagh

### Bugfix

- Missing default messages from JSON EN language file @sneridagh

## 14.0.0-alpha.9 (2021-09-21)

### Breaking

- Use the block's title as the source of the translation instead of using the id of the block. See upgrade guide for more information @sneridagh

### Bugfix

- Do not show lead image block when the content type does not have the behavior enabled @sneridagh

## 14.0.0-alpha.8 (2021-09-20)

### Bugfix

- Fix logout action, removing the `__ac` cookie as well, if present. @sneridagh

## 14.0.0-alpha.7 (2021-09-20)

### Feature

- Japanese translation updated @terapyon
- German translations updated @tisto

## 14.0.0-alpha.6 (2021-09-20)

### Bugfix

- Fix SSR on /edit with dev proxy @tiberiuichim

## 14.0.0-alpha.5 (2021-09-20)

### Bugfix

- Fix on form errors in block editor, not changing to metadata tab @sneridagh

## 14.0.0-alpha.4 (2021-09-20)

### Internal

- Bring back the `cypress` folder from the npm ignore files, since the libs in there are required and helpful for projects, remove only the `tests` and `fixtures` @sneridagh

## 14.0.0-alpha.3 (2021-09-20)

### Bugfix

- Fix /edit and /add nonContentRoutes to fix isCmsUi fn @giuliaghisini
- Register the dev api proxy after the express middleware @tiberiuichim

### Internal

- Update to latest p.restapi (8.9.1) @sneridagh
- Remove `workingcopy` from checkouts info for kitconcept.volto @sneridagh
- Remove built workingcopy fixture environment based on local, back to docker based one @sneridagh
- Add `omelette` to the local Plone backend build @sneridagh
- Optimize npm package by adding docs/ cypress/ and tests/ to .npmignore @avoinea

## 14.0.0-alpha.2 (2021-09-14)

### Internal

- Revert: Detect when a user has logged in by means other than JWT, such as ZMI `Basic`
  authentication or the classic HTML Plone `@login` view @rpatterson

## 14.0.0-alpha.1 (2021-09-13)

### Breaking

- Detect when a user has logged in by means other than JWT, such as ZMI `Basic`
  authentication or the classic HTML Plone `@login` view @rpatterson

### Bugfix

- Fix SelectWidget vocabulary load on second component mount @avoinea #2655

## 14.0.0-alpha.0 (2021-09-08)

### Breaking

- Remove compatibility for old configuration (based on imports) system. Migrate your configuration to the new configuration system for your project before upgrading to Volto 14. See https://6.docs.plone.org/volto/upgrade-guide/index.html#volto-configuration-registry @sneridagh
- Content locking is not a breaking change, but it's worth noting that Volto 14 comes with locking support enabled by default. Latest `plone.restapi` versions is required. See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information

### Feature

- Content locking support for Plone (plone.locking) @avoinea

## 13.15.0 (2021-09-07)

### Feature

- Show item title and item type when hovering over item title and item type icon in folder content view @iFlameing
- Change the batch size of folder content @iFlameing
- Show loading indicator for listing view @iFlameing

### Bugfix

- Validate `required` touched-only fields in Form everywhere @nileshgulia1

### Internal

- Add placeholder to WysiwygWidget @nzambello
- Update italian translations @nzambello
- Get SchemaWidget field factories from backend @avoinea

## 13.14.0 (2021-09-02)

### Feature

- Refactor users and groups controlpanel @nileshgulia1

## 13.13.0 (2021-09-01)

### Feature

- Show version in history view @iFlameing
- Contents shows also array indexes @nzambello

### Bugfix

- Fix SearchWidget required `pathname` @avoinea #2645
- Fix for Contents tag modal @nzambello
- Cut/Copy blocks: fixed cut/copy unselected blocks. @giuliaghisini
- Properly style QueryWidget when used standalone, outside of QuerystringWidget @kreafox
- Add location.search as criteria in `ScrollToTop` component @kreafox
- Scroll to top only if the location pathname changes @kreafox

### Internal

- Disabled all the other configuration options when user did not choose any criteria in listing block @iFlameing
- Updated Brazilian Portuguese translations @ericof
- Footer: Point to `plone.org` instead of `plone.com` @ericof
- Array and token widget available as named widget @nzambello

## 13.12.0 (2021-08-20)

### Feature

- Multilingual routing was added for sitemap, search, contact-form, change-password, register and password-reset @ionlizarazu
- Opening the search input in the object browser, it will get the focus @nzambello

### Bugfix

- Fix ObjectBrowserNav items key @nzambello
- Fix ObjectBrowserNav aria label: id => title @nzambello
- Fix missing code in `ArrayWidget` from refactored `SelectWidget` @sneridagh

## 13.11.0 (2021-08-18)

### Feature

- Add select utils `normalizerValue`, add state to the basic select field forcing it to be fully controlled @sneridagh

### Bugfix

- Improve consistency of `TokenWidget`'s use of the choice labels as "values" instead of internal uids assigned by `react-select`. @tiberiuichim
- Solve glitch in async loading options in `AsyncSelect` components @sneridagh

### Internal

- Add tests for `Select` component, document the use cases propely @sneridagh
- Upgrade `AsyncSelect` to a version compatible with `react-select` v4 @sneridagh
- Upgrade to latest `react-select` @sneridagh

## 13.10.0 (2021-08-18)

### Feature

- Increase clickable area of right-arrow in objectBrowser @iFlameing
- Prevent form submit when clicking on BlockChooserButton @giuliaghisini
- Make selectedItems Filter work in Contents folder @nileshgulia1

### Bugfix

- Fix SearchWidget search by path @giuliaghisini

## 13.9.0 (2021-08-18)

### Feature

- Removed unnecessary set-cookies for the removal of the authentication cookie when the user is not logged in @mamico
- Add additional classnames for the field wrappers and the fieldsets in forms, this helps to be more addressable in CSS if required @sneridagh

### Bugfix

- Add title/tooltip on Toolbar buttons @avoinea #1384
- Slight CSS fix on `ObjectWidget` for supporting long add element button messages @sneridagh
- Fix the babel view cancel button redirect @iFlameing
- Show toast error when trying to delete item and it's not permitted @danielamormocea

## 13.8.3 (2021-08-16)

### Bugfix

- Prevent form submit when clicking on BlockChooserButton @giuliaghisini
- Add missing `publicURL` to the list of `window.env` serialized variables coming from the hosts configuration to complete the support for seamless mode @sneridagh

## 13.8.2 (2021-07-20)

### Bugfix

- Improve `URLWidget` component, so it uses `flattenToURL` for the value @sneridagh

## 13.8.1 (2021-07-16)

### Bugfix

- Missing prop `properties` passed down required for #2579 to work properly @sneridagh

## 13.8.0 (2021-07-14)

### Feature

- A new component was added, `BlockChooserButton`, it encapsulate the logic of show/hiding the `BlockChooser` @tiberiuichim
- Overload `required` property for blocks config, it supports a function as value taken `properties` (current object data) and `block` (the block being evaluated in `BlockChooser`). The purpose is to enable more control over the available blocks in the Blocks chooser. @sneridagh

### Bugfix

- Add fallback to the "image" field in Image Gallery if the listingPreviewImageField defined in the project is not available on an object @jackahl

## 13.7.0 (2021-07-12)

### Feature

- VocabularyTermsWidget option with translations for config.settings.supportedLanguages @ksuess

### Bugfix

- Fix InlineForm's understanding of missing default values @rexalex
- Guard in `isInternalURL` to catch non-string values @sneridagh

### Internal

- Update `browserlist` DB @sneridagh
- Install `luxon` explicitly to fix `rrule` package flickering deps (yarn problem) @sneridagh
- Add a11y cypress test for table block @ThomasKindermann
- Add Cypress test for Link content type @tisto
- Upgrade plone.restapi to 8.4.1 in the dev buildout @tisto

## 13.6.0 (2021-07-03)

### Feature

- Add VocabularyTermsWidget and map to field with widget attribute set to 'vocabularyterms'. @ksuess

### Bugfix

- added "Complementary" landmark-role to skiplink-container for a11y @ThomasKindermann
- changed breadcrumb link text-color slightly for a11y color contrast @ThomasKindermann
- changed table headline text color to black for a11y @ThomasKindermann

### Internal

- Updated Brazilian Portuguese translations @ericof

## 13.5.0 (2021-06-30)

### Feature

- Add og tags for social sharing @giuliaghisini @nzambello
- Add interface for plone seo extensions to use values added by them as metadata @jackahl

### Internal

- Upgrade to Storybook 6.3, refresh deps version for babel @sneridagh

## 13.4.0 (2021-06-29)

### Feature

- Working copy support for Plone (plone.app.iterate) @sneridagh

## 13.3.1 (2021-06-29)

### Internal

- Remove locales .json files pushed again by mistake, now they are no longer needed to be in the repo, since they are generated at runtime, and included in the released versions @sneridagh

## 13.3.0 (2021-06-29)

### Feature

- Allowing user to paste url in search box in objectBrowser @iFlameing
- Allowing user to click on the breadcrumbs of objectBrowser @iFlameing
- `Navigation` and `Breadcrumbs` are `apiExpanders` aware and run the action depending on them @sneridagh

### Bugfix

- Fixed docs for config.settings.externalRoutes @giuliaghisini
- Fix `Pluggable` in the use case that a `Plug` is empty @sneridagh
- Fix `Login` component navigation for `INavigationRoot` structures @sneridagh
- Hyphenation block chooser labels (no html changes) @ksuess

### Internal

- Bumps prismjs from 1.23.0 to 1.24.0. @timo

## 13.2.2 (2021-06-18)

### Bugfix

- Avoid debugging error in toolbar @tiberiuichim
- Fix the bug related to specific versioning view @iFlameing
- Fix blocks-listing Cypress test @giuliaghisini
- Fix the translation of header in babel view @iFlameing
- Fix German translations for leadimage and listing block @timo
- Show toast success message when adding a new local role @iFlameing
- Bump postcss from 7.0.29 to 7.0.36 @timo
- Complete Spanish translation @erral
- Complete German translation @timo

## 13.2.1 (2021-06-14)

### Bugfix

- Changed 'batch_size' attribute in 'b_size' in querystring widget. @giuliaghisini

### Internal

- Upgrade generator deps @sneridagh

## 13.2.0 (2021-06-12)

### Feature

- Allow passing a schemaEnhancer to QuerystringWidget @tiberiuichim
- Add internal URL blacklist to avoid render custom routes in Volto @nzambello
- In listing blocks, scroll to start of listing block instead page start @giuliaghisini

### Bugfix

- Fix addBreaklinesInline when string ends with new line @giuliaghisini
- Changed 'batch_size' attribute in 'b_size' in querystring widget. @giuliaghisini
- Properly respect batching and result limits in listing block @tiberiuichim
- Changed 'batch_size' attribute in 'b_size' in querystring widget. @giuliaghisini
- Properly respect batching and result limits in listing block @tiberiuichim
- Improve folder_contents workflow state (#2017) @avoinea
- Making placeholder image of video block to take 100% width when it is right or left aligned @iFlameing
- Showing clear icon when title is too long in objectbrowser selected items in multiple mode @iFlameing
- Use querystring prop in ListingBody @giuliaghisini
- Set default value selected for variation in listing block @giuliaghisini

### Internal

- Add [Volta](https://volta.sh) support @nzambello
- Various minor `Makefile` cleanup @rpatterson
- Improve error handling in UniversalLink @nzambello

## 13.1.2 (2021-05-26)

### Internal

- Make the `AddLinkForm` component generic, to allow reuse in volto-slate @tiberiuichim
- Adding hover effect on ObjectBrowserNav icon @iFlameing

## 13.1.1 (2021-05-25)

### Bugfix

- Second try to fix images in dev mode when api path is present (e.g. using the Robot server in Cypress tests) @sneridagh

## 13.1.0 (2021-05-24)

### Feature

- enabled ability to set 'extractScripts' for error pages @giuliaghisini

### Bugfix

- Modify Default and Summary templates to render the LinkMore @ionlizarazu
- Revert #2472, this broke normal development mode images @sneridagh

## 13.0.2 (2021-05-22)

### Bugfix

- Apply the `schemaEnhancer` from the main block even if no variations are found @sneridagh

### Internal

## 13.0.1 (2021-05-18)

### Bugfix

- Backwards compatibility for existing listing blocks with templates @sneridagh

## 13.0.0 (2021-05-18)

### Breaking

- Seamless mode by default in development. Added `Host` header support for production
  deployments, so no `RAZZLE_API_PATH` is required in production builds anymore if the
  header is present. Not an strictly breaking change, but it's a default behavior change
  worth to notice on its own. No change required in your deployments if you suply
  currently `RAZZLE_API_PATH` in build time. See documentation for more information.
  @sneridagh
- Deprecate Node 10 since it's out of LTS since April 30th, 2021 @sneridagh
- Remove the "inverted" option in Table Block since it was useless with the current CSS
  set. Better naming of options and labels in table block (English). Updating the i18n messages for the used translations is advisable, but not required. @iFlameing
- Get rid of the font icons in the control panels overview @sneridagh
- Refactored `src/components/manage/Widgets/QuerystringWidget` using `ObjectWidget` and schemas @sneridagh
- Refactored `Listing` block using the new `src/components/manage/Widgets/QuerystringWidget`. Introducing a new `showLinkMore` block option opt-in for the additional feature instead of always-in. Deprecated `ListingSidebar` and `src/components/manage/Blocks/Listing/QuerystringWidget` in favor of the new `src/components/manage/Widgets/QuerystringWidget` @sneridagh

For a more information, please read the upgrade guide
https://6.docs.plone.org/volto/upgrade-guide/index.html

### Feature

- Compile i18n json locales only at build time on the fly and at release time @sneridagh
- Change login form fixing accessibility issues @nzambello

### Bugfix

- Fix the Listing block with criteria to render correctly on a non-multilingual homepage. @ionlizarazu
- Fix selection of previous block when deleting a block @tiberiuichim
- Disable `Select` components family to lazy load on SSR, since it's breaking and the fix is quite obscure. They are not valuable on SSR responses anyway. @sneridagh
- Fix leftover from the multilingual fix for composed language names @sneridagh @ericof
- Translate 'All' label in Contents view pagination. @giuliaghisini
- Replace `langmap` dependency with internal code that supports composite language names @sneridagh @ericof
- RenderBlocks: Blocks like the listing block need a path. @ksuess
- Normalize language to get the correct filename in lazy imports for composite language names @sneridagh @ericof
- Checkbox not using `null` as false @sneridagh
- Use params prop in api middleware @giuliaghisini
- Fix PORT env var handling, if you have set the PORT in build time, the setting was
  removed back to defaults, now the build time setting is kept (unsetting in build time
  and set it in runtime is now the recommended setup) @sneridagh
- Fix sort_order restapi call, works on action for existing listing blocks
  and in ListingData saving correctly new ones @nzambello
- Fix `contextURL` in `ObjectBrowser` for special (add/edit) views using `getBaseUrl` @sneridagh

### Internal

- Full real zero configuration achievement by turning the stock default
  `RAZZLE_PUBLIC_DIR` into a relative path, so we can enable truly movable builds
  @sneridagh
- Upgrade Cypress to latest @sneridagh
- Remove surge since it's not used anymore @sneridagh
- Upgrade `react-redux` and friends @sneridagh
- Upgrade `yarnhook` and `yarn-deduplicate` @sneridagh
- Add Listing block test for root path @ionlizarazu
- Only log changes to po (`poToJson`) if running as a script @sneridagh
- Remove json locales from the repo to avoid merge conflicts @sneridagh
- All the `Select` components family in core are loaded through `Loadables` helper @sneridagh
- Updated Brazilian Portuguese translations @ericof
- Improve Github Actions names, separate the code analysis from the main core @sneridagh

## 13.0.0-alpha.10 (2021-05-16)

### Bugfix

- Fix the Listing block with criteria to render correctly on a non-multilingual homepage. @ionlizarazu
- Fix selection of previous block when deleting a block @tiberiuichim

### Internal

- Upgrade Cypress to latest @sneridagh
- Remove surge since it's not used anymore @sneridagh
- Upgrade `react-redux` and friends @sneridagh
- Upgrade `yarnhook` and `yarn-deduplicate` @sneridagh
- Add Listing block test for root path @ionlizarazu
- Only log changes to po (`poToJson`) if running as a script @sneridagh

## 13.0.0-alpha.9 (2021-05-13)

### Feature

- Compile i18n json locales only at build time on the fly and at release time @sneridagh

### Internal

- Remove json locales from the repo to avoid merge conflicts @sneridagh

## 13.0.0-alpha.8 (2021-05-12)

### Bugfix

- Disable `Select` components family to lazy load on SSR, since it's breaking and the fix is quite obscure. They are not valuable on SSR responses anyway. @sneridagh

### Internal

- All the `Select` components family in core are loaded through `Loadables` helper @sneridagh

## 13.0.0-alpha.7 (2021-05-11)

### Bugfix

- Fix leftover from the multilingual fix for composed language names @sneridagh @ericof

### Internal

- Updated Brazilian Portuguese translations @ericof

## 13.0.0-alpha.6 (2021-05-11)

### Bugfix

- Translate 'All' label in Contents view pagination. @giuliaghisini
- Replace langmap dependency with internal code that supports composite language names @sneridagh @ericof

## 13.0.0-alpha.5 (2021-05-10)

### Bugfix

- RenderBlocks: Blocks like the listing block need a path. @ksuess
- Normalize language to get the correct filename in lazy imports for composite language names @sneridagh @ericof

### Internal

- Updated Brazilian Portuguese translations @ericof

## 13.0.0-alpha.4 (2021-05-07)

### Breaking

- Refactored `src/components/manage/Widgets/QuerystringWidget` using `ObjectWidget` and schemas @sneridagh
- Refactored `Listing` block using the new `src/components/manage/Widgets/QuerystringWidget`. Introducing a new `showLinkMore` block option opt-in for the additional feature instead of always-in. Deprecated `ListingSidebar` and `src/components/manage/Blocks/Listing/QuerystringWidget` in favor of the new `src/components/manage/Widgets/QuerystringWidget` @sneridagh

For a more information, please read the upgrade guide
https://6.docs.plone.org/volto/upgrade-guide/index.html

### Bugfix

- Checkbox not using `null` as false @sneridagh

## 13.0.0-alpha.3 (2021-05-06)

### Bugfix

- Use params prop in api middleware @giuliaghisini

- Fix PORT env var handling, if you have set the PORT in build time, the setting was
  removed back to defaults, now the build time setting is kept (unsetting in build time
  and set it in runtime is now the recommended setup) @sneridagh

## 13.0.0-alpha.2 (2021-05-05)

### Bugfix

- Fix sort_order restapi call, works on action for existing listing blocks
  and in ListingData saving correctly new ones @nzambello

### Internal

- Updated Brazilian Portuguese translations @ericof

## 13.0.0-alpha.1 (2021-05-03)

### Internal

- Full real zero configuration achievement by turning the stock default
  `RAZZLE_PUBLIC_DIR` into a relative path, so we can enable truly movable builds
  @sneridagh

## 13.0.0-alpha.0 (2021-05-03)

### Breaking

- Seamless mode by default. Added `Host` header support for deployments, so no
  `RAZZLE_API_PATH` is required in production builds anymore if the header is present.
  Not an strictly breaking change, but it's a default behavior change worth to notice on
  its own. No change required in your deployments if you suply currently
  `RAZZLE_API_PATH` in build time. See documentation for more information. @sneridagh
- Deprecate Node 10 since it's out of LTS since April 30th, 2021 @sneridagh
- Remove the "inverted" option in Table Block since it was useless with the current CSS
  set. Better naming of options and labels in table block (English). Updating the i18n messages for the used translations is advisable, but not required. @iFlameing
- Get rid of the font icons in the control panels overview @sneridagh

For a complete list of actions to follow, please read the upgrade guide
https://6.docs.plone.org/volto/upgrade-guide/index.html

### Feature

- Change login form fixing accessibility issues @nzambello

### Internal

- Improve Github Actions names, separate the code analysis from the main core @sneridagh

## 12.14.0 (2021-05-03)

### Feature

- Provide api for block extensions. See `/blocks/extensions` in documentation @tiberiuichim

### Bugfix

- In BlockDataForm, always clone schema before applying enhancers @tiberiuichim
- In BlockDataForm, don't add the variations field multiple times @tiberiuichim

## 12.13.0 (2021-04-30)

### Feature

- Making objectBrowserWidget context aware @iFlameing

### Bugfix

- Adding `flattenToAppURL` in Link component @iFlameing

- Disable click event of the outside the engine click detection, since it leads to bad
  behavior for custom and library elements that try to mount things attaching them in
  the Body or outside the detected container @sneridagh

## 12.12.0 (2021-04-29)

### Feature

- Translations german: Login/Register @ksuess

### Bugfix

- Fix image gallery in listing block for contained (non-query based) images @sneridagh

## 12.11.0 (2021-04-28)

### Feature

- Implemented Babel view, to compare translated items in add and edit mode. @giuliaghisini
- as in Plone, hide controlpanel for users that are no 'Manager' or 'Site Administrator'. @giuliaghisini
- Improve the blocks engine by adding a detector for clicking outside in the `BlocksForm` @sneridagh
- Include a pluggable architecture for pluggable render-time insertions (similar to <Portal>) @tiberiuichim
- Add parseDateTime helper from DatetimeWidget to handle timezones @nzambello

### Bugfix

- Include selected block in multiselections @sneridagh
- Correct the selected values rendering at isMulti SelectWidget @ionlizarazu

### Internal

- Implement Github actions workflow to deploy the documentation to the Plone Foundation server @ericof
- Pin `immutable` to an updated version that does not produce continuous deprecation notices in console on every change @sneridagh
- Print console.error in SSR if not an ignored error code @nzambello
- Fetch addons with https using mrs-developer @nzambello
- Fix sitemap URL generation @nzambello

## 12.10.1 (2021-04-14)

### Bugfix

- Better error handling code in SSR when an error occurs in the code @ksuess @sneridagh

## 12.10.0 (2021-04-14)

### Feature

- Add support in FileWidget for raw file data in base64 (control panels, not really NamedFile fields) @sneridagh

### Bugfix

- ObjectListWidget: edit mode: expand last added item, not first of list. @ksuess
- Improve error handling in SSR when an error occurs in the code @sneridagh

### Internal

- Ignore files in addons when building i18n messages in the i18n script, since it's useless (they should be done in the addon itself) and lead to errors when parsing also internal `node_modules` and other utility files @sneridagh

## 12.9.0 (2021-04-10)

### Bugfix

- Avoid double calling asyncPropsExtenders @ksuess @tiberiuichim

### Internal

- Fix server when ECONNRESET is received from the backend @sneridagh
- Remove all appearences of `UNSAFE_componentWillMount` since it loads also on the SSR calls too @sneridagh

## 12.8.0 (2021-04-08)

### Feature

- Add configurable api expanders @csenger @nileshgulia1 @tiberiuichim @sneridagh
- In Text block, keep text selection on focus, and move focus to end of text if there's no selection @giuliaghisini

### Bugfix

- Fix `fieldset` instead of `fieldSet` in ObjectWidget component @sneridagh

## 12.7.0 (2021-04-07)

### Feature

- Use `onInsertBlock` callback when adding new blocks if available, otherwise fallback to `onMutateBlock` refs #2330 @avoinea

### Bugfix

- fix universal link @nileshgulia1s
- fixed recurrence widget when weekly recurrence is selected and event start date is on sunday. @giuliaghisini
- Fix default value for checkbox widget @alexbueckig
- Fix for forms in content types, the fieldset was not being passed over to the field. This affected form generation ids and labels. @sneridagh
- Add a bit of a11y love to the `ObjectListWidget` @sneridagh
- fix universal link when no item content obj passed @nileshgulia1

### Internal

- Add Blocks helpers docs and tests @avoinea

## 12.6.1 (2021-04-06)

### Bugfix

- Remove duplicated wrapper on block edit form @sneridagh
- Fix small catched up issues in tests @sneridagh

## 12.6.0 (2021-04-05)

### Feature

- Add ObjectWidget and ObjectListWidget @sneridagh
- Add `BlockForm` component, variations and schemaExtender aware @sneridagh
- Improvements to the `InlineForm` @sneridagh

### Bugfix

- Remove InlineForm default focus on first input @avoinea

### Internal

- Add Storybook to the main docs (https://6.docs.plone.org/storybook/) build @sneridagh

## 12.5.0 (2021-03-31)

### Feature

- New setting, `config.settings.showTags` to be able to configure tags visibility on default View @avoinea

### Bugfix

### Internal

- Add toPublicURL helper @nzambello
- Don't show empty groups in BlockChooser @tiberiuichim
- Fix Text Block placeholder regression refs #2322 @avoinea

### Internal

- BlocksForm and RenderBlocks now allow a `blocksConfig` configuration object as a prop @tiberiuichim
- Updated italian translations @nzambello

## 12.4.2 (2021-03-29)

### Bugfix

- Re-add formTitle, formDescription, metadata to BlocksForm @avoinea

## 12.4.1 (2021-03-29)

### Bugfix

- Fixed InlineForm boolean false value @razvanMiu
- Fix warning message in console, move open/close detection to the aside itself @sneridagh
- Revert SidebarPortal min-height @avoinea
- Add proper proptype in `SidebarPopup` @sneridagh

### Internal

- Update plone/volto Docker image to use latest yo generator and support ADDONS env @avoinea
- Add `docker-compose.yml` to the repo for quick demoing @sneridagh
- Fixed babel config when loading addons (in testing mode) @sneridagh

## 12.4.0 (2021-03-25)

### Feature

- Improved comments @rexalex @avoinea
- Added SidebarPopup component for extra sidebar handling @avoinea
- Use SidebarPopup component in place of CSS transition sidebar @nileshgulia1

### Bugfix

- Fixed multiSelected propType and BlocksForm multiSelected.includes @avoinea
- Fixed italian translations for block `Maps` @giuliaghisini
- Fixed SidebarPortal min-height @avoinea
- Fixed CheckboxWidget state @razvanMiu

### Internal

- Upgrade API to Plone 5.2.4 and p.restapi 7.1.0 @sneridagh
- Reorganization of the Cypress tests, now they live in `cypress/tests` @sneridagh
- Splitted Cypress tests into `core` tests and `guillotina` ones for better overall handling @sneridagh

### Docs

- Update internal proxy docs @nzambello

## 12.3.0 (2021-03-18)

### Feature

- Improve `ObjectBrowserWidget` adding a manual input field and allow external URLs. Add feature to paste internal URLs and convert them to selected objects. Added the `allowExternals` prop in order to allow this behavior (opt-in).

### Bugfix

- Fix storybook initial config registry setup @sneridagh
- Search page now follows Plone's ISearchSchema settings @tiberiuichim
- Improve `ContextNavigation` component, adding the level you are in each iteration @sneridagh

### Internal

- Add testing add-on for enable special testing use cases and configuration options @sneridagh
- Add `RAZZLE_TESTING_ADDONS` environment variable for adding addons for testing purposes @sneridagh
- Add "Humboldt Labor" to show cases.
- Updated "Volto in Production" list @alecghica

### Docs

- Explicitly mention `src/config` in the "Internal proxy to API" documentation @pigeonflight

## 12.2.0 (2021-03-03)

### Feature

- Adds skiplinks @nzambello
- Fix some semantic tags as nav @nzambello
- Allow addons to specify their own dependencies in their package.json `addons` key, just like the regular Volto projects. This means that it's no longer required to list all possible addons in the Volto project and they can be bootstrapped as being part of a dependency @tiberiuichim
- insert a dimmer with the loading message in the form when the status changes in the content folder. @martina.bustacchini

### Bugfix

- Enable draftjs links to open in target blank if is external url. @giuliaghisini

### Internal

- Use correct status code for static files error handling @nzambello
- Remove dangling `.replaces(...` for the apiPath and use flattenToAppURL instead @sneridagh

## 12.1.2 (2021-02-28)

### Bugfix

- Fix addon reducers registration @tiberiuichim

## 12.1.1 (2021-02-26)

### Bugfix

- Import asyncConnected actions directly from actions module, the resolution order is different in projects @tiberiuichim @avoinea

## 12.1.0 (2021-02-24)

**This is a brown bag release and should not be used, upgrade to Volto 12.1.1 instead.**

### Feature

- A new setting, `config.settings.storeExtenders` which allows customization of used Redux middleware @tiberiuichim
- Introduce `config.settings.asyncPropsExtenders` which allows customizing, per route, the `asyncConnected` actions @tiberiuichim @sneridagh

### Bugfix

- Adapt to BlocksForm in Blocks Engine @nileshgulia1
- a11y improvements in `ObjectBrowser` and `BlockChooser` @sneridagh
- Fix UniversalLink for download link. @giuliaghisini

### Internal

- Fork redux-connect code in `src/helpers/AsyncConnect`, to allow mixing in config-based asyncConnects. Provide a webpack alias that overloads the redux-connect imports. @tiberiuichim

### Docs

- Update wording @svx

## 12.0.0 (2021-02-20)

### Breaking

- Introduction of the new Volto Configuration Registry @sneridagh @tiberiuichim
  For more information about this breaking change: https://6.docs.plone.org/volto/upgrade-guide/index.html#upgrading-to-volto-12-x-x

### Feature

- New breadcrumbs `INavigationRoot` aware for the _Home_ icon. This allows inner subsites navigation and better support for multilingual sites. @sneridagh

### Internal

- Upgrade plone.restapi to 7.0.0 and Plone to 5.2.3 @sneridagh

## 12.0.0-alpha.0 (2021-02-17)

### Breaking

- Introduction of the new Volto Configuration Registry @sneridagh @tiberiuichim
  For more information about this breaking change: https://6.docs.plone.org/volto/upgrade-guide/index.html#upgrading-to-volto-12-x-x

## 11.1.0 (2021-02-08)

### Feature

- Add `preloadLazyLibs` and `settings.lazyBundles` to allow preloading bundles of lazy libraries @tiberiuichim @silviubogan
- Added onChangeFormData prop to Form component @giuliaghisini
- Internationalization story for add-ons @sneridagh
- robots.txt from plone as fallback (if /public/robots.txt not exists and .env VOLTO_ROBOTSTXT variable not exists.) @giuliaghisini
- UniversalLink and ConditionalLink accepts also an item to link to. If item is of @type Link, a direct link to remote url is generated if user is not logged. @giuliaghisini

### Bugfix

- temporarly removed linkDetectionPlugin for draftjs (for some conflicts with AnchorPlugin) @giuliaghisini
- German translation: aria-label of '/contents' button : "Inhalte" not "Inhaltsverzeichnis" @ksuess
- fix view links and others styles of entities on editing Text Block. @giuliaghisini
- Make sidebar-collapsed visible on small mobile. @giuliaghisini
- Fix regresion on the imagesizes styling due to the removal of the id in 11 @sneridagh

### Internal

- Update docs: configuration of routes and addonRoutes @ksuess

## 11.0.0 (2021-01-29)

### Breaking

- [circular deps] Move `AlignBlock` component to its rightful place @sneridagh
- Removing id from FormFieldWrapper @iFlameing
- Change default Listing Template to include only Text and renamed the old default Template to Summary Template @jackahl

### Feature

- Add `ContextNavigation` component, it can fetch the `@contextnavigation` plone.restapi
  endpoint and display a navigation portlet, similar to Plone's classic
  navigation portlet.
- added linkDetectionPlugin plugin to draftjs to automatically create links for urls and mails when editing text. @giuliaghisini
- An initial Storybook setup. Start it with `yarn storybook`. Feel free to contribute more stories! @sneridagh
- Add storybook Wrapper utility component. Add ContactForm initial story @tiberiuichim
- make and load configurable reducers in the client `window.__data`, decreasing the html size @nileshgulia1 @tiberiuichim
- Custom group component for selectStyling @nileshgulia1
- Add new components: RenderBlocks, BlocksForm, DragDropList and EditBlockWrapper @tiberiuichim
- Add `noValueOption` prop to `SelectWidget` so you can opt-out from the "no-value" option so the choices are a closed list @sneridagh
- Provide `injectLazyLibs()` wrapper and `settings.loadables` config to deal with loadable libraries @tiberiuichim

### Bugfix

- Better handling of a condition in the new breadcrumbs @sneridagh

### Internal

- Upgrade react-select to 4.0.2 @sneridagh
- Upgrade react ecosystem to 13.14.0 @sneridagh
- Add shouldComponentUpdate to blocks @nileshgulia1
- Update old entry in upgrade guide @tiberiuichim
- Add `@testing-library/cypress` as a dep @sneridagh
- Fix an internal link in documentation @tiberiuichim

## 10.10.0 (2021-01-22)

### Feature

- Simple optional critical-CSS inclusion feature (without the actual building of
  the critical CSS) @silviubogan @tiberiuichim @nileshgulia1
- added support for allowedBlocks and showRestricted for BlockChooser in Form @giuliaghisini
- added objectBrowser to UrlWidget, and attached UrlWidget to remoteUrl field of ContentType Link @giuliaghisini
- managed tel link in UrlWidget and draftjs @giuliaghisini
- added support for allowedBlocks and showRestricted for BlockChooser in Form @giuliaghisini
- Improvements in InlineForm @nileshgulia1
- Improved form validation. Tested required fields when field is array or richtext @giuliaghisini

### Bugfix

- Fix 'All' button batch size in Contents @nzambello
- Fixed field type for 'from' field in ContactForm @giuliaghisini
- handle SelectWidget null value and isMulti(#1915) &(1878) @nileshgulia1
- Fix typo in ita locales @nzambello
- Wrap objectBrowserWidget with FormFieldWrapper @nileshgulia1
- Added preventDefault and stopPropagation for toolbar buttons of Table block. @giuliaghisini
- Fix `Contents` breadcrumbs for multilingual sites @sneridagh

### Internal

- Add support for `nav_title` in breadcrumbs and navigation @sneridagh
- Add `settings.serverConfig` in the settings object of `~/config`. Add another module, `config/server.js` which is conditionally imported if `__SERVER__`. This module will host settings that are only relevant to the server. Being conditionally imported means that the code is safe to require server-only nodejs packages. @tiberiuichim
- Update browserlist and caniuse-lite @sneridagh
- Document deprecation of `@plone/create-volto-app` @sneridagh @nileshgulia1
- Adding classname in TextWidget and ObjectBrowserBody so that we can target those element in tests. @iFlameing
- Add support for `nav_title` in breadcrumbs and navigation @sneridagh

## 10.9.2 (2021-01-15)

### Bugfix

- Make a cypress test more resilient to platform differences @tiberiuichim
- Fix regression introduced by improve CSS in the inner toolbar for the image block to support narrower width (like for using it inside grid blocks) @sneridagh
- Avoid a bug in cypress tests caused by multi-block copy/paste @tiberiuichim

### Internal

- i18n for a literal in the table block @sneridagh

## 10.9.1 (2021-01-14)

### Bugfix

- Fix regression introduced by improve CSS in the inner toolbar for the image block to support narrower width (like for using it inside grid blocks) @sneridagh

## 10.9.0 (2021-01-14)

### Feature

- Enhance `BlockChooser` by adding support for `allowedBlocks` and `showRestricted` @avoinea @sneridagh

### Bugfix

- Better handling of @@images pipeline errors @tiberiuichim
- Fix `More` menu when using with Plone 4 backend / history action is undefined (#2120) @avoinea
- Fix `/sharing` page when using with Guillotina (#2122) @avoinea
- Improve CSS in the inner toolbar for the image block to support narrower width (like for using it inside grid blocks) @sneridagh

### Internal

- Move express middleware routes (sitemap, download, images and robotstxt) out of server.jsx into their own `express-middleware/*.js` modules. All express middleware now has access to the redux store, api middleware and an errorHandler, available under `req.app.locals` @tiberiuichim

## 10.8.0 (2021-01-11)

### Feature

- Add proper icons to the table block @sneridagh

### Internal

- Add `packages` directory to the `modulePathIgnorePatterns` for the jest tests @sneridagh
- Add `packages` directory in npmignore @sneridagh

## 10.7.0 (2021-01-05)

### Feature

- Lazy load image in blocks Image and HeroImage @mamico

### Bugfix

- Fix redirection for Link objects. @cekk
- Fix import order in server.jsx. @cekk @tiberiuichim
- Make sentry config more resilient to edge cases (SPA, storybook) @sneridagh
- Handle errors on file and image download (#2098) @cekk
- Remove test dependant on the year in `Copyright` footer section @sneridagh
- Increase maxResponseSize for superagent calls. Now is 500mb (#2098) @cekk

### Internal

- Translations german: Unauthorized, Login/Register @ksuess
- Removing id from FormFieldWrapper @iFlameing

## 10.6.1 (2020-12-21)

### Bugfix

- Better API helper end request handling, since the existing one was causing problems and rendered the SSR server unusable in case of the request was rejected @sneridagh

### Internal

- Add a paragraph on dealing with CORS errors in Deploying doc page @tiberiuichim
- Remove useless RobotFramework related packages, keep only the minimum required ones @sneridagh
- Updated italian translations @nzambello

## 10.6.0 (2020-12-18)

### Feature

- Allow setting a custom robots.txt from environment with the `VOLTO_ROBOTSTXT` environment variable @tiberiuichim

### Bugfix

- Replace `__SERVER__` occurrence from table `Edit` component @sneridagh

## 10.5.0 (2020-12-17)

### Feature

- Adding `All` button to folder content @iFlameing

### Bugfix

- Fix "is client" check for SidebarPortal @tiberiuichim @sneridagh

## 10.4.3 (2020-12-15)

### Internal

- Bring back `App` to `components/index.js` for now, since it's breaking the projects
  where it gets referenced from `routes.js`. @sneridagh

## 10.4.2 (2020-12-15)

**This is a brown bag release and should not be used, upgrade to Volto 10.4.3 instead.**

### Bugfix

- Fix numeric widget console warnings regarding flex styling refs #2059 @ichim-david
- Fix numeric widget crash once we click inside it refs #2059 @ichim-david

### Internal

- Fix some key points to improve the circular imports problem @sneridagh

  - `App` and `View` components are meant to be used only by Volto internals, so it's no
    point into having them exported in `components/index.js` that facilitated a path for
    circular imports.
  - `withObjectBrowser` and friends also are prone to facilitate a path for having
    circular imports, so we are using there only absolute imports.
  - All these changes are non-breaking and non-intrusive.

## 10.4.1 (2020-12-12)

### Bugfix

- Make sure that prism is loaded before rendering HTML block @tiberiuichim

## 10.4.0 (2020-12-11)

### Feature

- Add ability to filter the attributes that are saved in the ObjectBrowserWidget @sneridagh
- Add `object_browser` as widget @sneridagh

### Bugfix

- Adding video thumbnail for the .mp4 extension @iFlameing.

### Internal

- Added new in productions sites to README @terapyon

## 10.3.0 (2020-12-04)

### Feature

- added search depth in listing and updated it locales @giuliaghisini
- Add emailSend action @nzambello
- lazy load react-dropzone @nileshgulia1

### Bugfix

- Fix addons loader name generation on Windows @tiberiuichim
- For python3.9 compatibility, install wheel package in build-backend targets @tiberiuichim

### Internal

- Tweak Cypress command `waitForResourceToLoad` to timeout after 50 tries. @tiberiuichim

## 10.2.0 (2020-12-04)

### Feature

- Generate language file of added missing German translations by @tisto. @ksuess

### Bugfix

- Fix regression in the `getContent` action with the expandable missing @sneridagh

## 10.1.0 (2020-11-30)

### Feature

- Add missing German translations @tisto

## 10.0.0 (2020-11-30)

### Feature

- Provide operations on multiple-selected blocks: delete, cut/copy and paste. You can trigger the "multiselected blocks" by holding the shift key and clicking on another block. You can add/remove blocks to the selection with the Control key. Holding Control when you click on the Paste button doesn't clear the clipboard, so you can paste multiple times. The blocks clipboard uses the browser's local storage to synchronize between tabs. @tiberiuichim
- Allow reducers to be persisted using localstorage @tiberiuichim

### Breaking

- Removal of the Razzle patch that was introduced in 9.0.0 @sneridagh
  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more details.
- Fetched content with `getContent` no longer includes fullobjects by default @tiberiuichim

### Bugfix

- Fix link to login in the Unauthorised component @sneridagh

### Internal

- Add details on how to run Cypress integration tests @tiberiuichim
- Upgrade `@testing-library/react` to 11.2.2. Add `jest-environment-jsdom-sixteen as upgraded jsdom implementation @tiberiuichim
- Split some small prismjs related files (used in HTML block) in separate chunks @tiberiuichim
- Remove dangling analyzer plugin @sneridagh
- Support for Guillotina 6 @bloodbare @sneridagh
- Update Cypress to version 5.6.0 @sneridagh
- Terse `react-intl` errors in console during development turning them into warnings @sneridagh

## 9.2.0 (2020-11-24)

**This is a brown bag release and should not be used, upgrade to Volto 10.x.x instead.**
See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

### Feature

- Remove the Razzle patch for the local, "inline" Volto Razzle plugins @tiberiuichim @sneridagh

### Bugfix

- Move missplaced `appExtras` into settings @sneridagh

### Internal

- Make filewidget label more consistent @tisto

## 9.1.0 (2020-11-20)

### Feature

- Extend the internal proxy capabilities, now the target is overridable and SSL aware @sneridagh
- Added new environment variables for the internal proxy `RAZZLE_PROXY_REWRITE_TARGET` and `RAZZLE_PROXY_REWRITE_TARGET` @sneridagh
- Enhance `AppExtras` component to make it pluggable through the
  `config.settings.appExtras`. These are router-path filtered components that
  are rendered inside the `AppExtras` component @tiberiuichim

### Bugfix

- Fix Sentry tags and extra via settings.sentryOptions @avoinea
- Fix `yarn analyze` command by packing our own version of
  webpack-bundle-analyzer integration. It has a few changes to the old default
  configuration. There is an alternative way of triggering the bundle analyzer,
  with the `OFFLINE_BUNDLE_ANALYZE=true` env variable, which avoids starting
  the HTTP bundle analyzer server. Also, it always saves a report html file.
  @tiberiuichim

### Internal

- Improve developer documentation. Add several new chapters @tiberiuichim

## 9.0.0 (2020-11-15)

### Breaking

- Upgrade Razzle to 3.3.7 @tiberiuichim @sneridagh

  Razzle 3.3.7 prepares the transition to the upcoming Razzle 4 so it improves and
  unifies the extensibility story at the cost of change the signature of the
  `razzle.config.js` and how plugins are declared. It also enables by default the new
  _React Fast Refresh_ feature implemented by the React community, which improves the
  refresh of the code while in development.

- Babel plugins housekeeping

  Deprecated proposals:

  - @babel/plugin-proposal-function-bind
  - @babel/plugin-proposal-do-expressions
  - @babel/plugin-proposal-logical-assignment-operators
  - @babel/plugin-proposal-pipeline-operator
  - @babel/plugin-proposal-function-sent

For a complete list of actions to follow, please read the upgrade guide
https://6.docs.plone.org/volto/upgrade-guide/index.html

### Feature

- Add `webpack-relative-resolver` plugin. For addons and Volto, it normalizes local relative imports to package-rooted imports. An import such as `import Something from './Something'` would be rerouted internally as `import Something from '@collective/someaddon/Something'`. By doing so we get easier customization of addons, as they don't have to be so strict with their import and exports @tiberiuichim
- Posibility to configure Sentry via `settings.sentryOptions` configuration key @avoinea
- Catch `console.error` by default with Sentry @avoinea
- Refactor CT icons helper: add getContentIcons @nzambello

### Bugfix

- Properly return 404, 401 and 403 on SSR, when appropriate @tiberiuichim
- Fix Guillotina PATCH by adding the `@static_behaviors` field inconditionally @sneridagh

### Internal

## 8.10.1 (2020-11-13)

### Bugfix

- Fix leaking input CSS in the link widget in draftjs @sneridagh

### Internal

- Move Guillotina CI job to GH actions @sneridagh

## 8.10.0 (2020-11-12)

### Feature

- Adding show all button in UsersControlpanel @iFlameing
- Now you can prettify the html code in HTML block @iFlameing
- Adding preview image placeholder in Video Block @iFlameing

### Bugfix

- Fix error object in clipboard reducer @iFlameing
- Making QuerystringWidget more resilient by handeling null value @iFlameing
- Fixing bug related to initiation of table block with previous table block data @iFlameing
- enabled no-folderish CT to be translated @giuliaghisini

### Internal

- Changing checkbox widget of exclude-nav to select widget @iFlameing

## 8.9.2 (2020-11-06)

### Bugfix

- Revert type-in detection in draftjs link widget, as that leads to a regression @sneridagh
- Fix and refactoring FileWidget @iFlameing

## 8.9.1 (2020-11-06)

### Bugfix

- Fix SSR rendering in table blocks @sneridagh

## 8.9.0 (2020-11-05)

### Feature

- Added Dropzone in FileWidget @iFlameing
- Making inline link toolbar, location aware in content browser @iFlameing.
- Detect if the link typed or pasted in the link widget of the text block is internal @sneridagh

## 8.8.1 (2020-11-04)

### Bugfix

- Improve misleading translations deleted message @sneridagh
- Fixing overlap of labels with each other in select widget @iFlameing
- Throw error in crashReporter; also log sentry errors in server @tiberiuichim

### Internal

- Split razzle svg and sentry loaders to separate files @tiberiuichim
- prevent form without blocks. Form always have at least the default block. @giuliaghisini
- Fix default target for links in text blocks @giuliaghisini

### Internal

## 8.8.0 (2020-11-02)

### Feature

- Add support for the new active LTS NodeJS version 14. NodeJS 10 eol will happen on 2021-04-30 and Volto will update accordingly. More information on https://github.com/nodejs/release#release-schedule @sneridagh

## 8.7.1 (2020-10-29)

### Bugfix

- Added loading icon when doing actions in folder-contents @giuliaghisini
- Fix German translation "from" -> "E-Mail" in contact form @tisto

## 8.7.0 (2020-10-27)

### Feature

- Manage translations view @sneridagh

### Internal

- Update docs build and include pygments support for jsx @sneridagh

## 8.6.0 (2020-10-25)

### Feature

- Added placeholder background color same as selected one @iFlameing
- Showing notification when user sort the folder-content @iFlameing
- Render full language name (e.g. "English") instead of 2 character language code in language selector, matching Plone default behavior. @mikejmets

### Bugfix

- A pathname like /policy/edit does not show the Unauthorized or Forbidden component when not logged in, ref #1936. @silviubogan
- Fixes secondary views in toolbar @iFlameing @sneridagh
- Fixing overlay expansion during link assign from objectbrowser in edit mode @iFlameing

### Internal

- Added new in productions sites to README @wkbkhard
- Writing test for the lisiting block location relative criteria @iFlameing
- Add `UniversalLink` to handle internal/external/download links @nzambello

## 8.5.4 (2020-10-23)

### Breaking

### Feature

### Bugfix

- Fixing bug for link when inseting break lines in list tag for view mode @iFlameing

## 8.5.3 (2020-10-22)

### Bugfix

- Removed timezone initialization for DatetimeWidget, ref #1923. @razvanMiu

## 8.5.2 (2020-10-21)

### Bugfix

- Showing error notification when user try to paste disallowed content type. @iFlameing

### Internal

- Added environment parameter `RAZZLE_BIND_ADDRESS` to be able to bind server to localhost or other specific IPs instead of 0.0.0.0 @achimwilde

## 8.5.1 (2020-10-21)

### Bugfix

- Fix sharing for when users has dots on them @sneridagh

## 8.5.0 (2020-10-20)

### Bugfix

- Japanese translation updated @terapyon

## 8.5.0-alpha.2 (2020-10-20)

### Bugfix

- Update German translation @ksuess

### Internal

- Fix runtimeConfig relative vs absolute import @avoinea

## 8.5.1-alpha.0 (2020-10-19)

### Feature

- Adding softlinebreak in list tag @iFlameing

### Bugfix

- Errors catched by the default error handler are sent to sentry @zotya
- Fixed a problem what occured when RAZZLE*SENTRY_DSN was missing but the other RAZZLE_SENTRY*\* variables were set @zotya

### Internal

- Fix sentry docs markdown format @avoinea

## 8.5.0-alpha.0 (2020-10-14)

### Feature

- Sentry integration @zotya
- All the environment variables defined at runtime that have the `RAZZLE_` prefix, are now available in the browser under window.env @zotya

## 8.4.0 (2020-10-14)

### Feature

- Add `Style`, a wrapper component that applies float and width classes to wrapped content (typically blocks) @tiberiuichim
- Add `AlignWidget`, a widget that wraps the `AlignBlock` helper @tiberiuichim

### Bugfix

- Folder contents view: Save additional columns and updated order of columns @ksuess
- Fixed edit link in draft-js when link is selected from word-end to word-start @giuliaghisini
- Revert PR No. 1820 to fix linebreaks on inline links in draftJS @steffenri

### Internal

- Keep `@babel/core` in Volto core in sync with `babel-preset-razzle` it fixes #1897 @sneridagh

## 8.3.0 (2020-10-12)

### Feature

- Adding droppable placeholder for Image Block @iFlameing

### Bugfix

- Test if content exists in ListingBody, for addon Dropdownmenu @giuliaghisini

## 8.2.6 (2020-10-12)

### Bugfix

- Fix break-line in view mode @iFlameing

## 8.2.5 (2020-10-08)

### Bugfix

- Fixing the bleed out of the modal for long filename @iFlameing

## 8.2.4 (2020-10-08)

### Bugfix

- Fixing table block edit @iFlameing

## 8.2.3 (2020-10-07)

### Bugfix

- Use Plone `I18N_LANGUAGE` cookie instead of `language` @cekk

## 8.2.2 (2020-10-06)

### Bugfix

- Upgrade react-dropzone from 5.1.0 to 11.1.0 @nileshgulia1
- Update German translations @tisto

## 8.2.1 (2020-10-06)

### Bugfix

- Querystingsearch action now uses correct relative path, if specified. Fixes #1861 @jackahl
- Fixing ObjectBrowser search input reload @iFlameing
- Fix broken current folder by default in content browser for image links, solves #1860 @sneridagh

## 8.2.0 (2020-09-27)

### Feature

- Add Basque translation @erral

### Bugfix

- Added prop resettable to DatetimeWidget @damiDevRT
- Removed the ability to reset the datepicker in the recurrence widget to prevent the uncontrolled creation of recurrences @damiDevRT
- Fix regression in setting selected sidebar tab by blocks @tiberiuichim

## 8.1.1 (2020-09-27)

### Bugfix

- Japanese translation updated @terapyon

## 8.1.0 (2020-09-22)

### Breaking

### Feature

- Create link in Draftjs using Objectbrowser @giuliaghisini

### Bugfix

- Allow select widget to reset when the incoming props change. The react-select widget has its own internal state, so if you initialise the widget without choices, then populate the choices, it wouldn't properly show the default value @tiberiuichim

### Internal

- Fix console warning in ToHTML @iFlameing

## 8.0.1 (2020-09-22)

### Bugfix

- Fix word overflow from html-block @iFlameing
- Fix Cypress test for image upload @zotya

### Internal

- Improve developer experience, don't logout on hot-reload @tiberiuichim
- Cleanup eslint in razzle.config.js @tiberiuichim

## 8.0.0 (2020-09-18)

### Breaking

- Change dummy-addons-loader.js fixture name to `jest-addons-loader.js`, to match existing `jest-svgsystem-transform.js` @tiberiuichim

### Feature

- Added Schema Editor within Dexterity Content-Types Controlpanel @rexalex @avoinea #1517
- Added Blocks Layout Editor within Dexterity Content-Types Controlpanel @avoinea #1517
- Added missing components for Email and Url widgets #1246 @rexalex
- Use content title instead of image id in alt tag @nileshgulia1

### Bugfix

- Fix the broken profile view in Toolbar @iFlameing

### Internal

- Hide block chooser button using React logic instead of CSS. This makes it easier to support nested blocks @tiberiuichim

- Wrap addon configuration loaders in a wrapper to check that they return back config @tiberiuichim

## 7.15.0 (2020-09-15)

### Feature

- Added missing components for Email and Url widgets #1246 @rexalex
- Show backend validation errors on corresponding fields #1246 @rexalex
- Validation implemented for add user/group @rexalex
- Show Username when Firstname attr is missing in UsersControlPanelUser @iFlameing

### Bugfix

- When dealing with authentication token expiration set to 0, auto-refresh token in one hour instead of logging out use @tiberiuichim
- Fixed front-end field validation #1246 @rexalex
- Fixed date only widget rendering #1246 @rexalex
- Fix errors with SelectWidget when removing the only element @rexalex

## 7.14.2 (2020-09-10)

### Bugfix

- Hyphenate sidebar labels @ksuess
- Update German translations @tisto

## 7.14.1 (2020-09-09)

### Bugfix

- Fix customization mechanism where customization paths end with `/` @tiberiuichim

## 7.14.0 (2020-09-08)

### Feature

- Render form with vertical tabs, setting the property `verticalFormTabs` in config.js @giuliaghisini

### Bugfix

- Imported locales by razzle and fixed import locale @giuliaghisini
- Fix console warning due to uncontrolled selectWidget component @nileshgulia1

## 7.13.0 (2020-09-07)

### Feature

- Add NumberWidget, an input widget for numbers @tiberiuichim

### Bugfix

- Fixing the Image size settings in sidebar when Image alignment changes @iFlameing

## 7.12.1 (2020-09-04)

### Bugfix

- Fix checkbox widget styles @nzambello

## 7.12.0 (2020-09-04)

### Feature

- Allow Volto projects to customize (via webpack resolve aliases) addons. Allow addons to customize Volto and other addons. Allow Volto projects to customize Volto in a `src/customizations/volto` folder, for better organization of the customizations folder. @tiberiuichim @sneridagh

## 7.11.3 (2020-08-28)

### Bugfix

- On image upload in a block, don't overwrite the global `state.content.data` with new image data @tiberiuichim @silviubogan

### Internal

- Add a `subrequest` option to the `createContent` action @tiberiuichim @silviubogan

## 7.11.2 (2020-08-28)

### Bugfix

- Fix bug introduced in 7.9.0, properly return a list of results when dealing with batched api requests @tiberiuichim
- In folder contents batch upload, use a subrequest to avoid breaking the global `content.data` state @tiberiuichim
- Fix `null` response issue when passing custom `Accept:` headers to actions #1771 @avoinea
- Removed all artifacts from translations @steffenri
- Increase z-index of `block-add-button` @steffenri

## 7.11.1 (2020-08-27)

### Breaking

### Feature

### Bugfix

- Update German translations @tisto

### Internal

## 7.11.0 (2020-08-27)

### Feature

- Add sort option to search @iFlameing

### Bugfix

- Turn autocomplete off for the search input field @timo

## 7.10.0 (2020-08-26)

### Feature

- Added toast notifications for form errors @nzambello @avoinea
- Added italian translations and translated array, token and select widget. @giuliaghisini

## 7.9.2 (2020-08-26)

### Bugfix

- Open content browser sidebar on parent object when editing an existing document. @iFlameing

### Internal

- Added developer-guidelines/redux documentation @tiberiuichim

## 7.9.1 (2020-08-25)

### Bugfix

- Fix bug related to closing the More menu of Toolbar @iFlameing

- Fix cosmetic issue, add links were not properly generated in Contents view not under the root. This didn't impact functionality as the content was properly created @tiberiuichim

- Fix bug for text block with new line and styles applyed to all text. @giuliaghisini

### Internal

- Removed unused component `src/components/manage/Contents/ContentsToolbar.jsx` @tiberiuichim
- Add no-console eslint rule @tisto

## 7.9.0 (2020-08-24)

### Breaking

### Feature

- Adding support of pasting link of voltoCMS video link to video blocks @iFlameing
- Allow serial processing of API requests when `mode:'serial'` is passed in the action. @tiberiuichim
- Adding cypress test from image-gallery in edit mode @iFlameing

### Bugfix

- On mutating a block, don't create extra placeholder block if such block already exists @tiberiuichim
- Fixing broken file-preview placeholder for other file type than image @iFlameing

### Internal

- When passed an array of items (for example in batch upload content), the `createContent` action now serializes those requests @tiberiuichim

## 7.8.3 (2020-08-21)

### Bugfix

- Change ImageGallery image scale from preview to large. @tisto
- Also use `settings.internalApiPath` in url helpers `isInternalURL`, `flattenToAppUrl` and `flattenHTMLToAppURL` @tiberiuichim
- Fix getBlocks helper when blocks_layout has no `items` (default PloneSite with no volto homepage) @avoinea

### Internal

- Docs: Review of "How to use and addon" @ksuess
- Addon: Hint for addon developers if function applying config is missing @ksuess

## 7.8.2 (2020-08-18)

### Bugfix

- Include cypress folder in release @timo

## 7.8.1 (2020-08-18)

### Bugfix

- Remove supposed fix to form.jsx again, as it apparently did not really fix anything but only broke stuff @jackahl

## 7.8.0 (2020-08-18)

### Breaking

### Feature

- Add cms-only theme that allows to completely remove semantic-ui from public facing views @pnicolli @nzambello

### Internal

## 7.7.2 (2020-08-18)

### Bugfix

- Fix bug showing wrong data in the edit view, that occured in some cases, when one would enter the edit view of a page from another page @jackahl

### Internal

- Remove "\$" from all examples in install docs and README @timo

## 7.7.1 (2020-08-12)

### Bugfix

- Japanese translation updated @terapyon
- Bugfix Edit page through Contents list #1594 @terapyon @csenger

### Internal

- Bump serialize-javascript from 2.1.1 to 3.1.0 @timo
- Bump prismjs from 1.17.1 to 1.21.0 @timo
- Make Table Block Cypress test more reliable @timo
- Make listing template Cypress test more reliable @timo

## 7.7.0 (2020-08-04)

### Feature

- Allow addons to provide less files @tiberiuichim
- Making Content browser aware of context @iFlameing

### Bugfix

- Fix click-select block on unknown block type @nileshgulia1
- Fix Image Gallery Template in Listing Block crashing when no criteria are set (#1722) @jackahl

## 7.6.0 (2020-07-31)

### Feature

- Added recurrence widget @giuliaghisini

## 7.5.1 (2020-07-29)

### Bugfix

- Avoid React hydration complaining about mismatched server output in toolbar. In component rendering, replaced the use of `__CLIENT__` with a state-stored `isClient`, as that is more correct. @tiberiuichim

## 7.5.0 (2020-07-29)

### Feature

- Used moment-timezone to set a specific server timezone as default for DatetimeWidget. @razvanMiu

## 7.4.0 (2020-07-29)

### Feature

- Highlight the sidebar toggle button with a small flashing animation @silviubogan @tiberiuichim

## 7.3.1 (2020-07-28)

### Bugfix

- Solved a browser console error in /contents view (#1695) @silviubogan
- Pagination icon fix @nileshgulia1

## 7.3.0 (2020-07-26)

### Feature

- Add Placeholder attribute to Textwidget and TextAreaWidget @iFlameing
- Make the default block type (currently draftjs text) configurable @tiberiuichim @silviubogan

### Internal

- Upgrade lodash dependency to 4.17.19 @tisto
- Add a new blocks helper method, `getBlocks`. It simplifies using `getBlocksFieldname` and `getBlocksLayoutFieldname` under a single method that returns ordered pairs of `[blockid, blockvalue]` @tiberiuichim

## 7.2.1 (2020-07-16)

### Internal

- Upgrade to Cypress 4.10.0 @tisto
- Upgrade to cypress-file-upload 4.0.7 @iFlameing

## 7.2.0 (2020-07-13)

### Feature

- Provide a new webpack alias, `volto-themes`, which points to Volto's theme folder. See details in the https://6.docs.plone.org/volto/upgrade-guide/index.html

### Internal

- Upgrade razzle to `^3.1.5`. @tiberiuichim

## 7.1.0 (2020-07-09)

### Feature

- Addons can optionally include a `razzle.extend.js` file in their root. This module needs to follow the same rules as the `razzle.config.js`. They change the default Volto Razzle configuration, before it is passed to the Volto project @tiberiuichim @sneridagh

### Bugfix

- Managed hidden fields @giuliaghisini
- Fix bug in addon loading with namespaced packages @tiberiuichim
- Japanese translation updated @terapyon

- Upgrade razzle to `^3.1.5`. @tiberiuichim

## 7.0.1 (2020-07-07)

### Bugfix

- Adding absolute url in ObjectBrowser for image type @iFlameing

## 7.0.0 (2020-07-06)

### Breaking

- Fix filename of strickthrough.svg to strikethrough.svg @tiberiuichim

### Feature

- Addons configuration loading. You can now declare addons in the addons key of
  package.json and they'll be automatically loaded. @tiberiuichim @sneridagh

## 6.5.0 (2020-07-03)

### Feature

- Added default Export for the QuerystringWidget for the ListingBlock @steffenri

### Bugfix

- Fix text overflow in pastanaga-menu header if title is too long. @giuliaghisini
- Fixing bug to correctly assign classes to image sizes in View @steffenri
- Center aligned Images are now displayed like they are center aligned in the View @steffenri
- Fix datepicker z-index @giuliaghisini

### Internal

- Upgrade insecure packages `http-proxy`, `http-proxy-middleware` and `handlebars` @tiberiuichim

## 6.4.1 (2020-07-01)

### Breaking

### Feature

- Allow JSON API calls to made to third-party servers @tiberiuichim

### Bugfix

- Fix styling and use of csss classes in `InlineForm.jsx` @tiberiuichim

- Fixing bug for Image Preview on upload @iFlameing

### Internal

- Fix formatting of `src/server.jsx` @tiberiuichim

## 6.4.0 (2020-06-29)

### Feature

- Translated workflow state in contents @nzambello
- Added item type as a tooltip in contents @nzambello
- Added Italian translations and translated array, token and select widget. @giuliaghisini
- Added uploading image preview in FileWidget @iFlameing
- Allow custom express middleware declared with `settings.expressMiddleware`. See [Custom Express middleware](https://6.docs.plone.org/volto/development/express.html) @tiberiuichim

### Bugfix

- Fix the toolbar dropdown to add content types if isMultilingual is enabled
  but a type is not marked as translatable. @csenger
- Usage of Contettype label in Add component. @giuliaghisini

### Internal

- Update upgrade-guide to for `addonRoutes` and `addonReducers` @jackahl

## 6.3.0 (2020-06-22)

### Feature

- Added internationalization for French language @bsuttor #1588
- use of maximumSelectionSize from plone in ObjectBrowserWidget. @giuliaghisini
- Added selectableTypes in ObjectBrowserWidget @giuliaghisini

### Bugfix

- Added export for ObjectBrowserWidget in component/index.js @giuliaghisini
- Fixed duplicated items in SelectWidget and ArrayWidget @giuliaghisini
- Update German translation @timo
- Removed broken preview image in ContentsUploadModal if uploaded item is not an image. @giuliaghisini
- Localized content upload modal last modified date @nzambello
- Fix overflow in folder contents with long titles @nzambello
- Fixed object browser widget when a selected items is deleted. Plone.restapi returns a null object. @giuliaghisini
- Fixed error on adding new item if parent item is not translated when multilingual is set @giuliaghisini
- Added translations for select in querystring widget @nzambello

## 6.2.0 (2020-06-14)

### Feature

- Added database information component in ControlPanels @iFlameing

### Internal

- Add yarn-deduplicate. @timo

## 6.1.0 (2020-06-12)

### Feature

- Include `config.addonRoutes` in router configuration. This allows addons to
  override route children defined for the `App` component.
- Added param 'wrapped' for widgets, to use widgets without form wrappers. @giuliaghisini
- Added internationalization for Romanian language @alecghica #1521
- Support loading additional reducers from the `config.addonReducers` key,
  to allow addons to provide their own reducers @tiberiuichim
- Add a no brainer image sizing option, using scales. This will be vastly improved when
  we adopt srcsets. @sneridagh

### Bugfix

- Removed a regex check in default view, we already have that check implemented in `toHTML.jsx` L173s @nileshgulia1
- UX and UI improvements to `DateTimeWidget` @sneridagh
- Fix an UTC handling for edge cases in `DateTimeWidget` @sneridagh
- Do not store the server information of the image block in the block @sneridagh
- expose `blocks` and `blocks_layout` only editing content types @nileshgulia1
- Small fix for `TextAreaWidget` and max_lenght @sneridagh

## 6.0.0 (2020-05-18)

### Breaking

- Removed support for CSS modules, since Razzle 3.1.x do not support them @sneridagh
- Updated Volto dependencies - See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information @sneridagh
- By adding `react-beautiful-dnd` in the block editor we are introducing new wrappers
  (belonging to the lib machinery) in the structure. The original structure and class
  names are still in there for maintain maximum backwards compatibility. Those might be
  cleaned up in next major versions, so if for some reason you have customized the
  styling of your blocks in edit mode relying in the old structure, you might want to
  review and adapt them @sneridagh

### Feature

- Added `react-beautiful-dnd` in core for edit form @iFlameing

### Bugfix

- Improve `isInternalURL` helper to match also anchors @sneridagh
- Fix local build when no RAZZLE_API_PATH is set @sneridagh
- Fix `WysiwygWidget` redraft HTML conversion when creating an empty paragraph force a `<br />` on it @sneridagh

### Internal

- Update to Razzle 3.1.2 @sneridagh
- Update to React 16.13.1 @sneridagh
- Removal of unused (and deprecated) `@babel/preset-stage-0` @sneridagh
- Update `react-router` @sneridagh
- Update `react-redux` and friends @sneridagh
- Update `connected-react-router` @sneridagh
- Update low hanging fruits deps @sneridagh
- Update style/less loaders and friends @sneridagh
- Update stylelint and friends @sneridagh
- Update prettier @sneridagh
- Update eslint plugins @sneridagh
- Update `cypress-axe`, `detectbrowser`, `lint-staged` and `release-it` @sneridagh

## 5.10.0 (2020-05-16)

### Feature

- Refactor createContent command to accept a single json object @iFlameing
- enable hyperlinks in comments when intelligent text is enabled for comments @jackahl
- Added InlineForm, a generic form implementation that can be used to edit, among others, block data. @tiberiuichim

### Internal

- Make available some internal artifacts (Router, Redux Store and Settings) to the Cypress acceptance tests, add docs @sneridagh
- Added a cypress test for the comment @iFlameing
- Add a cypress function to set registry entries @jackahl

## 5.9.1 (2020-05-15)

### Bugfix

- Fix Bug in Form Component, that lead to site crash when transmitting a comment @jackahl #1475
- Fix for the long lasted issue when creating links in newly created text blocks not showing as links until you save @avoinea

### Internal

- add a cypress function to set registry entries @jackahl

## 5.9.0 (2020-05-12)

### Feature

- Implemented a new ObjectBrowserWidget @giuliaghisini
- Add system information in controlpanel @iFlameing #1457
- Added Dexterity Types Controlpanel @avoinea #1285
- Remember sort order of folder contents view. @ksuess

### Bugfix

- Fix new lines inside blockquotes are not rendered @iFlameing #1249
- Fix blockquote style render error: unique key @iFlameing #1097
- Added Dexterity control panel Cypress tests @iFlameing

## 5.8.0 (2020-05-11)

### Feature

- Adding Image Gallery template in Listing view @iFlameing

## 5.7.1 (2020-05-08)

### Bugfix

- Fix translation locator lookup in `CreateTranslation` component and remove the no longer needed store reducer @sneridagh

## 5.7.0 (2020-05-08)

### Feature

- Enable `@querystringresults` action to use the new context aware query feature @sneridagh

## 5.6.1 (2020-05-08)

### Bugfix

- REALLY load the current object language on SSR, instead of relying on the cookie @sneridagh

### Internal

- Pin some api devs (ZCatalog and p.namedfile improvements) @sneridagh

## 5.6.0 (2020-05-06)

### Feature

- Load the current object language on SSR, instead of relying on the cookie @sneridagh

### Bugfix

- Correct the `defaultLanguage` intend in `react-intl-redux` configuration @sneridagh

### Internal

- Add default `src` alias for addons detecting if there is a released or a mrs-developer one @sneridagh

## 5.5.0 (2020-05-06)

### Feature

- Added label expired if expiration date is smaller that current date #1413 @iFlameing
- Added word limit widget @iFlameing
- Addons control panel @esteele @iFlameing

### Internal

- Cypress test for Table Block @steffenri @iFlameing
- Cypress tests upgraded for Image, Hero and HTML Block @steffenri @iFlameing
- Added cypress test for sort method in folder content #1035 @iFlameing

## 5.4.0 (2020-05-04)

### Feature

- Add babel and externals support in Webpack for add-on infrastructure @sneridagh
- Forward the images and files cache headers in Volto SSR passthrough @sneridagh

### Bugfix

- Fix handling of external links in ToHTML config @nzambello
- Remove the title field from right dropdown in folder content view

### Internal

- Periodical upgrade of `browserlist` lib @sneridagh

## 5.3.0 (2020-04-29)

### Feature

- Add general @navigation endpoint depth setting @sneridagh

### Bugfix

- Fix `<html>` `lang` attribute @sneridagh

## 5.2.1 (2020-04-27)

### Internal

- Remove console log in workflow asyncConnect :( @sneridagh

## 5.2.0 (2020-04-27)

### Feature

- Improvement of API requests error handling @sneridagh
- Unauthorized on folder contents if no proper credentials @sneridagh

### Bugfix

- Improve German translations for folder contents view @timo
- Make label of checkboxwidget clickable @pbauer #1414
- Show new added user in user control panel @iFlameing #1271
- Support multi selection in roles and groups and polish add user #1372
- Listing block: removed message 'No results found' only in view mode on public site, in editMode is still present. @giuliaghisini

### Internal

- Add crossorigin to the preload resources tags while in development @sneridagh
- Permissions in contents and Edit @sneridagh
- Fix the error on content Edit no credentials now shows `Unauthorized` @sneridagh
- Improve console server output showing info @sneridagh

## 5.1.0 (2020-04-23)

### Breaking

### Feature

- Full screen right sidebar @rexalex #1345
- Enable internal API proxy for not to rely on CORS on development @sneridagh
- Added Print CSS @iFlameing #1289
- Added error handling for Add and Edit forms #1392 @nzambello

### Bugfix

- Japanese translation @terapyon
- Fix `ArrayWidget` to support multiselect schema `schema.List`/`schema.Set`-> `schema.Choice` hardcoded (not using vocabularies) combination @sneridagh
- Remove Back button from control panels, since it's redundant @sneridagh
- Show past dates in date time widget calendar @nzambello

### Internal

- Translated labels in Eventi View @nzambello
- Improve i18n script, so shadowed components are not overriding their original translations. For the record, any override of i18n messages, should be done somewhere else (eg. config object) @sneridagh

## 5.0.1 (2020-04-16)

### Bugfix

- Show new added user in user control panel @iFlameing #1271
- Fixes for contact form @nzambello

## 5.0.0 (2020-04-12)

### Breaking

- Added basic lazy loading dependencies and boilerplate @sneridagh
- Change component to where page title is set to `View.jsx`, remove all `Helmet` calls from inner views @jackahl

### Feature

- Added date time widget @nzambello
- Add meta description tags and meta generator @sneridagh
- Add lang property in `html` tag depending on the site/content language @sneridagh
- Add `App.jsx` component insertion point @sneridagh
- Lazy load `EventView.jsx`, splitting out all its big dependencies (Luxon) along with it @sneridagh
- Lazy load `pretty` library, used in the HTML block @sneridagh
- Lazy load `Raven` library @sneridagh
- Lazy load `React Select` library @sneridagh

### Bugfix

- Show save/cancel on control panels @avoinea #850
- Fix listing "show more" link rendering conditions @nzambello

### Internal

- Make Jest only looks up in `src` folder @sneridagh
- Re-arrange `components/index.js` @sneridagh
- Added a patch for Razzle Jest config generator to include `modulePathIgnorePatterns` option @sneridagh
- Fix Travis random no sound card found error @sneridagh
- docs: add release documentation @tisto

## 4.6.0 (2020-04-06)

### Feature

- pagination on site search results @giuliaghisini

### Bugfix

- Fix use case for non-multilingual setups and on projects on lang loading @sneridagh

### Internal

- Typo in German translations @steffenri
- Complete more Italian translations @nzambello

## 4.5.0 (2020-04-06)

### Feature

- /sitemap to view sitemap based on @navigation with depth 4 @giuliaghisini

### Bugfix

- Fix ArrayWidget to support static supermodel vocabulary @datakurre
- Bring back the OutdatedBrowser component, it got removed in a bad merge :( @sneridagh

### Internal

- Improve the i18n script, only write the pot file if it's really different @sneridagh

## 4.4.0 (2020-04-03)

### Feature

- /contents (folder content view) is sortable @ksuess
- Updated the (folder content icons to Pastanaga Icons) @iFlameing

### Bugfix

- Fix conversion from DraftJS to HTML using redraft for atomic entities (IMAGE) @sneridagh

## 4.3.0 (2020-04-01)

### Feature

- Added recursive workflow changes @robgietema

### Bugfix

- Fixed ssr link view @robgietema

## 4.2.0 (2020-03-31)

### Feature

- Add Multilingual Support @sneridagh

## 4.1.2 (2020-03-30)

### Bugfix

- Fix typo for Japanese translation @terapyon
- Fix refresh of the `Breadcrumbs` and `Navigation` components on calling `/login` and `/logout` @sneridagh
- Fix refresh of the `Navigation` component on calling `/login` and `/logout` @sneridagh
- Adjust implementation of the download link behavior for files @sneridagh
- Fix Maps block to use maps-inner instead of video-inner class @timo
- Add div with class "table-of-contents" to ToC block @timo

### Internal

- Upgrade critical Plone 5.2.1 deps in api folder @sneridagh
- Improve Cypress Video Block tests @sneridagh @timo
- Run `yarn i18n` on any JSX change @sneridagh
- Add link mailto Cypress test @timo
- Added design guidelines manifesto @sneridagh

## 4.1.1 (2020-03-18)

### Bugfix

- Fix for #1267 - Link inside text for content-type without blocks breaks the site @sneridagh
- Japanese translation @terapyon
- Fix production mode for newly created `__DEVELOPMENT__` global @sneridagh

### Internal

- Upgrade to Cypress 4 @timo

## 4.1.0 (2020-03-13)

### Feature

- Add `flattenHTMLToAppURL` helper method for remove api url from TinyMCE generated HTML @cekk
- Add development mode global @sneridagh

### Bugfix

- Improve the UX of the listing block when queries are running @sneridagh
- Added table of content cypress test @steffenri

## 4.0.1 (2020-03-09)

### Bugfix

- Fixes #1262 - SSR support for "undetected" browsers
- Japanese translation @terapyon
- Site settings styling fixed in the Controlpanel
- Increase ObjectBrowser limit per folder to 1000, partially fixes #1259 @sneridagh
- Deprecate `utils.less` as it's a leftover and it collides with some use cases depending on the viewport, see: #1265

### Internal

- Use kitconcept.volto as integration package @sneridagh

## 4.0.0 (2020-03-01)

### Feature

Summary of the most important features in this final release. For more detailed information
refer to all of them in https://github.com/plone/volto/releases

- Improved Pastanaga Editor
- New Pastanaga Editor sidebar
- New mobile first toolbar
- Developing blocks experience simplified
- New Object Browser
- Listing, TOC, Lead Image blocks
- Improved existing blocks (Image, Video, Maps)
- New blocks chooser and future proof blocks definitions
- Definition of default Blocks per content type
- Body classes like the Plone ones hinting content types, section and current view
- New message system
- React hooks support
- Several internal libraries updated, including Redux, Router ones that support hooks as well
- New locales (es, it, ja, pt, pt_BR)

### Bugfixes

- Tons of bug fixes

## 4.0.0-alpha.43 (2020-03-01)

### Changes

- Fixes #982 - History compare/diff @avoinea
- Responsive header @ksuess
  - Anontools (login, register) wrapping under long navigation.
  - Breaking change: Hamburger menu also on tablet.
  - Mobile: compact display of anontools and search.

## 4.0.0-alpha.42 (2020-02-26)

### Changes

- Revert "Fix Scrolling Functionality if there are many columns in table" since it has non desired secondary effects in the table block and other tables @sneridagh

## 4.0.0-alpha.41 (2020-02-26)

### Changes

- Fixes for the `ListingView` (Issue #1188, Listing View) @wkbkhard
- Fix date widgets on QueryString widget on listings and in the widget @sneridagh
- Update German translation @tisto
- i18n in toolbar and folder contents view @ksuess

## 4.0.0-alpha.40 (2020-02-24)

### Added

- Add pagination support to listing blocks @sneridagh

### Changes

- Fix Video and Maps blocks hydration quirks on view mode @sneridagh
- Deleted Empty Select Component @aryamanpuri
- Fix `RichText` Widget on normal forms @sneridagh
- Fix Guillotina tests @bloodbare
- Fix problem with not wrapped element in `Provider` store in `WysiwygWidget` component
  due that now, the links are wrapped with a connected component @sneridagh

## 4.0.0-alpha.39 (2020-02-18)

### Added

- Add permission check to edit form @sneridagh

### Changes

- Fix and improve Error in SSR @sneridagh
- Fix `LinkAnchorPlugin` press Enter key inside blocks with draftJS widgets @sneridagh

### Internal

- Replace all relative paths to `@plone/volto` absolute paths to ensure you can override all the resources via component shadowing @sneridagh

## 4.0.0-alpha.38 (2020-02-18)

### Internal

- Update to use ESLint 6 @timo

## 4.0.0-alpha.37 (2020-02-18)

### Added

- Chose template for listing block @giuliaghisini
- Event type view @nileshgulia1 @pnicolli
- Add ability to define the starting blocks per content type @sneridagh
- Reference widget: show item title and path in search and hover items selected @giuliaghisini

### Changes

- Fix the "jump" on the blocks editor on focusing blocks @sneridagh
- Include link and size info to the full size image in `ImageView` view component @sneridagh
- In the Display menu, only show views that are implemented @pnicolli
- Hide Blocks fields in Layout fieldset in Add/Edit forms @pnicolli
- Updated italian translations @nzambello
- Fallback for non existing layout views registered in `constants/Layouts` when selected in the widget @sneridagh
- Fix select widget for array inline choices fields and `z-index` problem @sneridagh
- Improve UX of the edit block Image component @sneridagh
- Fix on creating a new block, it should show the sidebar block properties (#1167) @sneridagh
- Send only the changed fields on PATCH (edit content) operations @sneridagh
- Japanese translation @terapyon

### Internal

- Added `forest.eea.europa.eu` as deployed Volto in production @tiberiuichim
- Add Semantic UI responsive variables to the responsive utils @sneridagh
- Added `yarnhook` to the build @sneridagh

## 4.0.0-alpha.36 (2020-02-03)

### Changes

- Fix unable to login from /logout page (#1147) @sneridagh
- Fix sitemap.xml by increasing the batch size @robgietema
- Browser detect feature, adding a deprecation message for ancient browsers in the `App` component @sneridagh
- Adding fallback in the edit form, in case the blocks related fields are empty, so we are sure that the edit form shows at least the default blocks @sneridagh
- Fix shift return in tables @robgietema

## 4.0.0-alpha.35 (2020-01-31)

### Changes

- Fix CSS when multiselection widgets have multiple items, then provoke a line jump @sneridagh
- added new italian translations, added italian to available languages, translated some static string
- updated italian translations
- Fix listing block sidebar focus @sneridagh
- Fix getBaseUrl helper method to not match inner occurrences of nonContentRoutes @sneridagh

## 4.0.0-alpha.34 (2020-01-26)

### Changes

- Fix token expiration/renewer timer, this fixes #674 @sneridagh

## 4.0.0-alpha.33 (2020-01-26)

### Changes

- Updated Maps block to the sidebar and image block look and feel @sneridagh
- Update video block to the sidebar and get the image block look and feel @sneridagh

### Internal

- Fix and update to latest husky and lint-staged @sneridagh
- Fix for i18n to use defaultMessages instead to default to the id @sneridagh
- Update `babel-plugin-react-intl` to latest @sneridagh

## 4.0.0-alpha.32 (2020-01-24)

### Added

- Lead image behavior block @sneridagh sponsored by `CMSCOM.jp` @terapyon

### Changes

- Make login component honors the returnUrl prop if called from any pathname @sneridagh

### Internal

- Try to improve the realibility of the Cypress tests, reorganize commands @sneridagh
- Upgrade to Plone 5.2.1, add `Products.PloneHotfix20200121` @sneridagh
- Force global use of `browserslist` package to get rid of message on build @sneridagh

## 4.0.0-alpha.31 (2020-01-22)

### Changes

- fix `SelectWidget`, when there is a vocabulary and no choices @sneridagh

## 4.0.0-alpha.30 (2020-01-22)

### Added

- Added listing block @pnicolli @rodfersou @sneridagh @giuliaghisini

### Changes

- fix bug in TokenWidget and ArrayWidget when removing all elements. @giuliaghisini
- fix listing block customization @giuliaghisini
- fix Querystring widgets failing to render if the `MultipleSelectionWidget` field applied is not included in the site vocabulary returned by `@querystring`. This applies to `Subject` field when the tag value is not there any more. @sneridagh
- fix QueryString widget on creation when query is empty, fixed broken when editing after too @sneridagh

## 4.0.0-alpha.29 (2020-01-18)

### Changes

- Remove dangling reference to external data in Image block not used anymore, causing confusion and lead to dead (and wrong) code @sneridagh
- Remove last remains of the append secondary actions, remove Image block toolbar. Update i18n, fix small issues in Image block @sneridagh

## 4.0.0-alpha.28 (2020-01-17)

### Changes

- Fix ToC anchor links in Firefox @robgietema

## 4.0.0-alpha.27 (2020-01-17)

### Changes

- Fix removing links in blocks @robgietema

## 4.0.0-alpha.26 (2020-01-15)

### Added

- German translation updated @timo

## 4.0.0-alpha.25 (2020-01-14)

### Added

- German translation for TOC @timo

## 4.0.0-alpha.24 (2020-01-14)

### Added

- Added customStyleMap param to Editor of draftjs @giuliaghisini
- Added Table of Contents block @robgietema

## 4.0.0-alpha.23 (2020-01-14)

### Added

- Support for indexable blocks (requires plone.restapi 6.1.0) @timo
- Set alt tag of image when selecting image in image block @robgietema

### Changes

- Avoid console warnings in AddLinkForm.jsx @tiberiuichim
- More cleaning the body classname from the current displayname view @sneridagh
- Make it possible to paste links, lists, b and i Elements into text-blocks
  @jackahl
- added option to include mp4 files from a remote source in video Block @steffenri @jackahl
- Make it possible to paste links, lists, b and i Elements into text-blocks @jackahl

## 4.0.0-alpha.22 (2020-01-04)

### Changes

- Disable all styling when copying text from another source (e.g. MS Word) into a text block @jackahl
- Avoid console warnings in QuerystringWidget @tiberiuichim
- Fix body classname based on the current content type @sneridagh

## 4.0.0-alpha.21 (2020-01-02)

### Changes

- Fix failing test on Footer due to year change in Copyright notice @sneridagh

## 4.0.0-alpha.20 (2020-01-02)

### Added

- Added translations to Portuguese @emansije

### Changes

- Fix wysiwyg widget help tag, for styling consistency @tiberiuichim
- Added more i18n improvements @macagua
- Disable submit button on save, to avoid multiple content creation @tiberiuichim
- Fix focus on sidebar @robgietema

### Internal

- Upgrade version pin for lxml, for compatibility with Python3.8
- Bump handlebars from 4.1.2 to 4.3.0 @timo

## 4.0.0-alpha.19 (2019-12-20)

### Added

- Implementation of `Portuguese (BR)` translation @LeuAlmeida
- Added translations to spanish @macagua
- Added AlbumView @wkbktill @alexbueckig

### Changes

- empty text blocks are shown as `<br />` in the view.
- Fix double fetch due to asyncConnect being executed in browser too @robgietema @sneridagh

## 4.0.0-alpha.18 (2019-12-12)

### Added

- Added CTRL+ENTER feature in text blocks by default. It creates a newline inside the same text chunk (`<p>`) @sneridagh
- Automatically switch sidebar on block change @robgietema
- Japanese translation @terapyon

### Changes

- Remove "documentDescription" class in table block @sverbois
- Added possibility to work with vimeo-videos instead of youtube-videos in the video block @wkbkhard
- Fixed Issue 1021: typing in a "wrong" URL leads to error @wkbkhard
- General toolbar more and personal tools menu CSS fixes @sneridagh
- Fix bug that lead to crashing the view when deleting the last row of a table
- Fix Select widget bug if the field has already the options in the `choices` schema, do not trigger the vocabulary request @sneridagh

### Internal

- Updated to react-select v3 @robdayz
- Fix file and link redirect views @robgietema
- Restrict moment.js locales to available languages @tisto @robgietema
- Fix history view @robgietema

## 4.0.0-alpha.17 (2019-12-03)

### Internal

- Revert eslint upgrade, because of problems with the react-app preset typescript settings @sneridagh

## 4.0.0-alpha.16 (2019-12-02)

### Changes

- Fix small CSS issues in Blocks @sneridagh

### Internal

- Pin Guillotina docker image @sneridagh
- Forked `react-helmet` since it seems unmaintained. Now it's a Named import in helpers. @sneridagh
- Update internal dependencies, fix "unmet peer dependencies" console logs by adding the peer dependencies to the local dependencies @sneridagh
- Update some dependencies, including: react-router, eslint engine and plugins/config and others @sneridagh
- Lodash improvements for decrease bundle size @sneridagh

## 4.0.0-alpha.15 (2019-11-27)

### Internal

- Export the resetContent action @pnicolli
- Fix toolbar collapsed color @sneridagh
- Minor CSS fixes @sneridagh
- Remove @testing-library/cypress dep, as it breaks builds if the internal cypress release is different than the one in this package @sneridagh

## 4.0.0-alpha.14 (2019-11-24)

### Internal

- Proper config for stylelint-prettier integration, add husky integration and scripts for stylelint, review stylelint rules @sneridagh

## 4.0.0-alpha.13 (2019-11-23)

### Internal

- Upgrade autoprefixer, remove deprecated `browsers` option, move to `browserlist` in `package.json` @sneridagh
- Upgrade react and react-dom to 16.12.0 @pnicolli
- Upgrade Cypress to 3.6.1 @timo

## 4.0.0-alpha.12 (2019-11-13)

### Changes

- Add loading animation for save and edit buttons in toolbar @pgrunewald
- Move Body class depending on content type to `App` component in order to make it available everywhere @sneridagh
- Add root class name to `Tags` component @sneridagh

## 4.0.0-alpha.11 (2019-11-08)

### Added

- Improved `ObjectBrowser` API to allow arbitrary field names and a custom `onSelectItem` @sneridagh

### Changes

- Fix icon in `TextWidget` @sneridagh
- Improve documentation for `Icon` @jackahl
- Fix ability to develop Volto itself (as and addon with a mrs.developer checkout) inside a Volto project @sneridagh

### Internal

- Add internationalization section to docs @pgrunewald

### Internal

- Set Cypress viewport width to 1280px @timo

## 4.0.0-alpha.10 (2019-10-31)

### Added

- Add Node 12 support @timo

### Changes

- Removed wrapper `p` tag from image block in edit mode for better layout purposes @sneridagh
- Make SelectWidget more robust @robgietema
- Add image to listing view @robgietema
- Fix `SchemaWidget` @robgietema
- Move styles import to a separate file @pnicolli
- Fix crash when user enters only whitespace in required fields @JeffersonBledsoe
- Fix the _real_ focus thief in new tiles @sneridagh

### Internal

- Report port number on startup @fredvd
- Retry Cypress tests two times before failing @timo
- Add waitForResourceToLoad to Cypress @timo
- Add use cases to README @timo
- Re-enabled Guillotina tests @sneridagh
- Remove Docker build from tests @sneridagh
- Removed Enzyme @pnicolli
- Added testing-library (react and cypress) @pnicolli
- Tiles -> Blocks renaming @sneridagh

## 4.0.0-alpha.9 (2019-10-09)

### Changes

- Rename `blockID` to `id` for view block components, to unify naming in edit-view @sneridagh
- Change the order of the widget decider algorithm to `choices` is chosen before the vocabularies one @sneridagh
- Remove old messages container since it's not used anymore @sneridagh
- Improve the Pastanaga Editor block wrapper container layout, deprecating the hack `.ui.wrapper > *` @sneridagh
- Fix `ArrayWidget` and amend users control panel arrays instantiations @sneridagh

## 4.0.0-alpha.8 (2019-10-05)

### Added

- Upgrade react-intl to latest version @sneridagh

### Changes

- Fix `DefaultView.jsx` warning on missing key @sneridagh

### Internal

- Enable run yarn install on git checkout and git pull in husky @sneridagh
- Disable Cypress blocks tests @sneridagh
- Remove dockerized unit tests @timo
- Add Cypress link test for text blocks @timo

## 4.0.0-alpha.7 (2019-10-02)

### Added

- Add CSS class names to block chooser @timo
- Add Cypress tests for blocks @timo @rodrigo @jakahl

### Changes

- Fix page jump on edit route @sneridagh
- Fixes to users and groups controlpanel i18n strings @nileshgulia1

### Internal

- Change the general naming of the documentation to `developer` documentation @sneridagh
- Add `blockID` prop to block tiles render view, this is handy for some blocks use cases @sneridagh
- Fix flaky Cypress test @sneridagh

## 4.0.0-alpha.6 (2019-09-30)

### Added

- Transfer focus management and keyboard navigation to the tiles engine @sneridagh

### Changes

- Slight amendment to Blocks chooser styling @sneridagh
- The default view for content types `DocumentView.jsx` has been renamed to a more appropiate `DefaultView.jsx` @sneridagh

### Internal

- Add complete husky config @sneridagh
- Add `COC.md` file @timo

## 4.0.0-alpha.5 (2019-09-28)

### Added

- Default body classes were enhanced to accept path and content type based ones as in Plone @sneridagh

### Changes

- Fix for checkboxes when setting `false` values, this fixes #888 @sneridagh

## 4.0.0-alpha.4 (2019-09-27)

### Added

- Added Users and Groups Controlpanel @nileshgulia1 @csenger @jackahl

### Changes

- Move the Tile Edit wrapper one level up to the tiles engine, so we can simplify how edit tiles are made @sneridagh
- Rename Metadata and Properties in sidebar to Document and Block @jackahl
- Add some German Translations @steffenri, @jackahl

### Internal

- Fix cypress test for file Upload @jackahl
- Dependencies upgrades (router, redux) @sneridagh
- Enhance Cypress createContent keyword to create files and images @timo
- Fix docs build locally @sneridagh

## 4.0.0-alpha.3 (2019-09-22)

### Added

- New tiles chooser @sneridagh

### Internal

- Fail eslint check on any warnings @timo
- Add i18n check on Travis @timo

## 4.0.0-alpha.2 (2019-09-19)

### Changes

- Fix parameter handling in Search view to avoid limiting search results with empty parameters #845 @csenger
- Fix SearchTags handling of keyword vocabulary for anonymous users @csenger
- Fix hero tile being next to a left or right aligned image @jackahl
- Fix toolbar elements showing depending on user permissions @sneridagh

## 4.0.0-alpha.1 (2019-09-17)

### Changes

- Fix test failure for `VersionOverview` component in master after release process @sneridagh
- Improve usability of login form @sneridagh
- Fix creation of image objects from image tile by adding the id as well @sneridagh
- Remove description tile from the default tiles on new content @sneridagh

### Internal

- Update release-it to fix some deprecation messages @sneridagh

## 4.0.0-alpha.0 (2019-09-13)

### Added

- Show images in Rich Text editor @rodfersou @sneridagh
- Full Pastanaga Toolbabr implementation @sneridagh
- Internal API path for containers @bloodbare
- Add toast component @sneridagh
- Add sidebar support for components @sneridagh
- Add Volto version number in control panel @nzambello
- Remove Mosaic component @tisto
- Added toast component in actions @nzambello
- Added translations to italian @nzambello
- Add table tile @robgietema
- Add image sidebar @sneridagh @gomez
- Add delete file button to file Widget @jackahl
- Add link redirect view @robgietema
- Add proper unique id to all fields, based on the fieldset and field name @sneridagh
- Add QueryString widget @robgietema @sneridagh

### Changes

- Add a delay when filtering content in folder contents so it doesn't overload backend @vangheem
- Small UX/UI fixes @sneridagh
- Fix query string search in subjects vocab field @gomez
- Removed the delete button from the title tile @pnicolli
- Rewrite sidebar @robgietma @sneridagh
- Added SidebarPortal component for easier sidebar handling @pnicolli
- Fixed tiles outline in Pastanaga editor @pnicolli
- Fix typos @balavec
- Fix warnings for boolean fields @miziodel
- Fix dropdown styling @robgietema
- Update connected-react-router and fix instantiation of the wrapper component
  to fix the sync problems with the router and the store @sneridagh
- Fix link popup in case you dismiss it without setting anything @sneridagh
- Export history in start-client.jsx for being able to import it from the project for trackers (Matomo, etc) @csenger
- Workflow change awareness on toolbar @robgietema
- Fix reordering in folder contents view and problems with previous windowing settings leaked to current one. @robgietema
- Fix remove link entity of only a part it only removes that part, not the whole entity @robgietema
- Add proper placeholder to the add link feature in the editor @sneridagh
- Fix bulk workflow change in contents view @sneridagh
- Fix regresion on uploading image to root @sneridagh
- Fix hero tile on view if image is missing @sneridagh
- Fix link to contextual contents in toolbar @sneridagh
- Add automatically the wildcard for the `SearchableText` on the @search action @sneridagh

### Internal

- Upgrade lodash to 4.17.15 @tisto
- Fix console errors on tests @sneridagh
- Add development mode for kitkoncept.voltodemo to /api plonebacked @fredvd
- Cleanup map dispatch to props @robgietema
- Fix linting warnings @robgietema
- Remove decorators @robgietema
- Pin mem to 4.0.0 @tisto
- Add razzle-plugin-bundle-analyzer @tisto
- Add bundlewatch @tisto
- Add bundlesize @tisto
- Update base buildout @sneridagh

## 3.1.0 (2019-06-14)

### Added

- Upgrade to react-redux 7.1. It includes the new official hooks for Redux. @sneridagh
- Make Login Route accessible from anywhere in path url @nileshgulia1

### Changes

- Fix basic tiles classes @rodfersou
- Fix video alignment @sneridagh

### Internal

- Upgrade handlebars to 4.1.2 @timo
- Upgrade js-yaml to 3.13.3 @timo
- Upgrade Plone api folder to 5.2rc3 @sneridagh
- Fixes for image/file fields widgets for Guillotina @sneridagh
- Fixes for Cypress Guillotina tests @sneridagh

## 3.0.4 (2019-05-30)

### Changes

### Internal

- Add cypress a11y tests. @timo
- Fix order of arguments when sending the contact form @csenger
- Fix @babel/core import on i18n script @sneridagh

## 3.0.3 (2019-05-13)

### Internal

- Use eslint-config-react-app instead of airbnb + custom config for linting @timo
- More eslint fixes for avoiding parsing errors on decorators @sneridagh
- Add 'prettier' command to check if there are any missing prettier fixes @timo
- Run 'prettier' on Travis and fail the build if there are missing prettier fixes @timo
- Add 'prettier:fix' command to fix all missing prettier fixes at once @timo
- Run 'prettier:fix' once and commit all fixes @timo
- Fix the most important violations reported with the new config @sneridagh

## 3.0.2 (2019-05-10)

### Changes

- Re-add babel-eslint because of the decorators @sneridagh
- Upgrade eslint-config-airbnb @sneridagh

## 3.0.1 (2019-05-10)

### Changes

- Small fix for a missplacement of the hooks plugin in .eslintrc @sneridagh

## 3.0.0 (2019-05-10)

### Added

- Upgrade to Razzle 3 @sneridagh
- contact-form view @cekk
- Add cypress setup for both Plone and Guillotina @sneridagh
- Update SelectWidget and ArrayWidget and related vocabularies actions/reducers
  for the breaking changes in plone.restapi 4.0.0 @davisagli @sneridagh
- Expose request on the promise returned by the api helper @csenger

### Changes

- Several dependencies upgraded @sneridagh
- Fix image of Hero Tile for images in private containers @sneridagh
- Remove enforcement of JSdocs in Volto ESlint rules @sneridagh
- Remove RobotFramework tests in favor of the cypress ones @sneridagh
- Updated docs to highlight some code changes @pigeonflight

## 2.1.3 (2019-04-17)

### Changes

- Update api folder to Plone 5.2 and Python3, update the whole story @sneridagh

## 2.1.2 (2019-04-16)

### Changes

- Fixed issue where it was not possible to click into the title tile above the
  small red bar at the beginning of the line in some browsers. @jackahl
- Docs content editing. @esteele
- Fix the folder_contents view component bby preventing the SearchableText be
  empty if you haven't typed anything in the filter fields yet. This is caused
  by the new ZCatalog in Zope 4. @sneridagh

## 2.1.1 (2019-04-04)

### Changes

- Improved search action, now it supports passing directly the arrayed values
  and it converts it to Plone's query syntax @sneridagh

- Added depth argument to the navigation action, to match the @navigation
  endpoint feature @sneridagh

## 2.1.0 (2019-04-02)

### Added

- Added specific `onMutateTile` for solely use of the Text tile when it mutates
  to another type of tile. This prevents onChangeTile do one thing that it was
  not designed lifting responsibilities from it. @sneridagh
- Added `detached` mode for the text tile so it will be able to render outside
  the Volto editor without all the tile mutation machinery and the keyboard
  handlers. @sneridagh

### Changes

- Small improvements to the internal tile api @sneridagh
- Fix for tiles having dialog box `ENTER` key captured by global tile onKeyDown
  handler, then creating a tile instead of the intended behavior. @sneridagh
- Fix small CSS and import issues @sneridagh
- Fix Invalid Redraft object warning on console @sneridagh

## 2.0.0 (2019-03-25)

### Added

- Tiles refactor, move keyboard listeners and Trash icon to Tiles HOC
  @sneridagh
- Fix tiles navigation via cursors on all available tiles @sneridagh
- Fix UX on HTML tile when navigating via cursors @sneridagh
- Add ability to add new text tile via `Enter` key @sneridagh
- Add create new text tile at the bottom on adding tiles @sneridagh
- Improve general UX on tiles creation and focusing on creation @sneridagh

## 1.10.0 (2019-03-25)

### Added

- Fix npm package generation @sneridagh

## 1.9.0 (2019-03-25)

### Added

- Upgraded to React 16.8 (the one with hooks) @sneridagh
- Upgraded to the recent (at last) released react-redux 7.0beta.0, this release
  solves the performance issues with the new React context and leave them ready
  for the upcoming useRedux hook. This release supports the latest React 16.8.
  @sneridagh
- Upgraded to the latest Router and react-router-config and other required
  upgrades. @sneridagh
- Upgraded to latest redux-connect @sneridagh
- Upgraded to latest razzle @sneridagh

## 1.8.3 (2019-03-21)

### Changes

- Several CSS fixes @sneridagh
- Add several icons @sneridagh

## 1.8.2 (2019-03-21)

### Changes

- Improve README @svx @fredvd
- Pretty Pastanaga UI .overrides stylesheets @sneridagh

## 1.8.1 (2019-03-19)

### Changes

- Fix hero tile View styling, add definitive icon @sneridagh
- Fix the trash icon on the tiles that was displaced by other change @sneridagh

## 1.8.0 (2019-03-15)

### Added

- Hero Tile @nileshgulia1 @sneridagh

### Changes

## 1.7.0 (2019-03-03)

### Added

- Add image-zooming functionality @nileshgulia1

### Changes

- Fix image float/left right on image tile @timo

## 1.6.1 (2019-03-01)

### Changes

- Fix a regression on the add tile button alignment @sneridagh

## 1.6.0 (2019-03-01)

### Added

- Set image width in Volto editor to 50% for images that float left/right @timo
- Ability to navigate through the existing tiles with the cursors. @sneridagh
- HTML Tile for Volto Editor with preview and code prettifier
  @ajayns @nileshgulia1 @sneridagh
- Add error log in the SSR console @sneridagh
- Add SSR helper to get resources (images/files) from the server using the API
  headers. This fixes the missing images on non published resources while editing @sneridagh
- Fix not valid `<div>` tag nested in a `<p>` tag error on tiles and wysiwyg
  field @sneridagh

### Changes

- Clean .variables files from Pastanaga theme since they are already applied by
  the theming engine from the default theme. @sneridagh
- Fix edit forms with richtext fields coming from SSR @sneridagh

## 1.5.2 (2019-02-20)

### Changes

- Fix external images on Image Tile render @sneridagh
- Several fixes reagarding correctness of markup @sneridagh
- Issue with dangerouslySetInnerHTML RichText fields on first SSR load
  apparently fixed (due to the above fix) :) @sneridagh

## 1.5.1 (2019-02-19)

### Changes

- Fix build for projects created with `create-volto-app` @sneridagh
- Fix link view @nileshgulia1

## 1.5.0 (2019-02-19)

### Added

- Add Google Maps tile @nileshgulia1
- Add support for extending Semantic UI Styling using the semantic theme engine
  by adding an `extras` file that can bring into the engine new styles coming
  from third party libs or custom styling code for the local theme. Being this
  applied after semantic default styling, it's the last one in the styling
  cascade easing the develop of new themes. @sneridagh

### Changes

- Prevent Volto hit the @types endpoint (via its action, getTypes()) if the
  user is not authenticated, since it's useless and always returns a 401
  @sneridagh
- Improved readme @sneridagh
- New logo for the Pastanaga Theme referring to Volto and fix header @sneridagh
- Disable SocialSharing component by default @sneridagh
- Fix login tab index for username autofocus and password after tab @sneridagh
- Fix hamburgers menu @sneridagh
- Fix CSS sourcemaps by make postcss stage to accept other stages sourcemaps
  @sneridagh
- Add IE11 fixes by pinning some packages, added documentation in `docs` about
  it and how to deal with it. However, compatibility is _NOT_ guaranteed in
  future Volto releases @sneridagh
- Fix Header scroll in Firefox in case that there are lot of items in the nav
  @sneridagh
- Add supported browsers in README @sneridagh
- Default tile position to center for all the existing tiles @sneridagh

## 1.4.0 (2019-02-15)

### Added

- Add the ability to detect the edit Plone Site hack for show the tiles editor
  on Plone site edit @sneridagh

### Changes

- Bring back the stylelint default configs for IDEs @sneridagh
- Improve ESlint resolvers for special paths (@plone/volto and ~), so IDEs do
  not complain any more with no-unresolved active @sneridagh
- Fix the floating image problem in the Volto Editor @sneridagh

## 1.3.0 (2019-02-13)

### Added

- Improve the definitions of the view/edit tiles components for better
  extensibility. This might be a BREAKING change if you have already used the
  old way to extend/add more tiles, please update to the new one @sneridagh

### Changes

- Fix Travis unit testing false green @sneridagh
- Fix bad Proptype for location in ScrollToTop component @sneridagh

## 1.2.1 (2019-02-04)

### Changes

- Bring back the scroll to top on every route change feature @sneridagh
- Loosen node version, allow LTS (v8 and v10) @sneridagh

## 1.2.0 (2019-01-22)

### Added

- be able to specify custom headers in actions @vangheem
- fix icons used in contents @vangheem
- be able to work with mr.developer @vangheem
- add alias `@plone/volto-original` and `@package` webpack aliases @vangheem
- add `errorViews` configuration @vangheem

### Changes

- Upgrade to Node 10.14.2 @nileshgulia1

## 1.1.0 (2018-12-24)

### Changes

- Fix edit on root @robgietema
- Fix sharing @robgietema
- Fix error on token renew @robgietema
- Fix layout fieldname @bloodbare
- First field in a form will get the focus @robgietema
- Fix download file links @mikejmets
- Fix HMR missbehaving on both server and client @sneridagh
- Upgrade to Node 8.14.0 @timo
- Relaxed node runtime constraints @sneridagh
- Update to latest LESS and Semantic UI version @sneridagh

## Added

- Add .gitattributes file to avoid most Changelog merge conflicts @pnicolli
- Buildout for Python 3 @pbauer
- Websockets support @robgietema
- Subrequests to search and get content actions @robgietema
- Add logos @sneridagh @albertcasado

## 1.0.0 (2018-10-31)

### Added

- Training documentation link @robgietema

## 0.9.5 (2018-10-24)

### Changes

- Fix API*PATH variable using RAZZLE* prefix instead @sneridagh
- Fix FUOC (flash of unstyled content) in production mode @sneridagh
- Fix missing buttons on RichText tiles @sneridagh
- Fix original external `overrides.css` position in the cascade was applied in
  the wrong order in site.overrides in Pastanaga theme @sneridagh
- Fatten widget config @robgietema

## 0.9.4 (2018-10-10)

### Changes

- Fix tags layout @robgietema @jaroel
- Fix imports of views, widgets and tiles @robgietema @jaroel

## 0.9.3 (2018-10-10)

### Changes

- Fix logo import path @robgietema @jaroel

## 0.9.2 (2018-10-10)

### Added

- Automatic customization imports for images @robgietema @jaroel

## 0.9.1 (2018-10-10)

### Added

- Automatic customization imports @robgietema @jaroel

## 0.9.0 (2018-10-04)

### Changes

- Renamed package to Volto @robgietema

## 0.8.3 (2018-10-03)

### Changes

- Fix i18n script for dependency @robgietema

## 0.8.2 (2018-10-03)

### Changes

- Move all dev dependencies to dependencies @robgietema

## 0.8.1 (2018-10-03)

### Changes

- Fix compiling when used as a library @robgietema
- Fix buildout security issue @robgietema

## 0.8.0 (2018-10-03)

### Added

- Move the webpack config to Razzle @sneridagh @robgietema
- Upgrade React to 16.5 @tisto
- Upgrade React to 16.4.2 to fix a server-side vulnerability @tisto
- Support for base url @bloodbare

### Changes

- Merged Guillotina and Plone robot tests @bloodbare
- Don't reset total and batching on pending search @robgietema

## 0.7.0 (2018-07-31)

### Added

- Add Pastanaga Icon System @sneridagh
- Support for nested schemas @robgietema
- New block on return in editor @robgietema
- Added 404 page on page not found @robgietema
- Custom tiles support @sneridagh
- Add full register/password reset views @sneridagh
- Make the list block types configurable @robgietema
- Add all missing German translations @tisto
- Add helper `BodyClass` for appending classes to the `body` tag from View components @sneridagh
- Add Tiles support for Guillotina CMS @bloodbare @sneridagh @robgietema

### Changes

- Pastanaga Editor look and feel improvements and polishment @sneridagh @albertcasado
- Refactor configuration of routes, views and widgets for extensibility @sneridagh @davilima6
- Fix view name class in body element @sneridagh @davilima6
- Refactor actions @robgietema
- Store text tile data in json @robgietema
- Fixed tile add menu @robgietema
- Change to use root import on all config calls @sneridagh
- Fix CSS on tile image view @sneridagh
- Fix broken CSS on alignments left/right @sneridagh
- Tile DE literals translations @sneridagh
- Pass location as prop to child views in main View component in case we require it in some views @sneridagh
- Fix computed displayName from add-display-name Babel plugin for connected components @sneridagh

## 0.6.0 (2018-07-14)

### Added

- Schema widget @robgietema
- User actions and reducers @robgietema
- Group actions and reducers @robgietema
- Roles actions and reducers @robgietema
- Move combineReducers to the store creation level. This will ease the extensibility of them in Plone-React apps. @sneridagh
- Upgrade node to 8.11.2 @sneridagh
- Basic user listing in users controlpanel @robgietema
- Add missing FileWidget import @sneridagh
- Option to delete tiles @robgietema
- Option to add tiles @robgietema
- Image tiles in editor @robgietema
- Align images in editor @robgietema
- Video tiles in editor @robgietema
- Video tiles in editor @robgietema
- Sitemap.xml.gz view @robgietema
- Upload image indicator @robgietema
- Video tile view @robgietema
- Option to reset image @robgietema
- Drag and drop to reorder tiles @robgietema
- Enhanced DraftJS AnchorLink Plugin @robgietema @sneridagh
- Added the configuration required in Webpack config to load CSS modules in the project, required by DraftJS AnchorLink plugin @sneridagh

### Changes

- Styled wysiwyg widget @robgietema
- Switch from accordion to tabs in forms @robgietema
- Upgrade to Node 8.11.1 @tisto
- Replace ExtractionTextCSSPlugin with the new mini-css-extract-plugin, adapt universal-webpack config @sneridagh
- Removed flow @robgietema
- Fix eslint prettier config @robgietema
- Refactor actions and reducers to match restapi docs naming @robgietema
- Fix site root api calls @robgietema
- Change visual editor to use the new tiles api @robgietema
- Fix bug with wrong order input @robgietema
- Fix several problems in the DraftJS AnchorLink plugin @sneridagh
- Replace DraftJS Toolbar plugin H1/H2 buttons for H2/H3 ones @sneridagh
- Sync i18n translations @sneridagh
- Fix CSS .input class scope intrusion on the project introduced by the AnchorLink plugin fork @sneridagh
- Improve search reducer by adding the batching property in the search store.
- Upgrade to Node 8.11.3 @sneridagh

## 0.5.0 (2018-03-23)

### Added

- Pastanaga theme package @jaroel, @robgietema
- Registry based controlpanels @robgietema
- Component documentation @robgietema
- Component documentation examples @VaysseB
- Folder listing view @cekk
- Prettier docs for SCA @nileshgulia1
- Comments, email notification and vocabularies reducers @robgietema
- Pastanaga theme @robgietema
- Pastanaga manage views @robgietema
- Pastanaga theme views @robgietema
- Callout styling to draftjs @robgietema
- Image, file and news item view @robgietema
- Social sharing @robgietema
- Commenting @robgietema
- Tags @robgietema
- Renew login token when almost expired @robgietema
- Cctions reducers @robgietema
- Error reporting with Sentry support on client (default ErrorBoundary), server and Redux middleware @sneridagh
- Tiles reducers @robgietema
- Context aware toolbar @robgietema
- Hamburger menu navigation on mobile @sneridagh
- Editor prototype @robgietema
- Support for null values when reseting a field value @sneridagh

### Changes

- Update plone api versions / bootstrap process @thet
- Fix textwidget proptypes @cekk
- Remove phantomjs @tulikavijay
- Upgrade to node 8 @robgietema
- Switched to draft js plugins editor @robgietema
- Fix paragraph styling in draftjs @robgietema
- Fixed summary and tabular views @robgietema
- Upgrade to React 16 @sneridagh
- Upgrade to Webpack 4 @sneridagh
- Review chunks policy. Keep it in sync with Webpack 4 policy with entrypoint bundles @sneridagh
- Merged block styling to inline toolbar @robgietema
- Actions aware toolbar @sneridagh
- Fix permissions on the toolbar display menu @sneridagh

## 0.4.0 (2017-05-03)

### Added

- Adding tiles @robgietema
- Handle different tiles @robgietema
- Resizing of tiles @robgietema
- Deletion of tiles @robgietema
- Drag and drop of tiles @robgietema
- Basic mosaic grid rendering @robgietema
- Form validation @robgietema
- Notification messages @robgietema

### Changes

- Updated to new history api @robgietema
- Deselect on click outside grid @robgietema

## 0.3.0 (2017-04-29)

### Added

- Personal information @robgietema
- Change password @robgietema
- Password widget @robgietema
- I18n support and translations @robgietema
- Personal preferences @robgietema
- Rename action @robgietema

### Changed

- Fixed favicon @robgietema

## 0.2.0 (2017-04-27)

### Added

- Batch state in folder contents @robgietema
- Batch properties in folder contents @robgietema
- Batch tags in folder contents @robgietema
- Batch rename in folder contents @robgietema
- Diff view @robgietema
- Add revert to version @robgietema
- Create view revision page @robgietema
- Create history list view @robgietema
- Sorting of items in folder contents @robgietema
- Upload files in folder contents @robgietema
- Ordering of columns in folder contents @robgietema
- Ordering of items in folder contents @robgietema
- Pagination in folder contents @robgietema
- Delete in folder contents @robgietema

### Changed

- Only show add and contents in the toolbar when folderish @robgietema
- Diff on words not chars @robgietema

## 0.1.0 (2017-04-20)

### Added

- Folder contents @robgietema
- Sharing menu and view @robgietema
- Display menu @robgietema
- Semantic UI integration @robgietema
- Basic Mosaic setup @robgietema
- Basic Server Side Rendering @robgietema
- Search view @robgietema
- Actions menu @robgietema
- Workflow menu @robgietema
- Add menu @robgietema
- Add and edit forms including widgets @robgietema
- Basic components (navigation, toolbar, breadcrumbs etc) @robgietema
- Authentication including login / logout @robgietema
- Setup build environment @robgietema

### Changed

- Fixed passing intl to the schemaExtender in the ObjectListWidget component. @1bsilver
