# Roadmap

## Volto 16

- [x] Integrate Volto Slate (alpha.15) @tiberiuichim @razvanmiu @eea
- [x] Allow final users to switch between available views in the search block. (alpha.0) @tiberiuichim @kreafox
- [x] Introduce the components registry alpha.22 @sneridagh 
- [x] New Block Style Wrapper added @sneridagh
- [x] Remove unneeded dependencies (e.g. date-fns)
- [x] Add schema to image and video block to make them extendable
- [x] Add user groups control panel @ksuess
- [x] Ship Poppins font via Volto and do not rely on Google fonts (alpha.16) @giuliaghisini
- [x] Add Undo Control Panel (alpha.17) @MdSahil-oss
- [x] Remove Callout Button from Slate (alpha.18) @sneridagh
- [x] Add OpenStreetMap support for the Maps block (alpha.25) @sneridagh
- [x] Add clear formatting button to slate (alpha.28) @robgietema
- [x] Add a headline (headline field) to the listing block (alpha.30) @sneridagh
- [x] Use absolute dates instead of "x hours ago" in history view (alpha.30) @steffenri
- [x] Change main workflow menu from the Pastanaga UI simplification to the classic Plone implementation (alpha.30) @sneridagh
Add option for users to set their own password (alpha.41) @JeffersonBledsoe
- [x] Lazy Load Sentry integration (alpha.41) and Moved all sentry-related code from Volto to the @plone-collective/volto-sentry package (alpha.46) @tiberiuichim
- [x] Add a dynamic user form based in @userschema endpoint (alpha.42) @erral @nileshgulia1
- [x] Change history route name to historyview (same as classic) in order to allow content to have 'history' as id (alpha.42) @danielamormocea
- [x] Added link integrity potential breakage warning message when deleting a referenced page (alpha.45) @danielamormocea
- Added new components & interfaces for content-rules Rules control in Volto. Rules management in both controlpanel and object view (alpha.45) @andreiggr
- Implement the Upgrade Control Panel (alpha.49) @ericof
- Add experimental add button (alpha.53) @davisagli

### Translations

- Add Dutch translation (alpha.43) @spereverde
- Add EU translation (alpha.33) @erral
- Finish ES translation (alpha.33) @erral @macagua
- Update Japanese translation (alpha.49) @terapyon
- Update Brazilian Portuguese translation (alpha.50) @ericof
- Update German translation (alpha.51) @ksuess

### Internal

- [x] Uplodate to Cypress 11 (alpha.51) @sneridagh
- [x] Deprecate NodeJS 12 (alpha.0) @sneridagh
- [x] changes the back button in folder contents from using a cross icon to using a back icon (alpha.26) @sneridagh
- [x] Upgrade to Razzle 4 (alpha.38) @davisagli
- [x] Jest downgraded from 27 to 26 (alpha.38) @davisagli
- Upgrade husky to latest version (alpha.49) @sneridagh
- Enable the use of yarn 3 in the build by default (alpha.49) @sneridagh

## Volto 15 (Plone 6 beta)

- [ ] Switch from DraftJS to Slate as default editor: https://github.com/plone/volto/issues/2167

## Volto 14 (Plone 6 alpha)

- [x] Add locking support (requires plone.restapi 8.9.0 or 7.4.0) @avoinea
- [x] Add search block @tiberiuichim @kreafox @sneridagh
- [x] New seamless mode (see https://docs.voltocms.com/deploying/seamless-mode/ for details) @sneridagh
- [x] New mobile navigation menu @sneridagh
- [x] Add Plone logo @ericof @sneridagh
- [x] Deprecate the old configuration system (see https://docs.voltocms.com/upgrade-guide/#volto-configuration-registry for details) @sneridagh
- [x] New i18n infrastructure in the new @plone/scripts package @sneridagh
- [x] Support Node 16 @tisto

Check the Volto 14 upgrade guide for breaking changes: https://docs.voltocms.com/upgrade-guide/#upgrading-to-volto-14xx

## Volto 16+ (nice to have, no blockers)

- [ ] Control Panel Overhaul: https://github.com/plone/volto/issues/29
- [ ] Content Rules: https://github.com/plone/volto/issues/10
- [ ] Form Builder: https://github.com/plone/volto/issues/739
- [ ] Grid Block
- [ ] Teaser Block

## Plone 6

- Plone 6 final will ship with the current final Volto version that is around at that time
