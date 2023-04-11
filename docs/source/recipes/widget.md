---
myst:
  html_meta:
    "description": "Volto forms and widgets"
    "property=og:description": "Volto forms and widgets"
    "property=og:title": "Forms and widgets"
    "keywords": "Volto, Plone, frontend, React, Blocks, Edit, components, Forms, widgets"
---

# Forms and widgets

## Set frontend widget

If you want to register a frontend widget for your field, you can define your field such as:

```python
directives.widget(
    "specialfield",
    frontendOptions={
        "widget": "specialwidget"
    })
specialfield = schema.TextLine(title="Field with special frontend widget")
```

Then register your frontend widget in your apps configuration.

```jsx
import { MySpecialWidget } from './components';

const applyConfig = (config) => {
  config.widgets.widget.specialwidget = MySpecialWidget;
  return config;
}
```

You can also pass additional props to the frontend widget using the `widgetProps` key:

```python
directives.widget(
    "specialfield",
    frontendOptions={
        "widget": "specialwidget",
        "widgetProps": {"isLarge": True, "color": "red"}
    })
specialfield = schema.TextLine(title="Field with special frontend widget")
```

The props will be injected into the corresponding widget component, configuring it as specified.

## Single-choice field with vocabulary

If you have a fixed predefined vocabulary you can define your field such as:

```python
    legislative_reference = Choice(
            title=u"Single legislative reference",
            required=False,
            vocabulary="legislative_vocabulary",
        )
```

Volto will render this field with the `SelectWidget` widget.

## Multi-choice field with vocabulary

If you have a fixed predefined vocabulary you can define your field such as:

```python
    legislative_reference = Tuple(
        title="Legislative reference",
        value_type=Choice(
            title=u"Single legislative reference",
            required=False,
            vocabulary="legislative_vocabulary",
        ))
```

This is enough and Volto will render this field with the `ArrayWidget` widget.

## Multi-choice field with vocabulary and creatable

In the backend, in the dexterity schema, define a field such as:

```python
from plone.autoform import directives
from zope import schema

...
    directives.widget("category", vocabulary="category_vocabulary")
    category = schema.Tuple(title=u"Topic",
                     value_type=schema.TextLine(
                         title=u"Single topic",
                         required=False,
                     ))
```

Then you need to define the `category_vocabulary`:

```python
from plone.app.vocabularies.catalog import KeywordsVocabulary as BKV
from zope.interface import implementer
from zope.schema.interfaces import IVocabularyFactory

@implementer(IVocabularyFactory)
class KeywordsVocabulary(BKV):
    def __init__(self, index):
        self.keyword_index = index

CategoryVocabularyFactory = KeywordsVocabulary("category")
```

Register your vocabulary in `configure.zcml`:

```xml
  <utility
      name="category_vocabulary"
      component=".vocabulary.CategoryVocabularyFactory"
      />
```

You'll need to define a new KeywordsIndex in `portal_catalog`, in
a `catalog.xml` GenericSetup file.

```xml
<?xml version="1.0"?>
<object name="portal_catalog">
  <index name="category" meta_type="KeywordIndex">
    <indexed_attr value="category"/>
  </index>
</object>
```

For Volto 13, you need to register the Volto widget for this field. This may
change in the future:

```js
import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';

const applyConfig = (config) => {
  config.widgets.id.category = TokenWidget;
  return config;
}

```

Based on this setup, Volto will render this field with the `TokenWidget`.


(widget-relation-field-label)=

## Relation fields

A relation field is either a single relation field to hold at most one content object, `RelationChoice`, or a multi relation field, `RelationList`, that can hold more than one content object.

Relation fields can be edited and rendered with the `Select` widget.
The restriction on content types, workflow states, and so on can be done with a `StaticCatalogVocabulary`.

There are other vocabulary types and other widgets, including the `ObjectBrowser` widget.

(widget-relation-field-single-label)=

### Single relation field

Relation field (`RelationChoice`) with a named `StaticCatalogVocabulary` and `Select` widget:

```python
relationchoice_field_named_staticcatalogvocabulary = RelationChoice(
    title="RelationChoice – named StaticCatalogVocabulary – Select widget",
    description="field/relation: relationchoice_field_named_staticcatalogvocabulary",
    vocabulary="relationchoice_field_named_staticcatalogvocabulary",
    required=False,
)
directives.widget(
    "relationchoice_field_named_staticcatalogvocabulary",
    frontendOptions={
        "widget": "select",
    },
)
```

It is recommended to define the vocabulary as a named `StaticCatalogVocabulary` with the field/relation name as its name.  
This allows the {guilabel}`relations` control panel to respect the defined restrictions to potential relation targets.

{file}`vocabularies.py`
```python
from plone.app.vocabularies.catalog import StaticCatalogVocabulary
from zope.interface import provider
from zope.schema.interfaces import IVocabularyFactory

@provider(IVocabularyFactory)
def ExamplesVocabularyFactory(context=None):
    return StaticCatalogVocabulary(
        {
            "portal_type": ["example"],
            "review_state": "published",
            "sort_on": "sortable_title",
        }
    )
```

{file}`configure.zcml`
```xml
<utility
  name="relationchoice_field_named_staticcatalogvocabulary"
  component="example.contenttype.vocabularies.ExamplesVocabularyFactory"
  />
```

The `Select` widget is currently the default for `RelationChoice` fields with vocabulary.
Therefore the directive can be omitted.

```python
relationchoice_field_named_staticcatalogvocabulary = RelationChoice(
    title="RelationChoice – named StaticCatalogVocabulary – Select widget",
    description="field/relation: relationchoice_field_named_staticcatalogvocabulary",
    vocabulary="relationchoice_field_named_staticcatalogvocabulary",
    required=False,
)
```

(widget-relation-field-multi-label)=

### Multi relation field

Multi relation field (`RelationList`) with a named `StaticCatalogVocabulary`and `Select` widget:

```python
relationlist_field_named_staticcatalogvocabulary = RelationList(
    title="RelationList – named StaticCatalogVocabulary – Select widget",
    description="field/relation: relationlist_field_named_staticcatalogvocabulary",
    value_type=RelationChoice(
        vocabulary="relationlist_field_named_staticcatalogvocabulary",
    ),
    required=False,
)
directives.widget(
    "relationlist_field_named_staticcatalogvocabulary",
    frontendOptions={
        "widget": "select",
    },
)
```


## Widget `isDisabled` Props

We can disable the input of a widget by passing props `isDisabled: true`.


## Available widgets

See [Storybook](https://6.docs.plone.org/storybook) with available widgets.


## Write a new widget

```{note}
Please contribute to this section!
```
