import DocumentView from '../components/theme/View/DocumentView';
import FileView from '../components/theme/View/FileView';
import ImageView from '../components/theme/View/ImageView';
import ListingView from '../components/theme/View/ListingView';
import NewsItemView from '../components/theme/View/NewsItemView';
import SummaryView from '../components/theme/View/SummaryView';
import TabularView from '../components/theme/View/TabularView';

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
