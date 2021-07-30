// The Widgets are forced to be imported not from the index but from its own
// full path due to circular import issues

import loadable from '@loadable/component';

import AlignWidget from '@plone/volto/components/manage/Widgets/AlignWidget';
import ArrayWidget from '@plone/volto/components/manage/Widgets/ArrayWidget';
import CheckboxWidget from '@plone/volto/components/manage/Widgets/CheckboxWidget';
import FileWidget from '@plone/volto/components/manage/Widgets/FileWidget';
import PasswordWidget from '@plone/volto/components/manage/Widgets/PasswordWidget';
import QueryWidget from '@plone/volto/components/manage/Widgets/QueryWidget';
import QuerySortOnWidget from '@plone/volto/components/manage/Widgets/QuerySortOnWidget';
import QuerystringWidget from '@plone/volto/components/manage/Widgets/QuerystringWidget';
import SchemaWidget from '@plone/volto/components/manage/Widgets/SchemaWidget';
import SelectWidget from '@plone/volto/components/manage/Widgets/SelectWidget';
import TextareaWidget from '@plone/volto/components/manage/Widgets/TextareaWidget';
import TextWidget from '@plone/volto/components/manage/Widgets/TextWidget';
import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';
import WysiwygWidget from '@plone/volto/components/manage/Widgets/WysiwygWidget';
import UrlWidget from '@plone/volto/components/manage/Widgets/UrlWidget';
import EmailWidget from '@plone/volto/components/manage/Widgets/EmailWidget';
import NumberWidget from '@plone/volto/components/manage/Widgets/NumberWidget';

import ReferenceWidget from '@plone/volto/components/manage/Widgets/ReferenceWidget';
import ObjectBrowserWidget from '@plone/volto/components/manage/Widgets/ObjectBrowserWidget';

import ObjectWidget from '@plone/volto/components/manage/Widgets/ObjectWidget';
import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';
import VocabularyTermsWidget from '@plone/volto/components/manage/Widgets/VocabularyTermsWidget';

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
    remoteUrl: UrlWidget,
  },
  widget: {
    richtext: WysiwygWidget,
    textarea: TextareaWidget,
    datetime: DatetimeWidget,
    date: DatetimeWidget,
    password: PasswordWidget,
    file: FileWidget,
    align: AlignWidget,
    url: UrlWidget,
    email: EmailWidget,
    query: QueryWidget,
    query_sort_on: QuerySortOnWidget,
    querystring: QuerystringWidget,
    object_browser: ObjectBrowserWidget,
    object: ObjectWidget,
    object_list: ObjectListWidget,
    vocabularyterms: VocabularyTermsWidget,
  },
  vocabulary: {
    'plone.app.vocabularies.Catalog': ObjectBrowserWidget,
  },
  factory: {
    'Relation List': ObjectBrowserWidget,
    'Relation Choice': ReferenceWidget,
  },
  choices: SelectWidget,
  type: {
    boolean: CheckboxWidget,
    array: ArrayWidget,
    object: FileWidget,
    datetime: DatetimeWidget,
    date: DatetimeWidget,
    password: PasswordWidget,
    number: NumberWidget,
    integer: NumberWidget,
  },
};

// Default Widget
export const defaultWidget = TextWidget;
