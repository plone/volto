import React from 'react';
import renderer from 'react-test-renderer';

import config from '@plone/volto/registry';
import View from './View';

import { getLeadImageBlockSizes } from './utils';

config.blocks.blocksConfig = {
  leadimage: {
    id: 'leadimage',
    title: 'Image',
    group: 'media',
    extensions: {},
    variations: [],
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    getSizes: getLeadImageBlockSizes,
  },
};

test('renders a view image component', () => {
  const component = renderer.create(
    <View
      data={{}}
      properties={{
        image: {
          download: 'http://localhost:3000/image.png',
          width: 400,
          height: 400,
          scales: {
            preview: {
              download:
                'http://localhost:3000/image.png/@@images/image/image-400.png',
              width: 400,
              height: 400,
            },
          },
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
