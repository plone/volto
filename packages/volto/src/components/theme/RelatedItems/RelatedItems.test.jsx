import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import RelatedItems from './RelatedItems';

const mockStore = configureStore();

describe('Related Items', () => {
  it('renders without related items', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <RelatedItems />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders with related items', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const relatedItems = [
      {
        '@id': '/test-1',
        title: 'Title 1',
        description: 'Description 1',
      },
      {
        '@id': '/test-2',
        title: 'Title 2',
        description: 'Description 2',
      },
    ];
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <RelatedItems relatedItems={relatedItems} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders with related items has null', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const relatedItems = [
      {
        '@id': '/test-1',
        title: 'Title 1',
        description: 'Description 1',
      },
      null,
    ];
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <RelatedItems relatedItems={relatedItems} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
