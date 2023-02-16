import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor } from '@testing-library/react';
import config from '@plone/volto/registry';

import Edit from './Edit';

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

const blockId = '1234';
const mockStore = configureStore();

test('renders an edit video block component', async () => {
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
        data={{ url: 'https://youtu.be/KqjeO_ekW3g', '@type': 'video' }}
        selected={false}
        block={blockId}
        content={{}}
        request={{
          loading: false,
          loaded: false,
        }}
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
