import loadable from '@loadable/component';
import { defineMessages } from 'react-intl';

import DefaultView from '@plone/volto/components/theme/View/DefaultView';
import FileView from '@plone/volto/components/theme/View/FileView';
import ImageView from '@plone/volto/components/theme/View/ImageView';
import ListingView from '@plone/volto/components/theme/View/ListingView';
import NewsItemView from '@plone/volto/components/theme/View/NewsItemView';
import SummaryView from '@plone/volto/components/theme/View/SummaryView';
import TabularView from '@plone/volto/components/theme/View/TabularView';
import LinkView from '@plone/volto/components/theme/View/LinkView';
import NotFoundView from '@plone/volto/components/theme/NotFound/NotFound';
import ConnectionRefused from '@plone/volto/components/theme/ConnectionRefused/ConnectionRefused';
import CorsError from '@plone/volto/components/theme/CorsError/CorsError';
import RequestTimeout from '@plone/volto/components/theme/RequestTimeout/RequestTimeout';
import AlbumView from '@plone/volto/components/theme/View/AlbumView';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';
import Forbidden from '@plone/volto/components/theme/Forbidden/Forbidden';
import ServerError from '@plone/volto/components/theme/Error/ServerError';

const EventView = loadable(
  () => import('@plone/volto/components/theme/View/EventView'),
);

defineMessages({
  album_view: {
    id: 'Album view',
    defaultMessage: 'Album view',
  },
  event_listing: {
    id: 'Event listing',
    defaultMessage: 'Event listing',
  },
  full_view: {
    id: 'All content',
    defaultMessage: 'All content',
  },
  listing_view: {
    id: 'Listing view',
    defaultMessage: 'Listing view',
  },
  summary_view: {
    id: 'Summary view',
    defaultMessage: 'Summary view',
  },
  tabular_view: {
    id: 'Tabular view',
    defaultMessage: 'Tabular view',
  },
  layout_view: {
    id: 'Mosaic layout',
    defaultMessage: 'Mosaic layout',
  },
  document_view: {
    id: 'Document view',
    defaultMessage: 'Document view',
  },
  folder_listing: {
    id: 'Folder listing',
    defaultMessage: 'Folder listing',
  },
  newsitem_view: {
    id: 'News item view',
    defaultMessage: 'News item view',
  },
  link_redirect_view: {
    id: 'Link redirect view',
    defaultMessage: 'Link redirect view',
  },
  file_view: {
    id: 'File view',
    defaultMessage: 'File view',
  },
  image_view: {
    id: 'Image view',
    defaultMessage: 'Image view',
  },
  event_view: {
    id: 'Event view',
    defaultMessage: 'Event view',
  },
  view: {
    id: 'Default view',
    defaultMessage: 'Default view',
  },
  default: {
    id: 'Default view',
    defaultMessage: 'Default view',
  },
});

// Layout View Registry
export const layoutViews = {
  document_view: DefaultView,
  summary_view: SummaryView,
  tabular_view: TabularView,
  listing_view: ListingView,
  link_redirect_view: LinkView,
  album_view: AlbumView,
};

// Content Types View Registry
export const contentTypesViews = {
  'News Item': NewsItemView,
  File: FileView,
  Image: ImageView,
  Event: EventView,
};

// Default view
export const defaultView = DefaultView;

export const errorViews = {
  404: NotFoundView,
  401: Unauthorized,
  403: Forbidden,
  408: RequestTimeout,
  500: ServerError,
  ECONNREFUSED: ConnectionRefused,
  corsError: CorsError,
};

export const layoutViewsNamesMapping = {
  album_view: 'Album view',
  event_listing: 'Event listing',
  full_view: 'All content',
  listing_view: 'Listing view',
  summary_view: 'Summary view',
  tabular_view: 'Tabular view',
  layout_view: 'Mosaic layout',
  document_view: 'Document view',
  folder_listing: 'Folder listing',
  newsitem_view: 'News item view',
  link_redirect_view: 'Link redirect view',
  file_view: 'File view',
  image_view: 'Image view',
  event_view: 'Event view',
  view: 'Default view',
  default: 'Default view',
};
