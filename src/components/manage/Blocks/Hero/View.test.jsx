import React from 'react';
import renderer from 'react-test-renderer';
import { View } from './View';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';

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
  },
};

test('renders a view hero component', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <View
          data={{ url: 'heroimage.jpg', '@type': 'hero' }}
          block={blockId}
        />
      </MemoryRouter>
    </Provider>,
  );

  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
