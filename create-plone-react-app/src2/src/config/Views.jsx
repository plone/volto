import {
  DocumentView,
  FileView,
  ImageView,
  ListingView,
  NewsItemView,
  SummaryView,
  TabularView,
} from '@plone/plone-react/components';

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
