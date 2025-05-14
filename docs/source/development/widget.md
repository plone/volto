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

Register your vocabulary in {file}`configure.zcml`:

```xml
  <utility
      name="category_vocabulary"
      component=".vocabulary.CategoryVocabularyFactory"
      />
```

You'll need to define a new `KeywordsIndex` in `portal_catalog`, in a {file}`catalog.xml` GenericSetup file.

```xml
<?xml version="1.0"?>
<object name="portal_catalog">
  <index name="category" meta_type="KeywordIndex">
    <indexed_attr value="category"/>
  </index>
</object>
```

For Volto 13, you need to register the Volto widget for this field.
This may change in the future:

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

A custom widget is often used in Volto forms.
To configure a new Volto widget follow these steps.

1.  Add the following import as the first line in the file {file}`index.js` in the add-on to import the component of the actual widget.

    ```jsx
    import { ToggleWidget } from './ToggleWidget';
    ```

1.  Add the following line before returning from the `applyConfig` function inside the file {file}`index.js` in the add-on to register the widget add-on component.

    ```jsx
    config.widgets.widget.toggle_widget = ToggleWidget;
    ```

1.  Next, create the widget component file {file}`ToggleWidget.jsx` with these contents:

    ```jsx
    import { Button } from 'semantic-ui-react';

    export function ToggleWidget({ id, value, onChange }) {
        return (
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    onChange(id, value === 'On' ? 'Off' : 'On');
                }}
            >
                Toggle me: {value}
            </Button>
        );
    }

    export default ToggleWidget;
    ```

    You need to install `semantic-ui-react` as a dependency of your add-on before it will work.
    You only need to `npm i semantic-ui-react`.

1.  Using the component shadowing tehnique, inside a new directory of your add-on: {file}`src/customizations/components/manage/Sidebar/` create a file {file}`Sidebar.jsx` that shadows the Sidebar component inside the core Volto corresponding file.
Copy all the file contents of original {file}`Sidebar.jsx` to the new {file}`Sidebar.jsx`.

1.  Inside the new {file}`Sidebar.jsx`, add this import at the top:

    ```jsx
    import { Form } from '@plone/volto/components/manage/Form';
    ```

1.  Below the imports, write this example custom form which has one field of type `toggle_widget` (our widget):

    ```jsx
    const MyForm = () => {
        return (
            <Form
                schema={{
                    fieldsets: [
                        {
                            id: 'default',
                            title: 'Title',
                            fields: ['toggle'],
                        },
                    ],
                    properties: {
                        toggle: {
                            title: 'My toggle',
                            widget: 'toggle_widget',
                            default: 'On',
                        },
                    },
                    required: [],
                }}
            />
        );
    };
    ```

1.  To see the widget inside the `Sidebar` on the right of Volto UI, add this line:

    ```jsx
    <MyForm />
    ```

    inside the `(React.)Fragment` tag that is rendered.

Now, after restarting Volto, you can see the button the widget renders, click on it, and its text changes on each click.
You can position the `MyForm` component anywhere where it is visible and the user can interact with it.
You can check other widgets included in Volto core under the widgets directory for more inspiration and possibilities of enhancing your widgets.

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

const MyComponent = (/* ... */) => {
    // ...
    const dispatch = useDispatch();
    // ...

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
    );
};
```
