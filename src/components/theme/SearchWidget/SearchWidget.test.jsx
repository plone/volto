import React from 'react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import SearchWidget from './SearchWidget';

const mockStore = configureStore();

describe('SearchWidget', () => {
  it('renders a search widget component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      navroot: {
        data: {
          '@id': 'http://127.0.0.1:3000/@navroot',
          navroot: {
            '@id': 'http://127.0.0.1:3000',
          },
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <SearchWidget pathname="/blog" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
