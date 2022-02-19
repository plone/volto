---
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


```{seealso}
See [storybook](https://docs.voltocms.com/storybook) with available widgets.
```

## Write a new widget

```{note}
Please contribute to this section!
```
