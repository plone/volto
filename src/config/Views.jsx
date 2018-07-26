import AlbumView from '@plone/volto/components/theme/View/AlbumView';
import DocumentView from '@plone/volto/components/theme/View/DocumentView';
import FileView from '@plone/volto/components/theme/View/FileView';
import ImageView from '@plone/volto/components/theme/View/ImageView';
import ListingView from '@plone/volto/components/theme/View/ListingView';
import NewsItemView from '@plone/volto/components/theme/View/NewsItemView';
import SummaryView from '@plone/volto/components/theme/View/SummaryView';
import TabularView from '@plone/volto/components/theme/View/TabularView';

// Layout View Registry
export const layoutViews = {
  summary_view: SummaryView,
  tabular_view: TabularView,
  listing_view: ListingView,
  album_view: AlbumView,
};

// Content Types View Registry
export const contentTypesViews = {
  'News Item': NewsItemView,
  File: FileView,
  Image: ImageView,
};

// Default view
export const defaultView = DocumentView;
