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
