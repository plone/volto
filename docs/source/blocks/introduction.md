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
For details of all their options, see {ref}`blocks/settings`.

Title
: Connected to the `title` content type's metadata field. It renders as the `h1` of the page. Cannot be removed by default, although this can be customized using `config.settings.requiredBlocks`.

Text
: The rich text block. This is the default type of block when you add a new block to the page.

Image
: Allows to insert an existing image or upload a new one. In case of uploading it gets added inside the content type (folderish) element. If the content is not folderish, it gets created side by side.

Video
: Allows to insert an external video to the page (YouTube, Vimeo, etc), or on already uploaded to the site (File content type) by referencing it.

Listing
: Lists the contents of the content type (in case that it's folderish). It also allows to build a query to the database which results will be shown as items of the list. The listing block has variations defined by default (standard, summary, image gallery) to customize how the listing looks like.

Maps
: Allows you to insert a map from an external source (Google Maps, OpenStreet Maps).

Table of contents
: Insert the table of contents for the current blocks

Hero
: Show a customizable "Hero" block with a big image, a title and a description.

HTML
: Inserts arbitrary HTML.

Search
: A block that provide a form with a search user interface where you can customize the facets (search handlers) and look and feel of the search form.

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

You can also add the behavior programatically via GenericSetup:

```xml
<?xml version="1.0"?>
<object name="LRF" meta_type="Dexterity FTI" i18n:domain="plone"
   xmlns:i18n="http://xml.zope.org/namespaces/i18n">
 <property name="behaviors" purge="false">
  <element value="plone.restapi.behaviors.IBlocks" />
 </property>
</object>
```

Test that the content type you've just enabled `Blocks` behavior is working, by creating a new object of that type from Volto.
