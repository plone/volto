# Settings reference guide

This is a summary of all the configuration options and what they control.

!!! note
    This list is still incomplete, contributions are welcomed!

# navDepth

Navigation levels depth used in the navigation endpoint calls. Increasing this is useful
for implementing fat navigation menus. Defaults to `1`.

# defaultBlockType

The default block type in Volto is "text", which uses the current draftjs-based implementation of rich text editor. It can be set to other block type implementations.

Who wants to set a `defaultBlockType` needs to implement `blockHasValue` to tell the system that that block has a default value. See the [Blocks > Settings](../blocks/settings.md) page.
