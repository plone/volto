import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';
import config from '@plone/volto/registry';

config.blocks.blocksConfig = {
  video: {
    id: 'video',
    title: 'Video',
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
  },
};

test('renders a view video component', () => {
  const component = renderer.create(
    <View
      data={{
        '@type': 'video',
        url: 'https://youtu.be/KqjeO_ekW3g',
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders a view video component with placeholder', () => {
  const component = renderer.create(
    <View
      data={{
        '@type': 'video',
        url: 'https://youtu.be/KqjeO_ekW3g',
        preview_image:
          'https://github.com/plone/volto/raw/main/logos/volto-colorful.png',
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
