# Settings reference guide

This is a summary of all the configuration options and what they control.

!!! note
This list is still incomplete, contributions are welcomed!

## navDepth

Navigation levels depth used in the navigation endpoint calls. Increasing this is useful
for implementing fat navigation menus. Defaults to `1`.

## defaultBlockType

The default block type in Volto is "text", which uses the current DraftJS-based implementation for the rich text editor. Future alternative rich text editors will need to use this setting and replace it with their block type. The block definition should also include the `blockHasValue` function, which is needed to activate the Block Chooser functionality. See this function signature in [Blocks > Settings](../blocks/settings.md).

## contentIcons

With this property you can configure Content Types icons.
Those are visible in Contents view (ex "Folder contents").
The default ones are in [config/ContentIcons.jsx](https://github.com/plone/volto/tree/master/src/config/ContentIcons.jsx) and you can extend them in your project's config for custom content types using `settings.contentIcons`.
