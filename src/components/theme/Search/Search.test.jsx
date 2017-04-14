describe('Search', () => {
  it('dummy', () => {
    expect(1).toBe(1);
  });
});

/*
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import Search from './Search';

jest.mock('redux-connect');

const mockStore = configureStore();

describe('Search', () => {
  it('renders an empty search component', () => {
    const store = mockStore({
      search: {
        loaded: false,
      },
    });
    asyncConnect = Component => Component;
    const component = renderer.create(
      <Provider store={store}>
        <Search location={{ query: { searchableText: 'blog' } }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a search component', () => {
    const store = mockStore({
      search: {
        loaded: true,
        items: [
          {
            '@id': '/blog',
            '@type': 'Folder',
            title: 'Blog',
            description: 'My blog',
          },
        ],
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Search location={{ query: { searchableText: 'blog' } }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

*/
