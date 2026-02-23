---
myst:
  html_meta:
    "description": "Volto forms and widgets"
    "property=og:description": "Volto forms and widgets"
    "property=og:title": "Forms and widgets"
    "keywords": "Volto, Plone, frontend, React, Blocks, Edit, components, Forms, widgets"
---

# Forms and widgets

This chapter describes how to define fields bound to schema in the backend, then register form widget components in the frontend to provide an interface to the field values.


## Set frontend widget

If you want to register a frontend widget for your field, you can define your field as follows.

```python
directives.widget(
    "specialfield",
    frontendOptions={
        "widget": "specialwidget"
    })
specialfield = schema.TextLine(title="Field with special frontend widget")
```

Then register your frontend widget in your app's configuration.

```jsx
import { MySpecialWidget } from './components';

const applyConfig = (config) => {
  config.widgets.widget.specialwidget = MySpecialWidget;
  return config;
};
```

You can also pass additional props to the frontend widget using the `widgetProps` key.

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

If you have a fixed predefined vocabulary, define your field as follows.

```python
legislative_reference = Choice(
    title="Single legislative reference",
    required=False,
    vocabulary="legislative_vocabulary",
)
```

Volto will render this field with the `SelectWidget` widget.


## Multi-choice field with vocabulary

If you have a fixed predefined vocabulary, define your field as follows.

```python
legislative_reference = Tuple(
    title="Legislative reference",
    value_type=Choice(
        title="Single legislative reference",
        required=False,
        vocabulary="legislative_vocabulary",
    ))
```

This is enough and Volto will render this field with the `ArrayWidget` widget.


## Multi-choice field with vocabulary and creatable

In the backend, in the schema, define a field as follows.

```python
from plone.autoform import directives
from zope import schema

#...
directives.widget("category", vocabulary="category_vocabulary")
category = schema.Tuple(title="Topic",
    value_type=schema.TextLine(
    title="Single topic",
    required=False,
))
```

Then define the `category_vocabulary`.

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

Register the vocabulary in {file}`configure.zcml`.

```xml
<utility
    name="category_vocabulary"
    component=".vocabulary.CategoryVocabularyFactory"
    />
```

Define a new `KeywordsIndex` in `portal_catalog` in a {file}`catalog.xml` GenericSetup file.

```xml
<?xml version="1.0"?>
<object name="portal_catalog">
  <index name="category" meta_type="KeywordIndex">
    <indexed_attr value="category"/>
  </index>
</object>
```

For Volto 13, register the Volto widget for this field.
This may change in the future.

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

A relation field is either a single relation field to hold at most one content object, `RelationChoice`, or a multi-relation field, `RelationList`, that can hold more than one content object.

Relation fields can be edited and rendered with the `Select` widget.
The restriction on content types, workflow states, and other attributes can be done through a `StaticCatalogVocabulary`.

There are other vocabulary types and other widgets, including the `ObjectBrowser` widget.


(widget-relation-field-single-label)=

### Single relation field

The following example is of a relation field, `RelationChoice`, with a named `StaticCatalogVocabulary` and `Select` widget.

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

It's recommended to define the vocabulary as a named `StaticCatalogVocabulary` with the field's or relation's name as its name.
This allows the {guilabel}`Relations` control panel to respect the defined restrictions to potential relation targets.

Put the following code into the file {file}`vocabularies.py`.

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

Put the following code into the file {file}`configure.zcml`.

```xml
<utility
  name="relationchoice_field_named_staticcatalogvocabulary"
  component="example.contenttype.vocabularies.ExamplesVocabularyFactory"
  />
```

The `Select` widget is currently the default widget for `RelationChoice` fields with a vocabulary.
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

### Multi-relation field

The following code is an example of a multi-relation field, `RelationList`, with a named `StaticCatalogVocabulary` and `Select` widget.

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


## Widget `isDisabled` props

Disable the input of a widget by passing the prop `isDisabled: true`.


## Available widgets

