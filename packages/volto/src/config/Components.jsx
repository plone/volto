import { App, Image, PreviewImage } from '@plone/volto/components';
import { DefaultLinkViewBody } from '@plone/volto/components/theme/View/LinkView';

// Register components.
export const components = {
  PreviewImage: { component: PreviewImage },
  App: { component: App },
  Image: { component: Image },
  LinkViewBody: { component: DefaultLinkViewBody },
};
