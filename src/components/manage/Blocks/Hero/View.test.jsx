import React from 'react';
import renderer from 'react-test-renderer';
import { View } from './View';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';

import HeroImageLeftTemplate from '@plone/volto/components/manage/Blocks/Hero/layout/HeroImageLeftTemplate';
import HeroImageRightTemplate from '@plone/volto/components/manage/Blocks/Hero/layout/HeroImageRightTemplate';

const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

const blockId = '1234';

config.blocks.blocksConfig = {
  hero: {
    id: 'hero',
    title: 'Hero',
    group: 'media',
    extensions: {},
    variations: [
      {
        id: 'heroImageLeft',
        title: 'Image on left side',
        view: HeroImageLeftTemplate,
        isDefault: true,
      },
      {
        id: 'hereImageRight',
        title: 'Image on right side',
        view: HeroImageRightTemplate,
        isDefault: false,
      },
    ],
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
};

test('renders a view hero component', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <View
          data={{ url: 'heroimage.jpg', '@type': 'hero' }}
          block={blockId}
          variation={{}}
        />
      </MemoryRouter>
    </Provider>,
  );

  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
