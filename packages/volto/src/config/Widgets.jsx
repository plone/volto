import {
  AlignWidget,
  ButtonsWidget,
  ArrayWidget,
  CheckboxWidget,
  FileWidget,
  IdWidget,
  PasswordWidget,
  QueryWidget,
  QuerySortOnWidget,
  QuerystringWidget,
  SchemaWidget,
  SelectWidget,
  TextareaWidget,
  TextWidget,
  TokenWidget,
  UrlWidget,
  InternalUrlWidget,
  EmailWidget,
  NumberWidget,
  ImageSizeWidget,
  RegistryImageWidget,
  ReferenceWidget,
  ObjectBrowserWidget,
  ObjectWidget,
  ObjectListWidget,
  VocabularyTermsWidget,
  SelectMetadataWidget,
  SelectAutoComplete,
  ColorPickerWidget,
  DatetimeWidget,
  RecurrenceWidget,
} from '@plone/volto/components/manage/Widgets';

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
import ImageWidget from '@plone/volto/components/manage/Widgets/ImageWidget';

// Widgets mapping
export const widgetMapping = {
  id: {
    subjects: TokenWidget,
    query: QuerystringWidget,
    recurrence: RecurrenceWidget,
    remoteUrl: UrlWidget,
    id: IdWidget,
    site_logo: RegistryImageWidget,
  },
  widget: {
    textarea: TextareaWidget,
    datetime: DatetimeWidget,
    date: DatetimeWidget,
    password: PasswordWidget,
    file: FileWidget,
    image: ImageWidget,
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
    select: SelectWidget,
    schema: SchemaWidget,
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
      object: () => '', // TODO: Not implemented yet: Object View widget
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
