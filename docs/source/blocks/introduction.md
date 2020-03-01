# Blocks

Volto features the Pastanaga Editor Engine, allowing you to visually compose a page using blocks.
The editor allows you to add, modify, reorder and delete blocks given your requirements.
Blocks provide the user the ability to display content in an specific way, although they can also define behavior and have specific features.
Blocks are composed of two basic (and required) components: the block edit and view components.

By default, Volto ships with the most basic set of blocks: Title, Text, Image, Video, Maps, etc...

!!! note
    Volto Blocks are not enabled by default in Plone content types, in order to enable this feature, you should enable provided behavior in a per content type basis.
    The programmatic name of the behavior is `volto.blocks`, or `Blocks` in the Behavior tab of the Dexterity Content Types control panel.
    If you are using the `kitconcept.voltodemo` package, it sets it up for you for the `Document` content type.

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
