---
myst:
  html_meta:
    'description': 'Volto forms and widgets'
    'property=og:description': 'Volto forms and widgets'
    'property=og:title': 'Forms and widgets'
    'keywords': 'Volto, Plone, frontend, React, Blocks, Edit, components, Forms, widgets'
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
};
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


(view-widgets)=

## Set the widget used to view a field

The `frontendOptions` hint also selects the widget that renders the field in the view of a content type that has no blocks.

Register your view widget in the `views` registry.

```jsx
import { MySpecialViewWidget } from './components';

const applyConfig = (config) => {
  config.widgets.views.widget.specialwidget = MySpecialViewWidget;
  return config;
};
```

The edit registry and the view registry are separate.
Register your widget in both if the field needs a custom widget in both places.

Volto hands the field definition to the view widget as props, so the `widgetProps` you declare in the schema reach the view widget the same way they reach the edit widget.
Volto applies the field value last, as the `value` prop, so nothing the schema carries can shadow it.

```{note}
If you name a widget that no add-on registered, Volto falls back to the widget named by the `widget` key in the schema, and then continues down the {ref}`resolution order <view-widgets-resolution-order>`.
This keeps a field readable when the add-on that provides its widget is not installed.
```


(view-widgets-resolution-order)=

### Widget resolution order in views

Volto renders a field with the first widget it resolves from the following list.

| Order | Resolved from | Registry |
| --- | --- | --- |
| 1 | The field name | `config.widgets.views.id` |
| 2 | The widget named by `frontendOptions`, or the `widget` key in the schema when the field carries no hint | `config.widgets.views.widget` |
| 3 | The `widget` key in the schema, when `frontendOptions` names a widget that no add-on registered | `config.widgets.views.widget` |
| 4 | The field's `factory` | `config.widgets.views.factory` |
| 5 | The presence of `choices` or `vocabulary` on the field | `config.widgets.views.choices` |
| 6 | The name of the field's vocabulary | `config.widgets.views.vocabulary` |
| 7 | The name of the vocabulary declared in `widgetOptions` | `config.widgets.views.vocabulary` |
| 8 | The field's `type` | `config.widgets.views.type` |
| 9 | Nothing else matched | `config.widgets.views.default` |

Edit widgets resolve through the same steps, with one difference in order: in edit forms, the factory comes after `choices` and vocabularies.
The difference matters for relation fields.
A `Relation Choice` or `Relation List` field carries a vocabulary, so the edit form lets you pick the related item with a select.
In the view, its factory resolves first, so the field renders as a link to the related item rather than as a select.

A widget named by `frontendOptions` or by the `widget` key in the schema still wins over the factory.
To render a relation field with a different view widget, name that widget in the schema.


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
};
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

## Sidebar

In the edit form, a sidebar is used when the form contains block data.
You can use the following helper action methods to change the form state.

### Setting tab

You can use the `setSidebarTab` action to set the current active tab, either via metadata or a block.

### Setting focus

You can use the `setMetadataFocus` action to set the current field by specifying the fieldset and the field name.

```jsx
import { useDispatch } from 'react-redux';
import { setSidebarTab, setMetadataFocus } from '@plone/volto/actions';

const dispatch = useDispatch()

return (
// ...
<button
    onClick={() => {
        dispatch(setSidebarTab(0));
        dispatch(setMetadataFocus('ownership', 'allow_discussion'));
    }}
>
    This button will change the sidebar to the content form and focus ownership fieldset and the allow_discussion field
</button>
// ...
)
```
