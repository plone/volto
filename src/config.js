/**
 * Config.
 * @module config
 */
import { defaults } from 'lodash';

import {
  SummaryView,
  TabularView,
  ListingView,
  NewsItemView,
  FileView,
  ImageView,
  DocumentView,
} from './components';

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

// Default view
export const defaultView = DocumentView;

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
