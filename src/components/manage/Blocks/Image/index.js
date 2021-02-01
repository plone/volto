import cameraSVG from '@plone/volto/icons/camera.svg';

import { load } from '@plone/volto/helpers/Config';

import ViewImageBlock from './View';
import EditImageBlock from './Edit';
import ImageSettingsSchema from './Schema';

const config = {
  blocks: {
    blocksConfig: {
      image: {
        id: 'image',
        title: 'Image',
        icon: cameraSVG,
        group: 'media',
        view: ViewImageBlock,
        edit: EditImageBlock,
        schema: ImageSettingsSchema,
        restricted: false,
        mostUsed: true,
        sidebarTab: 1,
        security: {
          addPermission: [],
          view: [],
        },
      },
    },
  },
};

load(config);
