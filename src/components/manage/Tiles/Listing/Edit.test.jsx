import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import { settings } from '~/config';

import Edit from './Edit';

const mockStore = configureStore();

const props = {
  data: {},
  index: 0,
  selected: true,
  tile: 'test',
  onChangeTile: () => {},
  onSelectTile: () => {},
  openSidebar: jest.fn(),
  searchContent: () => {},
  resetSearchContent: () => {},
  properties: {
    items: [],
  },
};

const baseStore = {
  intl: {
    locale: 'en',
    messages: {},
  },
  search: {
    subrequests: {},
  },
};

test('renders an edit listing tile component with a custom query', () => {
  const store = mockStore({
    ...baseStore,
    search: {
      subrequests: {
        test: {
          items: [
            {
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
              UID: 'asdfghjkl',
            },
          ],
        },
      },
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Edit {...props} data={{ query: '{}' }} />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders an edit listing tile component with no query set', () => {
  const store = mockStore(baseStore);
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Edit
          {...props}
          properties={{
            items: [
              {
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
                UID: 'asdfghjkl',
              },
            ],
          }}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