See [Storybook](https://6.docs.plone.org/storybook) for available widgets.


## Write a new widget

The main reasons to create a custom widget for a form field include the following.

-   To provide a specialized user interface for data input, for example, a color picker or a map location selector
-   To handle complex data structures that aren't well-served by standard input types
-   To implement validation or data formatting
-   To enhance user experience with custom interactions or real-time feedback

To create and register a new Volto widget follow these steps.

-   Write a widget component.
-   Register it either for a field, or under a name to be used in arbitrary fields.

The standard widget for a boolean field is a checkbox.
The following example creates a toggle widget and registers it for boolean fields.

![Toggle Widget for a boolean field](custom_widget.png)

1.  Create the widget component in file {file}`ToggleWidget.jsx`.
    The component uses the prop `onChange` function to change the value of the field with id `id`.
    The layout is a toggle which is already implemented in the UI components library `semantic-ui-react`.

    ```jsx
    import { Checkbox } from 'semantic-ui-react';
    import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

    export function ToggleWidget(props) {
      const { id, value, onChange } = props;
      return (
        <FormFieldWrapper {...props} className="boolean toggle">
          <Checkbox
            toggle
            id={id}
            checked={value}
            onChange={(e, { checked }) => onChange(id, checked)}
            label={value ? 'On' : 'Off'}
          />
        </FormFieldWrapper>
      );
    }

    export default ToggleWidget;
    ```

2.  Register your widget component in your add-on configuration.
    Usually this is in file {file}`index.js`.

    Register the widget for boolean fields as indicated by the emphasized line of code.

    ```{code-block} jsx
    :emphasize-lines: 5
    import { ToggleWidget } from './ToggleWidget';

    const applyConfig = (config) => {
      // …
      config.widgets.type.boolean = ToggleWidget;
      // …
      return config;
    };
    export default applyConfig;
    ```

```{note}
We use a `semantic-ui-react` component for our example.
This is optional.
`semantic-ui-react` is already installed in a standard Volto project.
If it's not in your project, you may want to use alternatives or just don't have the need of a UI components library.
```

After a restart of Volto, your widget is now applied to all boolean widgets.
You can see an example form with a boolean field in the following example.

```{code-block} jsx
:emphasize-lines: 27
<Form
  schema={{
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'fullname',
          'from',
          'subscribe_to_newsletter',
        ],
      },
    ],
    properties: {
      fullname: {
        title: intl.formatMessage(messages.fullnameTitle),
        placeholder: intl.formatMessage(messages.fullnameTitle),
      },
      from: {
        title: intl.formatMessage(messages.emailTitle),
        placeholder: intl.formatMessage(messages.emailTitle),
        type: 'email',
        widget: 'email',
      },
      subscribe_to_newsletter: {
        title: 'Subscribe to newsletter',
        type: 'boolean',
        default: false,
      },
    },
    required: ['fullname', 'from',],
  }}
  onSubmit={onSubmit}
  resetOnCancel={true}
/>
```


### Register the new widget for arbitrary fields

The following example shows how to register the same new widget for arbitrary fields.

```{code-block} jsx
:emphasize-lines: 5
import { ToggleWidget } from './ToggleWidget';

const applyConfig = (config) => {
    // …
    config.widgets.widget.toggle_widget = ToggleWidget;
    // …
    return config;
};
export default applyConfig;
```

This widget named `toggle_widget` can now be used in a schema as follows.

```{code-block} jsx
:emphasize-lines: 27-28
<Form
  schema={{
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'fullname',
          'from',
          'subscribe_to_newsletter',
        ],
      },
    ],
    properties: {
      fullname: {
        title: intl.formatMessage(messages.fullnameTitle),
        placeholder: intl.formatMessage(messages.fullnameTitle),
      },
      from: {
        title: intl.formatMessage(messages.emailTitle),
        placeholder: intl.formatMessage(messages.emailTitle),
        type: 'email',
        widget: 'email',
      },
      subscribe_to_newsletter: {
        title: 'Subscribe to newsletter',
        type: 'pipapo',
        widget: 'toggle_widget',
        default: false,
      },
    },
    required: ['fullname', 'from',],
  }}
  onSubmit={onSubmit}
  resetOnCancel={true}
/>
```


### Pass additional props

The following code examples show how to pass `labels` as additional props into the widget.

```jsx
subscribe_to_newsletter: {
  title: 'Subscribe to newsletter',
  type: 'boolean',
  default: false,
  labels: ['yes', 'no'],
},
```

```{code-block} jsx
:emphasize-lines: 5,13
import { Checkbox } from 'semantic-ui-react';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

export function ToggleWidget(props) {
  const { id, value, onChange, labels = ['On', 'Off'] } = props;
  return (
    <FormFieldWrapper {...props} className="boolean toggle">
      <Checkbox
        toggle
        id={id}
        checked={value}
        onChange={(e, { checked }) => onChange(id, checked)}
        label={value ? labels[0] : labels[1]}
      />
    </FormFieldWrapper>
  );
}

export default ToggleWidget;
```

You can experiment with other widgets included in Volto core under the {file}`/components/manage/Widgets/` directory for more inspiration and possibilities of enhancing your widgets.


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
        dispatch(setMetadataFocus("ownership", "allow_discussion"));
      }}
    >
      This button will change the sidebar to the content form and focus
      ownership fieldset and the allow_discussion field
    </button>
    // ...
  );
};
```

