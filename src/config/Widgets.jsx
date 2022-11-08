// The Widgets are forced to be imported not from the index but from its own
// full path due to circular import issues

import loadable from '@loadable/component';

import AlignWidget from '@plone/volto/components/manage/Widgets/AlignWidget';
import ButtonsWidget from '@plone/volto/components/manage/Widgets/ButtonsWidget';
import ArrayWidget from '@plone/volto/components/manage/Widgets/ArrayWidget';
import CheckboxWidget from '@plone/volto/components/manage/Widgets/CheckboxWidget';
import FileWidget from '@plone/volto/components/manage/Widgets/FileWidget';
import IdWidget from '@plone/volto/components/manage/Widgets/IdWidget';
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
import InternalUrlWidget from '@plone/volto/components/manage/Widgets/InternalUrlWidget';
import EmailWidget from '@plone/volto/components/manage/Widgets/EmailWidget';
import NumberWidget from '@plone/volto/components/manage/Widgets/NumberWidget';
import ImageSizeWidget from '@plone/volto/components/manage/Widgets/ImageSizeWidget';

import ReferenceWidget from '@plone/volto/components/manage/Widgets/ReferenceWidget';
import ObjectBrowserWidget from '@plone/volto/components/manage/Widgets/ObjectBrowserWidget';

import ObjectWidget from '@plone/volto/components/manage/Widgets/ObjectWidget';
import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';
import VocabularyTermsWidget from '@plone/volto/components/manage/Widgets/VocabularyTermsWidget';
import SelectMetadataWidget from '@plone/volto/components/manage/Blocks/Search/widgets/SelectMetadataField';
import SelectAutoComplete from '@plone/volto/components/manage/Widgets/SelectAutoComplete';
import ColorPickerWidget from '@plone/volto/components/manage/Widgets/ColorPickerWidget';

import ArrayViewWidget from '@plone/volto/components/theme/Widgets/ArrayWidget';
import BooleanViewWidget from '@plone/volto/components/theme/Widgets/BooleanWidget';
import DatetimeViewWidget from '@plone/volto/components/theme/Widgets/DatetimeWidget';
import DateViewWidget from '@plone/volto/components/theme/Widgets/DateWidget';
import DescriptionViewWidget from '@plone/volto/components/theme/Widgets/DescriptionWidget';
import EmailViewWidget from '@plone/volto/components/theme/Widgets/EmailWidget';
import FileViewWidget from '@plone/volto/components/theme/Widgets/FileWidget';
import { getWidgetView } from '@plone/volto/helpers/Widget/widget';
import ImageViewWidget from '@plone/volto/components/theme/Widgets/ImageWidget';
import PasswordViewWidget from '@plone/volto/components/theme/Widgets/PasswordWidget';
import RelationsViewWidget from '@plone/volto/components/theme/Widgets/RelationsWidget';
import RelationViewWidget from '@plone/volto/components/theme/Widgets/RelationWidget';
import RichTextViewWidget from '@plone/volto/components/theme/Widgets/RichTextWidget';
import SelectViewWidget from '@plone/volto/components/theme/Widgets/SelectWidget';
import TextViewWidget from '@plone/volto/components/theme/Widgets/TextWidget';
import TitleViewWidget from '@plone/volto/components/theme/Widgets/TitleWidget';
import TokenViewWidget from '@plone/volto/components/theme/Widgets/TokenWidget';
import UrlViewWidget from '@plone/volto/components/theme/Widgets/UrlWidget';

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
    id: IdWidget,
  },
  widget: {
    richtext: WysiwygWidget,
    textarea: TextareaWidget,
    datetime: DatetimeWidget,
    date: DatetimeWidget,
    password: PasswordWidget,
    file: FileWidget,
    align: AlignWidget,
    buttons: ButtonsWidget,
    url: UrlWidget,
    internal_url: InternalUrlWidget,
    email: EmailWidget,
    array: ArrayWidget,
    token: TokenWidget,
    query: QueryWidget,
    query_sort_on: QuerySortOnWidget,
    querystring: QuerystringWidget,
    object_browser: ObjectBrowserWidget,
    object: ObjectWidget,
    object_list: ObjectListWidget,
    vocabularyterms: VocabularyTermsWidget,
    image_size: ImageSizeWidget,
    select_querystring_field: SelectMetadataWidget,
    autocomplete: SelectAutoComplete,
    color_picker: ColorPickerWidget,
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
    id: IdWidget,
  },
  views: {
    getWidget: getWidgetView,
    default: TextViewWidget,
    id: {
      file: FileViewWidget,
      image: ImageViewWidget,
      relatedItems: RelationsViewWidget,
      subjects: TokenViewWidget,
    },
    widget: {
      array: ArrayViewWidget,
      boolean: BooleanViewWidget,
      choices: SelectViewWidget,
      date: DateViewWidget,
      datetime: DatetimeViewWidget,
      description: DescriptionViewWidget,
      email: EmailViewWidget,
      file: FileViewWidget,
      image: ImageViewWidget,
      password: PasswordViewWidget,
      relation: RelationViewWidget,
      relations: RelationsViewWidget,
      richtext: RichTextViewWidget,
      string: TextViewWidget,
      tags: TokenViewWidget,
      textarea: TextViewWidget,
      title: TitleViewWidget,
      url: UrlViewWidget,
      internal_url: InternalUrlWidget,
    },
    vocabulary: {},
    choices: SelectViewWidget,
    type: {
      array: ArrayViewWidget,
      boolean: BooleanViewWidget,
    },
  },
};

// Default Widget
export const defaultWidget = TextWidget;
