import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

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
          '@id': 'http://localhost:3000/@navroot',
          navroot: {
            '@id': 'http://localhost:3000',
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
