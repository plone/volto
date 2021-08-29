Changelog
=========


2.4.1 (unreleased)
------------------

- Nothing changed yet.


2.4.0 (2021-07-19)
------------------

- Fix German translation for "Navigation title" ("Navigation titel" -> "Navigationstitel")
  [timo]

- Fix and complete upgrade step from Volto 12 to Volto 13
  [sneridagh]

- Add helper scripts
  [sneridagh]

- Add preview_image to transforms
  [sneridagh]

- Add headtitle behavior
  [sneridagh]

- Guard for setuphandlers disablecontenttype
  [sneridagh]

- Fix audit script
  [sneridagh]

- Add support for subblocks in the custom transforms for ``volto-blocks-grid``
  [sneridagh]

2.3.0 (2021-05-19)
------------------

- Add upgrade step facility
- Add upgrade step from Volto 12 to Volto 13
  [sneridagh]


2.2.1 (2021-04-21)
------------------

- Better multilingual profile
  [sneridagh]


2.2.0 (2021-04-21)
------------------

- Add multilingual test fixture for Cypress tests
  [sneridagh]


2.1.3 (2021-03-26)
------------------

- Add ``requests`` as dependency
  [sneridagh]


2.1.2 (2021-03-07)
------------------

- Add a demo home page for demo site
  [sneridagh]


2.1.1 (2021-03-06)
------------------

- Add demo site profile
  [sneridagh]


2.1.0 (2021-02-23)
------------------

- Remove Images and Files from types_use_view_action_in_listings since in Volto it's no used at all.
  [sneridagh]


2.0.0 (2021-02-20)
------------------

- [Breaking] Define good known to work well with Volto image scales in ``registry.xml``
  GenericSetup profile. When this add-on is installed or the profile is applied, it will
  overwrite the existing scales in your Plone site. If you are using specific scales for
  your project, make sure they are installed after this addon's profile.

  This scales have been tested in real production projects and work well with Volto's
  layout and responsive viewports.
  [timo, sneridagh]


1.7.2 (2021-01-26)
------------------

- Nothing changed yet.


1.7.1 (2021-01-25)
------------------

- Fix first level tabs and add nav_title to them
  [sneridagh]


1.7.0 (2021-01-21)
------------------

- Add ``breadcrumbs_view`` override to include ``nav_title``
  [sneridagh]


1.6.0 (2021-01-14)
------------------

- Added indexers for `preview_image`, it allows the Volto object browser widget to access it
  [sneridagh]


1.5.2 (2020-12-14)
------------------

- Missing ZCML for translations
  [sneridagh]


1.5.1 (2020-12-14)
------------------

- Add zest.pocompile
  [sneridagh]

- Add missing .mo
  [sneridagh]


1.5.0 (2020-12-09)
------------------

- Fix locales default in German
  [sneridagh]


1.4.0 (2020-07-29)
------------------

- Add volto.preview_image behavior to Page type.
  [timo]


1.3.2 (2020-05-17)
------------------

- Make sure that the enable_pam helper does its job.
  [sneridagh]


1.3.1 (2020-05-12)
------------------

- Fix LRF global allow and ensure default behaviors
  [sneridagh]


1.3.0 (2020-05-11)
------------------

- Add registry navigation setting for not show the current item in navigations
  [sneridagh]

- New enable_pam setuphandlers helper
  [sneridagh]

- New enable_pam_consistency setuphandlers helper
  [sneridagh]


1.2.0 (2020-04-17)
------------------

- Bring back the event type, since it's fully working in Volto now
  [sneridagh]

- fix typo in behavior name ``navttitle`` -> ``navtitle``
  [sneridagh]


1.1.0 (2020-03-10)
------------------

- Added a specific IImageScaleFactory for ``Image`` content type, to fix SVG handling
  [sneridagh]


1.0.1 (2020-03-08)
------------------

- Update version numbers in default home page.
  [sneridagh]


1.0.0 (2020-03-06)
------------------

- Add Zope log patch
  [sneridagh]

- Add nav_title and preview_image behaviors
  [sneridagh]

- override plone.app.vocabularies.Keywords with a version that
  uses the unencode subject value as the token.
  [csenger]

- Remove versioning behavior from Document type.
  [timo]

- Backport all features that were in kitconcept.voltodemo
  [sneridagh]

- Patch Password reset tool in Products.CMFPlone to use the optional volto_domain in the
  e-email which is sent to users, only if the request is made through REST.
  [fredvd]

- Add Volto settings control panel with frontend_domain field.
  [fredvd]

- Homepage profile for demo purposes
  [sneridagh]

- CORS profile
  [sneridagh]

- Enable Volto Blocks for Document and LRF
  [sneridagh]

- Initial release.
  [kitconcept]
