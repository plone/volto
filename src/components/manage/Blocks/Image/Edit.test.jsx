import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor } from '@testing-library/react';
import { getImageBlockSizes } from './utils';
import config from '@plone/volto/registry';

import Edit from './Edit';

const mockStore = configureStore();

const blockId = '1234';

config.blocks.blocksConfig = {
  image: {
    id: 'image',
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
    getSizes: getImageBlockSizes,
  },
};

test('renders an edit image block component', async () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
      subrequests: {
        [blockId]: {},
      },
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Edit
        data={{ url: 'image', '@type': 'image' }}
        selected={false}
        block={blockId}
        content={{}}
        request={{
          loading: false,
          loaded: false,
        }}
        pathname="/news"
        onChangeBlock={() => {}}
        onSelectBlock={() => {}}
        onDeleteBlock={() => {}}
        createContent={() => {}}
        onFocusPreviousBlock={() => {}}
        onFocusNextBlock={() => {}}
        handleKeyDown={() => {}}
        index={1}
        openObjectBrowser={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  await waitFor(() => {});
  expect(json).toMatchSnapshot();
});
