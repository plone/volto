import App from '@plone/volto/components/theme/App/App';
import PreviewImage from '@plone/volto/components/theme/PreviewImage/PreviewImage';
import Image from '@plone/volto/components/theme/Image/Image';

export function installDefaultComponents(config) {
  config.components = {
    PreviewImage: { component: PreviewImage },
    App: { component: App },
    Image: { component: Image },
  };

  return config;
}
