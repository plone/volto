import {
  App,
  PreviewImage,
  Image,
  ListingNewsItemTemplate,
  ListingEventItemTemplate,
  ListingPageItemTemplate,
} from '@plone/volto/components';

// Register components.
export const components = {
  PreviewImage: { component: PreviewImage },
  App: { component: App },
  Image: { component: Image },
  'News ItemListingTemplate': {
    component: ListingNewsItemTemplate,
  },
  DocumentListingTemplate: {
    component: ListingPageItemTemplate,
  },
  EventListingTemplate: {
    component: ListingEventItemTemplate,
  },
};
