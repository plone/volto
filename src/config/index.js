/**
 * Config.
 * @module config
 */
import { defaults } from 'lodash';

import {
  DocumentView,
  FileView,
  ImageView,
  ListingView,
  NewsItemView,
  SummaryView,
  TabularView,
} from '../components';

// The Widgets are forced to be imported not from the index but from its own
// full path due to circular import issues
import ArrayWidget from '../components/manage/Widgets/ArrayWidget';
import CheckboxWidget from '../components/manage/Widgets/CheckboxWidget';
import DatetimeWidget from '../components/manage/Widgets/DatetimeWidget';
import FileWidget from '../components/manage/Widgets/FileWidget';
import PasswordWidget from '../components/manage/Widgets/PasswordWidget';
import SchemaWidget from '../components/manage/Widgets/SchemaWidget';
import SelectWidget from '../components/manage/Widgets/SelectWidget';
import TextareaWidget from '../components/manage/Widgets/TextareaWidget';
import TextWidget from '../components/manage/Widgets/TextWidget';
import WysiwygWidget from '../components/manage/Widgets/WysiwygWidget';

// Layout View Registry
export const layoutViews = {
  summary_view: SummaryView,
  tabular_view: TabularView,
  listing_view: ListingView,
};

// Content Types View Registry
export const contentTypesViews = {
  'News Item': NewsItemView,
  File: FileView,
  Image: ImageView,
};

// Default view
export const defaultView = DocumentView;

// Widgets mapping
export const widgetMapping = {
  id: {
    schema: SchemaWidget,
  },
  widget: {
    richtext: WysiwygWidget,
    textarea: TextareaWidget,
    datetime: DatetimeWidget,
    password: PasswordWidget,
  },
  vocabulary: {
    'plone.app.vocabularies.Keywords': ArrayWidget,
  },
  choices: SelectWidget,
  type: {
    boolean: CheckboxWidget,
    array: ArrayWidget,
    object: FileWidget,
    datetime: DatetimeWidget,
  },
};

// Default Widget
export const defaultWidget = TextWidget;

// Non Content Routes/Views
export const nonContentRoutes = [
  /\?.*$/,
  '/add',
  '/contents',
  '/delete',
  '/diff',
  '/edit',
  '/history',
  '/layout',
  '/login',
  '/logout',
  '/register',
  '/sharing',
  '/search',
  '/change-password',
  /\/controlpanel\/.*$/,
  '/controlpanel',
  '/personal-information',
  '/personal-preferences',
];

export default defaults(
  {},
  {
    host: process.env.HOST,
    port: process.env.PORT,
    apiPath: process.env.API_PATH,
  },
  {
    host: 'localhost',
    port: '4300',
    apiPath: 'http://localhost:8080/Plone',
  },
);
