---
myst:
  html_meta:
    "description": "How to manually enable Blocks on a content type"
    "property=og:description": "How to manually enable Blocks on a content type"
    "property=og:title": "Blocks Introduction"
    "keywords": "Volto, Plone, frontend, React, blocks"
---

# Blocks Introduction

Volto features the Pastanaga Editor Engine, allowing you to visually compose a page using blocks.
The editor allows you to add, modify, reorder and delete blocks given your requirements.
Blocks provide the user the ability to display content in an specific way, although they can also define behavior and have specific features.
Blocks are composed of two basic (and required) components: the block edit and view components.

(default-blocks)=

## Default blocks

Volto ships with a basic set of blocks, as described in the following list.
For details of all their options, see {doc}`settings`. Some of the blocks are "restricted", they can't be added by the editors through the block chooser UI, for example the Title and Description blocks.

Title
: Connected to the `title` content type's metadata field. It renders as the `h1` of the page. Cannot be removed by default, although this can be customized using `config.settings.requiredBlocks`.

Text
: The rich text block. This is the default type of block when you add a new block to the page.

Image
: Allows insertion of an existing image or upload of a new one. In case of uploading, it gets added inside the content type (folderish) element. If the content is not folderish, it gets created side by side.

Video
: Allows insertion of either an external video (YouTube, Vimeo), or a video already uploaded to the site (File content type), into the page by referencing it.

Listing
: Lists the contents of the content type when it is folderish. It also allows building a query to the database the results of which will be shown as items of the list. The listing block has variations defined by default (standard, summary, image gallery) to customize the look of the listing.

Maps
: Allows you to insert a map from an external source (Google Maps, OpenStreet Maps).

Table of contents
: Insert the table of contents for the current blocks.

Hero
: Show a customizable "Hero" block with a big image, a title, and a description.

HTML
: Inserts arbitrary HTML.

Search
: A block that provides a form with a search user interface where you can customize the facets (search handlers) and the appearance of the search form.

Table
: Inserts a customizable table.

Description
: Connected to the `description` content type's metadata field.

```{note}
Volto Blocks are not enabled by default in Plone content types, in order to enable this feature, you should enable provided behavior in a per content type basis.
The programmatic name of the behavior is `volto.blocks`, or `Blocks` in the Behavior tab of the Dexterity Content Types control panel.
If you are using the `plone.volto` package, it sets it up for you for the `Document` content type.
See {ref}`how-to-manually-enable-blocks-on-a-content-type` for details.
```

(how-to-manually-enable-blocks-on-a-content-type)=

## How to manually enable Blocks on a content type

You can enable them on any content type by enabling `Blocks` behavior provided by `plone.restapi`.

1. Go to `ControlPanel` -> `Dexterity Content Types`, select the content type.
2. Go to `Behaviors`
3. Select the `Blocks` behavior
4. Save

You can also add the behavior programmatically via GenericSetup:

```xml
<?xml version="1.0"?>
<object name="LRF" meta_type="Dexterity FTI" i18n:domain="plone"
   xmlns:i18n="http://xml.zope.org/namespaces/i18n">
 <property name="behaviors" purge="false">
  <element value="volto.blocks" />
 </property>
</object>
```

Test that the content type you've just enabled `Blocks` behavior is working, by creating a new object of that type from Volto.
