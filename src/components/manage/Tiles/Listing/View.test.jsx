import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import { settings } from '~/config';

import View from './View';

const mockStore = configureStore();

const props = {
  data: {
    selectedItem: '/test',
  },
  getContent: () => {},
  resetContent: () => {},
  tile: 'test',
  contentSubrequests: {
    test: {
      data: {
        '@id': `${settings.apiUrl}/test`,
        image: {
          scales: {
            mini: {
              download: `${settings.apiUrl}/test/image.jpeg`,
            },
          },
        },
        title: 'Test',
        description: 'Listing',
      },
    },
  },
};

test('renders a listing view component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    content: {
      subrequests: {},
    },
    search: {
      subrequests: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <View {...props} />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
