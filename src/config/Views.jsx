import DocumentView from '@plone/volto/components/theme/View/DocumentView';
import FileView from '@plone/volto/components/theme/View/FileView';
import ImageView from '@plone/volto/components/theme/View/ImageView';
import ListingView from '@plone/volto/components/theme/View/ListingView';
import NewsItemView from '@plone/volto/components/theme/View/NewsItemView';
import EventView from '@plone/volto/components/theme/View/EventView';
import SummaryView from '@plone/volto/components/theme/View/SummaryView';
import TabularView from '@plone/volto/components/theme/View/TabularView';
import NotFoundView from '@plone/volto/components/theme/NotFound/NotFound';

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
  Event: EventView,
};

// Default view
export const defaultView = DocumentView;

export const errorViews = {
  '404': NotFoundView,
};
