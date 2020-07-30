// The Widgets are forced to be imported not from the index but from its own
// full path due to circular import issues

import loadable from '@loadable/component';

import ArrayWidget from '@plone/volto/components/manage/Widgets/ArrayWidget';
import CheckboxWidget from '@plone/volto/components/manage/Widgets/CheckboxWidget';
import FileWidget from '@plone/volto/components/manage/Widgets/FileWidget';
import PasswordWidget from '@plone/volto/components/manage/Widgets/PasswordWidget';
import QuerystringWidget from '@plone/volto/components/manage/Widgets/QuerystringWidget';
import SchemaWidget from '@plone/volto/components/manage/Widgets/SchemaWidget';
import SelectWidget from '@plone/volto/components/manage/Widgets/SelectWidget';
import TextareaWidget from '@plone/volto/components/manage/Widgets/TextareaWidget';
import TextWidget from '@plone/volto/components/manage/Widgets/TextWidget';
import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';
import WysiwygWidget from '@plone/volto/components/manage/Widgets/WysiwygWidget';
import UrlWidget from '@plone/volto/components/manage/Widgets/UrlWidget';
import EmailWidget from '@plone/volto/components/manage/Widgets/EmailWidget';

//import ReferenceWidget from '@plone/volto/components/manage/Widgets/ReferenceWidget';
import ObjectBrowserWidget from '@plone/volto/components/manage/Widgets/ObjectBrowserWidget';

export const DatetimeWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/DatetimeWidget'),
);
export const RecurrenceWidget = loadable(() =>
  import(
    '@plone/volto/components/manage/Widgets/RecurrenceWidget/RecurrenceWidget'
  ),
);

// Widgets mapping
export const widgetMapping = {
  id: {
    schema: SchemaWidget,
    subjects: TokenWidget,
    query: QuerystringWidget,
    recurrence: RecurrenceWidget,
  },
  widget: {
    richtext: WysiwygWidget,
    textarea: TextareaWidget,
    datetime: DatetimeWidget,
    date: DatetimeWidget,
    password: PasswordWidget,
    file: FileWidget,
    url: UrlWidget,
    email: EmailWidget,
  },
  vocabulary: {
    'plone.app.vocabularies.Catalog': ObjectBrowserWidget, //ReferenceWidget,
  },
  choices: SelectWidget,
  type: {
    boolean: CheckboxWidget,
    array: ArrayWidget,
    object: FileWidget,
    datetime: DatetimeWidget,
    date: DatetimeWidget,
    password: PasswordWidget,
    url: UrlWidget,
    email: EmailWidget,
  },
};

// Default Widget
export const defaultWidget = TextWidget;
